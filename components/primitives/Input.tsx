import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

/** Text/email input — matches the contact form field styling exactly. */
export const Input = forwardRef<
  HTMLInputElement,
  Omit<ComponentPropsWithoutRef<"input">, "className"> & { className?: string }
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "border-ivory/18 bg-midnight/50 px-s15 py-s10 text-md text-ivory ease-signature w-full rounded-sm border font-sans outline-none transition-[border-color,box-shadow] duration-[var(--duration-base)]",
        "focus:border-teal focus:shadow-[0_0_0_3px_rgba(35,174,192,0.28)]",
        className
      )}
      {...props}
    />
  );
});
