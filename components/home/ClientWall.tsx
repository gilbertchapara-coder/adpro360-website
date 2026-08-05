"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Container, Section, Heading } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { useActiveService } from "./active-service-context";
import { clients, type Client } from "@/lib/content";

type ClientWallProps = {
  eyebrow?: string;
};

/** Marquee display height before per-logo `logoScale` — width is always
 * `auto`, so every logo keeps its own real aspect ratio at this height. */
const BASE_HEIGHT = 96;

/** Every source file is a fully opaque rectangle (none of the 10 assets
 * carry real alpha — checked pixel data directly), so at this size the raw
 * image edge reads as a hard box against the dark section. This feathers
 * only the outer ~7% margin on each side into the page, full opacity
 * everywhere else — two linear-gradient masks (one per axis) intersected,
 * not a single radial ellipse. An ellipse inscribed in a rectangle only
 * touches the box at the 4 edge midpoints — its corners sit entirely
 * outside the ellipse, so anything a logo has near a corner (Trade Kings'
 * wordmark, ZCAS's crest) was getting fully deleted, not just faded. This
 * version reaches every corner and only trims the thin rim. */
const EDGE_FEATHER_AXIS = "linear-gradient(to right, transparent, black 7%, black 93%, transparent)";
const EDGE_FEATHER_CROSS = "linear-gradient(to bottom, transparent, black 7%, black 93%, transparent)";

/**
 * Which clients get the "relevant to this service" highlight while a given
 * service is featured in the Orbit above (ActiveServiceProvider). This is
 * curatorial grouping for the homepage narrative, not a record of which
 * client commissioned which specific service — a few names appear under
 * more than one service deliberately (a broadcaster's work touches both
 * production and creative, an insurer's touches both media and comms).
 * Edit freely if the pairing should read differently.
 */
const RELATED_CLIENTS_BY_SERVICE: Record<string, string[]> = {
  production: ["DStv", "MultiChoice", "Trade Kings Zimbabwe"],
  digital: ["Big Tree Beverages", "Zambia Industrial Commercial Bank (ZICB)"],
  media: ["Professional Insurance", "National HIV/AIDS/STI/TB Council (NAC Zambia)"],
  strategy: ["ZCAS University", "ZSIC General Insurance"],
  creative: ["DStv", "Big Tree Beverages"],
  comms: [
    "Zambia Industrial Commercial Bank (ZICB)",
    "ZSIC General Insurance",
    "Professional Insurance",
  ],
};

