import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Advertiser } from "@/lib/ads";
import { persistStorage } from "@/lib/storage";

type PlacedState = {
  holds: Advertiser[];
  place: (ad: Advertiser) => void;
};

export const usePlacedStore = create<PlacedState>()(
  persist(
    (set, get) => ({
      holds: [],
      place: (ad) =>
        set({ holds: [ad, ...get().holds.filter((h) => h.id !== ad.id)].slice(0, 12) }),
    }),
    { name: "interlude-placed", storage: persistStorage },
  ),
);
