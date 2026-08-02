"use client";

import { useEffect, useMemo, useState } from "react";
import { Container, Section } from "@/components/primitives";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { WorkFilterBar } from "@/components/work/WorkFilterBar";
import { ProjectRow } from "@/components/work/ProjectRow";
import { projects } from "@/lib/content";

const ALL = "All";

/**
 * Owns the category filter and which single case study is expanded — same
 * one-open-at-a-time mechanic as the Services accordion, nothing open by
 * default (matches that precedent exactly, and avoids a defaulted-open row
 * fighting an incoming `/work#id` deep link's scroll position).
 *
 * A hash matching a project id (from Home's "Read the case study" links)
 * opens that project and scrolls to it once mounted.
 */
export function WorkGrid() {
  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    []
  );
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const target = projects.find((p) => p.id === hash);
    if (!target) return;
    setActiveCategory(ALL);
    setOpenId(target.id);
    const timer = setTimeout(() => {
      document.getElementById(target.id)?.scrollIntoView({ block: "start" });
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(
    () => (activeCategory === ALL ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  const handleFilterChange = (category: string) => {
    setActiveCategory(category);
    const nextList = category === ALL ? projects : projects.filter((p) => p.category === category);
    setOpenId((current) => (nextList.some((p) => p.id === current) ? current : null));
  };

  return (
    <Section tone="ivory" paddingY="lg">
      <Container>
        <SectionIntro eyebrow="01 — Selected work" className="mb-s24">
          Case studies, not a showreel.
        </SectionIntro>

        <WorkFilterBar categories={categories} active={activeCategory} onChange={handleFilterChange} />

        <div className="border-ink/10 mt-s26 grid border-t">
          {filtered.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isOpen={openId === project.id}
              onToggle={() => setOpenId((current) => (current === project.id ? null : project.id))}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
