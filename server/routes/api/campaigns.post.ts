import { defineHandler } from "nitro";
import { createCampaign } from "../../../src/lib/advertisers.server";
import { corsJson } from "../../lib/cors";
import { requireAdvertiser } from "../../lib/advertiser-auth";

/** POST /api/campaigns { name, headline, body?, cta?, clickUrl?, imageUrl?, category, tier } */
export default defineHandler(async (event) => {
  const advertiser = await requireAdvertiser(event).catch(() => null);
  if (!advertiser) return corsJson({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = (await event.req.json()) as Record<string, unknown>;
  } catch {
    return corsJson({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  try {
    const campaign = await createCampaign(advertiser.id, body);
    return corsJson({ ok: true, campaign });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "server_error";
    const known = ["name_and_headline_required", "category_invalid", "tier_invalid"].includes(msg);
    if (!known) console.error("[campaigns]", err);
    return corsJson({ ok: false, error: known ? msg : "server_error" }, { status: known ? 400 : 500 });
  }
});
