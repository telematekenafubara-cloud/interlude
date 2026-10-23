import { defineHandler } from "nitro";
import { confirmPayment } from "../../../../src/lib/advertisers.server";
import { corsJson } from "../../../lib/cors";

/** GET /api/campaigns/verify?reference=… — verify with Paystack, activate campaign (idempotent). */
export default defineHandler(async (event) => {
  const reference = new URL(event.req.url).searchParams.get("reference") || "";
  if (!reference) return corsJson({ ok: false, error: "reference_required" }, { status: 400 });
  try {
    const r = await confirmPayment(reference);
    return corsJson({ ...r }, { status: r.status === "unknown_reference" ? 404 : 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "server_error";
    console.error("[campaigns/verify]", msg);
    return corsJson({ ok: false, error: msg.split(":")[0] }, { status: 502 });
  }
});
