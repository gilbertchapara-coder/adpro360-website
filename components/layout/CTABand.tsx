"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import { Heading, Paragraph, Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SignatureAccent } from "@/components/shared/SignatureAccent";
import { useMagnetic } from "@/lib/hooks/useMagnetic";
import { site } from "@/lib/content";

/** "Bring us the difficult brief" — shared band that closes every page before the footer. */
export function CTABand() {
  const magnetic = useMagnetic<HTMLAnchorElement>();

  return (
    <Section tone="ivory" paddingY="xs">
      <Reveal>
        <Container className="rounded-5xl bg-midnight px-cta-x py-cta-y text-ivory relative overflow-hidden">
          <div
            className="rounded-pill pointer-events-none absolute -right-[10%] -bottom-[40%] size-[60vw] bg-[radial-gradient(circle,rgba(35,174,192,.24),transparent_65%)]"
            aria-hidden="true"
          />
          <div className="gap-cta-gap relative grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-end">
            <Heading
              as="h2"
              variant="h2"
              className="text-fluid-07 leading-tighter-3 tracking-tighter-1 text-ivory text-balance"
            >
              We do <SignatureAccent>difficult</SignatureAccent>.
            </Heading>
            <div>
              <Paragraph
                size="base"
                tone="inverse-muted"
                className="mb-s22 max-w-narrow text-fluid-23 leading-body"
              >
                Bring us the brief that stalled everywhere else. We will tell you honestly whether
                we are the right agency for it.
              </Paragraph>
              <div className="gap-s09 flex flex-wrap">
                <NextLink
                  ref={magnetic.ref}
                  href="/contact"
                  data-magnetic=""
                  className="gap-s07 rounded-pill bg-ivory px-s23 py-s15 text-midnight ease-signature inline-flex items-center text-base-plus font-bold transition-transform duration-[var(--duration-moderate)] hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  <motion.span
                    style={{ x: magnetic.x, y: magnetic.y }}
                    className="gap-s07 inline-flex items-center"
                  >
                    Book a consultation ↗
                  </motion.span>
                </NextLink>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-pill border-ivory/30 px-s21 py-s14 text-ivory ease-signature hover:border-teal hover:text-teal active:scale-[0.97] border text-base font-bold transition-[color,border-color,transform] duration-[var(--duration-moderate)]"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Reveal>
    </Section>
  );
}
