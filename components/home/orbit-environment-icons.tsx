import type { SVGProps } from "react";

/**
 * Ambient background icon set for OrbitEnvironment — deliberately plainer
 * than orbit-icons.tsx's hero icons (single/double path, no animated
 * sub-parts); atmosphere, not a second set of hero icons, so the extra
 * internal-animation complexity that earns its keep at hero scale would
 * just be wasted rendering cost out here.
 *
 * Distributed across the full canvas outside a safe zone around the
 * orbit (see `buildEnvironment` below) — a night sky, not a halo hugging
 * the orbit or a scatter dumped at the page edges. Every service reuses
 * several of these icons across its own list (Target, Megaphone, Globe,
 * Bell) rather than each getting 24 entirely bespoke shapes — keeps the
 * palette to ~48 icons total instead of ~144, without the six
 * environments reading as identical.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// ---- Film & Production ----
export function IconCamera(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="7" width="13" height="10" rx="1.5" />
      <path d="M15.5 10.5 21 8v8l-5.5-2.5Z" />
    </svg>
  );
}
export function IconClapper(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="9" width="18" height="11" rx="1.2" />
      <path d="M3 9 21 9 21 5 3 8Z" />
    </svg>
  );
}
export function IconFilmReel(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="7.5" r="1.4" />
      <circle cx="16" cy="14" r="1.4" />
      <circle cx="8" cy="14" r="1.4" />
    </svg>
  );
}
export function IconBoomMic(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="8" width="12" height="6" rx="3" transform="rotate(-20 9 11)" />
      <path d="M18 5 20 20" />
    </svg>
  );
}
export function IconStudioLight(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 4h12l-3 8H9Z" />
      <path d="M12 12v8M9 20h6" />
    </svg>
  );
}
export function IconTripod(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 4v9M12 13 6 21M12 13l6 8M8 21h8" />
      <circle cx="12" cy="4" r="2" />
    </svg>
  );
}
export function IconScript(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="5" y="3" width="14" height="18" rx="1.2" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
    </svg>
  );
}
export function IconLens(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
export function IconTimeline(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 12h18" />
      <path d="M7 12V8M12 12V6M17 12V9" />
    </svg>
  );
}

// ---- Creative Campaigns ----
export function IconSparkSimple(p: IconProps) {
  return (
    <svg {...base} {...p} fill="currentColor" stroke="none">
      <path d="M12 3c0 3.6-1 5.5-4.5 5.5C11 8.5 12 10.4 12 14c0-3.6 1-5.5 4.5-5.5C13 8.5 12 6.6 12 3Z" />
    </svg>
  );
}
export function IconWand(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 20 15 9" />
      <path d="M17 3v3M21 5h-3M19.5 8.5l-1.4-1.4M19.5 1.5 18.1 2.9" />
    </svg>
  );
}
export function IconBulbSimple(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="10" r="5.5" />
      <path d="M9.5 18h5M10.3 21h3.4" />
    </svg>
  );
}
export function IconPenNib(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M19 5 5 19l-2 2 2-6L19 5Z" />
      <path d="M14 10l0 0" />
    </svg>
  );
}
export function IconPalette(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3a9 8 0 1 0 0 16c1.2 0 1.6-1.4.7-2.2-.9-.8-.4-2.3.8-2.3H16a4 4 0 0 0 4-4c0-4.4-3.6-7.5-8-7.5Z" />
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconMoodboard(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="8" height="8" rx="1" />
      <rect x="13" y="4" width="8" height="5" rx="1" />
      <rect x="13" y="12" width="8" height="8" rx="1" />
      <rect x="3" y="15" width="8" height="5" rx="1" />
    </svg>
  );
}

// ---- Digital & Social ----
export function IconMegaphoneSimple(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 10v4h3l7 4V6l-7 4H3Z" />
      <path d="M17 9.5c1.5 1.5 1.5 5.5 0 7" />
    </svg>
  );
}
export function IconChatBubbleSimple(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2Z" />
    </svg>
  );
}
export function IconSmartphone(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </svg>
  );
}
export function IconBell(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}
export function IconHashtag(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9 3 7 21M17 3l-2 18M4 8h17M3.2 16h17" />
    </svg>
  );
}
export function IconWifi(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 9c5-4.5 13-4.5 18 0M6.5 13c3.3-2.7 7.7-2.7 11 0M10 17c1.2-1 2.8-1 4 0" />
      <circle cx="12" cy="20" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconShare(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="18" cy="5" r="2.3" />
      <circle cx="6" cy="12" r="2.3" />
      <circle cx="18" cy="19" r="2.3" />
      <path d="M8 10.8 16 6.2M8 13.2l8 4.6" />
    </svg>
  );
}

// ---- Media Buying ----
export function IconBarsSimple(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 20V11M12 20V4M19 20v-7" />
    </svg>
  );
}
export function IconPieChart(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3v9l7.5 4.3A9 9 0 1 0 12 3Z" />
    </svg>
  );
}
export function IconDollar(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2v20" />
      <path d="M16.5 6.5c0-1.9-2-3-4.5-3s-4.5 1.2-4.5 3 2 2.6 4.5 3 4.5 1.1 4.5 3-2 3-4.5 3-4.5-1.1-4.5-3" />
    </svg>
  );
}
export function IconArrowGrowth(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 17 10 10l4 4 7-7" />
      <path d="M15 6h6v6" />
    </svg>
  );
}
export function IconGauge(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15 16 9" />
    </svg>
  );
}
export function IconTargetSimple(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ---- Brand Strategy ----
export function IconCompassSimple(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9 13 13l-4 2 2-4Z" />
    </svg>
  );
}
export function IconFlag(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 3v18" />
      <path d="M6 4h12l-3 4 3 4H6Z" />
    </svg>
  );
}
export function IconMap(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}
export function IconDiamond(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 9 12 3l6 6-6 12Z" />
      <path d="M6 9h12" />
    </svg>
  );
}
export function IconCrown(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 18h16l-1.5-9-4.5 4-2-6-2 6-4.5-4Z" />
      <path d="M4 20.5h16" />
    </svg>
  );
}
export function IconEye(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

// ---- Corporate Communications ----
export function IconNewspaper(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="14" height="15" rx="1" />
      <path d="M17 8h4v9a2 2 0 0 1-2 2h-2" />
      <path d="M6.5 9h7M6.5 12.5h7M6.5 16h4" />
    </svg>
  );
}
export function IconBroadcast(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <path d="M8.5 13.5a5 5 0 0 1 7 0M5.5 10.5a9.5 9.5 0 0 1 13 0" />
    </svg>
  );
}
export function IconGlobe(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </svg>
  );
}
export function IconMail(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}
export function IconUsers(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 4.5a3 3 0 0 1 0 6M21 20c0-2.8-2-5.2-4.5-5.8" />
    </svg>
  );
}

// ---- Added for the composition-rebalancing pass (Film & Production's
// icon list came back fully specified: camera, director's chair, script,
// film reel, cinema light, boom mic, tripod, lens, timeline, monitor,
// battery, SD card, clapperboard) ----
function IconDirectorChair(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 9h14l-1.5 11h-11Z" />
      <path d="M5 9 3 4M19 9l2-5M5 9l14 3.5M7 20v-7.5M17 20v-7.5" />
    </svg>
  );
}
function IconMonitor(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="12" rx="1.3" />
      <path d="M9 20h6M12 16v4" />
      <path d="M10.5 8.5v3l3-1.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconBattery(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="8" width="16" height="8" rx="1.5" />
      <path d="M21 10.5v3" />
      <path d="M6 8v8" fill="none" />
    </svg>
  );
}
function IconSDCard(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M7 3h9l3 3v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M9 3v4M12 3v4M15 3v4" />
    </svg>
  );
}
function IconPercent(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M19 5 5 19" />
      <circle cx="7" cy="7" r="2.3" />
      <circle cx="17" cy="17" r="2.3" />
    </svg>
  );
}
function IconStickyNoteRef(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 4h11l3 3v13H5Z" />
      <path d="M16 4v3h3" />
    </svg>
  );
}

// ---- Added for the second composition pass — full-canvas density, more
// service concepts requested (storyboard, briefcase, chess piece, TV,
// press badge, etc.) ----
function IconVideoPlay(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconStoryboard(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="6" width="7" height="6" rx="1" />
      <rect x="14.5" y="6" width="7" height="6" rx="1" />
      <path d="M9.5 9h5M12 6.5l2-2M12 15v4M8 20h8" />
    </svg>
  );
}
function IconClipboard(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="5" y="4" width="14" height="17" rx="1.3" />
      <rect x="9" y="2.3" width="6" height="3" rx="1" />
      <path d="M8.5 11h7M8.5 15h7" />
    </svg>
  );
}
function IconCursorClick(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 3 6 15 9.5 12.5 12 18 14 17 11.5 11.5 16 11Z" />
    </svg>
  );
}
function IconChessPawn(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="6" r="2.3" />
      <path d="M9 12h6l1.5 6h-9Z" />
      <path d="M8 20h8" />
    </svg>
  );
}
function IconBriefcase(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="8" width="18" height="12" rx="1.3" />
      <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2" />
      <path d="M3 13h18" />
    </svg>
  );
}
function IconPuzzle(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9 4h4v2.2a1.6 1.6 0 0 0 3 0V4h4v4h-2.2a1.6 1.6 0 0 0 0 3H20v4h-4v-2.2a1.6 1.6 0 0 0-3 0V15H9v-4H6.8a1.6 1.6 0 0 1 0-3H9Z" />
    </svg>
  );
}
function IconDirectionArrow(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 12h15M12 5l7 7-7 7" />
    </svg>
  );
}
function IconPressBadge(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="3" width="16" height="12" rx="1.3" />
      <path d="M9 20l3-3 3 3M8 7.5h8M8 10.5h5" />
    </svg>
  );
}
function IconPodium(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 21h14M7 21V9h10v12M9 9V5h6v4" />
    </svg>
  );
}
function IconTV(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="5" width="19" height="13" rx="1.3" />
      <path d="M9 21h6M8 2.5 12 5l4-2.5" />
    </svg>
  );
}
function IconBillboard(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="10" rx="1" />
      <path d="M8 14v6M16 14v6M6 20h4M14 20h4" />
    </svg>
  );
}
function IconDataFlow(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M6.7 7.3 10.5 16.3M17.3 7.3 13.5 16.3" />
    </svg>
  );
}
function IconCloud(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M7 18a4.5 4.5 0 0 1-.5-9 5.5 5.5 0 0 1 10.6-1.8A4 4 0 0 1 17 18Z" />
    </svg>
  );
}
function IconSocialFeed(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8M8 12.5h8M8 16h5" />
    </svg>
  );
}

/**
 * Placement + micro-animation for one background icon — second pass:
 * full-canvas distribution rather than a tight ring around the orbit.
 * Every icon gets a polar position (angle + radius) outside a fixed "safe
 * zone" that keeps the orbit and CentreStage clear, with radius *biased
 * toward the outer edge* of the canvas (`Math.pow(t, DENSITY_BIAS)` below)
 * so density genuinely increases outward — "stars surrounding a planet",
 * not a halo hugging it.
 *
 * Every numeric property (angle, radius, size, opacity, animation variant,
 * duration, delay, drift distance, rotation) is drawn from a small
 * deterministic pseudo-random function (`hashRand`), not `Math.random()`
 * — a real `Math.random()` call here would produce a *different* layout
 * on the server render than on the client's hydration pass, which React
 * treats as a hydration mismatch. `hashRand` is a pure function of its
 * seed, so server and client always agree, while still looking
 * "generated" rather than hand-placed — which is exactly what this pass
 * asked for.
 */
