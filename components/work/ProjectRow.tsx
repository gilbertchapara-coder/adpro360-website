"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconWrapper } from "@/components/primitives";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { ProjectMeta } from "@/components/work/ProjectMeta";
import { CaseStudyPanel } from "@/components/work/CaseStudyPanel";
import { Caption } from "@/components/shared/Caption";
import { cn } from "@/lib/utils/cn";
import type { Project } from "@/lib/content";

type ProjectRowProps = {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * One row of the Work page's case-study list — collapsed header (numeral,
 * image, meta, toggle icon) plus an expandable CaseStudyPanel. Same
 * AnimatePresence height-auto mechanic as Services' ServiceAccordionRow;
 * richer content once open, since a project justifies more than an
 * accordion FAQ answer does. `id={project.id}` makes each row a real
 * anchor target for `/work#id` links from Home's featured grid.
 */
export function ProjectRow({ project, index, isOpen, onToggle }: ProjectRowProps) {
  const num = String(index + 1).padStart(2, "0");
  const prefersReducedMotion = useReducedMotion();
  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };
  /* CD review: "portfolio is the strongest asset but under-scaled — make the
     lead case study large and cinematic" + "commit to a deliberate grid or
     a considered asymmetric layout". Whichever row sorts first (in the
     current filter) gets the large treatment rather than a fixed id, so
     the "lead" stays correct when the category filter changes. */
  const featured = index === 0;

  return (
    <div id={project.id} className="bg-card border-ink/10 scroll-mt-[100px] border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "gap-acc-gap px-acc-btn-x py-acc-btn-y grid w-full grid-cols-1 items-center text-left",
          featured
            ? "sm:grid-cols-1"
            : "sm:grid-cols-[40px_140px_minmax(0,1fr)_auto]"
        )}
      >
        {featured ? (
          <>
            <div className="mb-s20 flex items-center justify-between">
              <span className="text-fluid-12 tracking-tight-1 leading-none font-extralight text-teal">
                {num}
              </span>
              <span className="tracking-eyebrow-4 text-ink/45 text-xs font-bold uppercase">
                Featured case study
              </span>
            </div>
            <ProjectMedia
              project={project}
              frame
              className="aspect-[16/9] rounded-2xl sm:aspect-[21/9]"
            />
            <Caption index={num}>{`${project.category} · ${project.year}`}</Caption>
            <div className="mt-s17 gap-s24 grid grid-cols-1 items-end sm:grid-cols-[minmax(0,1fr)_auto]">
              <ProjectMeta
                project={project}
                ctaLabel={isOpen ? "Collapse case study" : "Read the case study"}
                titleClassName="text-h2 leading-h2 tracking-tighter-2 font-light"
              />
              <IconWrapper
                size="md"
                tone="outline"
                className={cn(
                  "text-link text-xl font-light transition-transform duration-[var(--duration-moderate)] ease-signature",
                  isOpen && "rotate-45"
                )}
              >
                +
              </IconWrapper>
            </div>
          </>
        ) : (
          <>
            <span
              className={cn(
                "hidden text-fluid-12 tracking-tight-1 leading-none font-extralight transition-colors duration-[var(--duration-moderate)] ease-signature sm:block",
                isOpen ? "text-teal" : "text-ink/22"
              )}
            >
              {num}
            </span>
            <ProjectMedia project={project} className="aspect-[4/3] rounded-lg sm:aspect-square" />
            <ProjectMeta
              project={project}
              ctaLabel={isOpen ? "Collapse case study" : "Read the case study"}
              titleClassName="text-fluid-08"
            />
            <IconWrapper
              size="md"
              tone="outline"
              className={cn(
                "text-link mx-auto text-xl font-light transition-transform duration-[var(--duration-moderate)] ease-signature sm:mx-0",
                isOpen && "rotate-45"
              )}
            >
              +
            </IconWrapper>
          </>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={panelTransition}
            className="overflow-hidden"
          >
            <div className="px-acc-btn-x pb-acc-panel-pb border-ink/12 pt-s24 border-t">
              <CaseStudyPanel project={project} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
