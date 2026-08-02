import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * `text-{word}` is ambiguous in Tailwind — it's the prefix for both the
 * font-size scale (`text-lg`) and the color scale (`text-red-500`).
 * tailwind-merge tells them apart by checking each custom value against
 * its font-size theme validator first; anything that doesn't look like a
 * recognized size keyword falls through and gets guessed as a color
 * instead. Every custom `--text-*` token in globals.css (`text-display`,
 * `text-h2`, `text-fluid-07`, ...) failed that check, so tailwind-merge
 * silently treated them as colors — meaning `text-display text-ivory` in
 * the same className collapsed to just `text-ivory`, deleting the font
 * size. Found on the Services page H1, which rendered at the browser
 * default 16px instead of the display scale.
 *
 * `--shadow-*` has the same ambiguity against `shadow-{color}`, so it's
 * extended here too even though no live bug from it has shown up yet.
 */
const isCustomTextSize = (value: string) =>
  /^(display-hero|display|h2|h3-[a-d]|lede|body-(lg|md)|stat-a|eyebrow|fluid-\d{2}|2xs|3xs|xs(-plus)?|sm(-minus|-plus)?|base(-minus|-plus)?|md(-plus)?|lg(-plus)?|xl|2xl|3xl|6xl)$/.test(
    value
  );

const isCustomShadow = (value: string) => /^(lift|glow|glow-hover|pill)$/.test(value);

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [isCustomTextSize],
      shadow: [isCustomShadow],
    },
  },
});

/** Merge Tailwind class lists, resolving conflicting utilities (last wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
