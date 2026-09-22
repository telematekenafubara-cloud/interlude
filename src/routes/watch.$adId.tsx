import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PauseMark } from "@/components/marks";
import { adById } from "@/lib/ads";
import { useBankStore } from "@/lib/bank-store";
import { unlockHoldAudio } from "@/lib/hold-audio";
import { FULL_CPM, usd, usdFine, VIEWER_SHARE } from "@/lib/rates";
import { FULL_HOLD_MS } from "@/lib/watch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/watch/$adId")({
  component: WatchPage,
});

type WatchState = "playing" | "paid" | "failed";

function WatchPage() {
  const { adId } = Route.useParams();
  const ad = adById(adId);
  const videoRef = useRef<HTMLVideoElement>(null);
  const credited = useRef(false);
  const failed = useRef(false);
  const started = useRef(false);
  const [state, setState] = useState<WatchState>("playing");
  const [elapsed, setElapsed] = useState(0);
  const [useVideo, setUseVideo] = useState(Boolean(ad.video));
  const viewerShare = (FULL_CPM / 1000) * VIEWER_SHARE;

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
  }

  function fail() {
    if (credited.current || failed.current) return;
    failed.current = true;
    setState("failed");
    videoRef.current?.pause();
  }

  useEffect(() => {
    credited.current = false;
    failed.current = false;
    started.current = false;
    setState("playing");
    setElapsed(0);
    setUseVideo(Boolean(ad.video));
  }, [ad.id, ad.video]);

  useEffect(() => {
    if (state !== "playing") return;
    unlockHoldAudio();
    const v = videoRef.current;
    let cancelled = false;
    if (v && useVideo) {
      v.controls = false;
      v.volume = 0.9;
      const start = () => {
        if (cancelled) return;
        v.muted = true;
        void v
          .play()
          .then(() => {
            if (cancelled) return;
            started.current = true;
            v.muted = false;
          })
          .catch(() => {
            if (cancelled) return;
            v.muted = true;
            void v.play().then(() => {
              started.current = true;
            });
          });
      };
      if (v.readyState >= 2) start();
      else v.addEventListener("canplay", start, { once: true });
    }
    const t0 = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      if (failed.current || credited.current) return;
      const e = now - t0;
      setElapsed(e);
      if (!useVideo && e >= FULL_HOLD_MS) {
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

  const duration = useVideo ? 0 : FULL_HOLD_MS;
  const pct = Math.min(
    100,
    useVideo && videoRef.current?.duration
      ? (elapsed / (videoRef.current.duration * 1000)) * 100
      : (elapsed / FULL_HOLD_MS) * 100,
  );

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="flex h-14 items-center justify-between border-b border-border px-4">
        <Link to="/" className="flex items-center gap-2 text-foreground" aria-label="Interlude home">
          <PauseMark className="size-3.5 text-hold" />
          <span className="font-serif text-lg">Interlude</span>
        </Link>
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-subtle">
          Full Hold · unskippable
        </p>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_rgba(244,241,234,0.08)]">
          <div className="relative aspect-video bg-background">
            {useVideo && ad.video ? (
              <video
                ref={videoRef}
                key={ad.video}
                src={ad.video}
                poster={ad.still}
                autoPlay
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                controls={false}
                onEnded={pay}
                onPause={(e) => {
                  if (credited.current || failed.current) return;
                  if (!started.current) return;
                  if (e.currentTarget.ended) return;
                  fail();
                }}
                onPlaying={() => {
                  started.current = true;
                }}
                onSeeking={(e) => {
                  const v = e.currentTarget;
                  if (state === "playing" && v.currentTime > 0.25) {
                    v.currentTime = Math.min(v.currentTime, 0.05);
                  }
                }}
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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="rounded-full bg-background/70 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-foreground">
                Ad
              </span>
              <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-foreground/70">
                {ad.category}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <p className="font-serif text-3xl tracking-tight sm:text-5xl">{ad.name}</p>
              <p className="mt-2 max-w-lg text-sm text-foreground/80 sm:text-base">
                {ad.tagline}
              </p>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground">{ad.body}</p>
            </div>
            {state === "playing" ? (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-foreground/10">
                <div
                  className="h-full bg-hold"
                  style={{ width: `${Math.min(100, pct || (elapsed / (duration || FULL_HOLD_MS)) * 100)}%` }}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 max-w-xl">
          {state === "playing" ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Stay on this page. Do not pause, leave, or close the tab. Finish
              the film and Waiter Bank is credited {usdFine(viewerShare)} extra
              ({usd(FULL_CPM, 0)} CPM).
            </p>
          ) : null}
          {state === "paid" ? (
            <div>
              <p className="font-serif text-2xl text-foreground">Paid.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                You stayed. {usdFine(viewerShare)} is in Waiter Bank for this
                full Hold.
              </p>
              <Link
                to="/bank"
                className="mt-4 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground"
              >
                Open Bank
              </Link>
            </div>
          ) : null}
          {state === "failed" ? (
            <div>
              <p className="font-serif text-2xl text-foreground">Stopped.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                You paused or left. Extra pay was not credited. The well Hold
                still paid if it ran. Watch again only if you can stay.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex h-11 items-center rounded-md bg-muted px-4 text-sm text-foreground"
              >
                Watch again
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
