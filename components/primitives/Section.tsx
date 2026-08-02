import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Every full-bleed <section> in the source shares this shape: a background
 * tone, gutter-x horizontal padding, and one of the section-y vertical
 * rhythm tiers. Content width/centering is a separate concern — nest a
 * <Container> inside.
 */
const sectionVariants = cva("px-gutter-x", {
  variants: {
    tone: {
      ivory: "bg-ivory text-ink",
      midnight: "bg-midnight text-ivory",
      ink: "bg-ink text-ivory",
      card: "bg-card text-ink",
      transparent: "",
    },
    paddingY: {
      default: "py-section-y",
      "alt-1": "py-section-y-alt-1",
      "alt-2": "py-section-y-alt-2",
      lg: "py-section-y-lg",
      "lg-alt": "py-section-y-lg-alt",
      md: "py-section-y-md",
      "md-alt": "py-section-y-md-alt",
      sm: "py-section-y-sm",
      "sm-alt": "py-section-y-sm-alt",
      xs: "py-section-y-xs",
      "xs-alt": "py-section-y-xs-alt",
      none: "",
    },
  },
  defaultVariants: {
    tone: "ivory",
    paddingY: "default",
  },
});

type SectionProps = VariantProps<typeof sectionVariants> &
  Omit<ComponentPropsWithoutRef<"section">, "className"> & { className?: string };

export function Section({ tone, paddingY, className, ...props }: SectionProps) {
  return <section className={cn(sectionVariants({ tone, paddingY }), className)} {...props} />;
}
