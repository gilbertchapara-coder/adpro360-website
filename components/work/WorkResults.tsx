"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Heading, Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { projects } from "@/lib/content";

/**
 * Every figure here is computed from the real `projects` array rather than
 * hand-authored, so it can never drift out of sync with the case studies
 * above it — the one aggregate section where "derive, don't duplicate"
 * matters more than matching Home's hand-authored heroStats pattern.
 */
const disciplineCount = new Set(projects.map((p) => p.category)).size;
const latestYear = Math.max(...projects.map((p) => Number(p.year)));

const stats: { value: string; label: string }[] = [
  { value: `${projects.length}+`, label: "Case studies delivered" },
  { value: `${disciplineCount}`, label: "Disciplines represented" },
  { value: `${latestYear}`, label: "Most recent delivery" },
];

function ResultStat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const display = useCountUp(value, inView);

  return (
    <div ref={ref}>
      <div className="text-fluid-01 tracking-tighter-2 leading-none font-light text-ink">
        {display}
      </div>
      <div className="mt-s07 text-eyebrow leading-body-tight tracking-eyebrow-3 text-ink/50 font-bold uppercase">
        {label}
      </div>
    </div>
  );
}

export function WorkResults() {
  return (
    <Section tone="ivory" paddingY="alt-1">
      <Container width="content">
        <Reveal>
          <Heading variant="eyebrow" as="div" className="mb-s21">
            05 — By the numbers
          </Heading>
        </Reveal>
        <Reveal delay={80}>
          <Heading as="h2" variant="h2" className="mb-s27 max-w-reading-md text-balance">
            A portfolio, not a highlight reel.
          </Heading>
        </Reveal>

        <div className="gap-block-md grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {stats.map((stat) => (
            <ResultStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
