import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Base surface for capability cards, project cards, service/team accordion
 * rows and spec-table cells. Radius and surface vary by context — the
 * variants below cover every combination actually used; compose with
 * className for anything more specific (hover transforms, aspect-ratio).
 */
const cardVariants = cva("border border-ink/10", {
  variants: {
    surface: {
      card: "bg-card",
      white: "bg-white",
      dark: "border-ivory/10 bg-ivory/4 text-ivory",
      none: "border-transparent",
    },
    radius: {
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
    },
    padding: {
      none: "",
      sm: "p-s15",
      md: "p-s21",
      lg: "p-s25",
    },
  },
  defaultVariants: {
    surface: "card",
    radius: "2xl",
    padding: "none",
  },
});

type CardProps = VariantProps<typeof cardVariants> &
  Omit<ComponentPropsWithoutRef<"div">, "className"> & { className?: string };

export function Card({ surface, radius, padding, className, ...props }: CardProps) {
  return <div className={cn(cardVariants({ surface, radius, padding }), className)} {...props} />;
}
