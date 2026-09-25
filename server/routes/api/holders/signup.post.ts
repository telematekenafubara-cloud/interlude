import { defineHandler } from "nitro";
import {
  seedHolders,
  signupHolder,
} from "../../../../src/lib/impressions.server";
import { clientIp, corsJson } from "../../../lib/cors";

/** Soft in-memory rate limit: 10 signups / IP / hour. */
const buckets = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX = 10;

function rateHit(ip: string): boolean {
  const now = Date.now();
  const prev = (buckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (prev.length >= MAX) {
    buckets.set(ip, prev);
    return true;
  }
  prev.push(now);
  buckets.set(ip, prev);
  return false;
}

/**
 * Public Holder signup — no admin token.
 * POST { id, name, domains? } → { ok, id, apiKey, apiKeyPrefix, domains, holderShare: 0.35 }
 * apiKey is shown once; store it.
 */
export default defineHandler(async (event) => {
  const ip = clientIp(event);
  if (rateHit(ip)) {
    return corsJson({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: { id?: string; name?: string; domains?: string[] };
  try {
    body = (await event.req.json()) as typeof body;
  } catch {
    return corsJson({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!body.id || !body.name) {
    return corsJson(
      { ok: false, error: "id_and_name_required" },
      { status: 400 },
    );
  }

  try {
    await seedHolders();
    const created = await signupHolder({
      id: body.id,
      name: body.name,
      domains: body.domains,
    });
    return corsJson({
      ok: true,
      id: created.id,
      apiKey: created.apiKey,
      apiKeyPrefix: created.apiKeyPrefix,
      domains: created.domains,
      holderShare: 0.35,
      waiterShare: 0.4,
      interludeShare: 0.25,
      message:
        "Save your API key now — Interlude will not show it again. Holder Bank receives 35% of each completed Hold after Interlude holds the advertiser payment.",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "server_error";
    const status =
      msg === "holder_id_taken" || msg === "holder_id_reserved"
        ? 409
        : msg === "invalid_holder_id"
          ? 400
          : 500;
    console.error("[holders/signup]", msg);
    return corsJson({ ok: false, error: msg }, { status });
  }
});
