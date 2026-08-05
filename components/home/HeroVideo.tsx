import { cn } from "@/lib/utils/cn";

type HeroVideoProps = {
  video: string;
  poster: string;
  alt: string;
  loop?: boolean;
  /** Eager (`auto`) vs. deferred (`metadata`) fetch — mirrors `priority` below,
   * exposed separately since a caller may want metadata-only preload without
   * also claiming this is the LCP-critical instance. */
  preload?: "auto" | "metadata" | "none";
  /** The one instance visible on first paint — fetches eagerly (`preload="auto"`)
   * instead of waiting. Every other instance should omit this. */
  priority?: boolean;
  className?: string;
};

/**
 * One ambient, textless, autoplaying loop — the single reusable primitive
 * `HeroObjectSequence` cycles through. No controls, no captions (nothing
 * spoken, nothing to caption), `alt` describes the object for anyone using a
 * screen reader or with images/video disabled, surfaced via `aria-label`
 * since `<video>` has no native `alt`. Muted + `playsInline` so autoplay
 * actually fires on mobile Safari without a user gesture.
 */
export function HeroVideo({
  video,
  poster,
  alt,
  loop = true,
  preload,
  priority = false,
  className,
}: HeroVideoProps) {
  return (
    <video
      aria-label={alt}
      poster={poster}
      autoPlay
      muted
      loop={loop}
      playsInline
      controls={false}
      preload={preload ?? (priority ? "auto" : "metadata")}
      className={cn("size-full object-cover", className)}
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}
