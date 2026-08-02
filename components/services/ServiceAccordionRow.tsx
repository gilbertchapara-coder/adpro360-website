"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NextLink from "next/link";
import { IconWrapper } from "@/components/primitives";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { cn } from "@/lib/utils/cn";
import type { Service } from "@/lib/content";

type ServiceAccordionRowProps = {
  service: Service;
  /** First row gets scale/order priority — CD review: "every row carries
   * equal weight... lead with a flagship offer." Strategy sits first in
   * the source data because it's where the studio's own process starts. */
  featured?: boolean;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * One row of the Services accordion — button (numeral, title, lede, sign
 * circle) plus a collapsible detail panel (copy, CTA, deliverables,
 * discipline image). Height-animates via AnimatePresence rather than the
 * source's instant show/hide — a disclosed motion improvement, same
 * single-row-open-at-a-time mechanic the parent `ServicesAccordion` owns.
 */
export function ServiceAccordionRow({
  service,
  featured = false,
  isOpen,
  onToggle,
}: ServiceAccordionRowProps) {
  const prefersReducedMotion = useReducedMotion();
  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };
  const imageTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="bg-card group relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="gap-acc-gap px-acc-btn-x py-acc-btn-y grid w-full grid-cols-1 items-center text-left font-sans md:grid-cols-[64px_minmax(0,1fr)_auto]"
      >
        <span
          className={cn(
            "tracking-tight-1 leading-none font-extralight transition-colors duration-[var(--duration-moderate)] ease-signature",
            featured ? "text-fluid-09 text-teal" : "text-fluid-12",
            !featured && (isOpen ? "text-teal" : "text-ink/22")
          )}
        >
          {service.num}
        </span>
        <span className="gap-s07 flex flex-col">
          {featured && (
            <span className="tracking-eyebrow-4 text-teal mb-s02 text-xs font-bold uppercase">
              Where we start
            </span>
          )}
          <span
            className={cn(
              "leading-snug-1 tracking-tighter-2 text-ink",
              featured ? "text-h2 font-normal" : "text-fluid-11 font-light"
            )}
          >
            {service.title}
          </span>
          <span className="max-w-copy text-md leading-eyebrow text-ink/72 line-clamp-2">
            {service.lede}
          </span>
          <span className="mt-s03 text-sm-plus tracking-tight-2 text-ink/78 font-semibold">
            {service.outcome}
          </span>
        </span>
        <IconWrapper size="md" tone="outline" className="text-link overflow-hidden text-xl font-light">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "minus" : "plus"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }
              className="inline-block"
            >
              {isOpen ? "–" : "+"}
            </motion.span>
          </AnimatePresence>
        </IconWrapper>
      </button>

      {/* Hover preview — CD review: "rows should reveal a preview on hover
          or expand, rather than sitting fully static." Only while
          collapsed; the open panel already carries the same photo. */}
      {!isOpen && (
        <div
          className="ease-signature bg-card-alt rounded-md right-acc-btn-x top-1/2 nav:block pointer-events-none absolute hidden aspect-[4/3] w-[140px] -translate-y-1/2 overflow-hidden opacity-0 shadow-lift transition-opacity duration-[var(--duration-moderate)] group-hover:opacity-100"
          aria-hidden="true"
        >
          <MediaSlot src={service.photo} alt="" sizes="140px" />
        </div>
      )}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={panelTransition}
            className="overflow-hidden"
          >
            <div className="gap-acc-gap px-acc-btn-x pb-acc-panel-pb grid grid-cols-1 md:grid-cols-[64px_minmax(0,1fr)]">
              <div />
              <div className="gap-block-lg border-ink/12 pt-s24 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] border-t">
                <div>
                  <p className="mb-s20 text-body-md leading-body text-ink/72 text-pretty">
                    {service.detail}
                  </p>
                  <NextLink
                    href="/contact"
                    className="ease-signature gap-s07 rounded-pill bg-ink px-s18 py-s10 text-base-minus text-ivory inline-flex items-center font-bold transition-colors duration-[var(--duration-base)] hover:bg-[image:var(--gradient-brand)] hover:text-white"
                  >
                    Brief us on this ↗
                  </NextLink>
                </div>
                <div>
                  <div className="mb-s15 text-eyebrow tracking-eyebrow-5 text-ink/62 font-bold uppercase">
                    What you get
                  </div>
                  <div className="gap-s09 grid">
                    {service.deliverables.map((item) => (
                      <div key={item} className="gap-s09 text-md text-ink/72 flex items-baseline">
                        <span className="rounded-pill bg-teal size-[5px] flex-none -translate-y-[3px]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={imageTransition}
                  className="bg-card-alt relative aspect-[4/3] min-w-[200px] overflow-hidden rounded-md"
                >
                  <MediaSlot
                    src={service.photo}
                    alt={`${service.title} — discipline photo`}
                    sizes="(min-width: 1024px) 260px, 90vw"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
