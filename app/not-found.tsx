import type { Metadata } from "next";
import { Heading, Paragraph, Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SignatureAccent } from "@/components/shared/SignatureAccent";
import NextLink from "next/link";

/**
 * Without this, the page rendered two conflicting `<meta name="robots">`
 * tags — Next's own automatic noindex for a 404 status, plus the root
 * layout's sitewide `index, follow` still applying underneath it since
 * nothing here overrode it. An explicit override here is the correct fix
 * rather than relying on Next's automatic injection to win a fight with a
 * parent that says the opposite.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Deliberately not built on PageHero — the signature accent mark stays
 * reserved for the core identity pages (Work/Services/Studio/Team/Insights/
 * Contact), not an error state. Same tonal register, plain heading instead.
 *
 * CD review: carry the brand system here (type, accent, motion — "404s get
 * screenshotted"), give the recovery action a single focal CTA rather than
 * three equal-weight buttons, and add one small interactive moment.
 */
export default function NotFound() {
  return (
    <Section
      tone="midnight"
      paddingY="none"
      className="flex min-h-[70vh] items-center pt-[160px] pb-[120px]"
    >
      <Container width="article-narrow">
        <Reveal>
          <Heading
            variant="eyebrow"
            as="div"
            className="group mb-s20 inline-block cursor-default text-ivory/58"
          >
            <span className="ease-signature inline-block transition-transform duration-[var(--duration-slow)] group-hover:rotate-6">
              404
            </span>
          </Heading>
        </Reveal>
        <Reveal delay={60}>
          <Heading as="h1" variant="display" className="mb-s24 text-ivory text-balance">
            This page went to <SignatureAccent dot>broadcast</SignatureAccent> without us.
          </Heading>
        </Reveal>
        <Reveal delay={110}>
          <Paragraph size="base" tone="inverse-muted" className="max-w-copy text-fluid-25 leading-body mb-s26">
            The link that brought you here is either broken or out of date. Here&rsquo;s where
            people usually mean to go instead.
          </Paragraph>
        </Reveal>

        <Reveal delay={160}>
          <div className="gap-s18 flex flex-wrap items-center">
            <NextLink
              href="/"
              className="ease-signature rounded-pill px-s23 py-s15 text-base-plus shadow-glow hover:shadow-glow-hover inline-flex items-center bg-[image:var(--gradient-brand)] font-bold text-white transition-[transform,box-shadow] duration-[var(--duration-moderate)] hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Back to home
            </NextLink>
            <NextLink
              href="/work"
              className="ease-signature text-ivory/58 hover:text-teal-bright text-base font-semibold transition-colors duration-[var(--duration-base)]"
            >
              See the work →
            </NextLink>
            <NextLink
              href="/contact"
              className="ease-signature text-ivory/58 hover:text-teal-bright text-base font-semibold transition-colors duration-[var(--duration-base)]"
            >
              Contact us →
            </NextLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
