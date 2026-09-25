import { useEffect } from "react";
import { useBankStore } from "@/lib/bank-store";
import {
  newImpressionId,
  postImpressionBeacon,
} from "@/lib/impression-beacon";

export function BankListener() {
  useEffect(() => {
    const onImp = (e: Event) => {
      const d = (e as CustomEvent).detail as {
        id?: string;
        ad?: string;
        skipped?: boolean;
        source?: string;
        viewer?: string | null;
        holder?: string | null;
        watchMs?: number | null;
        /** When true, hold.js (or another sender) already POSTed the beacon. */
        beaconed?: boolean;
      };
      if (!d?.ad) return;
      const id = d.id || newImpressionId();
      useBankStore.getState().credit({
        adId: d.ad,
        skipped: Boolean(d.skipped),
        source: d.source || "hold.js",
      });
      // Backup server count when the event did not already beacon (or share id).
      // Same id as hold.js → server dedupes. Holdey React path also beacons via hold-store.
      if (!d.beaconed) {
        postImpressionBeacon({
          id,
          holder: d.holder || "holdey",
          ad: d.ad,
          skipped: Boolean(d.skipped),
          viewer: d.viewer ?? useBankStore.getState().viewerId,
          source: d.source || "hold.js",
          watchMs: d.watchMs ?? null,
        });
      }
    };
    window.addEventListener("interlude:impression", onImp);
    return () => window.removeEventListener("interlude:impression", onImp);
  }, []);
  return null;
}
