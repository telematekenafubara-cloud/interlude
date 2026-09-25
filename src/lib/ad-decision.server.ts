import {
  decideHold,
  type DecisionMode,
  type HoldDecision,
} from "@/lib/ad-decision";
import { loadCampaigns } from "@/lib/ad-campaigns";

export type DecideInput = {
  holder?: string | null;
  mode?: DecisionMode;
  /** Stub category allowlist — empty/omitted = all. */
  categories?: string[] | null;
  rand?: number;
};

/**
 * Server entry: pick the next Hold creative for a Holder context.
 * Holdey demos Starter vs Growth via seeded campaigns (or INTERLUDE_CAMPAIGNS_JSON).
 */
export function decideForHolder(input: DecideInput = {}): HoldDecision & {
  holder: string;
} {
  const holder = (input.holder || "holdey").trim() || "holdey";
  const campaigns = loadCampaigns();
  const decision = decideHold(campaigns, {
    mode: input.mode,
    categories: input.categories,
    rand: input.rand,
  });
  return { ...decision, holder };
}
