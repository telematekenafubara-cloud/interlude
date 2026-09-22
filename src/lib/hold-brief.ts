import { ADS, type Advertiser } from "@/lib/ads";

export type HoldDraft = {
  name: string;
  category: string;
  tagline: string;
  body: string;
  cta: string;
  still: string;
};

export const HOLD_BRIEFS = [
  "A Lagos rice brand. Quiet, premium, Sunday pot. 8-second Hold.",
  "A fintech card for market women. Fast, naira, no shouting.",
  "Night-drive headphones. One road, no playlist needed.",
];

export function stills() {
  return ADS.map((a) => ({ id: a.id, src: a.still, name: a.name }));
}

export function parseHold(text: string): HoldDraft | null {
  const grab = (label: string) => {
    const re = new RegExp(`^${label}\\s*:\\s*(.+)$`, "im");
    return text.match(re)?.[1]?.trim() ?? "";
  };
  let name = grab("BRAND") || grab("NAME");
  let tagline = grab("TAGLINE");
  let cta = grab("CTA");
  let category = grab("CATEGORY") || "Brand";
  let body = grab("BODY") || tagline;
  if (!name || !tagline || !cta) {
    const lines = text
      .split("\n")
      .map((l) => l.replace(/^\s*[A-Z][A-Z]+\s*:\s*/, "").trim())
      .filter(Boolean);
    if (lines.length >= 3) {
      name = name || lines[0].slice(0, 32);
      tagline = tagline || lines[1];
      body = body || lines[2];
      cta = cta || lines[3] || "Learn more";
    }
  }
  if (!name || !tagline || !cta) return null;
  return {
    name,
    category,
    tagline,
    body: body || tagline,
    cta,
    still: ADS[0]?.still ?? "/ads/northline.jpg",
  };
}

export function draftToAd(draft: HoldDraft, id: string): Advertiser {
  return {
    id,
    name: draft.name,
    category: draft.category,
    tagline: draft.tagline,
    body: draft.body,
    cta: draft.cta,
    still: draft.still || ADS[0]?.still || "/ads/northline.jpg",
    holdMs: 8000,
  };
}
