import { HOLD_CATALOG } from "@/lib/hold-catalog";

export type FormatId = "cinematic" | "native" | "playable";

export type PlayableOption = {
  id: string;
  label: string;
  line: string;
  wash: string;
};

export type Advertiser = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  body: string;
  cta: string;
  still: string;
  video?: string;
  holdMs: number;
  playable?: {
    prompt: string;
    options: PlayableOption[];
  };
};

export const FORMATS: {
  id: FormatId;
  name: string;
  kicker: string;
  summary: string;
  detail: string;
}[] = [
  {
    id: "cinematic",
    name: "Cinematic Hold",
    kicker: "Full-bleed",
    summary: "A brand film occupies the answer well while the model thinks.",
    detail:
      "The well goes dark. A Hold plays — labeled, skip arrow after five seconds. If you leave it, the next brand starts. The playlist fills the wait, then the answer arrives.",
  },
  {
    id: "native",
    name: "Native Think",
    kicker: "In-stream",
    summary: "A sponsored card sits where “thinking…” used to live.",
    detail:
      "Quiet, rectangular, honest. Brand, line, and a thin hold bar. The chat never leaves the thread. Best when the product wants the format felt, not seen.",
  },
  {
    id: "playable",
    name: "Playable Pause",
    kicker: "Interactive",
    summary: "A tiny brand the waiting person can actually touch.",
    detail:
      "Pick a note, a finish, a season. The impression records the choice. If they do nothing, it still completes. Interaction is a gift, not a demand.",
  },
];

export const ADS: Advertiser[] = [
  {
    id: "northline",
    name: "Northline",
    category: "Grand touring",
    tagline: "Night roads, quietly.",
    body: "A long-range touring car for the hours after the map ends.",
    cta: "Reserve a night drive",
    still: "/ads/northline.jpg",
    video: "/ads/northline.mp4",
    holdMs: 6000,
    playable: {
      prompt: "Choose a finish",
      options: [
        {
          id: "obsidian",
          label: "Obsidian",
          line: "Matte charcoal. Disappears after dusk.",
          wash: "rgba(20, 18, 16, 0.35)",
        },
        {
          id: "glacier",
          label: "Glacier",
          line: "Cool silver. Reads as light on wet asphalt.",
          wash: "rgba(170, 184, 198, 0.28)",
        },
        {
          id: "copper",
          label: "Copper",
          line: "Warm metal. Catches sodium lamps.",
          wash: "rgba(160, 92, 54, 0.32)",
        },
        {
          id: "forest",
          label: "Forest",
          line: "Deep green. Made for tree tunnels.",
          wash: "rgba(28, 58, 42, 0.38)",
        },
      ],
    },
  },
  {
    id: "solace",
    name: "Maison Solace",
    category: "Fragrance",
    tagline: "A note made of smoke and evening light.",
    body: "An unlisted perfume. Worn after the room has gone quiet.",
    cta: "Discover the note",
    still: "/ads/solace.jpg",
    video: "/ads/solace.mp4",
    holdMs: 6000,
    playable: {
      prompt: "Find your note",
      options: [
        {
          id: "smoke",
          label: "Smoke",
          line: "Birch tar, cold fireplace, a coat still on.",
          wash: "rgba(48, 32, 24, 0.42)",
        },
        {
          id: "citrus",
          label: "Citrus",
          line: "Bitter orange peel over pale woods.",
          wash: "rgba(196, 140, 64, 0.28)",
        },
        {
          id: "woods",
          label: "Woods",
          line: "Vetiver, dry cedar, a closed drawer.",
          wash: "rgba(42, 56, 40, 0.4)",
        },
        {
          id: "salt",
          label: "Salt air",
          line: "Mineral, skin, a window toward water.",
          wash: "rgba(120, 150, 164, 0.3)",
        },
      ],
    },
  },
  {
    id: "harbor",
    name: "Harbor & Pine",
    category: "Lodging",
    tagline: "Wake on the lake. Leave no itinerary.",
    body: "A nine-room lodge. No spa menu. The weather is the program.",
    cta: "See the rooms",
    still: "/ads/harbor.jpg",
    video: "/ads/harbor.mp4",
    holdMs: 5500,
    playable: {
      prompt: "Pick a season",
      options: [
        {
          id: "thaw",
          label: "Thaw",
          line: "Ice leaving the dock. First coffee outdoors.",
          wash: "rgba(160, 186, 196, 0.28)",
        },
        {
          id: "high",
          label: "High summer",
          line: "Long light, pine resin, the lake still warm at ten.",
          wash: "rgba(214, 176, 96, 0.26)",
        },
        {
          id: "frost",
          label: "First frost",
          line: "Woodsmoke in the hall. The water goes black.",
          wash: "rgba(120, 84, 56, 0.34)",
        },
        {
          id: "deep",
          label: "Deep winter",
          line: "Snow to the windows. The fire is the only clock.",
          wash: "rgba(70, 86, 104, 0.38)",
        },
      ],
    },
  },
  {
    id: "vale",
    name: "Atelier Vale",
    category: "Cloth",
    tagline: "One coat. A decade.",
    body: "Camelhair, cut in a room with north light. No season.",
    cta: "View the coat",
    still: "/ads/vale.jpg",
    video: "/ads/vale.mp4",
    holdMs: 5000,
  },
  {
    id: "kite",
    name: "Kite Audio",
    category: "Listening",
    tagline: "Close the room. Keep the mix.",
    body: "Open-back headphones for people who still sit down to listen.",
    cta: "Hear the pair",
    still: "/ads/kite.jpg",
    video: "/ads/kite.mp4",
    holdMs: 5000,
  },
  ...HOLD_CATALOG,
];

export const SPOT_MS = 8000;
export const SKIP_AFTER_MS = 5000;
export const MIN_HOLD_MS = SPOT_MS;
export const MAX_HOLD_MS = 14000;

export const SUGGESTED_PROMPTS = [
  "What is Interlude",
  "What is a Hold",
  "Who is a Holder",
  "How much can I earn monthly?",
];

export function adById(id: string): Advertiser {
  return (
    ADS.find((a) => a.id === id) ??
    ADS[0] ?? {
      id: "northline",
      name: "Hold",
      category: "Brand",
      tagline: "A Hold.",
      body: "A labeled film in the wait.",
      cta: "Learn more",
      still: "/ads/northline.jpg",
      holdMs: 8000,
    }
  );
}

export function nextAdId(prevId: string | null, format?: FormatId): string {
  if (!ADS.length) return "northline";
  const pool =
    format === "playable"
      ? ADS.filter((a) => (a.playable?.options.length ?? 0) > 0)
      : ADS;
  const list = pool.length ? pool : ADS;
  if (!prevId) return list[0].id;
  const i = list.findIndex((a) => a.id === prevId);
  return list[(i + 1) % list.length].id;
}

export const FORMAT_ORDER: FormatId[] = ["cinematic", "native", "playable"];

export function nextFormat(prev: FormatId | null): FormatId {
  const i = FORMAT_ORDER.indexOf(prev ?? "playable");
  return FORMAT_ORDER[(i + 1) % FORMAT_ORDER.length] ?? "cinematic";
}

export function formatLabel(id: FormatId) {
  if (id === "native") return "Native";
  if (id === "playable") return "Playable";
  return "Cinematic";
}

export function randomAdId(): string {
  if (!ADS.length) return "northline";
  return ADS[Math.floor(Math.random() * ADS.length)]?.id ?? ADS[0].id;
}

export function formatById(id: FormatId) {
  return FORMATS.find((f) => f.id === id) ?? FORMATS[0];
}
