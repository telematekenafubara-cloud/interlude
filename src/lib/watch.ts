/** Full Interlude page: unskippable film, extra Waiter pay if they stay. */
export const FULL_HOLD_MS = 30_000;

export function watchPath(adId: string) {
  return `/watch/${encodeURIComponent(adId)}`;
}

export function openWatch(adId: string) {
  if (typeof window === "undefined") return;
  window.open(watchPath(adId), "_blank", "noopener,noreferrer");
}
