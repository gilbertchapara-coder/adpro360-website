import type { SVGProps } from "react";

/**
 * Ambient background icon set for OrbitEnvironment — deliberately plainer
 * than orbit-icons.tsx's hero icons (single/double path, no animated
 * sub-parts); atmosphere, not a second set of hero icons, so the extra
 * internal-animation complexity that earns its keep at hero scale would
 * just be wasted rendering cost out here.
 *
 * Positioned in three rings tethered to the orbit's own centre (see
 * `buildEnvironment` below) rather than scattered toward the page edges —
 * a constellation around the orbit, not decoration in the margins. Every
 * service reuses several of these icons (Target, Megaphone, Bars, Users)
 * rather than each getting 13 entirely bespoke shapes — keeps the palette
 * to ~35 icons total instead of ~78, without the six environments reading
 * as identical.
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

/**
 * Placement + micro-animation for one background icon — rebalanced from
 * edge-scattered to orbit-tethered: every icon's position is now a
 * (ring, angle) pair around the orbit's own centre rather than a raw
 * percentage of the full section, so the whole ecosystem reads as one
 * connected constellation instead of decoration near the page edges.
 *
 * Three rings, each a fixed set of angles reused across every service —
 * same "shape" of constellation every time, just different icons filling
 * it, which keeps the composition consistent as the active service
 * changes rather than reshuffling. `RING` carries each tier's radius (as
 * a fraction of ORBIT_ENV_HALF_W/H below), size, and base opacity —
 * opacity stays inside the original 10/18/25/35% ceiling from the first
 * pass ("never brighter than the active orbit icon"); this pass's
 * "100/70/35%" depth request is implemented as relative tiers *within*
 * that ceiling (inner = the full 35%, middle ≈70% of it, outer ≈35% of
 * it) rather than literal 100% opacity, which would compete with the
 * orbit itself.
 */
type Ring = "inner" | "middle" | "outer";
type Variant = "float" | "drift" | "rotate" | "glow" | "pulse" | "orbit";

const RING: Record<Ring, { radiusFrac: number; size: number; opacity: 0.12 | 0.25 | 0.35 }> = {
  inner: { radiusFrac: 0.58, size: 34, opacity: 0.35 },
  middle: { radiusFrac: 0.78, size: 27, opacity: 0.25 },
  outer: { radiusFrac: 0.97, size: 21, opacity: 0.12 },
};

/** Angles in degrees, standard screen convention (0 = right, 90 = down,
 * 270/-90 = up — matching ServiceOrbit's own FEATURED_ANGLE). Same four
 * angles repeat across all three rings' worth of slots, offset from the
 * cardinal points so nothing lines up in a grid, and spread so every
 * quadrant gets 3+ icons (13 total: 4 inner + 5 middle + 4 outer). The
 * inner-ring slot at 290° sits nearest the orbit's own top/featured
 * position — that's the one icon per service that gets the "orbit"
 * highlight variant (see `.orbit-env-orbit` in globals.css). */
const ANGLES: Record<Ring, number[]> = {
  inner: [40, 130, 220, 290],
  middle: [15, 95, 165, 245, 320],
  outer: [55, 145, 235, 325],
};

export type EnvIconPlacement = {
  Icon: (props: IconProps) => React.JSX.Element;
  leftPct: number;
  topPct: number;
  size: number;
  opacity: 0.12 | 0.25 | 0.35;
  variant: Variant;
  durationS: number;
  delayS: number;
};

/** Icons in ring/angle order — index 0..3 = inner (40/130/220/290°),
 * 4..8 = middle, 9..12 = outer. Index 3 (angle 290, inner ring) is the
 * "nearest the orbit's featured position" slot. */
function buildEnvironment(icons: EnvIconPlacement["Icon"][]): EnvIconPlacement[] {
  const slots: { ring: Ring; angle: number }[] = [
    ...ANGLES.inner.map((angle) => ({ ring: "inner" as const, angle })),
    ...ANGLES.middle.map((angle) => ({ ring: "middle" as const, angle })),
    ...ANGLES.outer.map((angle) => ({ ring: "outer" as const, angle })),
  ];
  const variants: Variant[] = ["float", "drift", "rotate", "glow", "pulse"];

  return slots.map((slot, i) => {
    const rad = (slot.angle * Math.PI) / 180;
    const { radiusFrac, size, opacity } = RING[slot.ring];
    const isFeaturedNeighbour = slot.ring === "inner" && slot.angle === 290;
    return {
      Icon: icons[i % icons.length],
      leftPct: 50 + radiusFrac * 50 * Math.cos(rad),
      topPct: 50 + radiusFrac * 50 * Math.sin(rad),
      size,
      opacity,
      variant: isFeaturedNeighbour ? "orbit" : variants[i % variants.length],
      durationS: 8 + ((i * 1.7) % 7), // 8–15s, per-icon spread without a random source
      delayS: (i * 0.6) % 3,
    };
  });
}

export const SERVICE_ENVIRONMENTS: Record<string, EnvIconPlacement[]> = {
  production: buildEnvironment([
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
  ]),
  creative: buildEnvironment([
    IconSparkSimple,
    IconWand,
    IconBulbSimple,
    IconPenNib,
    IconPalette,
    IconMoodboard,
    IconStickyNoteRef,
    IconTargetSimple,
    IconSparkSimple,
    IconWand,
    IconBulbSimple,
    IconPalette,
    IconPenNib,
  ]),
  digital: buildEnvironment([
    IconMegaphoneSimple,
    IconChatBubbleSimple,
    IconSmartphone,
    IconBell,
    IconHashtag,
    IconWifi,
    IconShare,
    IconUsers,
    IconMegaphoneSimple,
    IconChatBubbleSimple,
    IconBell,
    IconHashtag,
    IconSmartphone,
  ]),
  media: buildEnvironment([
    IconBarsSimple,
    IconPieChart,
    IconArrowGrowth,
    IconDollar,
    IconGauge,
    IconTargetSimple,
    IconPercent,
    IconBarsSimple,
    IconPieChart,
    IconDollar,
    IconArrowGrowth,
    IconTargetSimple,
    IconGauge,
  ]),
  strategy: buildEnvironment([
    IconCompassSimple,
    IconFlag,
    IconMap,
    IconDiamond,
    IconCrown,
    IconEye,
    IconTargetSimple,
    IconCompassSimple,
    IconFlag,
    IconDiamond,
    IconMap,
    IconCrown,
    IconEye,
  ]),
  comms: buildEnvironment([
    IconNewspaper,
    IconBroadcast,
    IconGlobe,
    IconMail,
    IconUsers,
    IconMegaphoneSimple,
    IconNewspaper,
    IconBroadcast,
    IconGlobe,
    IconMail,
    IconUsers,
    IconMegaphoneSimple,
    IconNewspaper,
  ]),
};