type Variant = "up" | "down" | "left" | "right" | "rotate" | "scale" | "opacity" | "orbit";

const VARIANTS: Variant[] = ["up", "down", "left", "right", "rotate", "scale", "opacity"];

/** Fraction of the container's half-extent, below which nothing is
 * placed — keeps the orbit (rx 320 / ry 132 at its widest) and
 * CentreStage clear. The container is sized in ServiceOrbit.tsx
 * (1600×760), so 0.40 ≈ 320px×152px either side of centre — closely
 * matching the orbit's own real extent with a small margin. */
const SAFE_ZONE_FRAC = 0.4;
/** How close to the container's own edge icons are allowed — kept just
 * under 1.0 so nothing sits flush against the section's clip, avoiding a
 * few very outer icons ever "shows a sliver". */
const MAX_REACH_FRAC = 0.94;
/** <1 biases the radius toward MAX_REACH_FRAC — density increases outward
 * without a hard boundary between "sparse" and "dense". */
const DENSITY_BIAS = 0.55;

const ICONS_PER_SERVICE = 24;

/** Deterministic 0..1 pseudo-random from a numeric seed — same output on
 * server and client for the same seed, unlike Math.random(). */
function hashRand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export type EnvIconPlacement = {
  Icon: (props: IconProps) => React.JSX.Element;
  leftPct: number;
  topPct: number;
  size: number;
  opacity: number;
  variant: Variant;
  durationS: number;
  delayS: number;
  driftPx: number;
  rotateDeg: number;
};

