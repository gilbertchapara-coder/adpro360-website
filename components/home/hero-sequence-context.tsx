"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { heroObjects, type HeroObject } from "@/lib/content";

export type HeroPhase = "intro" | "reveal" | "reading" | "transition";

/** Mirrors `--breakpoint-nav` (globals.css) — the one place the video
 * sequence needs it as a JS boolean rather than a CSS variant, since it's
 * gating a timer/video-fetch decision, not a class. Listens for resize
 * across the breakpoint (e.g. rotating a tablet) rather than reading once. */
function useIsBelowNav() {
  const [isBelowNav, setIsBelowNav] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    setIsBelowNav(mq.matches);
    const handler = (event: MediaQueryListEvent) => setIsBelowNav(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isBelowNav;
}

type HeroSequenceValue = {
  active: HeroObject;
  index: number;
  phase: HeroPhase;
  /** 1 during intro/reveal, throttled during reading (video "almost
   * still"), back to 1 briefly as the next chapter's intro begins. Read by
   * HeroObjectSequence to drive `video.playbackRate` directly — Framer
   * Motion has no opinion on media playback rate, so this is plain state. */
  playbackRate: number;
  /** True for prefers-reduced-motion OR below the `nav` breakpoint (900px).
   * Below `nav` isn't about motion preference — it's the same fix already
   * applied to CustomCursor (pointer:fine gate) and ServiceOrbit
   * (visibility gate): real mobile CPU/bandwidth cost (4 autoplaying
   * videos, a scroll-linked parallax transform, a crossfade timer loop
   * that used to keep running indefinitely) with no size exception, unlike
   * the showreel card, which was deliberately made click-to-play for
   * exactly this reason. */
  staticHero: boolean;
};

const HeroSequenceContext = createContext<HeroSequenceValue | null>(null);

export function useHeroSequence() {
  const ctx = useContext(HeroSequenceContext);
  if (!ctx) throw new Error("useHeroSequence must be used within HeroSequenceProvider");
  return ctx;
}

/** Total chapter length incl. its own transition-out — mid-point of the
 * brief's "approximately 6-7 seconds." */
const CHAPTER_MS = 6500;
/** "Typography exits first. Video exits second." — text gets this long to
 * fade out before the video crossfade (below) begins. */
const TEXT_EXIT_MS = 400;
/** Matches the brief's explicit "Crossfade. 900ms." for the video-to-video
 * transition specifically (distinct from the shorter text exit above). */
export const VIDEO_CROSSFADE_MS = 900;
/** How long after the beat the body copy follows, before "reading" begins —
 * shared across every chapter's effect for one consistent rhythm. */
const BODY_DELAY_MS = 250;
const BODY_DURATION_MS = 600;
/** Reading-phase playback rate — "almost still," not paused: a hard pause
 * would freeze on a single frame and read as broken; a slow crawl reads as
 * deliberate calm without a jarring resume when reading ends. */
const READING_RATE = 0.3;

/**
 * Owns the one piece of state both the background video layer
 * (HeroObjectSequence) and the foreground text layer (HeroSequenceText)
 * need to share: which chapter is active and which phase it's in. Lifted
 * here specifically because those two layers live in different parts of
 * Hero.tsx's DOM (video behind everything, text in the actual content
 * column) — a plain hook can't share state across sibling trees, only a
 * common provider can.
 *
 * Phase timeline per chapter (total ~6.5s):
 * intro (0 -> object's own beatMs, the video's real "moment of truth" —
 * see each heroObjects entry) -> reveal (headline animates in using the
 * object's own effect, body follows BODY_DELAY_MS later) -> reading (video
 * throttled to READING_RATE, text fully visible and still) -> transition
 * (text exits first, then the video crossfades to the next chapter).
 *
 * `prefers-reduced-motion` (or below `nav`, see `staticHero` above): locks
 * on chapter 0, phase "reading" (headline + body fully visible, no
 * animation, no timers) — the same end state reduced-motion users already
 * got before this rewrite, just reached without a timer.
 */
export function HeroSequenceProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsBelowNav();
  const staticHero = Boolean(reducedMotion) || isMobile;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<HeroPhase>("intro");
  const [playbackRate, setPlaybackRate] = useState(1);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (staticHero) {
      setPhase("reading");
      setPlaybackRate(1);
      return;
    }

    const active = heroObjects[index];
    const schedule = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    setPhase("intro");
    setPlaybackRate(1);

    schedule(active.beatMs, () => setPhase("reveal"));
    schedule(active.beatMs + BODY_DELAY_MS + BODY_DURATION_MS, () => {
      setPhase("reading");
      setPlaybackRate(READING_RATE);
    });
    schedule(CHAPTER_MS - VIDEO_CROSSFADE_MS - TEXT_EXIT_MS, () => setPhase("transition"));
    schedule(CHAPTER_MS - VIDEO_CROSSFADE_MS, () => setPlaybackRate(1));
    schedule(CHAPTER_MS, () => setIndex((i) => (i + 1) % heroObjects.length));

    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [index, staticHero]);

  const value: HeroSequenceValue = {
    active: heroObjects[index],
    index,
    phase,
    playbackRate,
    staticHero,
  };

  return (
    <HeroSequenceContext.Provider value={value}>{children}</HeroSequenceContext.Provider>
  );
}
