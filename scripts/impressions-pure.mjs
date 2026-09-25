import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const SKEW_MS = 5 * 60 * 1000;
const RATE_VIEWER = 60;
const RATE_IP = 120;
const RATE_HOLDER = 2000;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const rateBuckets = new Map();

export function hashKey(raw) {
  return createHash("sha256").update(raw, "utf8").digest("hex");
}

export function signPayload(parts, secret) {
  const msg = `${parts.id}|${parts.holder}|${parts.ad}|${parts.skipped ? "1" : "0"}|${parts.ts}`;
  return createHmac("sha256", secret).update(msg, "utf8").digest("hex");
}

export function checkTimestampSkew(ts, now = Date.now()) {
  if (!Number.isFinite(ts) || ts <= 0) return false;
  return Math.abs(now - ts) <= SKEW_MS;
}

function pruneAndCount(key, now) {
  const prev = rateBuckets.get(key) ?? [];
  const next = prev.filter((t) => now - t < RATE_WINDOW_MS);
  rateBuckets.set(key, next);
  return next.length;
}

function bumpRate(key, now) {
  const prev = rateBuckets.get(key) ?? [];
  const next = prev.filter((t) => now - t < RATE_WINDOW_MS);
  next.push(now);
  rateBuckets.set(key, next);
}

export function checkRateLimits(input) {
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

export function markRateAccepted(input) {
  const now = input.now ?? Date.now();
  if (input.viewerId) bumpRate(`v:${input.viewerId}`, now);
  if (input.ipHash) bumpRate(`ip:${input.ipHash}`, now);
  bumpRate(`h:${input.holderId}`, now);
}

export function resetRateBuckets() {
  rateBuckets.clear();
}

export function safeEqualHex(a, b) {
  try {
    const ba = Buffer.from(a, "hex");
    const bb = Buffer.from(b, "hex");
    if (ba.length !== bb.length || ba.length === 0) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}
