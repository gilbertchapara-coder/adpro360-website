"use client";

import { useState } from "react";
import { Container, Section } from "@/components/primitives";
import { ServiceAccordionRow } from "./ServiceAccordionRow";
import { services } from "@/lib/content";

/** Owns which single row is expanded — same one-open-at-a-time mechanic as the source. */
export function ServicesAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section tone="ivory" paddingY="none" className="pt-services-pt pb-section-y-lg">
      <Container className="border-ink/12 bg-ink/12 grid gap-[2px] overflow-hidden rounded-3xl border">
        {services.map((service, index) => (
          <ServiceAccordionRow
            key={service.id}
            service={service}
            featured={index === 0}
            isOpen={openId === service.id}
            onToggle={() => setOpenId((current) => (current === service.id ? null : service.id))}
          />
        ))}
      </Container>
    </Section>
  );
}
