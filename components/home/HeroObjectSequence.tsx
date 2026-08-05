"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HeroVideo } from "./HeroVideo";
import { heroObjects } from "@/lib/content";

/** How long each object holds the stage before crossfading to the next —
 * "approximately 5-7 seconds" per brief, one flat value rather than
 * randomising within the range for no real gain. */
const HOLD_MS = 6000;
/** --duration-reveal (950ms) — sits inside the requested 700-1200ms
 * crossfade window and is an existing token rather than a new one. */
const CROSSFADE_S = 0.95;
/** --ease-signature — Framer Motion transitions can't reference a CSS custom
 * property directly, so this is the same literal array every other
 * Framer-driven transition in the codebase already hardcodes (e.g.
 * TestimonialCarousel's blockquote transition). */
const EASE_SIGNATURE = [0.16, 1, 0.3, 1] as const;

/**
 * The hero's ambient background: 4 textless cinematic loops cycling one at a
 * time, crossfaded, each standing in for one layer of the agency (see
 * `heroObjects` in lib/content/home.ts for the per-object brief). Only the
 * active object ever has a real `<video>` mounted — the other 3 are neither
 * fetched nor decoding, satisfying "never allow four videos to decode
 * simultaneously" without needing a manual pause/play state machine. During
 * the crossfade itself the outgoing object's video is still technically
 * playing for the ~950ms exit animation, same as any crossfade.
 *
 * `prefers-reduced-motion`: no timer, no video, no animation — renders the
 * first object's poster as a plain static image and stops there.
 */
export function HeroObjectSequence() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroObjects.length), HOLD_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    const first = heroObjects[0];
    // eslint-disable-next-line @next/next/no-img-element -- static fallback, no next/image `fill` parent sizing needed here
    return <img src={first.poster} alt={first.alt} className="size-full object-cover" />;
  }

  const active = heroObjects[index];

  return (
    <AnimatePresence>
      <motion.div
        key={active.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: CROSSFADE_S, ease: EASE_SIGNATURE }}
        className="absolute inset-0"
      >
        <HeroVideo
          video={active.video}
          poster={active.poster}
          alt={active.alt}
          priority={index === 0}
        />
      </motion.div>
    </AnimatePresence>
  );
}
