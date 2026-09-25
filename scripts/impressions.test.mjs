import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";
import {
  checkRateLimits,
  checkTimestampSkew,
  hashKey,
  markRateAccepted,
  resetRateBuckets,
  safeEqualHex,
  signPayload,
} from "./impressions-pure.mjs";

describe("impressions pure helpers", () => {
  beforeEach(() => {
    resetRateBuckets();
  });

  it("hashKey is stable sha256 hex", () => {
    const a = hashKey("il_test_key");
    const b = hashKey("il_test_key");
    assert.equal(a, b);
    assert.equal(a.length, 64);
    assert.notEqual(a, hashKey("other"));
  });

  it("signPayload is deterministic HMAC", () => {
    const parts = {
      id: "imp-1",
      holder: "holdey",
      ad: "northline",
      skipped: false,
      ts: 1_700_000_000_000,
    };
    const s1 = signPayload(parts, "secret");
    const s2 = signPayload(parts, "secret");
    assert.equal(s1, s2);
    assert.equal(s1.length, 64);
    assert.ok(safeEqualHex(s1, s2));
    assert.notEqual(s1, signPayload({ ...parts, skipped: true }, "secret"));
  });

  it("checkTimestampSkew rejects >5 minutes", () => {
    const now = 1_700_000_000_000;
    assert.equal(checkTimestampSkew(now, now), true);
    assert.equal(checkTimestampSkew(now - 4 * 60 * 1000, now), true);
    assert.equal(checkTimestampSkew(now - 6 * 60 * 1000, now), false);
    assert.equal(checkTimestampSkew(0, now), false);
  });

  it("rate limits viewer after 60 accepted", () => {
    const now = Date.now();
    for (let i = 0; i < 60; i += 1) {
      assert.equal(
        checkRateLimits({
          viewerId: "v1",
          ipHash: "ip1",
          holderId: "holdey",
          now,
        }),
        null,
      );
      markRateAccepted({
        viewerId: "v1",
        ipHash: "ip1",
        holderId: "holdey",
        now,
      });
    }
    const hit = checkRateLimits({
      viewerId: "v1",
      ipHash: "ip1",
      holderId: "holdey",
      now,
    });
    assert.ok(hit && hit.startsWith("viewer_rate"));
  });
});
