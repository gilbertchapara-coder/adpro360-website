import { site } from "@/lib/content";
import { safeJsonLd } from "@/lib/utils/safeJsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.adpro.co.zm";

/**
 * Sitewide LocalBusiness structured data — real facts from lib/content/site.ts
 * only. No `sameAs` social profile URLs are included since none are
 * confirmed; inventing them would be presenting a guess as fact in
 * something search engines parse as structured fact.
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/assets/adpro-mark.png`,
    image: `${siteUrl}/assets/adpro-mark.png`,
    description:
      "Full-service media sales and production agency in Lusaka — strategy, creative, film and media placement held to one standard.",
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Lusaka",
      addressCountry: "ZM",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}
