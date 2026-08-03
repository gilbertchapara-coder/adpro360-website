"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import NextLink from "next/link";
import { Logo } from "./Logo";
import { Link } from "@/components/primitives";
import { primaryNav, site } from "@/lib/content";
import { cn } from "@/lib/utils/cn";

type HeaderProps = {
  menuOpen: boolean;
  onToggleMenu: () => void;
};

/** Fixed nav bar — condenses padding/opacity past 40px of scroll, same threshold as the source. */
export function Header({ menuOpen, onToggleMenu }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <header
      className={cn(
        "gap-s18 border-ink/7 px-gutter-x ease-signature fixed inset-x-0 top-0 z-[var(--z-nav)] flex items-center justify-between border-b backdrop-blur-xl backdrop-saturate-[var(--saturate-glass)] transition-[padding,background-color] duration-[var(--duration-slow)]",
        scrolled ? "bg-ivory/90 py-s09" : "bg-ivory/72 py-s16"
      )}
    >
      <NextLink href="/" className="gap-s09 text-ink flex items-center">
        <motion.div layoutId="adpro-logo-mark">
          {/* Separate element from the layoutId wrapper above — that one's
              `transform` is driven by Framer's preloader hand-off; a CSS
              `animation` setting `transform` on the same element would
              fight it for the same property. This one just does its own
              1s sideways turn + 3s hold upright, forever, independent of
              that (4s total loop — see the keyframe's own percentages). */}
          <div className="animate-[ap-logo-spin_4s_linear_infinite]">
            <Logo size="sm" />
          </div>
        </motion.div>
        <span className="flex flex-col leading-none">
          <span className="text-lg-plus tracking-tighter-3 font-extrabold">{site.name}</span>
          <span className="text-2xs tracking-eyebrow-6 text-ink/40 font-semibold uppercase">
            {site.location}
          </span>
        </span>
      </NextLink>

      <nav className="gap-s02 nav:flex hidden items-center">
        {primaryNav.map((item) => (
          <Link key={item.href} href={item.href} variant="nav" className="text-ink/48 hover:text-ink">
            {item.label}
          </Link>
        ))}
        <NextLink
          href="/contact"
          className="ml-s07 gap-s06 rounded-pill px-s17 py-s09 text-base-minus shadow-glow hover:shadow-glow-hover ease-signature inline-flex items-center bg-[image:var(--gradient-brand)] font-bold text-white transition-[transform,box-shadow] duration-[var(--duration-moderate)] hover:-translate-y-0.5"
        >
          Start a project
          <span className="rounded-pill bg-white size-[5px]" aria-hidden="true" />
        </NextLink>
      </nav>

      <button
        type="button"
        onClick={onToggleMenu}
        aria-label="Menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        className="size-s32 rounded-pill border-ink/16 nav:hidden flex flex-none flex-col items-center justify-center gap-[5px] border bg-white/60"
      >
        <span className="w-s15 bg-ink block h-[1.5px]" />
        <span className="w-s15 bg-ink block h-[1.5px]" />
      </button>
    </header>
  );
}
