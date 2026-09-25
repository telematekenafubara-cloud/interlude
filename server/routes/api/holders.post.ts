import { defineHandler } from "nitro";
import { createHolder, listHolders, seedHolders } from "../../../src/lib/impressions.server";
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

  let body: { id?: string; name?: string; domains?: string[]; list?: boolean };
  try {
    body = (await event.req.json()) as typeof body;
  } catch {
    return corsJson({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  try {
    await seedHolders();
    if (body.list) {
      const holders = await listHolders();
      return corsJson({ ok: true, holders });
    }
    if (!body.id || !body.name) {
      return corsJson(
        { ok: false, error: "id_and_name_required" },
        { status: 400 },
      );
    }
    const created = await createHolder({
      id: body.id,
      name: body.name,
      domains: body.domains,
    });
    return corsJson({
      ok: true,
      id: created.id,
      apiKey: created.apiKey,
      apiKeyPrefix: created.apiKeyPrefix,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "server_error";
    console.error("[holders] failed:", err);
    return corsJson({ ok: false, error: msg }, { status: 500 });
  }
});
