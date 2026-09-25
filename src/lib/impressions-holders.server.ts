/**
 * Holder seed / create / list.
 */
import { randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import { hashKey } from "./impressions-core.server";

const DEV_HOLDEY_KEY = "il_holdey_dev_key_do_not_use_in_prod";
const DEV_DEMO_KEY = "il_demo_dev_key_do_not_use_in_prod";
function newApiKey(): string {
  return `il_${randomBytes(24).toString("base64url")}`;
}

async function upsertHolder(row: {
  id: string;
  name: string;
  rawKey: string;
  domains?: string[];
}): Promise<void> {
  const sql = await getSql();
  const hash = hashKey(row.rawKey);
  const prefix = row.rawKey.slice(0, 8);
  const domains = row.domains ?? [];
  await sql.query(
    `insert into holders (id, name, api_key_hash, api_key_prefix, domains, status)
     values ($1, $2, $3, $4, $5, 'active')
     on conflict (id) do update set
       name = excluded.name,
       api_key_hash = excluded.api_key_hash,
       api_key_prefix = excluded.api_key_prefix,
       domains = excluded.domains,
       status = 'active'`,
    [row.id, row.name, hash, prefix, domains],
  );
}

/**
 * Seed Holdey + demo holders. Uses INTERLUDE_SEED_HOLDER_KEY (or deterministic
 * DEV keys outside production). Production requires the env for Holdey seed.
 */
export async function seedHolders(): Promise<{
  seeded: string[];
  skipped: string[];
}> {
  const seeded: string[] = [];
  const skipped: string[] = [];
  const isProd = process.env.NODE_ENV === "production";
  const seedKey = process.env.INTERLUDE_SEED_HOLDER_KEY;

  const holdeyKey = seedKey || (!isProd ? DEV_HOLDEY_KEY : null);
  if (holdeyKey) {
    await upsertHolder({
      id: "holdey",
      name: "Holdey",
      rawKey: holdeyKey,
      domains: ["interlude-vert.vercel.app", "localhost"],
    });
    seeded.push("holdey");
  } else {
    skipped.push("holdey");
  }

  const demoKey =
    process.env.INTERLUDE_SEED_DEMO_HOLDER_KEY || (!isProd ? DEV_DEMO_KEY : null);
  if (demoKey) {
    await upsertHolder({
      id: "demo",
      name: "Demo Holder",
      rawKey: demoKey,
      domains: [],
    });
    seeded.push("demo");
  } else {
    skipped.push("demo");
  }

  return { seeded, skipped };
}

export async function createHolder(input: {
  id: string;
  name: string;
  domains?: string[];
}): Promise<{ id: string; apiKey: string; apiKeyPrefix: string }> {
  const id = input.id.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  if (!id || id.length > 64) throw new Error("invalid_holder_id");
  const apiKey = newApiKey();
  await upsertHolder({
    id,
    name: input.name.trim() || id,
    rawKey: apiKey,
    domains: input.domains ?? [],
  });
  return { id, apiKey, apiKeyPrefix: apiKey.slice(0, 8) };
}

export async function listHolders(): Promise<
  Array<{
    id: string;
    name: string;
    apiKeyPrefix: string;
    domains: string[];
    status: string;
    createdAt: string;
  }>
> {
  await seedHolders();
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    name: string;
    api_key_prefix: string;
    domains: string[];
    status: string;
    created_at: string;
  }>`select id, name, api_key_prefix, domains, status, created_at::text as created_at from holders order by created_at asc`;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    apiKeyPrefix: r.api_key_prefix,
    domains: r.domains ?? [],
    status: r.status,
    createdAt: r.created_at,
  }));
}


const RESERVED_HOLDER_IDS = new Set(["holdey", "demo", "interlude", "admin", "api"]);

export function normalizeHolderId(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

export function normalizeDomains(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const out: string[] = [];
  for (const d of input) {
    if (typeof d !== "string") continue;
    let host = d.trim().toLowerCase();
    host = host.replace(/^https?:\/\//, "").replace(/\/$/, "");
    host = host.split("/")[0] || "";
    if (!host || host.length > 253) continue;
    if (!/^[a-z0-9.-]+$/.test(host)) continue;
    if (!out.includes(host)) out.push(host);
  }
  return out.slice(0, 20);
}

export async function holderExists(id: string): Promise<boolean> {
  const sql = await getSql();
  const rows = await sql<{ id: string }>`select id from holders where id = ${id} limit 1`;
  return Boolean(rows[0]);
}

export async function getHolderByApiKey(apiKey: string): Promise<{
  id: string;
  name: string;
  apiKeyPrefix: string;
  domains: string[];
  status: string;
} | null> {
  if (!apiKey || apiKey.length < 8) return null;
  const sql = await getSql();
  const h = hashKey(apiKey);
  const rows = await sql<{
    id: string;
    name: string;
    api_key_prefix: string;
    domains: string[];
    status: string;
  }>`select id, name, api_key_prefix, domains, status from holders where api_key_hash = ${h} limit 1`;
  const r = rows[0];
  if (!r || r.status !== "active") return null;
  return {
    id: r.id,
    name: r.name,
    apiKeyPrefix: r.api_key_prefix,
    domains: r.domains ?? [],
    status: r.status,
  };
}

/** Insert-only signup. Refuses reserved / existing ids. */
export async function signupHolder(input: {
  id: string;
  name: string;
  domains?: string[];
}): Promise<{ id: string; apiKey: string; apiKeyPrefix: string; domains: string[] }> {
  const id = normalizeHolderId(input.id);
  if (!id || id.length < 2 || id.length > 64) throw new Error("invalid_holder_id");
  if (RESERVED_HOLDER_IDS.has(id)) throw new Error("holder_id_reserved");
  if (await holderExists(id)) throw new Error("holder_id_taken");
  const domains = normalizeDomains(input.domains ?? []);
  const apiKey = newApiKey();
  const sql = await getSql();
  const hash = hashKey(apiKey);
  const prefix = apiKey.slice(0, 8);
  try {
    await sql.query(
      `insert into holders (id, name, api_key_hash, api_key_prefix, domains, status)
       values ($1, $2, $3, $4, $5, 'active')`,
      [id, input.name.trim() || id, hash, prefix, domains],
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (/unique|duplicate/i.test(msg)) throw new Error("holder_id_taken");
    throw err;
  }
  return { id, apiKey, apiKeyPrefix: prefix, domains };
}

export async function updateHolderDomains(
  holderId: string,
  domains: string[],
): Promise<string[]> {
  const cleaned = normalizeDomains(domains);
  const sql = await getSql();
  await sql.query(`update holders set domains = $1 where id = $2`, [
    cleaned,
    holderId,
  ]);
  return cleaned;
}
