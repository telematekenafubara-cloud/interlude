import { useEffect, useRef, useState } from "react";
import { HoldPlayer } from "@/components/hold-player";
import {
  SKIP_AFTER_MS,
  SPOT_MS,
  adById,
  formatLabel,
  nextAdId,
  nextFormat,
  randomAdId,
  type FormatId,
  type PlayableOption,
} from "@/lib/ads";
import { WAIT_MS, type WaitSurface } from "@/lib/africa-waits";
import { useBankStore } from "@/lib/bank-store";
import { unlockHoldAudio } from "@/lib/hold-audio";

export type WaitPhase = "idle" | "hold" | "done";

export function useWaitSession(surface: WaitSurface) {
  const [phase, setPhase] = useState<WaitPhase>("idle");
  const [prompt, setPrompt] = useState(surface.prompt);
  const [adId, setAdId] = useState("northline");
  const [format, setFormat] = useState<FormatId>("cinematic");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [tick, setTick] = useState(0);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [answerReady, setAnswerReady] = useState(false);

  const adIdRef = useRef(adId);
  const formatRef = useRef<FormatId>("cinematic");
  const elapsedRef = useRef(0);
  const skipRef = useRef(false);
  const workReadyRef = useRef(false);
  const sessionRef = useRef(0);
  const finishedRef = useRef(false);

  adIdRef.current = adId;
  formatRef.current = format;

  useEffect(() => {
    sessionRef.current += 1;
    finishedRef.current = false;
    skipRef.current = false;
    workReadyRef.current = false;
    elapsedRef.current = 0;
    formatRef.current = "cinematic";
    setPhase("idle");
    setPrompt(surface.prompt);
    setElapsedMs(0);
    setExiting(false);
    setAnswerReady(false);
    setPickedId(null);
    setFormat("cinematic");
    setAdId(randomAdId());
  }, [surface.id, surface.prompt]);

  useEffect(() => {
    if (phase !== "hold") return;
    workReadyRef.current = false;
    setAnswerReady(false);
    const session = sessionRef.current;
    const work = window.setTimeout(() => {
      if (session === sessionRef.current) {
        workReadyRef.current = true;
        setAnswerReady(true);
      }
    }, WAIT_MS);
    return () => window.clearTimeout(work);
  }, [phase, surface.id]);

  useEffect(() => {
    if (phase !== "hold") return;
    const session = sessionRef.current;
    const t0 = performance.now();
    elapsedRef.current = 0;
    let raf = 0;
    let closed = false;

    const loop = (now: number) => {
      if (closed || finishedRef.current || session !== sessionRef.current) return;
      const e = now - t0;
      elapsedRef.current = e;
      setElapsedMs(e);
      if (e >= SPOT_MS) {
        closed = true;
        useBankStore.getState().credit({
          adId: adIdRef.current,
          skipped: false,
          source: `waits-${surface.id}`,
        });
        // Keep playing until skip — same as Holdey.
        const nextFmt = nextFormat(formatRef.current);
        const next = nextAdId(adIdRef.current, nextFmt);
        formatRef.current = nextFmt;
        adIdRef.current = next;
        setFormat(nextFmt);
        setAdId(next);
        setPickedId(null);
        setElapsedMs(0);
        setTick((n) => n + 1);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      closed = true;
      cancelAnimationFrame(raf);
    };
  }, [phase, tick, surface.id]);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    sessionRef.current += 1;
    setExiting(true);
    window.setTimeout(() => {
      setPhase("done");
      setExiting(false);
      setElapsedMs(0);
      setAnswerReady(false);
    }, 280);
  }

  function start() {
    unlockHoldAudio();
    skipRef.current = false;
    workReadyRef.current = false;
    finishedRef.current = false;
    elapsedRef.current = 0;
    formatRef.current = "cinematic";
    sessionRef.current += 1;
    setAdId(randomAdId());
    setFormat("cinematic");
    setPickedId(null);
    setAnswerReady(false);
    setElapsedMs(0);
    setExiting(false);
    setTick((n) => n + 1);
    setPhase("hold");
  }

  function skip() {
    if (elapsedRef.current < SKIP_AFTER_MS) return;
    if (finishedRef.current) return;
    skipRef.current = true;
    useBankStore.getState().credit({
      adId: adIdRef.current,
      skipped: true,
      source: `waits-${surface.id}`,
    });
    finish();
  }

  return {
    phase,
    prompt,
    setPrompt,
    ad: adById(adId),
    format,
    elapsedMs,
    canSkip: elapsedMs >= SKIP_AFTER_MS,
    exiting,
    tick,
    pickedId,
    answerReady,
    start,
    skip,
    pick: (option: PlayableOption) => setPickedId(option.id),
    reset: () => {
      sessionRef.current += 1;
      finishedRef.current = false;
      setPhase("idle");
      setElapsedMs(0);
      setExiting(false);
      setAnswerReady(false);
      setPickedId(null);
    },
  };
}

export function HoldWell({
  session,
}: {
  session: ReturnType<typeof useWaitSession>;
}) {
  return (
    <div>
      <p className="mb-1.5 px-0.5 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle">
        {formatLabel(session.format)} Hold
      </p>
      <HoldPlayer
        key={session.tick}
        format={session.format}
        ad={session.ad}
        elapsedMs={session.elapsedMs}
        holdMs={SPOT_MS}
        canSkip={session.canSkip}
        exiting={session.exiting}
        reduceMotion={false}
        compact
        onSkip={session.skip}
        onCta={() => undefined}
        onPick={session.pick}
        pickedId={session.pickedId}
      />
    </div>
  );
}
