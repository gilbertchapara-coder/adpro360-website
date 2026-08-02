import {
  Hero,
  ServiceOrbit,
  ActiveServiceProvider,
  WhoWeAre,
  CapabilityGrid,
  FeaturedWork,
  ClientWall,
  TestimonialCarousel,
  TeamPreview,
  InsightsPreview,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Orbit writes the currently-featured service into context, ClientWall
          reads it to highlight the relevant logos — see
          active-service-context.tsx. Provider is scoped to just these two
          sections, not the whole page. */}
      <ActiveServiceProvider>
        <ServiceOrbit />
        <ClientWall />
      </ActiveServiceProvider>
      <WhoWeAre />
      <CapabilityGrid />
      <FeaturedWork />
      <TestimonialCarousel />
      <TeamPreview />
      <InsightsPreview />
    </>
  );
}
