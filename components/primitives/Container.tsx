import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Max-width wrapper. `content` (1360px) is the one true content width used
 * on nearly every section; the rest are the source's page-specific hero /
 * reading-measure widths, named so no page ever hardcodes a raw max-width.
 */
const containerVariants = cva("mx-auto w-full", {
  variants: {
    width: {
      content: "max-w-content",
      article: "max-w-article",
      "article-alt": "max-w-article-alt",
      "article-narrow": "max-w-article-narrow",
      "article-narrow-alt": "max-w-article-narrow-alt",
      reading: "max-w-reading",
      "reading-md": "max-w-reading-md",
      "reading-sm": "max-w-reading-sm",
      "copy-lg": "max-w-copy-lg",
      copy: "max-w-copy",
      "copy-sm": "max-w-copy-sm",
      "copy-xs": "max-w-copy-xs",
      card: "max-w-card",
      narrow: "max-w-narrow",
    },
  },
  defaultVariants: {
    width: "content",
  },
});

type ContainerProps = VariantProps<typeof containerVariants> &
  Omit<ComponentPropsWithoutRef<"div">, "className"> & { className?: string };

export function Container({ width, className, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ width }), className)} {...props} />;
}
