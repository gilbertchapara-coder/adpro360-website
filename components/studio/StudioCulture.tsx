"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Heading, Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { heroStats } from "@/lib/content";

function StudioStat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const display = useCountUp(value, inView);

  return (
    <div ref={ref}>
      <div className="text-fluid-01 tracking-tighter-2 leading-none font-light text-ivory">
        {display}
      </div>
      <div className="mt-s07 text-eyebrow leading-body-tight tracking-eyebrow-3 text-ivory/50 font-bold uppercase">
        {label}
      </div>
    </div>
  );
}

/** Same aggregate facts as Home's hero stat bar — one studio, one set of
 * numbers, not a second competing claim invented for this page. */
export function StudioCulture() {
  return (
    <Section tone="ink" paddingY="alt-1">
      <Container width="content">
        <Reveal>
          <Heading variant="eyebrow" as="div" className="mb-s21 text-ivory/58">
            04 — By the numbers
          </Heading>
        </Reveal>
        <Reveal delay={80}>
          <Heading as="h2" variant="h2" className="mb-s27 max-w-reading-md text-ivory text-balance">
            Senior-led isn’t a slogan on this page.
          </Heading>
        </Reveal>

        <div className="gap-block-md grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {heroStats.map((stat) => (
            <StudioStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
