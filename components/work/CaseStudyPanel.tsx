"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/primitives";
import type { Project } from "@/lib/content";
import { EASE_SIGNATURE } from "@/lib/motion/easing";

const NARRATIVE_FIELDS = [
  { key: "challenge", label: "Challenge" },
  { key: "strategy", label: "Strategy" },
  { key: "execution", label: "Execution" },
] as const;

/**
 * The rich, always-real-content half of a case study — shown once a
 * ProjectRow is expanded. Reuses the exact challenge/strategy/execution/
 * results fields already on every Project record, so this is pure
 * presentation with zero new content modelling.
 */
export function CaseStudyPanel({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion();
  const fieldTransition = (i: number) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.5, delay: 0.06 * i, ease: EASE_SIGNATURE };

  return (
    <div className="gap-block-lg grid grid-cols-1">
      <div className="gap-block-lg grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {NARRATIVE_FIELDS.map((field, i) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={fieldTransition(i)}
          >
            <div className="mb-s11 text-eyebrow tracking-eyebrow-4 text-ink/50 font-bold uppercase">
              {field.label}
            </div>
            <p className="text-body-md leading-body text-ink/72 text-pretty">
              {project[field.key]}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={fieldTransition(NARRATIVE_FIELDS.length)}
      >
        <div className="mb-s13 text-eyebrow tracking-eyebrow-4 text-ink/50 font-bold uppercase">
          Results
        </div>
        <div className="gap-s13 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
          {project.results.map(([value, label]) => (
            <Card key={label} surface="card" radius="lg" padding="md">
              <div className="text-stat-a tracking-tighter-2 leading-none font-light text-teal">
                {value}
              </div>
              <div className="mt-s05 leading-body-tight text-sm text-ink/58">{label}</div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
