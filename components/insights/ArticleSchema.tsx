import type { Insight } from "@/lib/content";
import { safeJsonLd } from "@/lib/utils/safeJsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adpro.co.zm";

/**
 * BlogPosting + BreadcrumbList for one article. `datePublished` comes from
 * the placeholder dates added to insights.ts for this milestone — see that
 * file's own disclosure comment before treating them as real.
 */
export function ArticleSchema({ post }: { post: Insight }) {
  const url = `${siteUrl}/insights/${post.id}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "AdPro 360" },
    publisher: {
      "@type": "Organization",
      name: "AdPro 360",
      logo: { "@type": "ImageObject", url: `${siteUrl}/assets/adpro-mark.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteUrl}/insights` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }}
      />
    </>
  );
}
