import { create } from "zustand";
import type { FormatId } from "@/lib/ads";
import { useBankStore } from "@/lib/bank-store";

type Metrics = {
  holds: number;
  completed: number;
  skipped: number;
  cta: number;
  attentionMs: number;
  playablePicks: number;
};

type HoldStore = {
  format: FormatId;
  adId: string;
  autoRotate: boolean;
  metrics: Metrics;
  setFormat: (format: FormatId) => void;
  setAdId: (id: string) => void;
  setAutoRotate: (on: boolean) => void;
  recordHold: (input: {
    completed: boolean;
    skipped: boolean;
    attentionMs: number;
    cta: boolean;
    playablePick: boolean;
    adId: string;
    source?: string;
  }) => void;
};

export const useHoldStore = create<HoldStore>((set) => ({
  format: "cinematic",
  adId: "northline",
  autoRotate: true,
  metrics: {
    holds: 0,
    completed: 0,
    skipped: 0,
    cta: 0,
    attentionMs: 0,
    playablePicks: 0,
  },
  setFormat: (format) => set({ format }),
  setAdId: (adId) => set({ adId }),
  setAutoRotate: (autoRotate) => set({ autoRotate }),
  recordHold: ({
    completed,
    skipped,
    attentionMs,
    cta,
    playablePick,
    adId,
    source = "studio",
  }) => {
    set((s) => ({
      metrics: {
        holds: s.metrics.holds + 1,
        completed: s.metrics.completed + (completed ? 1 : 0),
        skipped: s.metrics.skipped + (skipped ? 1 : 0),
        cta: s.metrics.cta + (cta ? 1 : 0),
        attentionMs: s.metrics.attentionMs + attentionMs,
        playablePicks: s.metrics.playablePicks + (playablePick ? 1 : 0),
      },
    }));
    useBankStore.getState().credit({ adId, skipped, source });
  },
}));
