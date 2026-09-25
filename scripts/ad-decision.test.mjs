import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  STARTER_WEIGHT,
  GROWTH_WEIGHT,
  eligibleCampaigns,
  weightedPick,
  decidePriority,
  decideWeighted,
  decideHold,
  expectedGrowthShare,
} from "./ad-decision-pure.mjs";

const CAMPAIGNS = [
  { id: "g1", adId: "northline", tier: "growth", active: true },
  { id: "g2", adId: "solace", tier: "growth", active: true },
  { id: "s1", adId: "harbor", tier: "starter", active: true },
  { id: "s2", adId: "vale", tier: "starter", active: true },
  { id: "off", adId: "kite", tier: "starter", active: false },
];

describe("ad decision weights", () => {
  it("Growth weight is 7× Starter", () => {
    assert.equal(GROWTH_WEIGHT, 7);
    assert.equal(STARTER_WEIGHT, 1);
    assert.equal(GROWTH_WEIGHT / STARTER_WEIGHT, 7);
  });

  it("eligibleCampaigns drops inactive and house", () => {
    const e = eligibleCampaigns([
      ...CAMPAIGNS,
      { id: "h", adId: "northline", tier: "house", active: true },
    ]);
    assert.equal(e.length, 4);
    assert.ok(!e.find((c) => c.id === "off"));
  });

  it("weightedPick respects weights (Growth wins more often)", () => {
    const items = [
      { id: "g", weight: GROWTH_WEIGHT },
      { id: "s", weight: STARTER_WEIGHT },
    ];
    let g = 0;
    const N = 8000;
    for (let i = 0; i < N; i++) {
      if (weightedPick(items, i / N) === "g") g += 1;
    }
    const share = g / N;
    assert.ok(share > 0.82 && share < 0.92, `share=${share}`);
  });

  it("priority mode: Growth pool wins whenever Growth is eligible", () => {
    for (let i = 0; i < 20; i++) {
      const d = decidePriority(eligibleCampaigns(CAMPAIGNS), i / 20);
      assert.equal(d.tier, "growth");
      assert.ok(["northline", "solace"].includes(d.adId));
    }
  });

  it("priority mode: falls back to Starter when no Growth", () => {
    const onlyStarter = eligibleCampaigns(
      CAMPAIGNS.filter((c) => c.tier === "starter"),
    );
    const d = decidePriority(onlyStarter, 0.5);
    assert.equal(d.tier, "starter");
  });

  it("weighted mode ≈ 7× SOV with one of each tier", () => {
    assert.equal(expectedGrowthShare(1, 1), 7 / 8);
    const mixed = eligibleCampaigns([
      { id: "g1", adId: "northline", tier: "growth" },
      { id: "s1", adId: "harbor", tier: "starter" },
    ]);
    let g = 0;
    const N = 8000;
    for (let i = 0; i < N; i++) {
      const d = decideWeighted(mixed, i / N);
      if (d.tier === "growth") g += 1;
    }
    const share = g / N;
    assert.ok(share > 0.82 && share < 0.92, `share=${share}`);
  });

  it("decideHold house fallback when nothing eligible", () => {
    const d = decideHold([], { mode: "priority" });
    assert.equal(d.tier, "house");
    assert.equal(d.adId, "northline");
    assert.equal(d.reason, "house_fallback");
  });

  it("decideHold priority default prefers Growth", () => {
    const d = decideHold(CAMPAIGNS, { mode: "priority", rand: 0.1 });
    assert.equal(d.tier, "growth");
    assert.equal(d.reason, "paid");
  });
});
