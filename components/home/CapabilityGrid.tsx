"use client";

import NextLink from "next/link";
import { Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { FeatureChip } from "@/components/services/FeatureChip";
import { useGlare } from "@/lib/hooks/useGlare";
import { services } from "@/lib/content";

export function CapabilityGrid() {
  return (
    <Section tone="ivory" paddingY="none" className="pb-section-y-alt-1 pt-0">
      <Container>
        <SectionIntro
          eyebrow="02 — Capabilities"
          action={{ label: "All services", href: "/services" }}
          className="mb-s27"
          headingClassName="max-w-reading-md"
        >
          Six disciplines. One brief. No handoffs between agencies.
        </SectionIntro>

        <div className="border-ink/10 bg-ink/10 perspective-[1400px] grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-px overflow-hidden rounded-3xl border">
          {services.map((service) => (
            <Reveal key={service.id} as="div">
              <CapabilityCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** maxTiltDeg=3 (vs the default 5 on standalone image cards) — these sit
 * edge-to-edge in a bordered grid, so a smaller tilt keeps the shared
 * table-like ground plane readable instead of each cell looking detached. */
function CapabilityCard({ service }: { service: (typeof services)[number] }) {
  const glareRef = useGlare<HTMLAnchorElement>(3);

  return (
    <NextLink
      ref={glareRef}
      href={`/services#${service.id}`}
      data-glare=""
      data-cursor="Explore"
      className="ease-signature bg-card px-s24 pt-s25 pb-s24 text-ink rotate-x-[var(--rx,0deg)] rotate-y-[var(--ry,0deg)] active:scale-[0.99] relative flex min-h-[300px] flex-col justify-between transition-[transform,background-color] duration-[var(--duration-slow)] hover:bg-white"
    >
      <div className="glare-layer" />
      <div className="sheen-layer" />
      <div className="flex items-center justify-between">
        <span className="tracking-eyebrow-2 text-ink/35 text-xs font-bold">{service.num}</span>
        <span className="size-s24 rounded-pill border-ink/14 text-sm-plus text-ink/50 flex items-center justify-center border">
          ↗
        </span>
      </div>
      <div>
        <h3 className="mb-s11 text-fluid-05 leading-snug-3 tracking-tight-1 font-normal">
          {service.title}
        </h3>
        <p className="mb-s15 text-base-plus leading-body text-ink/58 max-w-xs">
          {service.oneLiner}
        </p>
        <div className="flex flex-wrap gap-[7px]">
          {service.tags.map((tag) => (
            <FeatureChip key={tag} label={tag} />
          ))}
        </div>
      </div>
    </NextLink>
  );
}
