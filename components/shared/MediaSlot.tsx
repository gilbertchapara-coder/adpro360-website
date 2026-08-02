import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type MediaSlotProps = {
  /** Real asset URL — once a CMS/asset pipeline supplies one, this is the only prop that changes. */
  src?: string;
  alt: string;
  fit?: "cover" | "contain";
  sizes?: string;
  className?: string;
  /** Forwarded to next/image — set true only on the one image that's the
   * page's LCP candidate (e.g. the hero background) so it skips lazy
   * loading and gets fetchpriority=high instead. Every other MediaSlot
   * should leave this unset; marking more than one "above the fold" image
   * as priority defeats the point by competing for the same bandwidth. */
  priority?: boolean;
};

/**
 * Replaces the source's `<image-slot>` design-tool placeholder. No real
 * photography exists yet (HANDOFF.md §7) — until `src` is supplied this
 * renders a labelled placeholder in the parent's aspect-ratio box, so the
 * missing-image state is an intentional empty state rather than a blank
 * box. The parent element owns shape (border-radius) and sizing; this
 * always fills it via `fill` + absolute positioning.
 */
export function MediaSlot({ src, alt, fit = "cover", sizes, className, priority }: MediaSlotProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={cn(fit === "contain" ? "object-contain" : "object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "media-placeholder bg-card-alt p-s13 text-ink/45 absolute inset-0 flex items-center justify-center text-center text-xs",
        className
      )}
    >
      {alt}
    </div>
  );
}
