import { defineHandler } from "nitro";
import {
  hashIp,
  recordImpression,
  type BeaconBody,
} from "../../../src/lib/impressions.server";
import { clientIp, corsJson } from "../../lib/cors";

export default defineHandler(async (event) => {
  let body: BeaconBody;
  try {
    body = (await event.req.json()) as BeaconBody;
  } catch {
    return corsJson({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const apiKey = event.req.headers.get("x-interlude-key");
  const signature = event.req.headers.get("x-interlude-sig");
  const userAgent = event.req.headers.get("user-agent");
  const ip = clientIp(event);
  const ipHash = hashIp(ip);

  try {
    const result = await recordImpression({
      id: String(body.id ?? ""),
      holder: String(body.holder ?? ""),
      ad: String(body.ad ?? ""),
      skipped: Boolean(body.skipped),
      viewer: body.viewer ?? null,
      source: body.source || "hold.js",
      pageOrigin: body.pageOrigin ?? null,
      ts: Number(body.ts) || 0,
      webdriver: Boolean(body.webdriver),
      userAgent,
      ipHash,
      apiKey,
      signature,
    });

    const httpStatus =
      result.status === "rejected_sig" ||
      result.status === "rejected_holder" ||
      result.status === "rejected_skew"
        ? 401
        : result.status === "rejected_duplicate"
          ? 200
          : 200;

    return corsJson(
      {
        ok: result.ok,
        status: result.status,
        reason: result.reason,
        counts: result.counts,
      },
      { status: httpStatus },
    );
  } catch (err) {
    console.error("[impressions] record failed:", err);
    return corsJson({ ok: false, error: "server_error" }, { status: 500 });
  }
});
