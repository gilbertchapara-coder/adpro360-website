import { cn } from "@/lib/utils/cn";

type WorkFilterBarProps = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

const ALL = "All";

/**
 * The interactive toggle-chip filter Badge's own docstring anticipates —
 * built on the same outline/outline-active visual language as the Badge
 * primitive, but as real buttons with their own active-state logic, since
 * Badge itself stays a display-only <span>.
 *
 * Each button carries 6px of invisible padding cancelled by an equal
 * negative margin, so the visible pill is unchanged but the actual tap
 * target grows from ~34px to ~46px — clears the 44px touch-target
 * guideline without moving anything on screen. `group`/`group-hover`
 * carries the hover state from the full (larger) hit area down to the
 * visible span, since the span itself no longer spans the whole button.
 */
export function WorkFilterBar({ categories, active, onChange }: WorkFilterBarProps) {
  const options = [ALL, ...categories];

  return (
    <div role="group" aria-label="Filter case studies by discipline" className="gap-s09 flex flex-wrap">
      {options.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className="group -m-[6px] p-[6px]"
          >
            <span
              className={cn(
                "ease-signature rounded-pill px-s13 py-s07 text-eyebrow tracking-eyebrow-2 block font-bold uppercase transition-colors duration-[var(--duration-moderate)]",
                isActive
                  ? "bg-ink text-ivory"
                  : "border-ink/20 text-ink/60 group-hover:border-ink/40 group-hover:text-ink border"
              )}
            >
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
}
