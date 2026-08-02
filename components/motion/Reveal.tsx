"use client";

import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from "framer-motion";

/**
 * The 0.985→1 scale is the "settle" — barely perceptible on its own, but
 * combined with the y-travel and decelerate-style easing it reads as the
 * element arriving and coming to rest rather than just fading up. Applies
 * everywhere Reveal is used (headlines, cards, hero split-letters) so the
 * whole site shares one consistent "weight" to its reveals.
 */
const variants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

type RevealDivProps = HTMLMotionProps<"div"> & {
  as?: "div";
  /** Milliseconds, matches the source's `data-reveal-delay` values directly. */
  delay?: number;
};

type RevealSpanProps = HTMLMotionProps<"span"> & {
  as: "span";
  delay?: number;
};

type RevealProps = RevealDivProps | RevealSpanProps;

/**
 * Replaces the source's `[data-reveal]` + IntersectionObserver + manual
 * style-mutation system with `whileInView`. Same trigger point (8% of the
 * element visible, fires once), same duration/easing. Reduced-motion users
 * get the element rendered in its final state immediately, no animation.
 * `as="span"` covers the source's inline reveals (split-letter headline,
 * accent phrases) where a block-level div would break the flow.
 */
export function Reveal({ as = "div", delay = 0, transition, ...props }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const shared = {
    initial: prefersReducedMotion ? "visible" : "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.08 },
    variants,
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: delay / 1000,
      ...transition,
    },
  };

  if (as === "span") {
    return <motion.span {...shared} {...(props as HTMLMotionProps<"span">)} />;
  }
  return <motion.div {...shared} {...(props as HTMLMotionProps<"div">)} />;
}
