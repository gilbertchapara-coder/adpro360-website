import { cn } from "@/lib/utils/cn";
import { TAG_ICONS } from "./service-tag-icons";

type FeatureChipProps = {
  label: string;
  className?: string;
};

/** Deep-navy glass pill for a service's `tags` — meant to read as a small
 * premium UI control (Stripe/Linear-grade), not a passive label, since this
 * chip row now carries the "what you get" information the cut paragraph
 * used to. Solid gradient (not a translucent glass-over-white treatment),
 * so no `backdrop-filter` is needed — one fewer composited layer, and
 * `hover:brightness-125` does the "brighten on hover" ask more cheaply
 * than swapping in a second gradient. Every transition is transform/
 * filter/box-shadow/border-color, all GPU-composited, no layout-affecting
 * properties. Not a real control (no href/onClick) — no `tabIndex` or
 * focus-ring, since a focusable element with nothing to activate is a
 * worse accessibility outcome than a static one. */
export function FeatureChip({ label, className }: FeatureChipProps) {
  const Icon = TAG_ICONS[label];

  return (
    <span
      className={cn(
        "gap-s07 rounded-pill px-s13 py-s07 inline-flex items-center border text-xs font-semibold text-white",
        "tracking-wide-1 ease-signature border-[color-mix(in_srgb,var(--color-chip-accent)_35%,transparent)] bg-[image:var(--gradient-chip)]",
        "shadow-[var(--shadow-chip-rest)]",
        "transition-[transform,filter,border-color,box-shadow] duration-[var(--duration-base)]",
        "hover:-translate-y-0.5 hover:scale-[1.03] hover:border-[var(--color-chip-accent-bright)] hover:brightness-125",
        "hover:shadow-[var(--shadow-chip-hover)]",
        "active:translate-y-0 active:scale-[0.98] active:brightness-100",
        "active:shadow-[var(--shadow-chip-active)]",
        className
      )}
    >
      {Icon && (
        <Icon
          className="size-[21px] flex-none text-[color:var(--color-chip-icon)]"
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
}
