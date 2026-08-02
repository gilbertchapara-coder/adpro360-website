import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesAccordion } from "@/components/services/ServicesAccordion";
import { ClientWall } from "@/components/home/ClientWall";
import { buildPageMetadata } from "@/lib/utils/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Services",
  description:
    "Six disciplines under one roof: brand strategy, creative campaigns, film & production, media buying, digital & social, corporate communications.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ClientWall eyebrow="Clients we've worked with" />
      <ServicesAccordion />
    </>
  );
}
