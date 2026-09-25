/**
 * Client-side beacon to Interlude's impression API.
 * Safe to call from BankListener / Holdey React path — fire-and-forget.
 */

export type ImpressionBeacon = {
  id: string;
  holder: string;
  ad: string;
  skipped: boolean;
  viewer?: string | null;
  source?: string;
  pageOrigin?: string;
  ts?: number;
  webdriver?: boolean;
};

export function newImpressionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** POST /api/impressions without blocking the UI. Idempotent by `id`. */
export function postImpressionBeacon(input: ImpressionBeacon): void {
  if (typeof window === "undefined") return;
  try {
    const beacon = {
      id: input.id,
      holder: input.holder || "holdey",
      ad: input.ad,
      skipped: Boolean(input.skipped),
      viewer: input.viewer ?? null,
      source: input.source || "hold.js",
      pageOrigin: input.pageOrigin || location.origin,
      ts: input.ts ?? Date.now(),
      webdriver:
        input.webdriver ??
        Boolean(
          typeof navigator !== "undefined" &&
            (navigator as Navigator & { webdriver?: boolean }).webdriver,
        ),
    };
    const body = JSON.stringify(beacon);
    const url = `${location.origin}/api/impressions`;
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      try {
        navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
        return;
      } catch {
        /* fall through to fetch */
      }
    }
    void fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      mode: "cors",
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* ignore */
  }
}
