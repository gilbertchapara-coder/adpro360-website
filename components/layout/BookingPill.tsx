"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";

/**
 * Persistent booking CTA, bottom-right, on every route except Contact
 * (redundant there) and Home (Hero already has its own "Book a
 * consultation" CTA in view, and this pill's fixed bottom-right position
 * collided with Hero's own "Scroll" indicator/showreel card in that same
 * corner — confirmed live, not just reasoned: only ~19px clear at a
 * 1920x743 viewport, visually touching at shorter common laptop heights).
 * The source also hid it while the mobile menu was open — unnecessary
 * here since the menu overlay's z-index already sits above this pill,
 * occluding it automatically.
 *
 * Icon-only below `nav` (900px): the pill's own right-inset
 * (--spacing-inset-pill-x, 16-32px) is smaller than the page content's
 * own gutter margin (--spacing-gutter-x, 20-56px), so the full ~200px
 * labelled pill genuinely intrudes into the content column at any
 * viewport narrower than the page's own max content width — i.e. most
 * real devices, not an edge case. That's fine on `nav`+ two-column
 * layouts (body text is capped well clear of it by max-w-copy), but
 * every long-form page collapses to a single stacked text column below
 * `nav`, where the full pill was confirmed sitting directly over real
 * paragraph text (Team bios). Shrinking to a ~50px icon-only button
 * there cuts the intrusion footprint by ~4x rather than repositioning
 * or resizing every long-form text column across the site. */
export function BookingPill() {
  const pathname = usePathname();
  if (pathname === "/contact" || pathname === "/") return null;

  return (
    <NextLink
      href="/contact"
      aria-label="Book a consultation"
      className="rounded-pill border-ivory/16 bg-midnight/92 text-base-minus text-ivory shadow-pill ease-signature fixed right-[var(--spacing-inset-pill-x)] bottom-[var(--spacing-inset-pill-y)] z-[var(--z-booking-pill)] inline-flex size-[44px] items-center justify-center border font-bold backdrop-blur-lg transition-transform duration-[var(--duration-slow)] hover:-translate-y-[3px] nav:size-auto nav:gap-s11 nav:py-s11 nav:pr-s11 nav:pl-s18"
    >
      <span className="hidden nav:inline">Book a consultation</span>
      <span className="size-s24 rounded-pill text-sm-plus flex items-center justify-center bg-[image:var(--gradient-brand)]">
        ↗
      </span>
    </NextLink>
  );
}
