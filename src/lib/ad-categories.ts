/** Advertiser categories. Holders may block any of these (e.g. sportsbook, alcohol). */
export const AD_CATEGORIES = [
  "sportsbook",
  "alcohol",
  "fintech",
  "telco",
  "food",
  "fashion",
  "cloth",
  "fragrance",
  "beauty",
  "auto",
  "lodging",
  "travel",
  "audio",
  "music",
  "entertainment",
  "tech",
  "education",
  "health",
  "other",
] as const;

export type AdCategory = (typeof AD_CATEGORIES)[number];

export function normalizeCategory(raw: unknown): AdCategory | null {
  const s = String(raw ?? "").trim().toLowerCase();
  return (AD_CATEGORIES as readonly string[]).includes(s) ? (s as AdCategory) : null;
}

export function normalizeCategoryList(input: unknown): AdCategory[] {
  const arr = Array.isArray(input)
    ? input
    : typeof input === "string"
      ? input.split(",")
      : [];
  const out: AdCategory[] = [];
  for (const x of arr) {
    const c = normalizeCategory(x);
    if (c && !out.includes(c)) out.push(c);
  }
  return out;
}
