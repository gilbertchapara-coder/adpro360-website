import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Covers the recurring body-copy roles. Exact per-instance opacity varies a
 * little across the source (ink/.56 to ink/.75 depending on surface) — the
 * defaults below match the most common case for each tone; pass className
 * to override the opacity modifier for an exact per-instance match rather
 * than growing this into a 20-variant enum.
 */
const paragraphVariants = cva("font-sans font-normal", {
  variants: {
    size: {
      lede: "text-body-lg leading-body-loose tracking-normal",
      base: "text-lg leading-body-loose-2",
      sm: "text-base leading-body",
      xs: "text-sm leading-eyebrow",
    },
    tone: {
      default: "text-ink",
      muted: "text-ink/66",
      inverse: "text-ivory",
      "inverse-muted": "text-ivory/70",
    },
  },
  defaultVariants: {
    size: "base",
    tone: "muted",
  },
});

type ParagraphProps = VariantProps<typeof paragraphVariants> &
  Omit<ComponentPropsWithoutRef<"p">, "className"> & { className?: string };

export function Paragraph({ size, tone, className, ...props }: ParagraphProps) {
  return <p className={cn(paragraphVariants({ size, tone }), className)} {...props} />;
}
