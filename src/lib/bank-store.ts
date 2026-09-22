import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ADS } from "@/lib/ads";
import { persistStorage } from "@/lib/storage";
import { settleFull, settleOne } from "@/lib/rates";

export type LedgerEntry = {
  id: string;
  at: number;
  adId: string;
  skipped: boolean;
  source: string;
  advertiser: number;
  holder: number;
  interlude: number;
  viewer: number;
};

type BankState = {
  viewerId: string;
  holderId: string;
  connected: Record<string, boolean>;
  ledger: LedgerEntry[];
  totals: {
    views: number;
    completed: number;
    skipped: number;
    advertiser: number;
    holder: number;
    interlude: number;
    viewer: number;
  };
  credit: (input: {
    adId: string;
    skipped: boolean;
    source: string;
    full?: boolean;
  }) => void;
  setConnected: (id: string, on: boolean) => void;
};

function newId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function emptyTotals() {
  return {
    views: 0,
    completed: 0,
    skipped: 0,
    advertiser: 0,
    holder: 0,
    interlude: 0,
    viewer: 0,
  };
}

export const useBankStore = create<BankState>()(
  persist(
    (set, get) => ({
      viewerId: newId("il"),
      holderId: newId("ho"),
      connected: { aether: true, quill: true, holdjs: true },
      ledger: [],
      totals: emptyTotals(),
      setConnected: (id, on) =>
        set((s) => ({ connected: { ...s.connected, [id]: on } })),
      credit: ({ adId, skipped, source, full }) => {
        const pay = full ? settleFull() : settleOne(skipped);
        const entry: LedgerEntry = {
          id: Math.random().toString(36).slice(2, 10),
          at: Date.now(),
          adId: ADS.find((a) => a.id === adId)?.id ?? adId ?? "northline",
          skipped,
          source,
          ...pay,
        };
        const t = get().totals;
        set({
          ledger: [entry, ...get().ledger].slice(0, 80),
          totals: {
            views: t.views + 1,
            completed: t.completed + (skipped ? 0 : 1),
            skipped: t.skipped + (skipped ? 1 : 0),
            advertiser: t.advertiser + pay.advertiser,
            holder: (t.holder ?? 0) + pay.holder,
            interlude: t.interlude + pay.interlude,
            viewer: t.viewer + pay.viewer,
          },
        });
      },
    }),
    {
      name: "interlude-bank",
      storage: persistStorage,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<BankState>;
        return {
          ...current,
          ...p,
          holderId: p.holderId || current.holderId,
          totals: {
            ...emptyTotals(),
            ...(p.totals ?? {}),
            holder: p.totals?.holder ?? 0,
          },
        };
      },
    },
  ),
);
