import { defineHandler } from "nitro";
import { decideForHolder } from "../../../src/lib/ad-decision.server";
import type { DecisionMode } from "../../../src/lib/ad-decision";
import { corsJson } from "../../lib/cors";

/**
 * GET /api/decision?holder=holdey&mode=priority|weighted
 * Optional: categories=auto,fragrance (allowlist). The Holder's blocked
 * categories (from onboarding/settings) are always filtered out.
 */
export default defineHandler(async (event) => {
  const url = new URL(event.req.url);
  const holder = url.searchParams.get("holder") || "holdey";
  const modeParam = url.searchParams.get("mode");
  const mode: DecisionMode = modeParam === "weighted" ? "weighted" : "priority";
  const catsRaw = url.searchParams.get("categories");
  const categories = catsRaw
    ? catsRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : null;

  const { campaigns, ...decision } = await decideForHolder({ holder, mode, categories });
  const blocked = new Set(decision.blockedCategories);

  return corsJson({
    ...decision,
    rule:
      mode === "priority"
        ? "Growth pool first when any Growth is eligible (priority serve); else Starter; else house. Growth commercial weight = 7× Starter. Relative share of voice, not a Hold-count guarantee."
        : "Single lottery: Growth weight 7, Starter weight 1 (~7× relative SOV). House if none eligible.",
    campaigns: campaigns
      .filter((c) => c.active !== false)
      .map((c) => ({
        id: c.id,
        adId: c.adId,
        tier: c.tier,
        weight: c.tier === "growth" ? 7 : 1,
        advertiserName: c.advertiserName ?? c.id,
        category: c.category ?? null,
        blockedForHolder: Boolean(c.category && blocked.has(c.category)),
      })),
  });
});
