/** Ensure Holdey chat tags Installable Hold impressions as holder `holdey`. */
export function ensureHoldeyHolder(): void {
  try {
    const il = (window as Window & {
      Interlude?: { holder?: (id: string) => void };
    }).Interlude;
    il?.holder?.("holdey");
  } catch {
    /* ignore */
  }
}
