"use client";

import NextLink from "next/link";
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
    <Reveal as="div">
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

        {/* Lead card gets its own full-width row instead of living inside the
            rest-cards grid (col-span-2 inside an auto-fit grid leaves an
            orphaned empty track whenever the container is wide enough to fit
            3 auto-fit columns — the trailing 2nd rest card ends up alone in
            row 2 with 2 empty cells beside it). Same fix pattern already
            used for the Insights featured-post layout, see its own
            docstring. */}
        <div className="mb-block-md">
          <FeaturedCard project={lead} featured />
        </div>
        <div className="gap-block-md grid grid-cols-1 min-[680px]:grid-cols-2">
          {rest.map((project) => (
            <FeaturedCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
