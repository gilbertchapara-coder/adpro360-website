"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Teal dot + trailing ring, swells and shows a contextual label
 * (`data-cursor="Watch"` etc.) over interactive elements. Same algorithm
 * as the source's vanilla rAF-lerp implementation, but the ring's trail is
 * a Framer spring instead of a hand-rolled lerp loop. Disabled on coarse
 * pointers and under reduced motion — both checked before it ever mounts.
 */
export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [ringSize, setRingSize] = useState(40);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(dotX, { stiffness: 220, damping: 24, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 220, damping: 24, mass: 0.4 });

  useEffect(() => {
    const isFinePointer =
      typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-active");

    const handleMove = (event: MouseEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
    };
    const handleOver = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest?.("[data-cursor], a, button");
      if (!target) return;
      const cursorLabel = target.getAttribute("data-cursor");
      setRingSize(cursorLabel ? 96 : 58);
      setLabel(cursorLabel ?? "");
    };
    const handleOut = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest?.("[data-cursor], a, button");
      if (!target) return;
      setRingSize(40);
      setLabel("");
    };

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.documentElement.classList.remove("cursor-active");
    };
  }, [prefersReducedMotion, dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", opacity: label ? 0 : 1 }}
        aria-hidden="true"
      />
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          borderColor: label ? "var(--color-teal)" : undefined,
        }}
        aria-hidden="true"
      >
        <span style={{ opacity: label ? 1 : 0 }}>{label}</span>
      </motion.div>
    </>
  );
}
