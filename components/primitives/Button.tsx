import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * The four button treatments documented on the source's own System page —
 * Primary, Accent (gradient), Secondary (outline), Text link — plus a
 * light/dark split on Secondary since the source uses both depending on
 * the section it sits in. `size` covers the three padding scales actually
 * used (nav pill / mid CTA / hero CTA).
 */
const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-s09 rounded-pill font-bold",
    "transition-[transform,box-shadow,background-color,border-color,color]",
    "duration-[var(--duration-moderate)] ease-signature active:scale-[0.97]",
    "disabled:cursor-not-allowed disabled:opacity-65"
  ),
  {
    variants: {
      tone: {
        primary: "bg-ink text-ivory hover:bg-[image:var(--gradient-brand)] hover:text-white",
        accent:
          "bg-[image:var(--gradient-brand)] text-white shadow-glow hover:-translate-y-0.5 hover:shadow-glow-hover",
        secondary: "border border-ink/22 text-ink hover:border-teal hover:text-teal",
        "secondary-inverse": "border border-ivory/28 text-ivory hover:border-teal hover:text-teal",
        ghost: "text-ink hover:text-link",
      },
      size: {
        sm: "px-s17 py-s09 text-base-minus",
        md: "px-s18 py-s10 text-base-plus",
        lg: "px-s23 py-s15 text-base-plus",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "md",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> &
  Omit<ComponentPropsWithoutRef<"button">, "className"> & { className?: string };

export function Button({ tone, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ tone, size }), className)} {...props} />;
}
