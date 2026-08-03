"use client";

import NextLink from "next/link";
import { cn } from "@/lib/utils/cn";
import { Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { ProjectMeta } from "@/components/work/ProjectMeta";
import { projects } from "@/lib/content";

function FeaturedCard({
  project,
  featured = false,
}: {
  project: (typeof projects)[number];
  featured?: boolean;
}) {
  return (
    <Reveal as="div" className={cn(featured && "sm:col-span-2")}>
      <NextLink
        href={`/work#${project.id}`}
        data-cursor="View case study"
        className="ease-signature border-ivory/10 bg-ivory/4 text-ivory hover:-translate-y-s05 active:scale-[0.99] hover:border-teal/50 block overflow-hidden rounded-2xl border transition-[transform,border-color] duration-[var(--duration-slower)]"
      >
        <ProjectMedia
          project={project}
          className={featured ? "aspect-[21/9]" : "aspect-[4/3]"}
          frame={featured}
        />
        <ProjectMeta project={project} className="px-s20 pt-s20 pb-s22" />
      </NextLink>
    </Reveal>
  );
}

export function FeaturedWork() {
  const [lead, ...rest] = projects.slice(0, 3);

  return (
    <Section tone="ink" paddingY="alt-1">
      <Container>
        <SectionIntro
          eyebrow="03 — Selected work"
          action={{ label: "Full portfolio", href: "/work" }}
          className="mb-[60px]"
          eyebrowClassName="text-ivory/58"
          headingClassName="max-w-copy-lg"
        >
          Campaigns that moved something measurable.
        </SectionIntro>

        <div className="gap-block-md grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))]">
          <FeaturedCard project={lead} featured />
          {rest.map((project) => (
            <FeaturedCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
