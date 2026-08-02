import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Every variant below is a named combination of the type tokens in
 * globals.css (font-size + line-height + letter-spacing + weight),
 * reproducing the exact pairings used in the source for that role.
 * `accent` is the Instrument Serif italic treatment reserved for one
 * phrase per headline — never body copy, per the source's own rule.
 */
const headingVariants = cva("text-ink", {
  variants: {
    variant: {
      "display-hero":
        "font-sans text-display-hero font-light leading-hero tracking-tightest text-balance",
      display: "font-sans text-display font-light leading-tightest tracking-tighter-1 text-balance",
      h2: "font-sans text-h2 font-light leading-h2 tracking-tighter-2 text-balance",
      h3: "font-sans text-h3-a font-normal leading-h3 tracking-tight-1",
      lede: "font-sans text-lede font-light leading-snug-2 tracking-tighter-2 text-balance",
      eyebrow:
        "font-sans text-eyebrow font-bold uppercase leading-body-tight tracking-eyebrow-5 text-ink/62",
      /**
       * The AdPro signature mark — reserved for the fixed set of recurring
       * brand statements ("Never reactive.", "global standard", ...), never
       * body copy. Built entirely from Manrope (no second typeface): tracked
       * uppercase at 62% of the parent heading's size, so it scales
       * correctly whether the parent is the hero display size or an h2.
       * Use `SignatureAccent` (components/shared) rather than this variant
       * directly — it also handles the brand-dot terminal mark.
       */
      accent: "font-sans font-semibold uppercase tracking-eyebrow-2 text-teal text-[0.62em]",
    },
  },
  defaultVariants: {
    variant: "h2",
  },
});

type HeadingVariant = VariantProps<typeof headingVariants>["variant"];

const defaultTagByVariant: Record<NonNullable<HeadingVariant>, ElementType> = {
  "display-hero": "h1",
  display: "h1",
  h2: "h2",
  h3: "h3",
  lede: "p",
  eyebrow: "div",
  accent: "span",
};

type HeadingProps<T extends ElementType> = {
  as?: T;
  variant?: HeadingVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Heading<T extends ElementType = "h2">({
  as,
  variant = "h2",
  className,
  ...props
}: HeadingProps<T>) {
  const Tag = as ?? defaultTagByVariant[variant ?? "h2"];
  return <Tag className={cn(headingVariants({ variant }), className)} {...props} />;
}
