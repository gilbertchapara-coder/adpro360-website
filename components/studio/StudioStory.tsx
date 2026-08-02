"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Heading, Paragraph, Container, Section, Link } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { SignatureAccent } from "@/components/shared/SignatureAccent";
import { PullQuote } from "@/components/shared/PullQuote";
import { FrameCorners } from "@/components/shared/FrameCorners";
import { Caption } from "@/components/shared/Caption";

export function StudioStory() {
  const imageRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-24, 24]);

  return (
    <Section tone="ivory">
      <Container>
        <Reveal>
          <Heading variant="eyebrow" as="div" className="mb-s21">
            01 — Where we started
          </Heading>
        </Reveal>
        {/* CD review: "long copy with no focal statement — pull one manifesto
            line out at display scale as the section anchor." Full container
            width so display scale (up to 116px) has room to breathe instead
            of wrapping awkwardly inside the narrower text column below. */}
        <Reveal delay={40}>
          <Heading as="h2" variant="display" className="mb-block-lg max-w-article-narrow text-balance">
            <SignatureAccent dot>One roof</SignatureAccent>, not three phone calls.
          </Heading>
        </Reveal>
      </Container>

      <Container className="gap-split-gap grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <Reveal delay={120}>
            <div
              ref={imageRef}
              className="bg-card-alt relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <motion.div style={{ y: parallaxY }} className="absolute inset-0 scale-110">
                <MediaSlot
                  src="/images/studio-lusaka-behind-the-scenes.jpg"
                  alt="The AdPro 360 studio in Lusaka — behind the scenes"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </motion.div>
              <FrameCorners />
            </div>
            <Caption index="Fig. 01">Behind the scenes — the Lusaka studio</Caption>
          </Reveal>
        </div>

        <div>
          <Reveal delay={90}>
            <Paragraph
              size="base"
              tone="muted"
              className="max-w-copy-sm text-fluid-24 leading-body-loose-3 text-ink/66 mb-s21 text-pretty"
            >
              Most agencies specialise in one thing and outsource the rest, so a brief passes
              through three separate businesses before it reaches an audience. AdPro 360 was
              built the other way round — strategy, creative, film production and media
              placement under one roof, run by the same senior people from the first call to
              the final report.
            </Paragraph>
          </Reveal>

          <Reveal delay={120}>
            <PullQuote className="my-s24">One roof. One standard. No handoffs.</PullQuote>
          </Reveal>

          <Reveal delay={150}>
            <Paragraph
              size="base"
              tone="muted"
              className="max-w-copy-sm text-fluid-24 leading-body-loose-3 text-ink/66 mb-s24 text-pretty"
            >
              That’s not an accident of hiring. It’s the reason the studio exists: a banking
              background that understands what a client’s board actually needs to see, a
              broadcast background that knows what a camera crew can and can’t deliver on a
              six-week window, and a film background that’s already won the awards most
              agencies only pitch toward.
            </Paragraph>
          </Reveal>
          <Reveal delay={190}>
            <Link href="/team" variant="underline">
              Meet the people behind it ↗
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
