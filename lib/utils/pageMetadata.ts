import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.adpro.co.zm";

type BuildPageMetadataArgs = {
  title: string;
  description: string;
  /** Route path, e.g. "/services" — used for the canonical URL and og:url. */
  path: string;
};

/**
 * Every static page previously only set `title`/`description`. Next.js's
 * metadata API doesn't propagate those into `openGraph`/`twitter` — it
 * merges those objects wholesale from the nearest ancestor that defines
 * them, which was only the root layout. Every page was silently sharing
 * the homepage's Open Graph and Twitter Card copy. This builds all four
 * (title, description, OG, Twitter) plus the canonical URL from one call
 * so a page can't set three of the four and forget the OG override again.
 */
export function buildPageMetadata({ title, description, path }: BuildPageMetadataArgs): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} | AdPro 360`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description, url },
    twitter: { title: fullTitle, description },
  };
}
