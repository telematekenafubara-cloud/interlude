import { useEffect } from "react";
import { useBankStore } from "@/lib/bank-store";

export function BankListener() {
  useEffect(() => {
    const onImp = (e: Event) => {
      const d = (e as CustomEvent).detail as {
        ad?: string;
        skipped?: boolean;
        source?: string;
      };
      if (!d?.ad) return;
      useBankStore.getState().credit({
        adId: d.ad,
        skipped: Boolean(d.skipped),
        source: d.source || "hold.js",
      });
    };
    window.addEventListener("interlude:impression", onImp);
    return () => window.removeEventListener("interlude:impression", onImp);
  }, []);
  return null;
}
