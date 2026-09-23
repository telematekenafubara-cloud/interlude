import type { Advertiser } from "@/lib/ads";

/** Full film on the page they already have open. Unskippable. Extra Waiter pay if they stay. */
export const FULL_HOLD_MS = 30_000;

export function watchPath(adId: string) {
  return `/watch/${encodeURIComponent(adId)}`;
}

type WatchListener = (ad: Advertiser | null) => void;

let openAd: Advertiser | null = null;
const listeners = new Set<WatchListener>();

function emit() {
  listeners.forEach((listener) => listener(openAd));
}

/** Play this Hold’s film for 30 seconds on the current page. Does not open a tab. */
export function openWatch(ad: Advertiser) {
  if (typeof window === "undefined") return;
  openAd = ad;
  emit();
}

export function closeWatch() {
  openAd = null;
  emit();
}

export function getOpenWatch() {
  return openAd;
}

export function subscribeWatch(listener: WatchListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
