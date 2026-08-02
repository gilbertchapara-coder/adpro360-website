"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic-pull effect for primary CTAs. Same algorithm as the source
 * (radius = 90% of the element's largest dimension, pull scales linearly
 * to the centre) but spring-smoothed via Framer instead of an instant CSS
 * transition — the improvement noted in the migration plan. Disabled on
 * coarse pointers and under reduced motion.
 *
 * Usage: spread `x`/`y` onto a `motion.span` wrapping the button's inner
 * content — never the outer element, so it doesn't fight an existing
 * hover-transform on the trigger itself.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (event: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      const radius = Math.max(rect.width, rect.height) * 0.9;

      if (distance < radius) {
        const pull = (radius - distance) / radius;
        rawX.set(dx * strength * pull);
        rawY.set(dy * strength * pull);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion, strength, rawX, rawY]);

  return { ref, x, y };
}
