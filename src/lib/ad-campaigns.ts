import type { Campaign } from "@/lib/ad-decision";

/**
 * Seeded advertiser campaigns for Holdey demos.
 * Growth ≈ ₦100k/mo (weight 7). Starter ≈ ₦20k/mo (weight 1).
 *
 * Override with INTERLUDE_CAMPAIGNS_JSON (JSON array of Campaign).
 */
export const DEMO_CAMPAIGNS: Campaign[] = [
  {
    id: "growth-northline",
    adId: "northline",
    tier: "growth",
    advertiserName: "Northline (Growth)",
    category: "auto",
    active: true,
  },
  {
    id: "growth-solace",
    adId: "solace",
    tier: "growth",
    advertiserName: "Maison Solace (Growth)",
    category: "fragrance",
    active: true,
  },
  {
    id: "starter-harbor",
    adId: "harbor",
    tier: "starter",
    advertiserName: "Harbor & Pine (Starter)",
    category: "lodging",
    active: true,
  },
  {
    id: "starter-vale",
    adId: "vale",
    tier: "starter",
    advertiserName: "Atelier Vale (Starter)",
    category: "cloth",
    active: true,
  },
  {
    id: "starter-kite",
    adId: "kite",
    tier: "starter",
    advertiserName: "Kite Audio (Starter)",
    category: "audio",
    active: true,
  },
];

export function loadCampaigns(): Campaign[] {
  const raw = process.env.INTERLUDE_CAMPAIGNS_JSON;
  if (raw && raw.trim()) {
    try {
      const parsed = JSON.parse(raw) as Campaign[];
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch {
      /* fall through to demo seed */
    }
  }
  return DEMO_CAMPAIGNS;
}
