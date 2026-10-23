import { defineHandler } from "nitro";
import { signupAdvertiser } from "../../../../src/lib/advertisers.server";
import { clientIp, corsJson } from "../../../lib/cors";

const buckets = new Map<string, number[]>();
function rateHit(ip: string): boolean {
  const now = Date.now();
  const prev = (buckets.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  prev.push(now);
  buckets.set(ip, prev);
  return prev.length > 10;
}

/** POST /api/advertisers/signup { name, email } → { id, apiKey } (key shown once). */
export default defineHandler(async (event) => {
  if (rateHit(clientIp(event))) return corsJson({ ok: false, error: "rate_limited" }, { status: 429 });
  let body: { name?: string; email?: string };
  try {
    body = (await event.req.json()) as typeof body;
  } catch {
    return corsJson({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  try {
    const a = await signupAdvertiser({ name: body.name || "", email: body.email || "" });
    return corsJson({
      ok: true,
      advertiser: { id: a.id, name: a.name, email: a.email, apiKeyPrefix: a.apiKeyPrefix },
      apiKey: a.apiKey,
      message: "Save your advertiser key now — Interlude will not show it again.",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "server_error";
    const known = msg === "name_required" || msg === "email_invalid";
    if (!known) console.error("[advertisers/signup]", err);
    return corsJson({ ok: false, error: known ? msg : "server_error" }, { status: known ? 400 : 500 });
  }
});
