"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

/**
 * Reproduces the source's `count()` behaviour: parse a value like "15+",
 * "360°" or "+38%" into a numeric part plus its prefix/suffix, animate the
 * number from 0 on a 1.5s cubic ease-out, and re-render the original
 * formatting around it. Runs once when `start` becomes true (so it can be
 * gated by whileInView), skipped entirely under reduced motion.
 */
export function useCountUp(rawValue: string, start = true) {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion ? rawValue : formatAt(rawValue, 0)
  );
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;

    if (prefersReducedMotion) {
      setDisplay(rawValue);
      return;
    }

    const controls = animate(0, 1, {
      duration: 1.5,
      ease: [0.33, 1, 0.68, 1], // matches the source's 1 - (1-p)^3 cubic ease-out
      onUpdate: (t) => setDisplay(formatAt(rawValue, t)),
    });

    return () => controls.stop();
  }, [start, rawValue, prefersReducedMotion]);

  return display;
}

function formatAt(rawValue: string, t: number): string {
  const match = rawValue.match(/^([^\d-]*)(-?[\d.]+)(.*)$/);
  if (!match) return rawValue;
  const [, prefix, numberPart, suffix] = match;
  const target = parseFloat(numberPart);
  const decimals = numberPart.includes(".") ? 1 : 0;
  return `${prefix}${(target * t).toFixed(decimals)}${suffix}`;
}
