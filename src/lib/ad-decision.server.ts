import {
  decideHold,
  type Campaign,
  type DecisionMode,
  type HoldDecision,
} from "@/lib/ad-decision";
import { loadAllCampaigns } from "@/lib/ad-campaigns";
import { getSql } from "@/lib/db";

export type DecideInput = {
  holder?: string | null;
  mode?: DecisionMode;
  /** Category allowlist — empty/omitted = all. */
  categories?: string[] | null;
  rand?: number;
};

export async function holderBlockedCategories(holderId: string): Promise<string[]> {
  try {
    const sql = await getSql();
    const rows = await sql<{ blocked_categories: string[] | null }>`
      select blocked_categories from holders where id = ${holderId} limit 1`;
    return rows[0]?.blocked_categories ?? [];
  } catch {
    return [];
  }
}

/**
 * Server entry: pick the next Hold creative for a Holder context.
 * Applies the Holder's blocked categories (set in /onboard).
 */
export async function decideForHolder(input: DecideInput = {}): Promise<
  HoldDecision & {
    holder: string;
    blockedCategories: string[];
    creative: Campaign["creative"] | null;
    category: string | null;
    campaigns: Campaign[];
  }
> {
  const holder = (input.holder || "holdey").trim() || "holdey";
  const [campaigns, blockedCategories] = await Promise.all([
    loadAllCampaigns(),
    holderBlockedCategories(holder),
  ]);
  const decision = decideHold(campaigns, {
    mode: input.mode,
    categories: input.categories,
    blockedCategories,
    rand: input.rand,
  });
  const won = campaigns.find((c) => c.id === decision.campaignId);
  return {
    ...decision,
    holder,
    blockedCategories,
    creative: won?.creative ?? null,
    category: won?.category ?? null,
    campaigns,
  };
}
