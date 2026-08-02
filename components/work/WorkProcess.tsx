import { Heading, Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/lib/content";

/** "How we work" — the agency's method, stated once, right after the case
 * studies that demonstrate it. Same numbered-row rhythm as Home's WhoWeAre
 * beliefs list, re-tuned for a dark section. */
export function WorkProcess() {
  return (
    <Section tone="ink" paddingY="alt-1">
      <Container width="content">
        <Reveal>
          <Heading variant="eyebrow" as="div" className="mb-s21 text-ivory/58">
            04 — How we work
          </Heading>
        </Reveal>
        <Reveal delay={80}>
          <Heading
            as="h2"
            variant="h2"
            className="mb-s27 max-w-reading-md text-ivory text-balance"
          >
            The method behind every case study above.
          </Heading>
        </Reveal>

        <div className="border-ivory/12 grid grid-cols-1 gap-px border-t sm:grid-cols-2">
          {processSteps.map((step) => (
            <Reveal
              key={step.num}
              className="gap-s18 border-ivory/12 py-s24 px-s16 grid grid-cols-[52px_minmax(0,1fr)] items-start border-b sm:odd:border-r"
            >
              <div className="pt-s03 tracking-eyebrow-2 text-teal-bright text-xs font-bold">
                {step.num}
              </div>
              <div>
                <div className="mb-s07 text-fluid-04 tracking-tight-1 text-ivory font-normal">
                  {step.title}
                </div>
                <div className="max-w-card text-md leading-body text-ivory/62">{step.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
