/**
 * Single source of truth for site navigation. The desktop header, mobile
 * menu and footer each show a different subset of the same route list
 * rather than maintaining three separate arrays that could drift.
 *
 * `/system` (design tokens reference) intentionally has no entry here per
 * the approved decision to keep it reachable by direct URL only, dropped
 * from every public nav surface.
 */
export type NavItem = {
  href: string;
  label: string;
  /** Shown in the desktop header's primary nav */
  primary?: boolean;
  /** Shown in the mobile menu and footer nav (the fuller site map) */
  full?: boolean;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home", full: true },
  { href: "/work", label: "Work", primary: true, full: true },
  { href: "/services", label: "Services", primary: true, full: true },
  { href: "/studio", label: "Studio", primary: true, full: true },
  { href: "/team", label: "Team", primary: true, full: true },
  { href: "/insights", label: "Insights", primary: true, full: true },
  { href: "/contact", label: "Contact", full: true },
];

export const primaryNav = navItems.filter((item) => item.primary);
export const fullNav = navItems.filter((item) => item.full);
