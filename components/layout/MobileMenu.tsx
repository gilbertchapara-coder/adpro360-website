"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NextLink from "next/link";
import { Logo } from "./Logo";
import { fullNav } from "@/lib/content";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])';

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Move focus into the menu on open, and back to whatever opened it on
  // close — a full-screen overlay that doesn't manage focus leaves keyboard
  // and screen-reader users stranded on whatever was focused underneath it.
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  // Lock background scroll while open. `overflow:hidden` alone doesn't stop
  // iOS Safari's rubber-band scroll from bleeding the page behind this
  // full-screen overlay into view at the top/bottom edges — pinning body to
  // `position:fixed` at the current scroll offset is the standard fix, so
  // we restore the exact scroll position on close instead of jumping to 0.
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    return () => {
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Escape closes; Tab is trapped inside the menu while it's open, matching
  // expected `role="dialog"` + `aria-modal` behaviour.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !containerRef.current) return;

      const focusable = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="bg-midnight/97 px-block-menu pt-s16 pb-s25 text-ivory fixed inset-0 z-[var(--z-mobile-menu)] flex flex-col backdrop-blur-2xl"
        >
          <div className="mb-s25 flex items-center justify-between">
            <Logo size="sm" tone="brightened" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="size-s32 rounded-pill border-ivory/30 text-ivory flex items-center justify-center border text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-[2px]" aria-label="Full site">
            {fullNav.map((item) => (
              <NextLink
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="min-h-s32 border-ivory/12 py-s13 tracking-tight-2 text-ivory ease-signature hover:text-teal flex items-center justify-between border-b text-3xl font-light transition-colors duration-[var(--duration-base)]"
              >
                {item.label}
                <span className="text-md text-ivory/40" aria-hidden="true">
                  ↗
                </span>
              </NextLink>
            ))}
          </nav>

          <NextLink
            href="/contact"
            onClick={onClose}
            className="mt-s23 min-h-s27 rounded-pill text-md flex items-center justify-center bg-[image:var(--gradient-brand)] font-bold text-white"
          >
            Start a project
          </NextLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
