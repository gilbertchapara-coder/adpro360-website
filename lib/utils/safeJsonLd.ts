/**
 * Every field in this site's JSON-LD comes from static content in
 * lib/content (business facts, article titles), so there's no live
 * attacker-controlled input path today. This is defense-in-depth anyway:
 * `JSON.stringify` doesn't escape angle brackets, so a value containing the
 * literal string "</script>" would close the script tag early and let
 * whatever follows execute as HTML — the same class of bug as unescaped
 * JSON-LD in any CMS. The escaped form is a no-op for the rendered JSON-LD
 * (JSON parsers treat it identically) and closes that path permanently,
 * including if this content ever becomes editable without a code review.
 */
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}
