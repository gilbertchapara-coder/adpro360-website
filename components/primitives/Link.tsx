import NextLink from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Every link in the source transitions colour on hover using the same
 * signature easing. `variant` covers the two recurring structural shapes
 * (a nav pill, an underlined text-link-with-arrow) — a bare link just gets
 * the transition; colour/opacity for a specific context comes via
 * className, same composition pattern as the other primitives.
 *
 * `underline` used a static `border-b` before — now it's two stacked
 * `background-image` lines (always-visible ink hairline underneath, teal
 * line wiping in left-to-right on top) so hover reads as a considered
 * reveal instead of an instant colour swap. `background-size` is the
 * animated property; `background-position`/`repeat` apply to both layers
 * from one declaration since they're unset per-layer.
 */
const linkVariants = cva("transition-colors duration-[var(--duration-base)] ease-signature", {
  variants: {
    variant: {
      plain: "",
      nav: "rounded-pill px-s13 py-s07 text-base-plus font-semibold text-ink/62 hover:bg-ink/5 hover:text-ink",
      // `.link-underline` (globals.css) does the actual animated line — see
      // that rule's comment for why it isn't a Tailwind arbitrary value.
      underline: "link-underline pb-s01 text-sm-plus font-bold text-ink hover:text-link",
    },
  },
  defaultVariants: {
    variant: "plain",
  },
});

type LinkProps = VariantProps<typeof linkVariants> &
  Omit<ComponentPropsWithoutRef<typeof NextLink>, "className"> & { className?: string };

export function Link({ variant, className, ...props }: LinkProps) {
  return <NextLink className={cn(linkVariants({ variant }), className)} {...props} />;
}
