import { ClientWall } from "@/components/home/ClientWall";
import { Reveal } from "@/components/motion/Reveal";
import { EyebrowDivider } from "@/components/shared/EyebrowDivider";
import { Container, Section } from "@/components/primitives";
import { testimonials } from "@/lib/content";

/** Trust wall + a single pull-quote — deliberately lighter than Home's full
 * rotating testimonial band, so Work reads as its own page rather than a
 * repeat of Home for anyone who's already seen it. */
export function WorkCredibility() {
  const quote = testimonials[0];

  return (
    <>
      <ClientWall eyebrow="02 — Trusted by" />
      <Section tone="ivory" paddingY="none" className="pb-section-y-alt-1 pt-0">
        <Container width="article-narrow">
          <EyebrowDivider label="03 — In their words" className="mb-s24" />
          <Reveal delay={80}>
            <blockquote className="text-fluid-06 leading-relaxed-1 tracking-tighter-3 text-ink m-0 font-light text-pretty">
              “{quote.quote}”
            </blockquote>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-s20 text-base">
              <span className="font-bold text-ink">{quote.name}</span>
              <span className="text-ink/50"> — {quote.role}</span>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
