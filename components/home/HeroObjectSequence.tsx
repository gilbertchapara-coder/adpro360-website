"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroVideo } from "./HeroVideo";
import { useHeroSequence, VIDEO_CROSSFADE_MS } from "./hero-sequence-context";
import { heroObjects } from "@/lib/content";
import { EASE_SIGNATURE } from "@/lib/motion/easing";

/** Hoisted to a stable module-level constant on purpose: HeroObjectSequence
 * re-renders on every phase change (several times per chapter, since it
 * reads phase/playbackRate from context), and a fresh object literal here
 * on each render was resetting Framer Motion's exit-animation tracking for
 * whichever video happened to be mid-exit at that moment -- the previous
 * chapter's video never actually finished unmounting, so every chapter's
 * video accumulated in the DOM instead of being replaced. Confirmed via the
 * state machine's own debug log (phase transitions fire correctly, exactly
 * once per chapter) before finding this -- the bug was here, not there. */
const CROSSFADE_TRANSITION = { duration: VIDEO_CROSSFADE_MS / 1000, ease: EASE_SIGNATURE };

const EASE_IN_OUT_CUBIC = [0.65, 0, 0.35, 1] as const;
/** Object-hierarchy intensity: the hero object is the storyteller, so it
 * gets real visibility during its own intro/reveal moment and while the
 * next chapter is arriving (transition) -- then recedes to a legibility
 * floor while there's copy on screen to read. INTENSITY_READING (0.42)
 * intentionally matches the old static --opacity-hero-ambient token this
 * replaces -- that value was already the right "legible but visible"
 * calibration, just applied uniformly before; now it's the *floor*, not
 * the constant. */
const INTENSITY_BASE = 0.75;
const INTENSITY_READING = 0.42;
const INTENSITY_FLASH = 1;
const STATE_TRANSITION = { duration: 0.6, ease: EASE_SIGNATURE };
/** The "brief increase in brightness" at the reveal beat: opacity and
 * brightness both ramp up then immediately settle to the reading floor
 * inside one ~0.85s tween (matching the reveal phase's own headline+body
 * reveal window) rather than a separate timer -- `times` places the peak
 * ~0.3s in, inside the brief's 0.3-0.5s ask. */
const REVEAL_FLASH_TRANSITION = { duration: 0.85, ease: EASE_IN_OUT_CUBIC, times: [0, 0.35, 1] };

/**
 * The hero's ambient background: the active chapter's video, crossfaded to
 * the next. Only ever mounts 2 `<video>` elements at once (outgoing +
 * incoming, during the ~900ms crossfade itself) — every other chapter is
 * neither fetched nor decoding. A muted, invisible copy of the *next*
 * chapter's video pre-mounts as soon as this one enters "transition" phase,
 * giving it a head start on buffering before it needs to be seen ("preload
 * the next hero" per the brief) without keeping all 4 warm at once.
 *
 * `prefers-reduced-motion`: HeroSequenceProvider locks phase at "reading"
 * on chapter 0 and never advances, so this only ever renders chapter 0's
 * poster as a plain static image, no video, no crossfade timer.
 */
export function HeroObjectSequence() {
  const { active, index, phase, playbackRate, reducedMotion } = useHeroSequence();

  const intensityAnimate = useMemo(() => {
    if (phase === "reveal") {
      return {
        opacity: [INTENSITY_BASE, INTENSITY_FLASH, INTENSITY_READING],
        filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"],
      };
    }
    if (phase === "reading") {
      return { opacity: INTENSITY_READING, filter: "brightness(1)" };
    }
    // intro + transition: the object's own moment, or the next one arriving
    return { opacity: INTENSITY_BASE, filter: "brightness(1)" };
  }, [phase]);
  const intensityTransition = useMemo(
    () => (phase === "reveal" ? REVEAL_FLASH_TRANSITION : STATE_TRANSITION),
    [phase]
  );

  if (reducedMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static fallback, no next/image `fill` parent sizing needed here
      <img
        src={active.poster}
        alt={active.alt}
        className="size-full object-cover"
        style={{ opacity: INTENSITY_READING }}
      />
    );
  }

  const next = heroObjects[(index + 1) % heroObjects.length];

  return (
    <motion.div
      initial={false}
      animate={intensityAnimate}
      transition={intensityTransition}
      className="absolute inset-0"
    >
      <AnimatePresence>
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={CROSSFADE_TRANSITION}
          className="absolute inset-0"
        >
          <HeroVideo
            video={active.video}
            poster={active.poster}
            alt={active.alt}
            priority={index === 0}
            playbackRate={playbackRate}
          />
        </motion.div>
      </AnimatePresence>

      {phase === "transition" && (
        <div className="absolute inset-0 opacity-0" aria-hidden="true">
          <HeroVideo video={next.video} poster={next.poster} alt="" preload="auto" loop={false} />
        </div>
      )}
    </motion.div>
  );
}
