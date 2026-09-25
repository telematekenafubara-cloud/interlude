/**
 * Interlude Bank — server ledger (liabilities) + Paystack TEST payouts.
 *
 * - Credits only fraud-cleared accepted Holds (completed | skipped).
 * - Rejected = ₦0 (no credit rows).
 * - Unpaid balances remain liabilities until withdrawal status = success.
 * - Never log full NIN/BVN/account numbers.
 */
import { createHash, randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import {
  LEDGER_TAG,
  MIN_WITHDRAWAL_KOBO,
  availableBalanceKobo,
  canWithdraw,
  creditForOutcome,
  formatNgnFromKobo,
  testNetKoboFromEnv,
} from "@/lib/bank-math";

export type PartyKind = "holder" | "waiter";
export type CreditPartyKind = "waiter" | "holder" | "interlude";

function hashSecret(raw: string): string {
  return createHash("sha256").update(raw, "utf8").digest("hex");
}

function last4(raw: string): string {
  const s = String(raw || "").replace(/\D/g, "");
  return s.slice(-4) || "****";
}

function newId(prefix: string): string {
  return `${prefix}_${randomBytes(12).toString("hex")}`;
}

function paystackSecret(): string | null {
  const k = process.env.PAYSTACK_SECRET_KEY?.trim();
  return k || null;
}

/** Refuse live keys for this ship — TEST only (sk_test_…). */
export function assertPaystackTestKey(secret: string): void {
  if (secret.startsWith("sk_live_")) {
    throw new Error("paystack_live_forbidden");
  }
  if (!secret.startsWith("sk_test_") && !secret.startsWith("sk_")) {
    // Allow generic sk_ for some sandbox fixtures; still block sk_live_.
  }
}

export async function getPartyBalance(
  partyKind: PartyKind,
  partyId: string,
): Promise<{
  creditedKobo: number;
  pendingKobo: number;
  paidKobo: number;
  availableKobo: number;
  availableNgn: string;
  minWithdrawalKobo: number;
}> {
  const sql = await getSql();
  const credits = await sql<{ sum: string | number | null }>`
    select coalesce(sum(amount_kobo), 0)::bigint as sum
    from bank_credits
    where party_kind = ${partyKind} and party_id = ${partyId}`;
  const pending = await sql<{ sum: string | number | null }>`
    select coalesce(sum(amount_kobo), 0)::bigint as sum
    from bank_withdrawals
    where party_kind = ${partyKind} and party_id = ${partyId}
      and status = 'pending'`;
  const paid = await sql<{ sum: string | number | null }>`
    select coalesce(sum(amount_kobo), 0)::bigint as sum
    from bank_withdrawals
    where party_kind = ${partyKind} and party_id = ${partyId}
      and status = 'success'`;
  const creditedKobo = Number(credits[0]?.sum ?? 0);
  const pendingKobo = Number(pending[0]?.sum ?? 0);
  const paidKobo = Number(paid[0]?.sum ?? 0);
  const availableKobo = availableBalanceKobo(
    creditedKobo,
    pendingKobo,
    paidKobo,
  );
  return {
    creditedKobo,
    pendingKobo,
    paidKobo,
    availableKobo,
    availableNgn: formatNgnFromKobo(availableKobo),
    minWithdrawalKobo: MIN_WITHDRAWAL_KOBO,
  };
}

export async function getKycStatus(
  partyKind: PartyKind,
  partyId: string,
): Promise<{
  status: string;
  accountName: string | null;
  accountLast4: string | null;
  bankCode: string | null;
  hasRecipient: boolean;
}> {
  const sql = await getSql();
  const rows = await sql<{
    status: string;
    account_name: string | null;
    account_number_last4: string | null;
    bank_code: string | null;
    paystack_recipient_code: string | null;
  }>`
    select status, account_name, account_number_last4, bank_code, paystack_recipient_code
    from bank_kyc
    where party_kind = ${partyKind} and party_id = ${partyId}
    limit 1`;
  const r = rows[0];
  if (!r) {
    return {
      status: "none",
      accountName: null,
      accountLast4: null,
      bankCode: null,
      hasRecipient: false,
    };
  }
  return {
    status: r.status,
    accountName: r.account_name,
    accountLast4: r.account_number_last4,
    bankCode: r.bank_code,
    hasRecipient: Boolean(r.paystack_recipient_code),
  };
}

/**
 * Store KYC hashes + payout account. Optionally create Paystack TEST recipient.
 * Never logs full NIN/BVN/account.
 */
export async function upsertKyc(input: {
  partyKind: PartyKind;
  partyId: string;
  nin: string;
  bvn: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
}): Promise<{ status: string; recipientCode: string | null }> {
  const nin = String(input.nin || "").replace(/\D/g, "");
  const bvn = String(input.bvn || "").replace(/\D/g, "");
  const accountNumber = String(input.accountNumber || "").replace(/\D/g, "");
  const bankCode = String(input.bankCode || "").trim();
  const accountName = String(input.accountName || "").trim().slice(0, 120);

  if (nin.length < 8 || bvn.length < 8) throw new Error("kyc_ids_invalid");
  if (accountNumber.length < 8 || !bankCode) throw new Error("payout_account_invalid");
  if (!accountName) throw new Error("account_name_required");

  let recipientCode: string | null = null;
  const secret = paystackSecret();
  if (secret) {
    assertPaystackTestKey(secret);
    recipientCode = await createPaystackRecipient({
      secret,
      name: accountName,
      accountNumber,
      bankCode,
    });
  }

  // When no Paystack key: mark verified for TEST UX (transfer still blocked later).
  // When key present but recipient create failed: pending.
  const finalStatus = secret && !recipientCode ? "pending" : "verified";

  const sql = await getSql();
  await sql.query(
    `insert into bank_kyc (
       party_kind, party_id, status,
       nin_hash, bvn_hash, nin_last4, bvn_last4,
       bank_code, account_number_hash, account_number_last4, account_name,
       paystack_recipient_code, updated_at
     ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, now())
     on conflict (party_kind, party_id) do update set
       status = excluded.status,
       nin_hash = excluded.nin_hash,
       bvn_hash = excluded.bvn_hash,
       nin_last4 = excluded.nin_last4,
       bvn_last4 = excluded.bvn_last4,
       bank_code = excluded.bank_code,
       account_number_hash = excluded.account_number_hash,
       account_number_last4 = excluded.account_number_last4,
       account_name = excluded.account_name,
       paystack_recipient_code = coalesce(excluded.paystack_recipient_code, bank_kyc.paystack_recipient_code),
       updated_at = now()`,
    [
      input.partyKind,
      input.partyId,
      finalStatus,
      hashSecret(nin),
      hashSecret(bvn),
      last4(nin),
      last4(bvn),
      bankCode,
      hashSecret(accountNumber),
      last4(accountNumber),
      accountName,
      recipientCode,
    ],
  );

  return { status: finalStatus, recipientCode };
}

async function createPaystackRecipient(input: {
  secret: string;
  name: string;
  accountNumber: string;
  bankCode: string;
}): Promise<string | null> {
  const res = await fetch("https://api.paystack.co/transferrecipient", {
    method: "POST",
    headers: {
      authorization: `Bearer ${input.secret}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      type: "nuban",
      name: input.name,
      account_number: input.accountNumber,
      bank_code: input.bankCode,
      currency: "NGN",
    }),
  });
  const data = (await res.json()) as {
    status?: boolean;
    message?: string;
    data?: { recipient_code?: string };
  };
  if (!res.ok || !data.status || !data.data?.recipient_code) {
    console.error("[bank] paystack recipient failed:", data.message || res.status);
    return null;
  }
  return data.data.recipient_code;
}

/**
 * Credit Waiter / Holder / Interlude from one impression.
 * Idempotent on (impression_id, party_kind). Rejected → no-op / ₦0.
 */
export async function creditImpression(input: {
  impressionId: string;
  holderId: string;
  viewerId?: string | null;
  outcome: "completed" | "skipped" | "rejected";
  source?: string;
  testNetKobo?: number;
}): Promise<{
  credited: boolean;
  amounts: ReturnType<typeof creditForOutcome>;
  already?: boolean;
}> {
  const amounts = creditForOutcome(
    input.outcome,
    input.testNetKobo ?? testNetKoboFromEnv(),
  );
  if (amounts.outcome === "rejected" || amounts.net === 0) {
    return { credited: false, amounts };
  }

  const sql = await getSql();
  const existing = await sql<{ id: string }>`
    select id from bank_credits where impression_id = ${input.impressionId} limit 1`;
  if (existing[0]) {
    return { credited: false, amounts, already: true };
  }

  const waiterId = (input.viewerId || "anonymous").slice(0, 128);
  const rows: Array<{
    kind: CreditPartyKind;
    partyId: string;
    amount: number;
  }> = [
    { kind: "waiter", partyId: waiterId, amount: amounts.waiter },
    { kind: "holder", partyId: input.holderId, amount: amounts.holder },
    { kind: "interlude", partyId: "interlude", amount: amounts.interlude },
  ];

  for (const row of rows) {
    const id = newId("bc");
    try {
      await sql.query(
        `insert into bank_credits (
           id, impression_id, party_kind, party_id, amount_kobo, net_kobo,
           outcome, ledger_tag, source
         ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         on conflict (impression_id, party_kind) do nothing`,
        [
          id,
          input.impressionId,
          row.kind,
          row.partyId,
          row.amount,
          amounts.net,
          amounts.outcome,
          LEDGER_TAG,
          input.source || "hold",
        ],
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (/unique|duplicate/i.test(msg)) continue;
      throw err;
    }
  }

  return { credited: true, amounts };
}

/**
 * Admin/TEST: seed a synthetic accepted credit without a real Hold.
 * Creates a placeholder impression row if needed so FK holds.
 */
export async function seedTestCredit(input: {
  holderId: string;
  viewerId?: string;
  netKobo?: number;
  outcome?: "completed" | "skipped";
}): Promise<{ impressionId: string; amounts: ReturnType<typeof creditForOutcome> }> {
  const sql = await getSql();
  const impressionId = newId("testimp");
  const outcome = input.outcome || "completed";
  const viewer = input.viewerId || "test_waiter";

  await sql.query(
    `insert into impressions (
       id, holder_id, ad_id, viewer_id, skipped, source, status, watch_ms
     ) values ($1,$2,'northline',$3,$4,'test_seed','accepted',$5)
     on conflict (id) do nothing`,
    [
      impressionId,
      input.holderId,
      viewer,
      outcome === "skipped",
      outcome === "skipped" ? 600 : 6000,
    ],
  );

  const result = await creditImpression({
    impressionId,
    holderId: input.holderId,
    viewerId: viewer,
    outcome,
    source: "test_seed",
    testNetKobo: input.netKobo,
  });
  return { impressionId, amounts: result.amounts };
}

export async function requestWithdraw(input: {
  partyKind: PartyKind;
  partyId: string;
  amountKobo: number;
}): Promise<
  | {
      ok: true;
      withdrawalId: string;
      status: string;
      paystackReference: string | null;
      message: string;
    }
  | { ok: false; reason: string; message: string }
> {
  const amount = Math.floor(Number(input.amountKobo) || 0);
  const bal = await getPartyBalance(input.partyKind, input.partyId);
  const kyc = await getKycStatus(input.partyKind, input.partyId);
  const gate = canWithdraw({
    amountKobo: amount,
    availableKobo: bal.availableKobo,
    kycVerified: kyc.status === "verified",
  });
  if (!gate.ok) {
    return {
      ok: false,
      reason: gate.reason,
      message:
        gate.reason === "kyc_required"
          ? "Complete KYC (NIN/BVN + payout bank) before first withdrawal."
          : gate.reason === "below_min"
            ? `Minimum withdrawal is ${formatNgnFromKobo(MIN_WITHDRAWAL_KOBO)}.`
            : "Insufficient available liability balance.",
    };
  }

  const sql = await getSql();
  const kycRow = await sql<{
    paystack_recipient_code: string | null;
    account_name: string | null;
  }>`
    select paystack_recipient_code, account_name from bank_kyc
    where party_kind = ${input.partyKind} and party_id = ${input.partyId}
    limit 1`;
  const recipient = kycRow[0]?.paystack_recipient_code;
  const withdrawalId = newId("bw");
  const reference = `il_${withdrawalId}`.toLowerCase().replace(/[^a-z0-9_-]/g, "");

  await sql.query(
    `insert into bank_withdrawals (
       id, party_kind, party_id, amount_kobo, status, paystack_reference
     ) values ($1,$2,$3,$4,'pending',$5)`,
    [withdrawalId, input.partyKind, input.partyId, amount, reference],
  );

  const secret = paystackSecret();
  if (!secret) {
    await sql.query(
      `update bank_withdrawals set status = 'failed', fail_reason = $1 where id = $2`,
      ["paystack_secret_missing", withdrawalId],
    );
    return {
      ok: false,
      reason: "paystack_secret_missing",
      message:
        "PAYSTACK_SECRET_KEY (TEST sk_test_…) is not set. Withdrawal recorded as failed; liability restored.",
    };
  }

  try {
    assertPaystackTestKey(secret);
  } catch {
    await sql.query(
      `update bank_withdrawals set status = 'failed', fail_reason = $1 where id = $2`,
      ["paystack_live_forbidden", withdrawalId],
    );
    return {
      ok: false,
      reason: "paystack_live_forbidden",
      message: "Live Paystack keys are not allowed for this ship. Use sk_test_.",
    };
  }

  if (!recipient) {
    await sql.query(
      `update bank_withdrawals set status = 'failed', fail_reason = $1 where id = $2`,
      ["recipient_missing", withdrawalId],
    );
    return {
      ok: false,
      reason: "recipient_missing",
      message:
        "No Paystack recipient on file. Re-submit KYC with bank details while PAYSTACK_SECRET_KEY is set.",
    };
  }

  const transfer = await initiatePaystackTransfer({
    secret,
    amountKobo: amount,
    recipient,
    reference,
    reason: `Interlude Bank ${input.partyKind} payout`,
  });

  if (!transfer.ok) {
    await sql.query(
      `update bank_withdrawals set status = 'failed', fail_reason = $1 where id = $2`,
      [transfer.reason.slice(0, 200), withdrawalId],
    );
    return {
      ok: false,
      reason: "paystack_transfer_failed",
      message: transfer.reason,
    };
  }

  const paid =
    transfer.status === "success" || transfer.status === "pending"
      ? transfer.status === "success"
      : false;

  if (paid) {
    await sql.query(
      `update bank_withdrawals set
         status = 'success',
         paystack_transfer_code = $1,
         paystack_transfer_id = $2,
         paid_at = now()
       where id = $3`,
      [transfer.transferCode, transfer.transferId, withdrawalId],
    );
    return {
      ok: true,
      withdrawalId,
      status: "success",
      paystackReference: reference,
      message: "Paystack TEST transfer succeeded. Liability released.",
    };
  }

  await sql.query(
    `update bank_withdrawals set
       paystack_transfer_code = $1,
       paystack_transfer_id = $2
     where id = $3`,
    [transfer.transferCode, transfer.transferId, withdrawalId],
  );

  if (secret.startsWith("sk_test_") && transfer.status === "pending") {
    await sql.query(
      `update bank_withdrawals set status = 'success', paid_at = now() where id = $1`,
      [withdrawalId],
    );
    return {
      ok: true,
      withdrawalId,
      status: "success",
      paystackReference: reference,
      message:
        "Paystack TEST transfer accepted (pending→success for sk_test_). Liability released.",
    };
  }

  return {
    ok: true,
    withdrawalId,
    status: "pending",
    paystackReference: reference,
    message:
      "Transfer initiated; still pending at Paystack. Liability reserved until success.",
  };
}

async function initiatePaystackTransfer(input: {
  secret: string;
  amountKobo: number;
  recipient: string;
  reference: string;
  reason: string;
}): Promise<
  | {
      ok: true;
      status: string;
      transferCode: string | null;
      transferId: string | null;
    }
  | { ok: false; reason: string }
> {
  const res = await fetch("https://api.paystack.co/transfer", {
    method: "POST",
    headers: {
      authorization: `Bearer ${input.secret}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      source: "balance",
      amount: input.amountKobo,
      recipient: input.recipient,
      reference: input.reference,
      reason: input.reason,
      currency: "NGN",
    }),
  });
  const data = (await res.json()) as {
    status?: boolean;
    message?: string;
    data?: {
      status?: string;
      transfer_code?: string;
      id?: number | string;
    };
  };
  if (!res.ok || !data.status) {
    return {
      ok: false,
      reason: data.message || `paystack_http_${res.status}`,
    };
  }
  return {
    ok: true,
    status: data.data?.status || "pending",
    transferCode: data.data?.transfer_code ?? null,
    transferId: data.data?.id != null ? String(data.data.id) : null,
  };
}

export { formatNgnFromKobo, MIN_WITHDRAWAL_KOBO, testNetKoboFromEnv };
