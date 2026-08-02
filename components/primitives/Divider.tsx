import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/** The 1px hairline rule used between section eyebrows, rows, and lists. */
const dividerVariants = cva("h-px w-full", {
  variants: {
    tone: {
      ink: "bg-ink/12",
      ivory: "bg-ivory/14",
    },
  },
  defaultVariants: {
    tone: "ink",
  },
});

type DividerProps = VariantProps<typeof dividerVariants> &
  Omit<ComponentPropsWithoutRef<"div">, "className"> & { className?: string };

export function Divider({ tone, className, ...props }: DividerProps) {
  return <div role="separator" className={cn(dividerVariants({ tone }), className)} {...props} />;
}
