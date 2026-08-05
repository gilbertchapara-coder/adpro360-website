import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/** Multi-line field — same treatment as Input, plus vertical resize. */
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  Omit<ComponentPropsWithoutRef<"textarea">, "className"> & { className?: string }
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        // text-[16px] below `sm` — iOS Safari auto-zooms the viewport on
        // focus for any input under 16px, and this is the contact form.
        "border-ivory/18 bg-midnight/50 px-s15 py-s10 text-[16px] sm:text-md text-ivory ease-signature w-full resize-y rounded-sm border font-sans outline-none transition-[border-color,box-shadow] duration-[var(--duration-base)]",
        "focus:border-teal focus:shadow-[var(--glow-xs)]",
        className
      )}
      {...props}
    />
  );
});
