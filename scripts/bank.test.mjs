import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  WAITER_SHARE,
  HOLDER_SHARE,
  INTERLUDE_SHARE,
  VAT_RATE,
  PAYSTACK_FEE_RATE,
  MIN_WITHDRAWAL_KOBO,
  DEFAULT_TEST_NET_KOBO,
  netAfterVatAndFees,
  splitNetKobo,
  creditForOutcome,
  availableBalanceKobo,
  canWithdraw,
  resolveTestNetKobo,
} from "./bank-pure.mjs";

describe("bank split lock", () => {
  it("Waiter 40 · Holder 35 · Interlude 25", () => {
    assert.equal(WAITER_SHARE, 0.4);
    assert.equal(HOLDER_SHARE, 0.35);
    assert.equal(INTERLUDE_SHARE, 0.25);
    assert.equal(WAITER_SHARE + HOLDER_SHARE + INTERLUDE_SHARE, 1);
  });

  it("splitNetKobo sums to net (remainder → Interlude)", () => {
    const s = splitNetKobo(10_000);
    assert.equal(s.waiter, 4000);
    assert.equal(s.holder, 3500);
    assert.equal(s.interlude, 2500);
    assert.equal(s.waiter + s.holder + s.interlude, 10_000);

    const odd = splitNetKobo(1001);
    assert.equal(odd.waiter + odd.holder + odd.interlude, 1001);
    assert.equal(odd.waiter, Math.floor(1001 * 0.4));
    assert.equal(odd.holder, Math.floor(1001 * 0.35));
  });

  it("netAfterVatAndFees applies 7.5% then ~1.5%", () => {
    assert.equal(VAT_RATE, 0.075);
    assert.equal(PAYSTACK_FEE_RATE, 0.015);
    // 10000 * 0.925 = 9250; * 0.985 = 9111.25 → floor 9111
    assert.equal(netAfterVatAndFees(10_000), 9111);
  });
});

describe("reject = ₦0 credit", () => {
  it("rejected credits zero", () => {
    const c = creditForOutcome("rejected", 10_000);
    assert.equal(c.waiter, 0);
    assert.equal(c.holder, 0);
    assert.equal(c.interlude, 0);
    assert.equal(c.net, 0);
  });

  it("unknown outcome treated as rejected", () => {
    const c = creditForOutcome("nope", 10_000);
    assert.equal(c.net, 0);
  });

  it("completed and skipped credit the TEST net split", () => {
    for (const o of ["completed", "skipped"]) {
      const c = creditForOutcome(o, 10_000);
      assert.equal(c.outcome, o);
      assert.equal(c.waiter, 4000);
      assert.equal(c.holder, 3500);
      assert.equal(c.interlude, 2500);
    }
  });
});

describe("idempotent credit shape", () => {
  it("same outcome + net always same amounts (caller enforces unique impression)", () => {
    const a = creditForOutcome("completed", DEFAULT_TEST_NET_KOBO);
    const b = creditForOutcome("completed", DEFAULT_TEST_NET_KOBO);
    assert.deepEqual(a, b);
  });
});

describe("min withdraw gate", () => {
  it("min is ₦2,000 (200_000 kobo)", () => {
    assert.equal(MIN_WITHDRAWAL_KOBO, 200_000);
  });

  it("blocks below min, missing KYC, insufficient", () => {
    assert.equal(
      canWithdraw({
        amountKobo: 199_999,
        availableKobo: 500_000,
        kycVerified: true,
      }).reason,
      "below_min",
    );
    assert.equal(
      canWithdraw({
        amountKobo: 200_000,
        availableKobo: 500_000,
        kycVerified: false,
      }).reason,
      "kyc_required",
    );
    assert.equal(
      canWithdraw({
        amountKobo: 300_000,
        availableKobo: 200_000,
        kycVerified: true,
      }).reason,
      "insufficient",
    );
  });

  it("allows when KYC + ≥ min + available", () => {
    assert.deepEqual(
      canWithdraw({
        amountKobo: 200_000,
        availableKobo: 200_000,
        kycVerified: true,
      }),
      { ok: true },
    );
  });

  it("availableBalance subtracts pending and paid", () => {
    assert.equal(availableBalanceKobo(500_000, 100_000, 50_000), 350_000);
    assert.equal(availableBalanceKobo(100, 200, 0), 0);
  });
});

describe("TEST net env", () => {
  it("resolveTestNetKobo defaults and parses", () => {
    assert.equal(resolveTestNetKobo(undefined), DEFAULT_TEST_NET_KOBO);
    assert.equal(resolveTestNetKobo(""), DEFAULT_TEST_NET_KOBO);
    assert.equal(resolveTestNetKobo("25000"), 25_000);
    assert.equal(resolveTestNetKobo("nope"), DEFAULT_TEST_NET_KOBO);
  });
});
