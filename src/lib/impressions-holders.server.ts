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
