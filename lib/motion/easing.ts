/** The site's one signature motion curve — cubic-bezier(0.16, 1, 0.3, 1),
 * "ease out expo"-ish. Framer Motion transitions can't read CSS custom
 * properties directly, so this is the literal-array equivalent of
 * `--ease-signature` (globals.css) for every Framer `transition.ease`.
 * Import this instead of re-typing the array — it was independently
 * copy-pasted into 8 files before this existed. */
export const EASE_SIGNATURE = [0.16, 1, 0.3, 1] as const;
