import { cn } from "@/lib/utils/cn";

/**
 * Four small viewfinder-style corner brackets — a production/broadcast
 * reference (a camera's frame guides) rather than a generic decorative
 * accent, reserved for the handful of largest media moments per page
 * (hero showreel, a lead case study, the studio photo) so it reads as a
 * signature, not wallpaper. Purely decorative; parent must be `relative`.
 */
export function FrameCorners({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("z-card-accent pointer-events-none absolute inset-s13", className)}
    >
      <span className="border-teal/80 absolute top-0 left-0 size-s21 border-t border-l" />
      <span className="border-teal/80 absolute top-0 right-0 size-s21 border-t border-r" />
      <span className="border-teal/80 absolute bottom-0 left-0 size-s21 border-b border-l" />
      <span className="border-teal/80 absolute bottom-0 right-0 size-s21 border-b border-r" />
    </div>
  );
}
