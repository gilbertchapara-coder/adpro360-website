import NextLink from "next/link";
import { Container, Section } from "@/components/primitives";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/content";

/** A compact index of the six disciplines, linking out to the full Services
 * page rather than repeating its accordion depth here. */
export function StudioDisciplines() {
  return (
    <Section tone="ivory" paddingY="none" className="pb-section-y-alt-1 pt-0">
      <Container>
        <SectionIntro
          eyebrow="02 — What we do"
          action={{ label: "Full service list", href: "/services" }}
          className="mb-s24"
        >
          Six disciplines, run by the people who use them.
        </SectionIntro>

        <div className="border-ink/10 grid border-t">
          {services.map((service) => (
            <Reveal key={service.id}>
              <NextLink
                href={`/services#${service.id}`}
                className="gap-acc-gap px-s16 py-s21 border-ink/10 text-ink ease-signature hover:bg-card grid grid-cols-1 items-baseline border-b transition-colors duration-[var(--duration-moderate)] sm:grid-cols-[64px_minmax(0,1fr)_auto]"
              >
                <span className="text-fluid-12 tracking-tight-1 text-ink/22 leading-none font-extralight">
                  {service.num}
                </span>
                <span>
                  <span className="text-fluid-04 tracking-tight-1 mr-s09 font-normal">
                    {service.title}
                  </span>
                  <span className="text-md text-ink/58">{service.lede}</span>
                </span>
                <span className="text-sm-plus tracking-wide-2 text-teal hidden font-bold sm:block">
                  →
                </span>
              </NextLink>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