/** `seed` is a per-service offset so each of the six ecosystems gets a
 * genuinely different scatter pattern, not the same 24 positions with
 * different icons dropped in. Icon 0 (the one nearest the orbit's own
 * featured/top position, angle closest to 270°) is nudged just outside
 * the safe zone and gets the "orbit" highlight variant — same "it
 * noticed" pop as the previous pass, adapted to the new layout. */
function buildEnvironment(icons: EnvIconPlacement["Icon"][], seed: number): EnvIconPlacement[] {
  return Array.from({ length: ICONS_PER_SERVICE }, (_, i) => {
    const s = seed + i * 97.13;
    const angleDeg = hashRand(s + 1) * 360;
    const rad = (angleDeg * Math.PI) / 180;
    const radiusFrac =
      SAFE_ZONE_FRAC + (MAX_REACH_FRAC - SAFE_ZONE_FRAC) * Math.pow(hashRand(s + 2), DENSITY_BIAS);

    const isFeaturedNeighbour = i === 0;
    const opacityBase = 0.35 + hashRand(s + 3) * 0.25; // 0.35–0.60

    return {
      Icon: icons[i % icons.length],
      leftPct: 50 + radiusFrac * 50 * Math.cos(rad),
      topPct: 50 + radiusFrac * 50 * Math.sin(rad),
      size: Math.round(16 + hashRand(s + 4) * 8), // 16–24px
      opacity: isFeaturedNeighbour ? 0.6 : opacityBase,
      variant: isFeaturedNeighbour ? "orbit" : VARIANTS[Math.floor(hashRand(s + 5) * VARIANTS.length)],
      durationS: 8 + hashRand(s + 6) * 12, // 8–20s
      delayS: hashRand(s + 7) * 4,
      driftPx: 3 + hashRand(s + 8) * 3, // 3–6px
      rotateDeg: 3 + hashRand(s + 9) * 3, // 3–6deg
    };
  });
}

