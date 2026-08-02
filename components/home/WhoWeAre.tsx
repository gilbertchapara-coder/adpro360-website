import { Heading, Paragraph, Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { SignatureAccent } from "@/components/shared/SignatureAccent";
import { beliefs } from "@/lib/content";

export function WhoWeAre() {
  return (
    <Section tone="ivory">
      <Container className="gap-split-gap grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <Reveal>
            <Heading variant="eyebrow" as="div" className="mb-s21">
              01 — Who we are
            </Heading>
          </Reveal>
          <Reveal delay={120}>
            <div className="bg-card-alt relative aspect-[4/5] overflow-hidden rounded-2xl">
              <MediaSlot
                src="/images/studio-team-at-work.jpg"
                alt="The AdPro 360 team at work in the Lusaka studio"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <Heading
              as="h2"
              variant="h2"
              className="mb-s25 text-fluid-03 leading-display tracking-tighter-2"
            >
              Local insight, held to a{" "}
              <SignatureAccent dot>global standard.</SignatureAccent>
            </Heading>
          </Reveal>
          <Reveal delay={90}>
            <Paragraph
              size="base"
              tone="muted"
              className="max-w-copy text-fluid-24 leading-body-loose-3 text-ink/66 mb-[var(--spacing-whoweare-pb)] text-pretty"
            >
              A full-service media, creative and production agency rooted in Zambia — built to
              make brands communicate with purpose.
            </Paragraph>
          </Reveal>

          <div className="border-ink/12 grid gap-px border-t">
            {beliefs.map((belief) => (
              <Reveal
                key={belief.num}
                className="gap-s18 border-ink/12 py-s22 grid grid-cols-[52px_minmax(0,1fr)] items-start border-b"
              >
                <div className="pt-s03 tracking-eyebrow-2 text-link text-xs font-bold">
                  {belief.num}
                </div>
                <div>
                  <div className="mb-s07 text-fluid-04 tracking-tight-1 font-normal">
                    {belief.title}
                  </div>
                  <div className="max-w-card text-md leading-body text-ink/58">{belief.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
