"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HeroVideo } from "./HeroVideo";
import { useHeroSequence, VIDEO_CROSSFADE_MS } from "./hero-sequence-context";
import { heroObjects } from "@/lib/content";

const EASE_SIGNATURE = [0.16, 1, 0.3, 1] as const;
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

  if (reducedMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static fallback, no next/image `fill` parent sizing needed here
      <img src={active.poster} alt={active.alt} className="size-full object-cover" />
    );
  }

  const next = heroObjects[(index + 1) % heroObjects.length];

  return (
    <>
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
    </>
  );
}
