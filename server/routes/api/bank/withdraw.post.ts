import { defineHandler } from "nitro";
import {
  getHolderByApiKey,
  seedHolders,
} from "../../../../src/lib/impressions.server";
import { requestWithdraw } from "../../../../src/lib/bank.server";
import { corsJson } from "../../../lib/cors";

function bearerOrKey(event: { req: { headers: Headers } }): string | null {
  const key = event.req.headers.get("x-interlude-key");
  if (key) return key;
  const auth = event.req.headers.get("authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(auth);
  return m?.[1] ?? null;
}

/** POST /api/bank/withdraw — KYC + min ₦2,000; Paystack TEST transfer. */
export default defineHandler(async (event) => {
  let body: Record<string, unknown>;
  try {
    body = (await event.req.json()) as Record<string, unknown>;
  } catch {
    return corsJson({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const party = String(body.party || "holder").toLowerCase();
  const amountKobo = Math.floor(Number(body.amountKobo) || 0);

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

    const result = await requestWithdraw({
      partyKind: party as "holder" | "waiter",
      partyId,
      amountKobo,
    });

    if (!result.ok) {
      const status =
        result.reason === "paystack_secret_missing" ? 503 : 400;
      return corsJson(
        {
          ok: false,
          error: result.reason,
          message: result.message,
        },
        { status },
      );
    }

    return corsJson({
      ok: true,
      withdrawalId: result.withdrawalId,
      status: result.status,
      paystackReference: result.paystackReference,
      message: result.message,
      paid: result.status === "success",
    });
  } catch (err) {
    console.error("[bank/withdraw]", err);
    return corsJson({ ok: false, error: "server_error" }, { status: 500 });
  }
});
