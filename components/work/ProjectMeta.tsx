import { cn } from "@/lib/utils/cn";
import type { Project } from "@/lib/content";

type ProjectMetaProps = {
  project: Project;
  ctaLabel?: string;
  className?: string;
  titleClassName?: string;
};

/** The text half of a project card — client/year, title, cta line. Pairs with ProjectMedia. */
export function ProjectMeta({
  project,
  ctaLabel = "Read the case study",
  className,
  titleClassName,
}: ProjectMetaProps) {
  return (
    <div className={className}>
      <div className="mb-s09 gap-s13 flex items-baseline justify-between">
        {/* opacity-65/60, not the original 45/30 — those computed to ~4.2:1
            and ~2.5:1 against this component's two real backgrounds (ink on
            ivory, ivory on midnight), failing WCAG AA on real content (a
            client name and a year, not decoration). These pass both
            contexts with margin — see Milestone 2 accessibility audit. */}
        <div className="tracking-eyebrow-3 text-xs font-bold uppercase opacity-65">
          {project.client}
        </div>
        <div className="text-xs opacity-60">{project.year}</div>
      </div>
      <h3
        className={cn(
          "mb-s13 text-h3-c leading-h3 tracking-tight-1 font-normal",
          titleClassName
        )}
      >
        {project.title}
      </h3>
      {/* Lead result — CD review: thumbnails read as visuals with no outcome
          attached. project.results already carries this; surfacing the
          first figure here needed no new content. */}
      <div className="mb-s09 gap-s07 flex items-baseline">
        <span className="text-base-plus tracking-tight-2 font-bold text-teal">
          {project.results[0][0]}
        </span>
        <span className="text-sm opacity-58">{project.results[0][1]}</span>
      </div>
      <div className="text-sm-plus tracking-wide-2 text-teal font-bold">{ctaLabel} →</div>
    </div>
  );
}
