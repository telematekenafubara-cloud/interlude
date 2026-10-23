import { defineHandler } from "nitro";
import { startCheckout } from "../../../../src/lib/advertisers.server";
import { corsJson } from "../../../lib/cors";
import { requireAdvertiser } from "../../../lib/advertiser-auth";

/** POST /api/campaigns/checkout { campaignId } → Paystack TEST authorization_url + reference. */
export default defineHandler(async (event) => {
  const advertiser = await requireAdvertiser(event).catch(() => null);
  if (!advertiser) return corsJson({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { campaignId?: string };
  try {
    body = (await event.req.json()) as typeof body;
  } catch {
    return corsJson({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const url = new URL(event.req.url);
  const callbackUrl = `${url.protocol}//${url.host}/studio?verify=1`;
  try {
    const r = await startCheckout({ advertiser, campaignId: String(body.campaignId || ""), callbackUrl });
    return corsJson({ ok: true, ...r });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "server_error";
    console.error("[campaigns/checkout]", msg);
    const status = msg === "campaign_not_found" ? 404 : msg === "paystack_secret_missing" ? 503 : msg === "paystack_live_forbidden" ? 403 : 502;
    return corsJson({ ok: false, error: msg.split(":")[0], detail: msg.includes(":") ? msg.slice(msg.indexOf(":") + 1) : undefined }, { status });
  }
});
