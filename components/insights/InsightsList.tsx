"use client";

import { useMemo, useState } from "react";
import { Heading, Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { InsightCard } from "@/components/insights/InsightCard";
import { WorkFilterBar } from "@/components/work/WorkFilterBar";
import { insights } from "@/lib/content";

const ALL = "All";

/** The full archive — Home's preview only shows the first three. */
export function InsightsList() {
  const categories = useMemo(() => Array.from(new Set(insights.map((p) => p.kind))), []);
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const filtered =
    activeCategory === ALL ? insights : insights.filter((p) => p.kind === activeCategory);
  const [lead, ...rest] = filtered;

  return (
    <Section tone="ivory">
      <Container>
        <div className="mb-s26 gap-s18 flex flex-wrap items-center justify-between">
          <Reveal>
            <Heading variant="eyebrow" as="div" className="mb-0">
              01 — All insights
            </Heading>
          </Reveal>
          <WorkFilterBar categories={categories} active={activeCategory} onChange={setActiveCategory} />
        </div>

        {lead && (
          <Reveal as="div" className="mb-block-md">
            <InsightCard post={lead} featured />
          </Reveal>
        )}

        <div className="gap-block-md grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {rest.map((post) => (
            <Reveal key={post.id} as="div">
              <InsightCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
