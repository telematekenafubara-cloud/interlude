import { defineHandler } from "nitro";
import { confirmPayment } from "../../../../src/lib/advertisers.server";
import { verifyPaystackSignature } from "../../../../src/lib/paystack.server";

/**
 * POST /api/paystack/webhook — Paystack events (TEST). Signature = HMAC-SHA512 of raw body.
 * charge.success → re-verify via API, then activate the campaign.
 */
export default defineHandler(async (event) => {
  const raw = await event.req.text();
  if (!verifyPaystackSignature(raw, event.req.headers.get("x-paystack-signature"))) {
    return new Response("invalid signature", { status: 401 });
  }
  try {
    const body = JSON.parse(raw) as { event?: string; data?: { reference?: string } };
    if (body.event === "charge.success" && body.data?.reference) {
      await confirmPayment(body.data.reference);
    }
  } catch (err) {
    console.error("[paystack/webhook]", err instanceof Error ? err.message : err);
  }
  return new Response("ok", { status: 200 });
});
