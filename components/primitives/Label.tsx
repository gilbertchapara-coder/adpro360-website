import type { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type LabelProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/** Form field label — matches the contact form's label treatment exactly.
 * Polymorphic so a fieldset legend or a plain span can share the same
 * styling without a `for`/`htmlFor` that doesn't point at anything. */
export function Label<T extends ElementType = "label">({
  as,
  className,
  ...props
}: LabelProps<T>) {
  const Tag = as ?? "label";
  return <Tag className={cn("text-ivory/70 text-sm font-semibold", className)} {...props} />;
}
