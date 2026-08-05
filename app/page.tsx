import {
  Hero,
  ActiveServiceProvider,
  OrbitBridge,
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
      {/* One continuous story: Hero -> stats (inside Hero) -> client logos
          -> the orbit, now its own large section instead of a hero widget
          -> Services -> Portfolio -> Studio/Team -> Insights. The orbit
          sits right after ClientWall (both dark) and right before Services
          so it reads as the transition between them, not a floating aside.

          ActiveServiceProvider now spans Hero through CapabilityGrid:
          ServiceOrbit (in OrbitBridge) writes the featured service,
          ClientWall reads it to highlight relevant logos, and
          CapabilityGrid writes a hover override back the other way so the
          orbit can highlight the service a visitor is looking at in
          Services — see active-service-context.tsx. */}
      <ActiveServiceProvider>
        <Hero />
        <ClientWall />
        <OrbitBridge />
        <WhoWeAre />
        <CapabilityGrid />
      </ActiveServiceProvider>
      <FeaturedWork />
      <TestimonialCarousel />
      <TeamPreview />
      <InsightsPreview />
    </>
  );
}
