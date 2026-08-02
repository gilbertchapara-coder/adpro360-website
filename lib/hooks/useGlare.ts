"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Cursor-tracked spotlight + tilt for cards. Sets `--mx`/`--my` (consumed by
 * `.glare-layer`) and `--rx`/`--ry` (consumed by each card's own
 * `rotate-x-[var(--rx,0deg)] rotate-y-[var(--ry,0deg)]` utilities — these
 * compose with any existing hover `translate`/`scale` for free because
 * Tailwind v4 puts rotate-x/y on the `transform` property while translate
 * and scale are independent CSS properties, so nothing fights for the same
 * declaration. Kept vanilla rather than Framer since it's positional CSS
 * variables, not a spring that needs to persist after pointerup. Skipped
 * under reduced motion; the CSS still shows a static centred glow on
 * `:hover` in that case, and tilt simply stays at its 0deg default.
 */
export function useGlare<T extends HTMLElement>(maxTiltDeg = 5) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.setProperty("--rx", `${(-(py - 0.5) * maxTiltDeg * 2).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * maxTiltDeg * 2).toFixed(2)}deg`);
    };
    const handleLeave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [prefersReducedMotion, maxTiltDeg]);

  return ref;
}
