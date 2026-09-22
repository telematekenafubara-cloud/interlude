/** Sample OpenRTB 2.6 video bid for a Hold. Not sent anywhere — protocol shape only. */

export const HOLD_BID_REQUEST = {
  id: "hold-req-demo",
  at: 1,
  tmax: 400,
  cur: ["USD"],
  imp: [
    {
      id: "1",
      bidfloor: 0.012,
      bidfloorcur: "USD",
      video: {
        mimes: ["video/mp4", "video/webm"],
        minduration: 6,
        maxduration: 15,
        protocols: [2, 3, 7, 8],
        w: 1280,
        h: 720,
        startdelay: 0,
        plcmt: 1,
        skip: 1,
        skipmin: 5,
        skipafter: 5,
        playbackmethod: [1],
        pos: 1,
        linearity: 1,
      },
    },
  ],
  site: {
    domain: "publisher.example",
    page: "/chat",
    publisher: { id: "aether" },
  },
  user: { id: "il_viewer" },
  ext: {
    interlude: {
      format: "hold",
      waitMs: 8000,
      labeled: true,
    },
  },
} as const;

export const HOLD_BID_JSON = JSON.stringify(HOLD_BID_REQUEST, null, 2);

export type MockBidder = {
  id: string;
  name: string;
  seat: string;
  adId: string;
  cpm: number;
  note: string;
};

export const MOCK_BIDDERS: MockBidder[] = [
  {
    id: "solace",
    name: "Maison Solace",
    seat: "direct-io",
    adId: "solace",
    cpm: 28,
    note: "Direct insertion order. Pays for completed Holds.",
  },
  {
    id: "northline",
    name: "Northline",
    seat: "house",
    adId: "northline",
    cpm: 22,
    note: "House catalog. Floor for unsold wait.",
  },
  {
    id: "harbor",
    name: "Harbor & Pine",
    seat: "open-rtb",
    adId: "harbor",
    cpm: 16,
    note: "Open auction. Skippable video creative.",
  },
];
