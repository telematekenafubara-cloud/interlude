import { useEffect, useRef, useState } from "react";
import { HoldPlayer } from "@/components/hold-player";
import {
  SKIP_AFTER_MS,
  SPOT_MS,
  adById,
  nextAdId,
  type FormatId,
  type PlayableOption,
} from "@/lib/ads";
import { useBankStore } from "@/lib/bank-store";
import { unlockHoldAudio } from "@/lib/hold-audio";
import { usePlacedStore } from "@/lib/placed-store";
import { cn } from "@/lib/utils";

export function HoldStage({
  format,
  adId,
  source = "hold",
  autoPlay = false,
}: {
  format: FormatId;
  adId: string;
  source?: string;
  autoPlay?: boolean;
}) {
  const extra = usePlacedStore((s) => s.holds);
  const [currentId, setCurrentId] = useState(adId);
  const currentRef = useRef(currentId);
  const ad = extra.find((a) => a.id === currentId) ?? adById(currentId);
  const [playing, setPlaying] = useState(autoPlay);
  const [exiting, setExiting] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const gen = useRef(0);
  currentRef.current = currentId;

  useEffect(() => {
    gen.current += 1;
    setCurrentId(adId);
    setExiting(false);
    setElapsedMs(0);
    setPickedId(null);
    setPlaying(autoPlay);
    if (autoPlay) {
      unlockHoldAudio();
      setTick((n) => n + 1);
    }
  }, [adId, format, autoPlay]);

  useEffect(() => {
    if (!playing) return;
    const mine = gen.current;
    const t0 = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      if (mine !== gen.current) return;
      const e = now - t0;
      setElapsedMs(e);
      if (e >= SPOT_MS) {
        useBankStore.getState().credit({
          adId: currentRef.current,
          skipped: false,
          source,
        });
        const id = currentRef.current;
        const next =
          extra.find((a) => a.id === id)
            ? extra[(extra.findIndex((a) => a.id === id) + 1) % extra.length]?.id ??
              nextAdId(id)
            : nextAdId(id);
        setCurrentId(next);
        setPickedId(null);
        setElapsedMs(0);
        setTick((n) => n + 1);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, tick, source, extra]);

  function start() {
    gen.current += 1;
    setCurrentId(adId);
    setPickedId(null);
    setElapsedMs(0);
    setExiting(false);
    setTick((n) => n + 1);
    setPlaying(true);
  }

  function skip() {
    gen.current += 1;
    useBankStore.getState().credit({
      adId: currentRef.current,
      skipped: true,
      source,
    });
    setExiting(true);
    window.setTimeout(() => {
      setPlaying(false);
      setExiting(false);
      setElapsedMs(0);
    }, 280);
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-card p-3 shadow-[0_0_0_1px_rgba(244,241,234,0.08)] sm:p-4">
      {playing ? (
        <HoldPlayer
          key={tick}
          format={format}
          ad={ad}
          elapsedMs={elapsedMs}
          holdMs={SPOT_MS}
          canSkip={elapsedMs >= SKIP_AFTER_MS}
          exiting={exiting}
          reduceMotion={false}
          onSkip={skip}
          onCta={() => undefined}
          onPick={(o: PlayableOption) => setPickedId(o.id)}
          pickedId={pickedId}
        />
      ) : (
        <button
          type="button"
          onClick={start}
          className="group relative block w-full overflow-hidden rounded-xl text-left"
        >
          {ad.video ? (
            <video
              src={ad.video}
              poster={ad.still}
              autoPlay
              muted
              loop
              playsInline
              className={cn(
                "h-64 w-full object-cover sm:h-80",
                format === "native" && "h-48 sm:h-56",
              )}
            />
          ) : (
            <img
              src={ad.still}
              alt=""
              className={cn(
                "h-64 w-full object-cover sm:h-80",
                format === "native" && "h-48 sm:h-56",
              )}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/10" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-serif text-2xl">{ad.name}</p>
            <p className="mt-1 text-sm text-foreground/80">Play this Hold</p>
          </div>
        </button>
      )}
    </div>
  );
}
