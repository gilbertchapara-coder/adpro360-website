"use client";

import { useEffect } from "react";
import { Heading, Paragraph, Container, Section } from "@/components/primitives";

/**
 * Root error boundary — catches unexpected render errors anywhere in the
 * tree instead of falling through to Next's generic error screen. Never
 * shows the raw error message to a visitor; it's logged to the console for
 * now since no error-monitoring service is wired up yet.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section
      tone="midnight"
      paddingY="none"
      className="flex min-h-[70vh] items-center pt-[160px] pb-[120px]"
    >
      <Container width="article-narrow">
        <Heading variant="eyebrow" as="div" className="mb-s20 text-ivory/58">
          Something went wrong
        </Heading>
        <Heading as="h1" variant="display" className="mb-s24 text-ivory text-balance">
          That one&rsquo;s on us, not you.
        </Heading>
        <Paragraph
          size="base"
          tone="inverse-muted"
          className="max-w-copy text-fluid-25 leading-body mb-s26"
        >
          The page hit an unexpected error. Try again, or head back to the homepage — nothing
          else on the site is affected.
        </Paragraph>

        <div className="gap-s11 flex flex-wrap items-center">
          <button
            type="button"
            onClick={reset}
            className="ease-signature rounded-pill px-s23 py-s15 text-base-plus shadow-glow hover:shadow-glow-hover inline-flex items-center bg-[image:var(--gradient-brand)] font-bold text-white transition-[transform,box-shadow] duration-[var(--duration-moderate)] hover:-translate-y-0.5 active:scale-[0.97]"
          >
            Try again
          </button>
          {/* Plain <a>, not NextLink — a full page load is more likely to
              actually recover from whatever broke than a client-side
              transition re-hitting the same broken render tree. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="ease-signature gap-s09 rounded-pill border-ivory/28 px-s21 py-s14 text-ivory hover:border-teal hover:text-teal active:scale-[0.97] inline-flex items-center border text-base font-bold transition-[color,border-color,transform] duration-[var(--duration-moderate)]"
          >
            Back to home
          </a>
        </div>
      </Container>
    </Section>
  );
}
