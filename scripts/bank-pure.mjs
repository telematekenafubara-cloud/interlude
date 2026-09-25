/**
 * Interlude Bank — pure split / gate math (TEST-safe, no I/O).
 *
 * Accountant lock (do not invent different numbers):
 *   net after VAT 7.5% + Paystack fees (~1.5%) →
 *   Waiter 40% · Holder 35% · Interlude 25%
 *
 * TEST: when real CPM/CPC is not in DB, use an explicit TEST net (kobo) constant /
 * INTERLUDE_TEST_NET_KOBO. Rejected Holds credit ₦0.
 */

export const WAITER_SHARE = 0.4;
export const HOLDER_SHARE = 0.35;
export const INTERLUDE_SHARE = 0.25;

/** VAT rate applied to arrive at net (documented TEST path). */
export const VAT_RATE = 0.075;
/** Approximate Paystack fee rate applied after VAT (documented TEST path). */
export const PAYSTACK_FEE_RATE = 0.015;

/** Min withdrawal: ₦2,000 = 200_000 kobo. */
export const MIN_WITHDRAWAL_KOBO = 200_000;

/**
 * Default TEST net per fraud-cleared accepted Hold (completed or skipped), in kobo.
 * ₦100.00 — placeholder only; not production revenue. Override via INTERLUDE_TEST_NET_KOBO.
 */
export const DEFAULT_TEST_NET_KOBO = 10_000;

/**
 * From a TEST gross (kobo), compute net after VAT 7.5% then ~1.5% fees.
 * Integer kobo via floor — liabilities never invent fractional kobo.
 */
export function netAfterVatAndFees(grossKobo) {
  const g = Math.max(0, Math.floor(Number(grossKobo) || 0));
  const afterVat = Math.floor(g * (1 - VAT_RATE));
  return Math.floor(afterVat * (1 - PAYSTACK_FEE_RATE));
}

/**
 * Split net kobo into Waiter / Holder / Interlude.
 * Remainder kobo (from flooring) goes to Interlude so sum === net.
 */
export function splitNetKobo(netKobo) {
  const net = Math.max(0, Math.floor(Number(netKobo) || 0));
  const waiter = Math.floor(net * WAITER_SHARE);
  const holder = Math.floor(net * HOLDER_SHARE);
  const interlude = net - waiter - holder;
  return { waiter, holder, interlude, net };
}

/**
 * Credit amounts for one Hold outcome.
 * rejected → all zero. completed | skipped → split of testNetKobo.
 */
export function creditForOutcome(outcome, testNetKobo = DEFAULT_TEST_NET_KOBO) {
  const o = String(outcome || "");
  if (o === "rejected") {
    return {
      outcome: "rejected",
      net: 0,
      waiter: 0,
      holder: 0,
      interlude: 0,
    };
  }
  if (o !== "completed" && o !== "skipped") {
    return {
      outcome: "rejected",
      net: 0,
      waiter: 0,
      holder: 0,
      interlude: 0,
    };
  }
  const parts = splitNetKobo(testNetKobo);
  return { outcome: o, ...parts };
}

/** Available liability = credits − pending − success withdrawals. */
export function availableBalanceKobo(credited, pendingWithdrawn, paidWithdrawn) {
  const c = Math.max(0, Math.floor(Number(credited) || 0));
  const p = Math.max(0, Math.floor(Number(pendingWithdrawn) || 0));
  const paid = Math.max(0, Math.floor(Number(paidWithdrawn) || 0));
  return Math.max(0, c - p - paid);
}

export function canWithdraw(input) {
  const amount = Math.floor(Number(input.amountKobo) || 0);
  const available = Math.floor(Number(input.availableKobo) || 0);
  const kycOk = Boolean(input.kycVerified);
  const min = Math.floor(Number(input.minKobo) || MIN_WITHDRAWAL_KOBO);
  if (!kycOk) return { ok: false, reason: "kyc_required" };
  if (amount < min) return { ok: false, reason: "below_min" };
  if (amount > available) return { ok: false, reason: "insufficient" };
  return { ok: true };
}

export function formatNgnFromKobo(kobo) {
  const n = (Math.floor(Number(kobo) || 0) / 100).toFixed(2);
  return `₦${Number(n).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Resolve TEST net kobo from env or default (server may pass process.env value). */
export function resolveTestNetKobo(envValue) {
  if (envValue == null || envValue === "") return DEFAULT_TEST_NET_KOBO;
  const n = Math.floor(Number(envValue));
  if (!Number.isFinite(n) || n < 0) return DEFAULT_TEST_NET_KOBO;
  return n;
}
