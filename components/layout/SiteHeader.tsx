"use client";

import { useState } from "react";
import { Header } from "./Header";
import { MobileMenu } from "./MobileMenu";

/** Owns the mobile-menu open state so Header and MobileMenu stay presentational. */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
