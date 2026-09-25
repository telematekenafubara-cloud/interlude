/**
 * Hold ad decision — relative share of voice (step 6 partial).
 *
 * Starter ₦20,000/mo → weight 1
 * Growth ₦100,000/mo → weight 7 + priority serve when both compete
 * Relative SOV only — not a Hold-count guarantee. Betting allowed.
 * House fallback (`northline`) when no paid creative is eligible.
 *
 * Default mode `priority`:
 *   Eligible Growth pool first (priority). Else Starter. Else house.
 * Mode `weighted`:
 *   One lottery; Growth lines weight 7, Starter weight 1 (~7× SOV).
 */

export const STARTER_WEIGHT = 1;
export const GROWTH_WEIGHT = 7;
export const HOUSE_AD_ID = "northline";

export type CampaignTier = "starter" | "growth" | "house";

export type Campaign = {
  id: string;
  adId: string;
  tier: CampaignTier;
  /** Override default tier weight when set. */
  weight?: number;
  active?: boolean;
  /** Optional category for allowlist stubs. */
  category?: string;
  advertiserName?: string;
};

export type DecisionMode = "priority" | "weighted";

export type HoldDecision = {
  ok: true;
  adId: string;
  campaignId: string | null;
  tier: CampaignTier;
  mode: DecisionMode;
  pool: CampaignTier | "mixed" | "house";
  reason: "paid" | "house_fallback";
  eligible: number;
  weights: { starter: number; growth: number };
};

export function weightForTier(tier: CampaignTier): number {
  if (tier === "growth") return GROWTH_WEIGHT;
  if (tier === "starter") return STARTER_WEIGHT;
  return 0;
}

export function eligibleCampaigns(
  campaigns: Campaign[],
  opts: { categories?: string[] | null } = {},
): Campaign[] {
  const allow = opts.categories;
  return (campaigns || []).filter((c) => {
    if (!c || c.active === false) return false;
    if (c.tier === "house") return false;
    if (!c.adId || !c.id) return false;
    if (allow && allow.length > 0) {
      if (c.category && !allow.includes(c.category)) return false;
    }
    return true;
  });
}

export function weightedPick(
  items: { id: string; weight: number }[],
  rand = Math.random(),
): string | null {
  const live = (items || []).filter((i) => i && i.weight > 0);
  if (!live.length) return null;
  const total = live.reduce((s, i) => s + i.weight, 0);
  if (total <= 0) return null;
  let r = Math.min(Math.max(rand, 0), 0.999999999) * total;
  for (const item of live) {
    r -= item.weight;
    if (r < 0) return item.id;
  }
  return live[live.length - 1]?.id ?? null;
}

function pickFromPool(
  pool: Campaign[],
  tier: CampaignTier,
  mode: DecisionMode,
  rand: number,
): Omit<HoldDecision, "ok" | "reason" | "eligible" | "weights"> | null {
  if (!pool.length) return null;
  const items = pool.map((c) => ({
    id: c.id,
    weight: c.weight ?? weightForTier(c.tier),
  }));
  const campaignId = weightedPick(items, rand);
  const won = pool.find((c) => c.id === campaignId) ?? pool[0];
  return {
    campaignId: won.id,
    adId: won.adId,
    tier,
    mode,
    pool: mode === "weighted" ? "mixed" : tier,
  };
}

export function decideHold(
  campaigns: Campaign[],
  opts: {
    mode?: DecisionMode;
    categories?: string[] | null;
    rand?: number;
    houseAdId?: string;
  } = {},
): HoldDecision {
  const mode: DecisionMode = opts.mode === "weighted" ? "weighted" : "priority";
  const eligible = eligibleCampaigns(campaigns, {
    categories: opts.categories,
  });
  const rand = opts.rand ?? Math.random();
  const houseAdId = opts.houseAdId || HOUSE_AD_ID;
  const weights = { starter: STARTER_WEIGHT, growth: GROWTH_WEIGHT };

  let picked: ReturnType<typeof pickFromPool> = null;

  if (mode === "priority") {
    const growth = eligible.filter((c) => c.tier === "growth");
    const starter = eligible.filter((c) => c.tier === "starter");
    if (growth.length) {
      picked = pickFromPool(growth, "growth", mode, rand);
    } else if (starter.length) {
      picked = pickFromPool(starter, "starter", mode, rand);
    }
  } else {
    picked = pickFromPool(
      eligible,
      eligible[0]?.tier ?? "house",
      mode,
      rand,
    );
    if (picked) {
      const won = eligible.find((c) => c.id === picked!.campaignId);
      if (won) picked = { ...picked, tier: won.tier };
    }
  }

  if (!picked) {
    return {
      ok: true,
      adId: houseAdId,
      campaignId: null,
      tier: "house",
      mode,
      pool: "house",
      reason: "house_fallback",
      eligible: 0,
      weights,
    };
  }

  return {
    ok: true,
    adId: picked.adId,
    campaignId: picked.campaignId,
    tier: picked.tier,
    mode: picked.mode,
    pool: picked.pool,
    reason: "paid",
    eligible: eligible.length,
    weights,
  };
}

export function expectedGrowthShare(nGrowth: number, nStarter: number): number {
  const g = nGrowth * GROWTH_WEIGHT;
  const s = nStarter * STARTER_WEIGHT;
  const t = g + s;
  return t === 0 ? 0 : g / t;
}
