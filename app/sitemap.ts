import type { MetadataRoute } from "next";
import { insights } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.adpro.co.zm";

/**
 * /dev/tokens is deliberately excluded — internal QA reference, already
 * noindex at the page level; no reason to list it here too.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Build-time timestamp — honest as "this sitemap was generated at build
  // X", not a claim to track real per-page edit history (which isn't
  // tracked anywhere in this codebase yet).
  const buildTime = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: buildTime, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, lastModified: buildTime, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${siteUrl}/services`,
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/studio`,
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${siteUrl}/team`, lastModified: buildTime, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${siteUrl}/insights`,
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: buildTime,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = insights.map((post) => ({
    url: `${siteUrl}/insights/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
