import { defineHandler } from "nitro";
import {
  getHolderByApiKey,
  seedHolders,
} from "../../../../src/lib/impressions.server";
import { upsertKyc } from "../../../../src/lib/bank.server";
import { corsJson } from "../../../lib/cors";

function bearerOrKey(event: { req: { headers: Headers } }): string | null {
  const key = event.req.headers.get("x-interlude-key");
  if (key) return key;
  const auth = event.req.headers.get("authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(auth);
  return m?.[1] ?? null;
}

/** POST /api/bank/kyc — NIN/BVN + payout bank. Never logs full secrets. */
export default defineHandler(async (event) => {
  let body: Record<string, unknown>;
  try {
    body = (await event.req.json()) as Record<string, unknown>;
  } catch {
    return corsJson({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const party = String(body.party || "holder").toLowerCase();
  const nin = String(body.nin || "");
  const bvn = String(body.bvn || "");
  const bankCode = String(body.bankCode || "");
  const accountNumber = String(body.accountNumber || "");
  const accountName = String(body.accountName || "");

  try {
    await seedHolders();
    let partyId = String(body.partyId || "").trim();
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

    const result = await upsertKyc({
      partyKind: party as "holder" | "waiter",
      partyId,
      nin,
      bvn,
      bankCode,
      accountNumber,
      accountName,
    });

    return corsJson({
      ok: true,
      party,
      partyId,
      status: result.status,
      hasRecipient: Boolean(result.recipientCode),
      note: result.recipientCode
        ? "KYC stored; Paystack TEST recipient created."
        : "KYC stored (hashes only). Paystack recipient pending until PAYSTACK_SECRET_KEY (TEST) is set.",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (
      msg === "kyc_ids_invalid" ||
      msg === "payout_account_invalid" ||
      msg === "account_name_required"
    ) {
      return corsJson({ ok: false, error: msg }, { status: 400 });
    }
    console.error("[bank/kyc]", msg);
    return corsJson({ ok: false, error: "server_error" }, { status: 500 });
  }
});
