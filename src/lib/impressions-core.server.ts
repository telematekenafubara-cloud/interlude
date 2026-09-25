import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";

export type ImpressionStatus =
  | "accepted"
  | "rejected_duplicate"
  | "rejected_rate"
  | "rejected_bot"
  | "rejected_sig"
  | "rejected_skew"
  | "rejected_holder"
  | "rejected_viewability";

export type BeaconBody = {
  id: string;
  holder: string;
  ad: string;
  skipped: boolean;
  viewer?: string | null;
  source?: string;
  pageOrigin?: string | null;
  ts: number;
  webdriver?: boolean;
  watchMs?: number | null;
};

export type VerifyInput = {
  body: BeaconBody;
  signature?: string | null;
  apiKey?: string | null;
};

const SKEW_MS = 5 * 60 * 1000;
const RATE_VIEWER = 60;
const RATE_IP = 120;
const RATE_HOLDER = 2000;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const rateBuckets = new Map<string, number[]>();

export function hashKey(raw: string): string {
  return createHash("sha256").update(raw, "utf8").digest("hex");
}

export function hashIp(ip: string, salt?: string): string {
  const secret =
    salt ||
    process.env.INTERLUDE_IMPRESSION_SECRET ||
    "interlude-ip-hash-fallback";
  return createHmac("sha256", secret).update(ip, "utf8").digest("hex");
}

export function signPayload(
  parts: { id: string; holder: string; ad: string; skipped: boolean; ts: number },
  secret: string,
): string {
  const msg = `${parts.id}|${parts.holder}|${parts.ad}|${parts.skipped ? "1" : "0"}|${parts.ts}`;
  return createHmac("sha256", secret).update(msg, "utf8").digest("hex");
}

function safeEqualHex(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "hex");
    const bb = Buffer.from(b, "hex");
    if (ba.length !== bb.length || ba.length === 0) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

function allowUnsignedHoldey(): boolean {
  const flag = process.env.INTERLUDE_ALLOW_UNSIGNED_HOLDEY;
  if (flag === "0" || flag === "false") return false;
  if (flag === "1" || flag === "true") return true;
  return process.env.NODE_ENV !== "production";
}

export const SKIP_AFTER_MS = 5000;
export const COMPLETE_MIN_WATCH_MS = SKIP_AFTER_MS;
export const SKIP_MIN_WATCH_MS = 500;

const BOT_UA =
  /headless|phantomjs|puppeteer|selenium|playwright|slimerjs|electron\/\d|\bbot\b|crawler|spider|curl\/|wget\/|python-requests|go-http-client|httpclient|scrapy/i;

export function softBotCheck(input: {
  userAgent?: string | null;
  webdriver?: boolean;
}): string | null {
  if (input.webdriver === true) return "webdriver";
  const ua = (input.userAgent ?? "").trim();
  if (!ua) return "empty_ua";
  if (BOT_UA.test(ua)) return "bot_ua";
  return null;
}

export type ViewabilityResult =
  | { ok: true; outcome: "completed" | "skipped" }
  | { ok: false; reason: string };

export function classifyViewability(input: {
  skipped: boolean;
  watchMs?: number | null;
}): ViewabilityResult {
  if (typeof input.skipped !== "boolean") {
    return { ok: false, reason: "missing_skipped" };
  }
  const watch =
    input.watchMs == null || (input.watchMs as unknown) === ""
      ? null
      : Number(input.watchMs);

  if (input.skipped === true) {
    if (watch != null && Number.isFinite(watch) && watch < SKIP_MIN_WATCH_MS) {
      return { ok: false, reason: "skip_too_fast" };
    }
    return { ok: true, outcome: "skipped" };
  }

  if (watch == null || !Number.isFinite(watch)) {
    return { ok: false, reason: "missing_watch_ms" };
  }
  if (watch < COMPLETE_MIN_WATCH_MS) {
    return { ok: false, reason: "incomplete_watch" };
  }
  return { ok: true, outcome: "completed" };
}

export function checkImpressionId(id: string): boolean {
  if (typeof id !== "string") return false;
  const s = id.trim();
  return s.length >= 8 && s.length <= 128;
}

