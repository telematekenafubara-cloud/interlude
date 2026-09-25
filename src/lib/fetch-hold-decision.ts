/**
 * Client helper: ask the server which creative to play on this Hold.
 * Falls back to null so callers can use randomAdId().
 */
export type HoldDecisionResponse = {
  ok: boolean;
  adId?: string;
  tier?: string;
  mode?: string;
  reason?: string;
  campaignId?: string | null;
};

export async function fetchHoldDecision(opts?: {
  holder?: string;
  mode?: "priority" | "weighted";
}): Promise<HoldDecisionResponse | null> {
  if (typeof window === "undefined") return null;
  try {
    const holder = opts?.holder || "holdey";
    const mode = opts?.mode || "priority";
    const url = `/api/decision?holder=${encodeURIComponent(holder)}&mode=${mode}`;
    const res = await fetch(url, { method: "GET", credentials: "omit" });
    if (!res.ok) return null;
    const json = (await res.json()) as HoldDecisionResponse;
    if (!json?.ok || !json.adId) return null;
    return json;
  } catch {
    return null;
  }
}
