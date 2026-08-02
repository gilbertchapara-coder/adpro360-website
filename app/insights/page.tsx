import { InsightsHero } from "@/components/insights/InsightsHero";
import { InsightsList } from "@/components/insights/InsightsList";
import { buildPageMetadata } from "@/lib/utils/pageMetadata";

const pageMetadata = buildPageMetadata({
  title: "Insights",
  description:
    "Field notes, analysis and the occasional refusal — what AdPro 360 has learned running media, film and strategy in Zambia.",
  path: "/insights",
});

export const metadata = {
  ...pageMetadata,
  alternates: {
    ...pageMetadata.alternates,
    types: { "application/rss+xml": "/insights/feed.xml" },
  },
};

export default function InsightsPage() {
  return (
    <>
      <InsightsHero />
      <InsightsList />
    </>
  );
}