export const SERVICE_ENVIRONMENTS: Record<string, EnvIconPlacement[]> = {
  production: buildEnvironment(
    [
      IconCamera,
      IconDirectorChair,
      IconScript,
      IconFilmReel,
      IconStudioLight,
      IconBoomMic,
      IconTripod,
      IconLens,
      IconTimeline,
      IconMonitor,
      IconBattery,
      IconSDCard,
      IconClapper,
      IconVideoPlay,
    ],
    100
  ),
  creative: buildEnvironment(
    [
      IconSparkSimple,
      IconWand,
      IconBulbSimple,
      IconPenNib,
      IconPalette,
      IconMoodboard,
      IconStickyNoteRef,
      IconTargetSimple,
      IconStoryboard,
      IconClipboard,
      IconMegaphoneSimple,
      IconHashtag,
    ],
    200
  ),
  digital: buildEnvironment(
    [
      IconMegaphoneSimple,
      IconChatBubbleSimple,
      IconSmartphone,
      IconBell,
      IconHashtag,
      IconWifi,
      IconShare,
      IconUsers,
      IconGlobe,
      IconSocialFeed,
      IconCloud,
      IconCursorClick,
      IconVideoPlay,
    ],
    300
  ),
  media: buildEnvironment(
    [
      IconBarsSimple,
      IconPieChart,
      IconArrowGrowth,
      IconDollar,
      IconGauge,
      IconTargetSimple,
      IconPercent,
      IconTV,
      IconBillboard,
      IconCursorClick,
      IconDataFlow,
      IconMonitor,
    ],
    400
  ),
  strategy: buildEnvironment(
    [
      IconCompassSimple,
      IconFlag,
      IconMap,
      IconDiamond,
      IconCrown,
      IconEye,
      IconTargetSimple,
      IconChessPawn,
      IconBriefcase,
      IconPuzzle,
      IconDirectionArrow,
    ],
    500
  ),
  comms: buildEnvironment(
    [
      IconNewspaper,
      IconBroadcast,
      IconGlobe,
      IconMail,
      IconUsers,
      IconMegaphoneSimple,
      IconBell,
      IconPressBadge,
      IconPodium,
    ],
    600
  ),
};
