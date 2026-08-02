import { insights } from "@/lib/content";

// Every value here comes from the static `insights` array — nothing
// request-dependent — so this can be prerendered at build time like every
// other route instead of computed on every request.
export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.adpro.co.zm";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed for Insights. Sorted newest-first by the placeholder dates
 * in insights.ts (see that file's disclosure comment). No caching headers
 * beyond Next's own static-route defaults — this is prerendered at build
 * time like every other static route.
 */
export async function GET() {
  const sorted = [...insights].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = sorted
    .map((post) => {
      const url = `${siteUrl}/insights/${post.id}`;
      const pubDate = new Date(post.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.kind)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AdPro 360 — Insights</title>
    <link>${siteUrl}/insights</link>
    <description>Field notes, analysis and the occasional refusal from AdPro 360.</description>
    <language>en-zm</language>
    <atom:link href="${siteUrl}/insights/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
