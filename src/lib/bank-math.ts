/**
 * Re-export Bank constants for TS surfaces. Source of truth for tests is
 * scripts/bank-pure.mjs — keep numbers in lockstep with Accountant.
 */
export const WAITER_SHARE = 0.4;
export const HOLDER_SHARE = 0.35;
export const INTERLUDE_SHARE = 0.25;
export const VAT_RATE = 0.075;
export const PAYSTACK_FEE_RATE = 0.015;
export const MIN_WITHDRAWAL_KOBO = 200_000;
export const DEFAULT_TEST_NET_KOBO = 10_000;
export const LEDGER_TAG = "interlude_bank";

export function netAfterVatAndFees(grossKobo: number): number {
  const g = Math.max(0, Math.floor(Number(grossKobo) || 0));
  const afterVat = Math.floor(g * (1 - VAT_RATE));
  return Math.floor(afterVat * (1 - PAYSTACK_FEE_RATE));
}

export function splitNetKobo(netKobo: number): {
  waiter: number;
  holder: number;
  interlude: number;
  net: number;
} {
  const net = Math.max(0, Math.floor(Number(netKobo) || 0));
  const waiter = Math.floor(net * WAITER_SHARE);
  const holder = Math.floor(net * HOLDER_SHARE);
  const interlude = net - waiter - holder;
  return { waiter, holder, interlude, net };
}

export function creditForOutcome(
  outcome: string,
  testNetKobo = DEFAULT_TEST_NET_KOBO,
): {
  outcome: "completed" | "skipped" | "rejected";
  net: number;
  waiter: number;
  holder: number;
  interlude: number;
} {
  const o = String(outcome || "");
  if (o !== "completed" && o !== "skipped") {
    return { outcome: "rejected", net: 0, waiter: 0, holder: 0, interlude: 0 };
  }
  const parts = splitNetKobo(testNetKobo);
  return { outcome: o, ...parts };
}

export function availableBalanceKobo(
  credited: number,
  pendingWithdrawn: number,
  paidWithdrawn: number,
): number {
  const c = Math.max(0, Math.floor(Number(credited) || 0));
  const p = Math.max(0, Math.floor(Number(pendingWithdrawn) || 0));
  const paid = Math.max(0, Math.floor(Number(paidWithdrawn) || 0));
  return Math.max(0, c - p - paid);
}

export function canWithdraw(input: {
  amountKobo: number;
  availableKobo: number;
  kycVerified: boolean;
  minKobo?: number;
}): { ok: true } | { ok: false; reason: string } {
  const amount = Math.floor(Number(input.amountKobo) || 0);
  const available = Math.floor(Number(input.availableKobo) || 0);
  const kycOk = Boolean(input.kycVerified);
  const min = Math.floor(Number(input.minKobo) || MIN_WITHDRAWAL_KOBO);
  if (!kycOk) return { ok: false, reason: "kyc_required" };
  if (amount < min) return { ok: false, reason: "below_min" };
  if (amount > available) return { ok: false, reason: "insufficient" };
  return { ok: true };
}

export function formatNgnFromKobo(kobo: number): string {
  const n = Math.floor(Number(kobo) || 0) / 100;
  return `₦${n.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function resolveTestNetKobo(envValue?: string | null): number {
  if (envValue == null || envValue === "") return DEFAULT_TEST_NET_KOBO;
  const n = Math.floor(Number(envValue));
  if (!Number.isFinite(n) || n < 0) return DEFAULT_TEST_NET_KOBO;
  return n;
}

export function testNetKoboFromEnv(): number {
  return resolveTestNetKobo(process.env.INTERLUDE_TEST_NET_KOBO);
}
