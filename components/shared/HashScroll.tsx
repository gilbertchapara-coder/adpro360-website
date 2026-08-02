"use client";

import { useEffect } from "react";

/**
 * Scrolls to the element matching the current URL hash once mounted.
 * Native browser hash-scroll-on-load doesn't reliably fire in this
 * app-router setup, so links like TeamPreview's `/team#id` or FeaturedWork's
 * `/work#id` would otherwise land at the top of the target page. Renders
 * nothing — attach once per page that has anchorable sections and no other
 * reason to be a client component.
 *
 * Pages with their own client-side state tied to the hash (e.g. Work's
 * WorkGrid, which also has to open the right accordion row) keep their own
 * specialised effect instead of this one.
 */
export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timer = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