function LogoItem({
  client,
  index,
  revealDelay,
}: {
  client: Client;
  index: number;
  /** Only the first (non-duplicated) pass through a track gets a staggered
   * entrance — the doubled second half exists purely for the seamless
   * marquee loop and is already off-screen at mount, so animating its
   * entrance too would just be wasted observer overhead. */
  revealDelay?: number;
}) {
  const { activeServiceId } = useActiveService();
  const height = Math.round(BASE_HEIGHT * client.logoScale);
  const width = Math.round((client.width / client.height) * height);

  const isRelated = Boolean(
    activeServiceId && RELATED_CLIENTS_BY_SERVICE[activeServiceId]?.includes(client.name)
  );
  const isDimmed = Boolean(activeServiceId) && !isRelated;

  const logo = (
    <span
      className="inline-block"
      style={{
        animation: `ap-float ${7 + (index % 5) * 0.9}s ease-in-out infinite`,
        animationDelay: `${(index % 6) * 0.4}s`,
      }}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={width}
        height={height}
        style={{
          height,
          width: "auto",
          maskImage: `${EDGE_FEATHER_AXIS}, ${EDGE_FEATHER_CROSS}`,
          WebkitMaskImage: `${EDGE_FEATHER_AXIS}, ${EDGE_FEATHER_CROSS}`,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
        className={cn(
          "ease-signature relative grayscale opacity-55 transition-[filter,opacity,transform] duration-[var(--duration-moderate-plus)]",
          "hover:z-10 hover:-translate-y-1 hover:scale-[1.18] hover:opacity-100 hover:grayscale-0",
          "hover:drop-shadow-[var(--glow-lg)]",
          isRelated && "opacity-85 grayscale-[0.35] drop-shadow-[var(--glow-sm)]",
          isDimmed && "opacity-30"
        )}
      />
    </span>
  );

  if (revealDelay === undefined) return logo;

  return (
    <Reveal as="span" delay={revealDelay} className="inline-block">
      {logo}
    </Reveal>
  );
}

/** One `ap-marquee`-driven track, content doubled so the -50% loop point is
 * seamless (same technique as Marquee.tsx's discipline-word ticker).
 * `reverse`/`durationS` let the two mobile rows move opposite directions
 * at different speeds; `group-hover/marquee:` pauses every track at once
 * when the visitor hovers anywhere in the section.
 *
 * `overflow-hidden` here clips the doubled-width track horizontally (needed
 * — otherwise the marquee's own wide content would blow out the page's
 * horizontal scroll); the vertical padding gives a hovered logo's 1.18x
 * scale room to sit clear of that clip edge. */
function MarqueeTrack({
  items,
  durationS,
  reverse = false,
}: {
  items: Client[];
  durationS: number;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden py-s27 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="group-hover/marquee:[animation-play-state:paused] flex w-max items-center gap-x-s29"
        style={{
          animation: `${reverse ? "ap-marquee-reverse" : "ap-marquee"} ${durationS}s linear infinite`,
        }}
      >
        {[...items, ...items].map((client, i) => (
          <LogoItem
            key={`${client.name}-${i}`}
            client={client}
            index={i}
            revealDelay={i < items.length ? i * 60 : undefined}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Floating monochrome logo marquee. Every logo sits directly on the
 * section background (no card, no border, no shadow) at ~55% opacity,
 * full grayscale at rest — hovering restores real colour, a soft cyan
 * glow and a modest 1.18x lift. Runs on `tone="ink"` (dark) since these
 * are still colour-background source files (see lib/content/home.ts) — a
 * dark section is what keeps a desaturated logo's own light/dark tones
 * legible.
 *
 * Each logo is two nested elements, not one: an outer `<span>` carries the
 * continuous CSS `ap-float` drift, the inner `<Image>` carries the
 * hover-driven transition. Both animate `transform` — on the same element
 * that would mean the always-running float wins the cascade and the hover
 * lift/scale would never visually apply (a CSS animation beats a plain
 * transition on the same property regardless of specificity). Splitting
 * them across two elements sidesteps that entirely, same fix as the
 * preloader/logo-spin and ServiceOrbit's icon/wrapper split earlier in
 * this codebase.
 *
 * Pure CSS `@keyframes` for both the float and the marquee scroll (reused
 * `ap-float`/`ap-marquee` from globals.css) — a translateX/Y loop has no
 * business paying for a JS animation loop. Framer only runs the entrance:
 * the header label and each first-pass logo fade up staggered
 * (`Reveal`, `viewport: { once: true }` — fires once on scroll into view,
 * never re-fires as duplicates cycle back through the loop).
 *
 * `ActiveServiceProvider` (shared with ServiceOrbit above) drives the
 * relevance highlight/dim — see `RELATED_CLIENTS_BY_SERVICE` above.
 */
export function ClientWall({ eyebrow = "Trusted by" }: ClientWallProps) {
  const half = Math.ceil(clients.length / 2);
  const rowA = clients.slice(0, half);
  const rowB = clients.slice(half);

  return (
    <Section
      tone="ink"
      paddingY="md-alt"
      className="group/marquee border-ivory/8 relative overflow-hidden border-t"
    >
      <Container className="relative">
        <Reveal className="mb-s24 text-center">
          <Heading
            variant="eyebrow"
            as="div"
            className="text-ivory/45 mb-0 tracking-eyebrow-3 text-xs"
          >
            {eyebrow}
          </Heading>
        </Reveal>
      </Container>

      {/* Full-bleed — breaks out of Container/gutter so the edge fade meets
          the actual viewport edge, not the 1360px content column. */}
      <div className="relative mx-[calc(50%-50vw)] w-screen">
        {/* Desktop + tablet: one continuous row. */}
        <div className="hidden sm:block">
          <MarqueeTrack items={clients} durationS={60} />
        </div>

        {/* Mobile: two rows, opposite directions, different speeds. */}
        <div className="gap-s21 grid sm:hidden">
          <MarqueeTrack items={rowA} durationS={70} />
          <MarqueeTrack items={rowB} durationS={85} reverse />
        </div>
      </div>
    </Section>
  );
}
