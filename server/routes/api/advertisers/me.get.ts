import { defineHandler } from "nitro";
import { listCampaignsWithStats, TIER_PRICE_KOBO } from "../../../../src/lib/advertisers.server";
import { corsJson } from "../../../lib/cors";
import { requireAdvertiser } from "../../../lib/advertiser-auth";

/** GET /api/advertisers/me — advertiser + campaigns + delivery stats from the impressions ledger. */
export default defineHandler(async (event) => {
  try {
    const advertiser = await requireAdvertiser(event);
    if (!advertiser) return corsJson({ ok: false, error: "unauthorized" }, { status: 401 });
    const campaigns = await listCampaignsWithStats(advertiser.id);
    return corsJson({ ok: true, advertiser, campaigns, prices: TIER_PRICE_KOBO });
  } catch (err) {
    console.error("[advertisers/me]", err);
    return corsJson({ ok: false, error: "server_error" }, { status: 500 });
  }
});
