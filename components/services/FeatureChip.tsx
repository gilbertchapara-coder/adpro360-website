import { cn } from "@/lib/utils/cn";
import { TAG_ICONS } from "./service-tag-icons";

type FeatureChipProps = {
  label: string;
  className?: string;
};

/** Glass capsule for a service's `tags` — icon + label, teal-tinted, subtle
 * cyan glow on hover. Replaces the plain-pill tag styling so the chip row
 * itself carries the "what you get" information the cut paragraph used to. */
export function FeatureChip({ label, className }: FeatureChipProps) {
  const Icon = TAG_ICONS[label];

  return (
    <span
      className={cn(
        "gap-s06 rounded-pill border-teal/15 bg-teal/8 px-s11 py-s05 text-link-deep ease-signature inline-flex items-center border text-xs font-semibold backdrop-blur-sm transition-[transform,background-color,border-color,box-shadow] duration-[var(--duration-base)]",
        "hover:-translate-y-0.5 hover:border-teal/30 hover:bg-teal/14 hover:shadow-[0_0_12px_rgba(35,174,192,0.35)]",
        className
      )}
    >
      {Icon && <Icon className="size-[13px] flex-none" strokeWidth={1.75} aria-hidden="true" />}
      {label}
    </span>
  );
}
