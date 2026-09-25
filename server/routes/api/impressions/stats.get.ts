import { defineHandler } from "nitro";
import {
  holderCounts,
  seedHolders,
} from "../../../../src/lib/impressions.server";
import { corsJson } from "../../../lib/cors";

export default defineHandler(async (event) => {
  const url = new URL(event.req.url);
  const holder = (url.searchParams.get("holder") || "holdey").trim();
  if (!holder) {
    return corsJson({ ok: false, error: "missing_holder" }, { status: 400 });
  }
  try {
    await seedHolders();
    const counts = await holderCounts(holder);
    return corsJson({ ok: true, ...counts });
  } catch (err) {
    console.error("[impressions/stats] failed:", err);
    return corsJson({ ok: false, error: "server_error" }, { status: 500 });
  }
});
