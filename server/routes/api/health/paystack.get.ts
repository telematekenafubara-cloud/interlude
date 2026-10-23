import { defineHandler } from "nitro";
import { paystackMode } from "../../../../src/lib/paystack.server";
import { corsJson } from "../../../lib/cors";

/**
 * GET /api/health/paystack — admin (Bearer INTERLUDE_ADMIN_TOKEN) gets
 * { paystack: 'test'|'live'|'missing'|'unknown' }. Never returns the key value.
 * Without the admin token it returns only { ok, configured } (boolean).
 */
export default defineHandler((event) => {
  const mode = paystackMode();
  const token = process.env.INTERLUDE_ADMIN_TOKEN;
  const auth = event.req.headers.get("authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(auth);
  const admin = Boolean(token && m?.[1] && m[1] === token);
  if (admin) return corsJson({ ok: true, paystack: mode });
  // Public: test-mode is safe to expose (TEST-only ship); never the value.
  return corsJson({ ok: true, configured: mode !== "missing", testMode: mode === "test" });
});
