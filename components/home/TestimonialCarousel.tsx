"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heading, Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { testimonials, proofPoints } from "@/lib/content";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const active = testimonials[index];

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <Section tone="ivory" paddingY="none" className="pb-section-y-alt-1 pt-0">
      <Reveal>
        <Container className="gap-testimonial-gap rounded-5xl grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-center overflow-hidden bg-[linear-gradient(140deg,#22336F_0%,#1E7FB8_55%,#23AEC0_100%)] p-[var(--spacing-testimonial-band-y)] text-white">
          <div>
            <Heading variant="eyebrow" as="div" className="mb-s18 text-white/62">
              05 — In their words
            </Heading>

            <div role="group" aria-live="polite" aria-label="Client testimonial">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-fluid-06 leading-relaxed-1 tracking-tighter-3 m-0 font-light text-pretty"
                >
                  “{active.quote}”
                </motion.blockquote>
              </AnimatePresence>

              <div className="mt-s24 gap-s11 flex items-center">
                <div className="size-s31 rounded-pill relative flex-none overflow-hidden bg-white/20">
                  <MediaSlot alt={active.name} />
                </div>
                <div>
                  <div className="tracking-tight-3 text-base font-bold">{active.name}</div>
                  <div className="text-sm text-white/70">{active.role}</div>
                </div>
              </div>
            </div>

            <div role="group" aria-label="Choose testimonial" className="mt-s21 flex items-center gap-s05">
              {testimonials.map((testimonial, i) => (
                <button
                  key={testimonial.name + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                  aria-pressed={i === index}
                  className="-m-[12px] flex items-center justify-center p-[12px]"
                >
                  <span
                    className="ease-signature rounded-pill block h-[8px] transition-[width,background-color] duration-[var(--duration-moderate)]"
                    style={{
                      width: i === index ? "28px" : "8px",
                      background: i === index ? "#fff" : "rgba(255,255,255,.35)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="gap-s15 grid">
            {proofPoints.map((point) => (
              <div
                key={point.label}
                className="px-s20 py-s18 rounded-lg border border-white/20 bg-white/12 backdrop-blur-md"
              >
                <div className="text-stat-a tracking-tighter-2 leading-none font-light">
                  {point.value}
                </div>
                <div className="mt-s05 leading-body-tight text-sm text-white/78">{point.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>
    </Section>
  );
}
