/**
 * Hold ad decision — relative share of voice.
 *
 * Product (locked):
 * - Starter ₦20,000/mo → baseline weight 1
 * - Growth ₦100,000/mo → weight 7 + priority serve when both compete
 * - Relative SOV, NOT a Hold-count guarantee
 * - Betting allowed; house fallback if no paid creative
 *
 * Default serve rule ("priority"):
 *   If any eligible Growth campaign exists → lottery among Growth only
 *   (priority serve). Else lottery among Starter. Else house.
 *
 * Optional rule ("weighted"):
 *   Single lottery: each Growth line gets weight 7, each Starter weight 1.
 *   Use for demos of ≈7× relative SOV when both tiers sit in one pool.
 */

export const STARTER_WEIGHT = 1;
export const GROWTH_WEIGHT = 7;
export const HOUSE_AD_ID = "northline";

/** @typedef {"starter" | "growth" | "house"} Tier */

/**
 * @typedef {{ id: string, adId: string, tier: Tier, weight?: number, active?: boolean, category?: string }} Campaign
 */

/**
 * @param {Tier} tier
 * @returns {number}
 */
export function weightForTier(tier) {
  if (tier === "growth") return GROWTH_WEIGHT;
  if (tier === "starter") return STARTER_WEIGHT;
  return 0;
}

/**
 * @param {Campaign[]} campaigns
 * @param {{ categories?: string[] | null }} [opts]
 * @returns {Campaign[]}
 */
export function eligibleCampaigns(campaigns, opts = {}) {
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

/**
 * Weighted lottery. `rand` in [0, 1).
 * @param {{ id: string, weight: number }[]} items
 * @param {number} rand
 * @returns {string | null} id of winner
 */
export function weightedPick(items, rand = Math.random()) {
  const live = (items || []).filter((i) => i && i.weight > 0);
  if (!live.length) return null;
  const total = live.reduce((s, i) => s + i.weight, 0);
  if (total <= 0) return null;
  let r = Math.min(Math.max(rand, 0), 0.999999999) * total;
  for (const item of live) {
    r -= item.weight;
    if (r < 0) return item.id;
  }
  return live[live.length - 1].id;
}

/**
 * Priority serve: Growth pool first, else Starter, else null (caller uses house).
 * @param {Campaign[]} eligible
 * @param {number} rand
 * @returns {{ campaignId: string, adId: string, tier: Tier, mode: "priority", pool: Tier } | null}
 */
export function decidePriority(eligible, rand = Math.random()) {
  const growth = eligible.filter((c) => c.tier === "growth");
  const starter = eligible.filter((c) => c.tier === "starter");
  const pool = growth.length ? growth : starter;
  if (!pool.length) return null;
  const tier = growth.length ? "growth" : "starter";
  const items = pool.map((c) => ({
    id: c.id,
    weight: c.weight ?? weightForTier(c.tier),
  }));
  const campaignId = weightedPick(items, rand);
  const won = pool.find((c) => c.id === campaignId) || pool[0];
  return {
    campaignId: won.id,
    adId: won.adId,
    tier,
    mode: "priority",
    pool: tier,
  };
}

/**
 * Single-pool weighted lottery (Growth 7× Starter).
 * @param {Campaign[]} eligible
 * @param {number} rand
 * @returns {{ campaignId: string, adId: string, tier: Tier, mode: "weighted", pool: "mixed" } | null}
 */
export function decideWeighted(eligible, rand = Math.random()) {
  if (!eligible.length) return null;
  const items = eligible.map((c) => ({
    id: c.id,
    weight: c.weight ?? weightForTier(c.tier),
  }));
  const campaignId = weightedPick(items, rand);
  const won = eligible.find((c) => c.id === campaignId) || eligible[0];
  return {
    campaignId: won.id,
    adId: won.adId,
    tier: won.tier,
    mode: "weighted",
    pool: "mixed",
  };
}

/**
 * @param {Campaign[]} campaigns
 * @param {{ mode?: "priority" | "weighted", categories?: string[] | null, rand?: number, houseAdId?: string }} [opts]
 */
export function decideHold(campaigns, opts = {}) {
  const mode = opts.mode === "weighted" ? "weighted" : "priority";
  const eligible = eligibleCampaigns(campaigns, { categories: opts.categories });
  const rand = opts.rand ?? Math.random();
  const houseAdId = opts.houseAdId || HOUSE_AD_ID;

  const decision =
    mode === "weighted"
      ? decideWeighted(eligible, rand)
      : decidePriority(eligible, rand);

  if (!decision) {
    return {
      ok: true,
      adId: houseAdId,
      campaignId: null,
      tier: "house",
      mode,
      pool: "house",
      reason: "house_fallback",
      eligible: 0,
      weights: { starter: STARTER_WEIGHT, growth: GROWTH_WEIGHT },
    };
  }

  return {
    ok: true,
    adId: decision.adId,
    campaignId: decision.campaignId,
    tier: decision.tier,
    mode: decision.mode,
    pool: decision.pool,
    reason: "paid",
    eligible: eligible.length,
    weights: { starter: STARTER_WEIGHT, growth: GROWTH_WEIGHT },
  };
}

/** Expected Growth share in a mixed 1+1 pool under weighted mode ≈ 7/8. */
export function expectedGrowthShare(nGrowth, nStarter) {
  const g = nGrowth * GROWTH_WEIGHT;
  const s = nStarter * STARTER_WEIGHT;
  const t = g + s;
  return t === 0 ? 0 : g / t;
}
