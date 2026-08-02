import { Heading, Paragraph, Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import type { Insight } from "@/lib/content";

/**
 * Deliberately not PageHero — the signature accent mark is reserved for the
 * fixed set of recurring brand statements, never a per-article title pulled
 * from data. This is the section-landing tone (midnight, staggered reveal)
 * without that one specific device.
 */
export function ArticleHeader({ post }: { post: Insight }) {
  return (
    <Section tone="midnight" paddingY="none" className="pb-section-y-md pt-[160px]">
      <Container width="article-narrow">
        <Reveal>
          <div className="tracking-eyebrow-2 text-ivory/58 mb-s20 flex items-center gap-s13 text-xs font-bold uppercase">
            <span>{post.kind}</span>
            <span aria-hidden="true">·</span>
            <span>{post.read} read</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <Heading as="h1" variant="display" className="mb-s24 text-ivory text-balance">
            {post.title}
          </Heading>
        </Reveal>
        <Reveal delay={160}>
          <Paragraph size="base" tone="inverse-muted" className="text-fluid-25 leading-body">
            {post.excerpt}
          </Paragraph>
        </Reveal>
      </Container>
    </Section>
  );
}
