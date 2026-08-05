import { Section } from "@/components/primitives";
import { ServiceOrbit } from "./ServiceOrbit";

/**
 * The orbit's own section — no longer a widget floating beside the hero's
 * text column, but the connective tissue between the dark Hero/ClientWall
 * cluster and the light Services section that follows: visitors land here
 * right after the client logos, then the orbit itself leads them into
 * Services (CapabilityGrid, next in app/page.tsx), which is also where
 * hovering a service card snaps this orbit to the matching node — see
 * active-service-context.tsx's `forcedServiceId`.
 *
 * `midnight` tone continues the dark run Hero/ClientWall already started
 * rather than introducing a third background treatment — this was in fact
 * the orbit's own original standalone form (see ServiceOrbit.tsx's own
 * comments) before an earlier pass embedded it in the hero; this restores
 * that, just later in the page than before.
 *
 * No heading copy — the brief for this section is explicitly "the orbit
 * IS the transition," and this page already has enough named sections
 * (WhoWeAre, Capabilities, ...) that another eyebrow/heading here would
 * read as a second thing to process rather than a pure visual beat. A
 * visually-hidden heading still gives it a real place in the document
 * outline for screen-reader/landmark navigation.
 */
export function OrbitBridge() {
  return (
    <Section tone="midnight" paddingY="lg" className="relative overflow-hidden">
      <h2 className="sr-only">Six disciplines, one connected practice</h2>
      <ServiceOrbit />
    </Section>
  );
}
