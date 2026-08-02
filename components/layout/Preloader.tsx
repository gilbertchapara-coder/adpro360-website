"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "./Logo";

const SESSION_KEY = "adpro360:preloader-seen";
const DISPLAY_MS = 1500;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * One-time brand moment before the homepage reveals. The mark carries a
 * `layoutId` shared with Header's own logo (see Header.tsx), so on exit
 * Framer Motion hands it off into the navbar position instead of a plain
 * fade. Skipped — no flash, no delay — on repeat visits within the same
 * tab (sessionStorage) and whenever the visitor prefers reduced motion.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [instant, setInstant] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    if (alreadySeen || prefersReducedMotion) {
      setInstant(true);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    const timer = window.setTimeout(() => setVisible(false), DISPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Committed as its own render, one tick after `instant` flips — so
  // AnimatePresence captures the zero-duration transition on the child's
  // last real render before it exits, instead of the stale 0.6s one.
  useEffect(() => {
    if (instant) setVisible(false);
  }, [instant]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="bg-midnight fixed inset-0 z-[var(--z-preloader)] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: instant ? 0 : 0.6, ease: EASE }}
        >
          <motion.div
            layoutId="adpro-logo-mark"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Logo size="lg" className="h-20" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
