"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { SignatureAccent } from "@/components/shared/SignatureAccent";
import { useHeroSequence } from "./hero-sequence-context";

/** cubic-bezier(0.23, 1, 0.32, 1) — the standard "ease out quint" curve,
 * used nowhere else in the codebase (--ease-signature stays the one curve
 * for every *scroll* reveal; this is scoped to this one video-beat-driven
 * sequence, which is a deliberately different kind of motion, not a second
 * general-purpose easing added to the shared token). */
const EASE_OUT_QUINT = [0.23, 1, 0.32, 1] as const;
/** cubic-bezier(0.65, 0, 0.35, 1) — "ease in out cubic," used only for the
 * glow/converge accent's up-then-down pulse. */
const EASE_IN_OUT_CUBIC = [0.65, 0, 0.35, 1] as const;

type Stage = "hidden" | "visible" | "exit";

function stageFor(phase: ReturnType<typeof useHeroSequence>["phase"]): Stage {
  if (phase === "intro") return "hidden";
  if (phase === "transition") return "exit";
  return "visible";
}

/**
 * The hero headline — content and reveal effect both change per chapter
 * (see heroObjects), reusing the one existing SignatureAccent component
 * every named hero statement already goes through (nothing new in the type
 * system, just different children flowing through it per chapter).
 *
 * Every effect shares the same base recipe (slide up 16px + fade, 700ms,
 * ease-out-quint) except "sharpen" (Cinema Lens), which is the brief's one
 * explicit exception: no slide, resolves from a blur instead of fading.
 * "glow"/"converge" layer a brief accent pulse behind the text on top of
 * the base recipe; "illuminate" replaces the opacity fade with a
 * brightness/glow ramp so the letters look powered rather than just faded
 * in.
 *
 * Every `animate`/`transition` value below is `useMemo`'d, not an inline
 * object literal — this component re-renders on every phase change (several
 * times per chapter), and a fresh object reference on each render was
 * confirmed to reset Framer Motion's in-flight tween instead of letting it
 * complete, which is exactly why the headline was getting stuck invisible:
 * the "reveal" animation kept restarting from its own start value before it
 * ever reached opacity 1. Same root cause as HeroObjectSequence's video
 * accumulation bug, found and fixed there first.
 */
export function HeroHeadline({ className }: { className?: string }) {
  const { active, phase } = useHeroSequence();
  const stage = stageFor(phase);
  const sharpen = active.effect === "sharpen";
  const glowLike = active.effect === "glow" || active.effect === "converge";
  const converge = active.effect === "converge";

  const glowAnimate = useMemo(
    () =>
      stage === "visible"
        ? { opacity: [0, 0.5, 0], scale: 1 }
        : { opacity: 0, scale: converge ? 1.6 : 0.85 },
    [stage, converge]
  );
  const glowTransition = useMemo(() => ({ duration: 0.9, ease: EASE_IN_OUT_CUBIC }), []);

  const textAnimate = useMemo(() => {
    if (stage === "hidden") {
      return { opacity: 0, y: sharpen ? 0 : 16, filter: sharpen ? "blur(10px)" : "blur(0px)" };
    }
    if (stage === "exit") {
      return { opacity: 0, y: 0, filter: "blur(0px)" };
    }
    return { opacity: 1, y: 0, filter: "blur(0px)" };
  }, [stage, sharpen]);
  const textTransition = useMemo(
    () => ({
      duration: stage === "exit" ? 0.3 : 0.7,
      ease: EASE_OUT_QUINT,
      filter: { duration: sharpen && stage === "visible" ? 0.7 : 0.3 },
    }),
    [stage, sharpen]
  );

  return (
    <span className={className} style={{ position: "relative", display: "inline-block" }}>
      {glowLike && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: converge ? 1.6 : 0.85 }}
          animate={glowAnimate}
          transition={glowTransition}
          style={{
            position: "absolute",
            inset: "-40%",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-teal-bright) 70%, transparent), transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
      <motion.span
        key={active.id}
        initial={{
          opacity: 0,
          y: sharpen ? 0 : 16,
          filter: sharpen ? "blur(10px)" : "blur(0px)",
        }}
        animate={textAnimate}
        transition={textTransition}
        style={{ position: "relative", zIndex: 1, display: "inline-block" }}
      >
        <SignatureAccent dot>{active.headline}</SignatureAccent>
      </motion.span>
    </span>
  );
}

/** The lede paragraph — same per-chapter swap, plain fade-up (per brief:
 * "Body Copy: Fade Up, 8px, 600ms, Delay 250ms"). No per-object effect
 * variation here; the brief only varies the *headline* treatment per
 * object. Memoized for the same reason as HeroHeadline above. */
export function HeroBody({ className }: { className?: string }) {
  const { active, phase } = useHeroSequence();
  const stage = stageFor(phase);

  const animate = useMemo(() => {
    if (stage === "hidden") return { opacity: 0, y: 8 };
    if (stage === "exit") return { opacity: 0, y: 0 };
    return { opacity: 1, y: 0 };
  }, [stage]);
  const transition = useMemo(
    () => ({
      duration: stage === "exit" ? 0.3 : 0.6,
      delay: stage === "visible" ? 0.25 : 0,
      ease: EASE_OUT_QUINT,
    }),
    [stage]
  );

  return (
    <motion.p key={active.id} initial={{ opacity: 0, y: 8 }} animate={animate} transition={transition} className={className}>
      {active.body}
    </motion.p>
  );
}
