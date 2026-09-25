import { defineHandler } from "nitro";
import {
  getHolderByApiKey,
  seedHolders,
} from "../../../../src/lib/impressions.server";
import {
  getKycStatus,
  getPartyBalance,
  MIN_WITHDRAWAL_KOBO,
  formatNgnFromKobo,
  testNetKoboFromEnv,
} from "../../../../src/lib/bank.server";
import {
  HOLDER_SHARE,
  WAITER_SHARE,
  INTERLUDE_SHARE,
} from "../../../../src/lib/bank-math";
import { corsJson } from "../../../lib/cors";

function bearerOrKey(event: { req: { headers: Headers } }): string | null {
  const key = event.req.headers.get("x-interlude-key");
  if (key) return key;
  const auth = event.req.headers.get("authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(auth);
  return m?.[1] ?? null;
}

/** GET /api/bank/balance?party=holder|waiter&id=… — Holder auth via key; waiter via id query. */
export default defineHandler(async (event) => {
  const url = new URL(event.req.url);
  const party = (url.searchParams.get("party") || "holder").toLowerCase();
  let partyId = (url.searchParams.get("id") || "").trim();

  try {
    await seedHolders();
    if (party === "holder") {
      const key = bearerOrKey(event);
      if (!key) {
        return corsJson({ ok: false, error: "auth_required" }, { status: 401 });
      }
      const holder = await getHolderByApiKey(key);
      if (!holder) {
        return corsJson({ ok: false, error: "unauthorized" }, { status: 401 });
      }
      partyId = holder.id;
    } else if (party === "waiter") {
      if (!partyId) {
        return corsJson({ ok: false, error: "waiter_id_required" }, { status: 400 });
      }
    } else {
      return corsJson({ ok: false, error: "invalid_party" }, { status: 400 });
    }

    const kind = party as "holder" | "waiter";
    const [balance, kyc] = await Promise.all([
      getPartyBalance(kind, partyId),
      getKycStatus(kind, partyId),
    ]);

    return corsJson({
      ok: true,
      party: kind,
      partyId,
      ledgerTag: "interlude_bank",
      shares: {
        waiter: WAITER_SHARE,
        holder: HOLDER_SHARE,
        interlude: INTERLUDE_SHARE,
      },
      testNetKobo: testNetKoboFromEnv(),
      testNetNgn: formatNgnFromKobo(testNetKoboFromEnv()),
      minWithdrawalKobo: MIN_WITHDRAWAL_KOBO,
      minWithdrawalNgn: formatNgnFromKobo(MIN_WITHDRAWAL_KOBO),
      balance,
      kyc: {
        status: kyc.status,
        accountName: kyc.accountName,
        accountLast4: kyc.accountLast4,
        bankCode: kyc.bankCode,
        hasRecipient: kyc.hasRecipient,
      },
      canWithdraw:
        kyc.status === "verified" &&
        balance.availableKobo >= MIN_WITHDRAWAL_KOBO,
      note: "Balances are liabilities until a Paystack TEST transfer succeeds. Never shown as paid otherwise.",
    });
  } catch (err) {
    console.error("[bank/balance]", err);
    return corsJson({ ok: false, error: "server_error" }, { status: 500 });
  }
});
