import { Container, Section, Paragraph } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { EyebrowDivider } from "@/components/shared/EyebrowDivider";
import { InsightCard } from "@/components/insights/InsightCard";
import { insights } from "@/lib/content";

export function InsightsPreview() {
  return (
    <Section tone="ivory" paddingY="none" className="pb-section-y-alt-2 pt-0">
      <Container>
        <EyebrowDivider label="07 — Insights" className="mb-s17" />
        <Reveal delay={40}>
          <Paragraph size="base" tone="muted" className="mb-s26 max-w-copy text-fluid-24">
            The thinking behind the work, written down before the next brief needs it.
          </Paragraph>
        </Reveal>

        <div className="gap-block-md grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {insights.slice(0, 3).map((post) => (
            <Reveal key={post.id} as="div">
              <InsightCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
