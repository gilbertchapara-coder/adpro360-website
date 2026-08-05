export type HeroStat = { value: string; label: string };
export type Belief = { num: string; title: string; body: string };
export type ProofPoint = { value: string; label: string };
export type HeroObject = { id: string; video: string; poster: string; alt: string };

/**
 * The client wall moved from a card grid to a floating monochrome marquee —
 * every logo gets the same `grayscale/invert/opacity` treatment regardless
 * of its own background colour, so the card-era `background`/`shadow`/
 * `padding` split (still visible in git history) no longer means anything;
 * removed rather than left in as dead fields nobody would know to trust.
 *
 * `width`/`height` are each source file's real intrinsic pixel dimensions
 * (checked directly, not guessed) — the marquee sizes every logo off a
 * fixed display *height* with `width: auto`, so Next/Image needs the true
 * aspect ratio to avoid stretching.
 *
 * `logoScale` is the same hand-tuned optical-balancing pass carried over
 * from the card system: two logos at the same display height can still
 * read as wildly different sizes if one is a dense mark that fills its own
 * source canvas and the other (a crest, a seal) has a lot of built-in
 * margin baked into the file. Confirmed by opening each source file and
 * eyeballing content-to-canvas ratio — not computed, a manual call per logo.
 * 1 = no adjustment.
 */
export type Client = {
  name: string;
  logo: string;
  featured?: boolean;
  width: number;
  height: number;
  logoScale: number;
};

export const heroStats: HeroStat[] = [
  { value: "15+", label: "Years of senior marketing experience" },
  { value: "10", label: "Disciplines under one roof" },
  { value: "360°", label: "Strategy to broadcast delivery" },
];

/** Rotates in the hero showreel card caption ("Two minutes of proof, {word}."). */
export const heroRotatorWords = [
  "end to end",
  "shot in Zambia",
  "strategy first",
  "broadcast grade",
];

/**
 * The hero's ambient background — 4 premium cinematic loops (real client
 * footage, no baked-in text), each standing in for one layer of the agency:
 * strategy, film/production, ideas, and media/distribution. Cycled by
 * `HeroObjectSequence`, one at a time, crossfaded — order here is playback
 * order. Not service icons and not literal — see each video's own creative
 * brief for the intended read (compass = strategy/direction, lens =
 * film/production, crystal = ideas, ring = media/reach).
 */
export const heroObjects: HeroObject[] = [
  {
    id: "strategy-compass",
    video: "/videos/strategy-compass.mp4",
    poster: "/videos/strategy-compass.jpg",
    alt: "A precision compass, its needle slowly correcting itself — strategy and direction.",
  },
  {
    id: "cinema-lens",
    video: "/videos/cinema-lens.mp4",
    poster: "/videos/cinema-lens.jpg",
    alt: "A cinema lens with a soft internal glow — film and production craft.",
  },
  {
    id: "creative-catalyst",
    video: "/videos/creative-catalyst.mp4",
    poster: "/videos/creative-catalyst.jpg",
    alt: "A faceted crystal catching and refracting light — ideas and creative thinking.",
  },
  {
    id: "orbital-media-ring",
    video: "/videos/orbital-media-ring.mp4",
    poster: "/videos/orbital-media-ring.jpg",
    alt: "A layered ring with a counter-rotating core — media buying and distribution.",
  },
];


export const beliefs: Belief[] = [
  {
    num: "01",
    title: "Proactive, not reactive",
    body: "We bring the next move before it is asked for.",
  },
  {
    num: "02",
    title: "Driven by intention",
    body: "Every asset answers a brief. Every brief answers a commercial goal.",
  },
  {
    num: "03",
    title: "Always relevant",
    body: "Local insight, held to a global standard — made to move a number, not fill an awards shelf.",
  },
];

export const proofPoints: ProofPoint[] = [
  { value: "One team", label: "Strategy, creative, production and media in the same room" },
  { value: "Senior-led", label: "The people in the pitch are the people on the work" },
  { value: "Measured", label: "Post-campaign reporting on every engagement" },
];

/** Client logo wall — ordered by brand recognition, not alphabetically, per
 * the approved sequencing (leads with the most recognisable names, still
 * shows the spread of industries served). */
export const clients: Client[] = [
  {
    // Small centred wordmark on a large field — reads as a dense mark at
    // marquee height, pulled back slightly.
    name: "DStv",
    logo: "/images/client-dstv.jpeg",
    featured: true,
    width: 300,
    height: 300,
    logoScale: 0.94,
  },
  {
    // Colourful fan mark reads loud even small — left near 1:1.
    name: "MultiChoice",
    logo: "/images/client-multichoice.jpeg",
    featured: true,
    width: 200,
    height: 200,
    logoScale: 0.96,
  },
  {
    name: "Trade Kings Zimbabwe",
    logo: "/images/client-tradekings-zimbabwe.jpeg",
    featured: true,
    width: 447,
    height: 447,
    logoScale: 0.94,
  },
  {
    name: "Big Tree Beverages",
    logo: "/images/client-bigtree-beverages.png",
    featured: true,
    width: 447,
    height: 447,
    logoScale: 0.94,
  },
  {
    // Icon + wordmark + small caption occupy the top ~75% of the canvas —
    // enlarged to close the dead space below.
    name: "Zambia Industrial Commercial Bank (ZICB)",
    logo: "/images/client-zicb.png",
    width: 447,
    height: 447,
    logoScale: 1.08,
  },
  {
    name: "ZSIC General Insurance",
    logo: "/images/client-zsic-general-insurance.png",
    width: 531,
    height: 376,
    logoScale: 1.06,
  },
  {
    // Narrow crest on a much wider/taller canvas — the sparsest mark in
    // the set, needed the largest scale bump of any logo.
    name: "ZCAS University",
    logo: "/images/client-zcas-university.png",
    width: 441,
    height: 453,
    logoScale: 1.16,
  },
  {
    // Circular seal already fills its square canvas edge-to-edge (unlike
    // ZCAS/ZSIC/PICZ, this one is dense, not sparse) — barely enlarged.
    name: "National HIV/AIDS/STI/TB Council (NAC Zambia)",
    logo: "/images/client-nac-zambia.jpeg",
    width: 447,
    height: 447,
    logoScale: 1.02,
  },
  {
    // Chrome badge, icon only, already centred in its own tile — native
    // scale.
    name: "Professional Insurance",
    logo: "/images/client-professional-insurance.jpeg",
    width: 447,
    height: 447,
    logoScale: 1.0,
  },
];
