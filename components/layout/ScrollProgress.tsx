"use client";

import { motion, useScroll } from "framer-motion";

/** Top progress rail — tracks document scroll via a scaleX transform instead of a JS-computed width%. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      className="bg-ink/8 fixed inset-x-0 top-0 z-[var(--z-progress-rail)] h-0.5 w-full"
      aria-hidden="true"
    >
      <motion.div
        className="h-full origin-left bg-[image:var(--gradient-brand)]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