export function checkTimestampSkew(ts: number, now = Date.now()): boolean {
  if (!Number.isFinite(ts) || ts <= 0) return false;
  return Math.abs(now - ts) <= SKEW_MS;
}

function pruneAndCount(key: string, now: number): number {
  const prev = rateBuckets.get(key) ?? [];
  const next = prev.filter((t) => now - t < RATE_WINDOW_MS);
  rateBuckets.set(key, next);
  return next.length;
}

function bumpRate(key: string, now: number): void {
  const prev = rateBuckets.get(key) ?? [];
  const next = prev.filter((t) => now - t < RATE_WINDOW_MS);
  next.push(now);
  rateBuckets.set(key, next);
}

export function checkRateLimits(input: {
  viewerId?: string | null;
  ipHash?: string | null;
  holderId: string;
  now?: number;
}): string | null {
  const now = input.now ?? Date.now();
  if (input.viewerId) {
    const n = pruneAndCount(`v:${input.viewerId}`, now);
    if (n >= RATE_VIEWER) return `viewer_rate:${n}`;
  }
  if (input.ipHash) {
    const n = pruneAndCount(`ip:${input.ipHash}`, now);
    if (n >= RATE_IP) return `ip_rate:${n}`;
  }
  const hn = pruneAndCount(`h:${input.holderId}`, now);
  if (hn >= RATE_HOLDER) return `holder_rate:${hn}`;
  return null;
}

export function markRateAccepted(input: {
  viewerId?: string | null;
  ipHash?: string | null;
  holderId: string;
  now?: number;
}): void {
  const now = input.now ?? Date.now();
  if (input.viewerId) bumpRate(`v:${input.viewerId}`, now);
  if (input.ipHash) bumpRate(`ip:${input.ipHash}`, now);
  bumpRate(`h:${input.holderId}`, now);
}

export function resetRateBuckets(): void {
  rateBuckets.clear();
}

export type VerifyResult =
  | { ok: true; auth: "key" | "secret" | "unsigned_holdey" }
  | { ok: false; status: ImpressionStatus; reason: string };

export async function verifyBeacon(input: VerifyInput): Promise<VerifyResult> {
  const { body, signature, apiKey } = input;
  if (
    !body?.id ||
    !checkImpressionId(body.id) ||
    !body.holder ||
    !body.ad ||
    typeof body.skipped !== "boolean"
  ) {
    return { ok: false, status: "rejected_sig", reason: "missing_fields" };
  }
  if (!checkTimestampSkew(body.ts)) {
    return { ok: false, status: "rejected_skew", reason: "timestamp_skew" };
  }

  const sql = await getSql();
  const holders = await sql<{
    id: string;
    api_key_hash: string;
    status: string;
  }>`select id, api_key_hash, status from holders where id = ${body.holder} limit 1`;
  const holder = holders[0];
  if (!holder || holder.status !== "active") {
    return { ok: false, status: "rejected_holder", reason: "unknown_holder" };
  }

  if (apiKey) {
    const h = hashKey(apiKey);
    if (safeEqualHex(h, holder.api_key_hash) || h === holder.api_key_hash) {
      return { ok: true, auth: "key" };
    }
    if (signature) {
      const expected = signPayload(
        {
          id: body.id,
          holder: body.holder,
          ad: body.ad,
          skipped: body.skipped,
          ts: body.ts,
        },
        apiKey,
      );
      if (safeEqualHex(expected, signature)) return { ok: true, auth: "key" };
    }
    return { ok: false, status: "rejected_sig", reason: "bad_api_key" };
  }

  const secret = process.env.INTERLUDE_IMPRESSION_SECRET;
  if (signature && secret) {
    const expected = signPayload(
      {
        id: body.id,
        holder: body.holder,
        ad: body.ad,
        skipped: body.skipped,
        ts: body.ts,
      },
      secret,
    );
    if (safeEqualHex(expected, signature)) return { ok: true, auth: "secret" };
    return { ok: false, status: "rejected_sig", reason: "bad_signature" };
  }

  if (body.holder === "holdey" && allowUnsignedHoldey()) {
    return { ok: true, auth: "unsigned_holdey" };
  }

  return { ok: false, status: "rejected_sig", reason: "auth_required" };
}
