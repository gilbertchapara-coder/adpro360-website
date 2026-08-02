import type { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type PullQuoteProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * The site's one recurring editorial device — a teal hairline rule plus a
 * light, oversized line, breaking up long-copy sections (Studio, article
 * bodies, case studies). Always pulls a line that already exists in the
 * surrounding copy; never a place to introduce new claims.
 */
export function PullQuote<T extends ElementType = "blockquote">({
  as,
  className,
  ...props
}: PullQuoteProps<T>) {
  const Tag = as ?? "blockquote";
  return (
    <Tag
      className={cn(
        "border-teal pl-s20 text-fluid-04 leading-snug-1 tracking-tight-1 max-w-reading-md border-l-2 font-light text-pretty",
        className
      )}
      {...props}
    />
  );
}
