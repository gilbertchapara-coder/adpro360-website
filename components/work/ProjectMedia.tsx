"use client";

import { MediaSlot } from "@/components/shared/MediaSlot";
import { FrameCorners } from "@/components/shared/FrameCorners";
import { useGlare } from "@/lib/hooks/useGlare";
import { cn } from "@/lib/utils/cn";
import type { Project } from "@/lib/content";

type ProjectMediaProps = {
  project: Project;
  /** Aspect ratio + sizing — differs between Home's grid card and Work's wide row. */
  className?: string;
  /** Viewfinder corner marks — reserved for the largest single placement per
   * page (Work's featured row) so the motif reads as a signature, not
   * wallpaper repeated on every thumbnail. */
  frame?: boolean;
};

/**
 * The image half of a project card — glare/tilt/sheen treatment plus the
 * category chip. Owns its own `useGlare` ref, so it's a drop-in hoverable
 * tile wherever it's placed, no ref-threading required from the caller.
 * Shared by Home's featured grid and the Work page's case-study rows so
 * both get the same premium hover treatment for free.
 */
export function ProjectMedia({ project, className, frame = false }: ProjectMediaProps) {
  const glareRef = useGlare<HTMLDivElement>();

  return (
    <div
      ref={glareRef}
      data-glare=""
      className={cn(
        "bg-surface-dark perspective-[900px] relative overflow-hidden",
        className
      )}
    >
      <div className="glare-layer" />
      <div className="sheen-layer" />
      <div className="ease-signature rotate-x-[var(--rx,0deg)] rotate-y-[var(--ry,0deg)] absolute inset-0 transition-transform duration-[var(--duration-slower)]">
        <div className="media-zoom">
          <MediaSlot
            src={project.photo}
            alt={`${project.title} — case study still`}
            sizes="(min-width: 640px) 45vw, 100vw"
          />
        </div>
      </div>
      <div className="top-s13 left-s13 rounded-pill bg-midnight/62 px-s11 py-s04 text-eyebrow tracking-eyebrow-2 text-ivory absolute font-bold uppercase backdrop-blur-xs">
        {project.category}
      </div>
      {frame && <FrameCorners />}
    </div>
  );
}
