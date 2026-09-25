import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";
import {
  checkImpressionId,
  checkRateLimits,
  checkTimestampSkew,
  classifyViewability,
  hashKey,
  markRateAccepted,
  resetRateBuckets,
  safeEqualHex,
  signPayload,
  softBotCheck,
  COMPLETE_MIN_WATCH_MS,
  SKIP_MIN_WATCH_MS,
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

  it("classifyViewability: completed requires watch past skip threshold", () => {
    assert.deepEqual(
      classifyViewability({ skipped: false, watchMs: COMPLETE_MIN_WATCH_MS }),
      { ok: true, outcome: "completed" },
    );
    assert.deepEqual(
      classifyViewability({ skipped: false, watchMs: COMPLETE_MIN_WATCH_MS - 1 }),
      { ok: false, reason: "incomplete_watch" },
    );
    assert.deepEqual(classifyViewability({ skipped: false, watchMs: null }), {
      ok: false,
      reason: "missing_watch_ms",
    });
  });

  it("classifyViewability: explicit skip is skipped; too-fast skip rejected", () => {
    assert.deepEqual(classifyViewability({ skipped: true, watchMs: 5000 }), {
      ok: true,
      outcome: "skipped",
    });
    assert.deepEqual(classifyViewability({ skipped: true }), {
      ok: true,
      outcome: "skipped",
    });
    assert.deepEqual(
      classifyViewability({ skipped: true, watchMs: SKIP_MIN_WATCH_MS - 1 }),
      { ok: false, reason: "skip_too_fast" },
    );
  });

  it("softBotCheck rejects webdriver / empty / bot UA; allows real browser", () => {
    assert.equal(softBotCheck({ webdriver: true, userAgent: "Mozilla/5.0" }), "webdriver");
    assert.equal(softBotCheck({ userAgent: "" }), "empty_ua");
    assert.equal(softBotCheck({ userAgent: "HeadlessChrome/120" }), "bot_ua");
    assert.equal(
      softBotCheck({
        webdriver: false,
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0",
      }),
      null,
    );
  });

  it("checkImpressionId enforces stable idempotency key length", () => {
    assert.equal(checkImpressionId("short"), false);
    assert.equal(checkImpressionId("12345678"), true);
    assert.equal(checkImpressionId("a".repeat(129)), false);
  });
});
