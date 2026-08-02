import { Heading, Paragraph, Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SignatureAccent } from "@/components/shared/SignatureAccent";

type PageHeroProps = {
  eyebrow: string;
  /** The plain-text lead-in, e.g. "Strategy first." — accentPhrase follows it in the same H1. */
  plainLead: string;
  accentPhrase: string;
  /** Replace the accent phrase's trailing period with the brand pulse-dot. */
  accentDot?: boolean;
  lede: string;
};

/**
 * The "midnight bg, eyebrow, display H1 with one signature-accent phrase,
 * lead paragraph" sub-page hero — identical across Services, Work and now
 * Studio, extracted once a third instance made the duplication real rather
 * than premature.
 */
export function PageHero({ eyebrow, plainLead, accentPhrase, accentDot, lede }: PageHeroProps) {
  return (
    <Section tone="midnight" paddingY="none" className="pb-section-y-md pt-[160px]">
      <Container>
        <Reveal>
          <Heading variant="eyebrow" as="div" className="mb-s20 text-ivory/58">
            {eyebrow}
          </Heading>
        </Reveal>
        <Reveal delay={80}>
          <Heading
            as="h1"
            variant="display"
            className="mb-s24 max-w-article-narrow text-ivory text-balance"
          >
            {plainLead} <SignatureAccent dot={accentDot}>{accentPhrase}</SignatureAccent>
          </Heading>
        </Reveal>
        <Reveal delay={160}>
          <Paragraph size="base" tone="inverse-muted" className="max-w-copy text-fluid-25 leading-body">
            {lede}
          </Paragraph>
        </Reveal>
      </Container>
    </Section>
  );
}
