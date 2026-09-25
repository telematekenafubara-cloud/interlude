import { defineHandler } from "nitro";
import { listHolders, seedHolders } from "../../../src/lib/impressions.server";
import { corsJson } from "../../lib/cors";

function adminOk(event: { req: { headers: Headers } }): boolean {
  const token = process.env.INTERLUDE_ADMIN_TOKEN;
  if (!token) return false;
  const auth = event.req.headers.get("authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(auth);
  return Boolean(m && m[1] === token);
}

export default defineHandler(async (event) => {
  if (!adminOk(event)) {
    return corsJson({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    await seedHolders();
    const holders = await listHolders();
    // Never return raw keys — prefixes only
    return corsJson({ ok: true, holders });
  } catch (err) {
    console.error("[holders] list failed:", err);
    return corsJson({ ok: false, error: "server_error" }, { status: 500 });
  }
});
