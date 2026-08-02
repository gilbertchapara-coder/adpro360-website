import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Covers every static pill/chip in the source: discipline tags on
 * capability cards, category pills on project cards, status pills on
 * case-study headers. Interactive toggle chips (portfolio filters, contact
 * form "needs" chips) keep their own active/inactive state logic — this is
 * the display-only primitive they're built on top of.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-s07 rounded-pill font-semibold uppercase tracking-eyebrow-2",
  {
    variants: {
      tone: {
        teal: "bg-teal/10 text-link-deep normal-case tracking-normal font-semibold",
        "teal-outline": "border border-teal/40 bg-teal/16 text-teal-bright",
        dark: "bg-ink text-ivory",
        "dark-translucent": "bg-midnight/62 text-ivory backdrop-blur-xs",
        outline: "border border-ink/20 text-ink/60",
        "outline-active": "bg-ink text-ivory",
      },
      size: {
        sm: "px-s09 py-s01 text-xs",
        md: "px-s13 py-s02 text-eyebrow",
      },
    },
    defaultVariants: {
      tone: "teal",
      size: "sm",
    },
  }
);

type BadgeProps = VariantProps<typeof badgeVariants> &
  Omit<ComponentPropsWithoutRef<"span">, "className"> & { className?: string };

export function Badge({ tone, size, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, size }), className)} {...props} />;
}
