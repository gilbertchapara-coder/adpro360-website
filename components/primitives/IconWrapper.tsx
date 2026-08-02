import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * The circular chip used around arrow glyphs and the showreel play button —
 * every distinct diameter in the source (34 / 46 / 48px) is a size option.
 */
const iconWrapperVariants = cva("inline-flex shrink-0 items-center justify-center rounded-pill", {
  variants: {
    size: {
      sm: "size-s24 text-sm-plus", // 34px
      md: "size-s31 text-md", // 46px
      lg: "size-s32 text-sm-plus", // 48px
    },
    tone: {
      outline: "border border-ink/14 text-ink/50",
      "outline-inverse": "border border-ivory/16 text-link",
      solid: "bg-ivory/92 text-midnight",
      gradient: "bg-[image:var(--gradient-brand)] text-white",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "outline",
  },
});

type IconWrapperProps = VariantProps<typeof iconWrapperVariants> &
  Omit<ComponentPropsWithoutRef<"span">, "className"> & { className?: string };

export function IconWrapper({ size, tone, className, ...props }: IconWrapperProps) {
  return <span className={cn(iconWrapperVariants({ size, tone }), className)} {...props} />;
}
