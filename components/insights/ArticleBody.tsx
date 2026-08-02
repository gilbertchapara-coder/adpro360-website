import { Container, Section, Link } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { PullQuote } from "@/components/shared/PullQuote";
import type { Insight } from "@/lib/content";

/**
 * Editorial rhythm: lede paragraph set larger, the second paragraph pulled
 * out at pull-quote scale (a magazine's own copy, re-set bigger — not a new
 * line), remaining paragraphs at standard measure. `reading-md` keeps every
 * line inside the ~66-character guideline the CD review flagged sitewide;
 * `article-narrow` on the section was only ever meant for the header row.
 */
export function ArticleBody({ post }: { post: Insight }) {
  const [lede, pulled, ...rest] = post.body;

  return (
    <Section tone="ivory">
      <Container width="article-narrow">
        <div className="max-w-reading-md">
          {lede && (
            <Reveal>
              <p className="text-fluid-25 leading-body-loose-3 text-ink/80 mb-s24 text-pretty">
                {lede}
              </p>
            </Reveal>
          )}

          {pulled && (
            <Reveal delay={40}>
              <PullQuote as="p" className="my-s26">
                {pulled}
              </PullQuote>
            </Reveal>
          )}

          {rest.map((paragraph, i) => (
            <Reveal key={i} delay={80 + i * 40}>
              <p className="text-body-md leading-body-loose-3 text-ink/72 mb-s21 text-pretty">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={80 + rest.length * 40 + 40}>
            <Link href="/insights" variant="underline" className="mt-s16 inline-block">
              ← All insights
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
