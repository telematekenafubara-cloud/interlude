import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { adById, nextAdId, type Advertiser } from "@/lib/ads";
import { useBankStore } from "@/lib/bank-store";
import { unlockHoldAudio } from "@/lib/hold-audio";
import { FULL_CPM, usd, usdFine, VIEWER_SHARE } from "@/lib/rates";
import {
  FULL_HOLD_MS,
  closeWatch,
  getOpenWatch,
  openWatch,
  subscribeWatch,
} from "@/lib/watch";

type WatchState = "playing" | "paid" | "failed";

export function FullWatchHost() {
  const ad = useSyncExternalStore(subscribeWatch, getOpenWatch, () => null);
  if (!ad) return null;
  return <FullFilm key={ad.id} ad={ad} />;
}

function FullFilm({ ad }: { ad: Advertiser }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const credited = useRef(false);
  const failed = useRef(false);
  const [state, setState] = useState<WatchState>("playing");
  const [elapsed, setElapsed] = useState(0);
  const [useVideo, setUseVideo] = useState(Boolean(ad.video));
  const viewerShare = (FULL_CPM / 1000) * VIEWER_SHARE;
  const remaining = Math.max(0, FULL_HOLD_MS - elapsed);

  function pay() {
    if (credited.current || failed.current) return;
    credited.current = true;
    useBankStore.getState().credit({
      adId: ad.id,
      skipped: false,
      full: true,
      source: "watch-full",
    });
    setState("paid");
    videoRef.current?.pause();
  }

  function playNext() {
    let cursor = ad.id;
    for (let i = 0; i < 80; i++) {
      const next = adById(nextAdId(cursor));
      if (next.video && next.id !== ad.id) {
        openWatch(next);
        return;
      }
      if (next.id === cursor) break;
      cursor = next.id;
    }
  }

  function fail() {
    if (credited.current || failed.current) return;
    failed.current = true;
    setState("failed");
    videoRef.current?.pause();
  }

  useEffect(() => {
    if (state !== "playing") return;
    unlockHoldAudio();
    const v = videoRef.current;
    let cancelled = false;
    if (v && useVideo) {
      v.controls = false;
      v.loop = true;
      v.volume = 0.9;
      const start = () => {
        if (cancelled) return;
        v.muted = true;
        void v
          .play()
          .then(() => {
            if (cancelled) return;
            v.muted = false;
          })
          .catch(() => {
            if (cancelled) return;
            v.muted = true;
            void v.play();
          });
      };
      if (v.readyState >= 2) start();
      else v.addEventListener("canplay", start, { once: true });
    }
    const t0 = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      if (failed.current || credited.current) return;
      document.querySelectorAll("video").forEach((node) => {
        if (node !== v && !node.paused) node.pause();
      });
      const e = now - t0;
      setElapsed(e);
      if (e >= FULL_HOLD_MS) {
        pay();
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onHide = () => {
      if (document.hidden) fail();
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ad.id, useVideo, state]);

  const pct = Math.min(100, (elapsed / FULL_HOLD_MS) * 100);

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-4">
        <p className="min-w-0 truncate font-serif text-lg">{ad.name}</p>
        <button
          type="button"
          onClick={closeWatch}
          className="inline-flex h-11 shrink-0 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground"
        >
          Ask Holdey
        </button>
      </header>

      <div className="relative min-h-0 flex-1">
        {useVideo && ad.video ? (
          <video
            ref={videoRef}
            key={ad.video}
            src={ad.video}
            poster={ad.still}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            onContextMenu={(e) => e.preventDefault()}
            onError={() => setUseVideo(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img
            src={ad.still}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover kenburns"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <p className="font-serif text-3xl tracking-tight sm:text-5xl">{ad.name}</p>
          <p className="mt-2 max-w-lg text-sm text-foreground/80 sm:text-base">{ad.tagline}</p>
          {state === "playing" ? (
            <p className="mt-3 text-sm tabular-nums text-foreground/70">
              {(remaining / 1000).toFixed(1)}s
            </p>
          ) : null}
        </div>
        {state === "playing" ? (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-foreground/10">
            <div className="h-full bg-hold" style={{ width: `${pct}%` }} />
          </div>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-border px-4 py-4 sm:px-6">
        {state === "playing" ? (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Stay on this page. The film runs 30 seconds. Finish it and Waiter
            Bank is credited {usdFine(viewerShare)} extra ({usd(FULL_CPM, 0)} CPM).
          </p>
        ) : null}
        {state === "paid" ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Play the next full ad, or ask Holdey and go back to the chat.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={playNext}
                className="inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground"
              >
                Play next full ad
              </button>
              <button
                type="button"
                onClick={closeWatch}
                className="inline-flex h-11 items-center rounded-md bg-muted px-4 text-sm text-foreground"
              >
                Ask Holdey
              </button>
            </div>
          </div>
        ) : null}
        {state === "failed" ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              You left. Extra pay was not credited.
            </p>
            <button
              type="button"
              onClick={closeWatch}
              className="inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground"
            >
              Ask Holdey
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
