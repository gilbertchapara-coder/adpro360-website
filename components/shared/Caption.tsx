import { cn } from "@/lib/utils/cn";

type CaptionProps = {
  children: string;
  /** Optional running number, e.g. "01" — editorial figure numbering. */
  index?: string;
  tone?: "ink" | "ivory";
  className?: string;
};

/** The small editorial line under a photograph — figure numbering plus a
 * one-line annotation, the same device a magazine uses under a plate. */
export function Caption({ children, index, tone = "ink", className }: CaptionProps) {
  return (
    <div
      className={cn(
        "gap-s09 mt-s09 flex items-baseline text-xs",
        tone === "ivory" ? "text-ivory/45" : "text-ink/40",
        className
      )}
    >
      {index && (
        <span className={cn("font-bold", tone === "ivory" ? "text-teal-bright" : "text-teal")}>
          {index}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
