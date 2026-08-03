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
        "tracking-wide-1 ease-out border-[rgba(0,174,239,0.35)] bg-[linear-gradient(135deg,#133E8A_0%,#0D2F6B_50%,#081F47_100%)]",
        "shadow-[0_0_0_1px_rgba(0,174,239,0.15),0_8px_18px_rgba(0,174,239,0.18),0_0_18px_rgba(0,174,239,0.15)]",
        "transition-[transform,filter,border-color,box-shadow] duration-[250ms]",
        "hover:-translate-y-0.5 hover:scale-[1.03] hover:border-[#66D9FF] hover:brightness-125",
        "hover:shadow-[0_0_0_1px_rgba(102,217,255,0.5),0_10px_24px_rgba(0,174,239,0.28),0_0_26px_rgba(0,174,239,0.3)]",
        "active:translate-y-0 active:scale-[0.98] active:brightness-100",
        "active:shadow-[0_0_0_1px_rgba(0,174,239,0.2),0_2px_6px_rgba(0,174,239,0.15)]",
        className
      )}
    >
      {Icon && (
        <Icon
          className="size-[21px] flex-none text-[#DDF8FF]"
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
}
