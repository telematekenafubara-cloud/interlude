/** Premium Hold rate card (USD). Captive, 100% in-view, skip after 5s. */

export const COMPLETE_CPM = 22;
export const SKIP_CPM = 12;
/** Chose the Hold and sat through the unskippable Interlude page. */
export const FULL_CPM = 40;
/** Waiter who sat through the Hold. */
export const VIEWER_SHARE = 0.4;
/** Holder — owner of the chat/app where the Hold played. */
export const HOLDER_SHARE = 0.35;
/** Interlude — network, licence, Bank. */
export const INTERLUDE_SHARE = 0.25;
export const PAYOUT_FLOOR = 25;
export const HOLDER_PAYOUT_FLOOR = 100;

export type Settlement = {
  advertiser: number;
  holder: number;
  interlude: number;
  viewer: number;
};

export function settleOne(skipped: boolean): Settlement {
  const advertiser = (skipped ? SKIP_CPM : COMPLETE_CPM) / 1000;
  return split(advertiser);
}

export function settleFull(): Settlement {
  return split(FULL_CPM / 1000);
}

function split(advertiser: number): Settlement {
  return {
    advertiser,
    holder: advertiser * HOLDER_SHARE,
    interlude: advertiser * INTERLUDE_SHARE,
    viewer: advertiser * VIEWER_SHARE,
  };
}

export function settleMany(views: number, skipRate: number): Settlement & {
  completed: number;
  skipped: number;
} {
  const n = Math.max(0, Math.round(views));
  const skipped = Math.min(n, Math.max(0, Math.round(n * skipRate)));
  const completed = n - skipped;
  const c = settleOne(false);
  const s = settleOne(true);
  return {
    completed,
    skipped,
    advertiser: completed * c.advertiser + skipped * s.advertiser,
    holder: completed * c.holder + skipped * s.holder,
    interlude: completed * c.interlude + skipped * s.interlude,
    viewer: completed * c.viewer + skipped * s.viewer,
  };
}

export function pct(share: number) {
  return `${+(share * 100).toPrecision(12)}%`;
}

export function shareLabel(share: number) {
  return `${pct(share)} · ${share.toFixed(2)}`;
}

export function usd(n: number, digits = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
}

/** Actual split money — keeps fractional cents (up to 6 dp). */
export function usdExact(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(n);
}

export function usdFine(n: number) {
  return usdExact(n);
}
