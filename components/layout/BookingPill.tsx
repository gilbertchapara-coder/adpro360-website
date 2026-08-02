"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";

/**
 * Persistent booking CTA, bottom-right, on every route except Contact
 * (redundant there). The source also hid it while the mobile menu was
 * open — unnecessary here since the menu overlay's z-index already sits
 * above this pill, occluding it automatically.
 */
export function BookingPill() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <NextLink
      href="/contact"
      className="gap-s11 rounded-pill border-ivory/16 bg-midnight/92 py-s11 pr-s11 pl-s18 text-base-minus text-ivory shadow-pill ease-signature fixed right-[var(--spacing-inset-pill-x)] bottom-[var(--spacing-inset-pill-y)] z-[var(--z-booking-pill)] inline-flex items-center border font-bold backdrop-blur-lg transition-transform duration-[var(--duration-slow)] hover:-translate-y-[3px]"
    >
      Book a consultation
      <span className="size-s24 rounded-pill text-sm-plus flex items-center justify-center bg-[image:var(--gradient-brand)]">
        ↗
      </span>
    </NextLink>
  );
}
