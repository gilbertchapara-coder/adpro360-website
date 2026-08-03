import {
  Hero,
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
      {/* Orbit (now embedded inside Hero, see Hero.tsx) writes the
          currently-featured service into context; ClientWall reads it to
          highlight the relevant logos — see active-service-context.tsx.
          Provider now wraps Hero too, since that's where the orbit lives. */}
      <ActiveServiceProvider>
        <Hero />
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
