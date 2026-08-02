"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useAnimationFrame,
  useReducedMotion,
  animate,
} from "framer-motion";
import type { PanInfo } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { useActiveService } from "./active-service-context";
import { services, type Service } from "@/lib/content";
import {
  SlateIcon,
  BarsIcon,
  ChatBubblesIcon,
  NetworkPulseIcon,
  TargetIcon,
  BulbIcon,
} from "./orbit-icons";

const ICON_BY_SERVICE: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  strategy: TargetIcon,
  creative: BulbIcon,
  production: SlateIcon,
  media: BarsIcon,
  digital: ChatBubblesIcon,
  comms: NetworkPulseIcon,
};

/** Centre-stage taglines — three to six words, one line, no explanation.
 * Deliberately separate from `service.lede` in lib/content/services.ts:
 * the lede is real sell copy for the /services page, this is a much
 * shorter beat meant to be glanced at mid-orbit, not read. */
const TAGLINE_BY_SERVICE: Record<string, string> = {
  strategy: "Ideas with direction.",
  creative: "Impossible to ignore.",
  production: "Stories that move.",
  media: "Every impression matters.",
  digital: "Built for modern attention.",
  comms: "Messages that build trust.",
};

/** Degrees/second at rest. Slow — this is a gallery piece, not a ticker. */
const BASE_SPEED = 6;
/** Degrees/second while a visitor is hovering/dragging. */
const SLOW_SPEED = 0.5;
/** Degrees/second for the ~1s dwell every time a new item reaches centre —
 * softer than the hover slowdown so "settling" reads distinct from a
 * deliberate interaction. */
const SETTLE_SPEED = 0.9;
const SETTLE_MS = 950;
/** Minimum time CentreStage holds one service before switching to the
 * next — "hold for approximately 2 seconds" — decoupled from the orbit's
 * own continuous rotation (which never stops or slows for this): the
 * ellipse keeps turning exactly as it already did, this only gates *when
 * the text is allowed to react* to that motion. Bypassed while a visitor
 * is actively dragging, so direct manipulation still feels immediate. */
const MIN_HOLD_MS = 2000;
/** Top of the ellipse — the item at this angle is the one the whole scene
 * reads as "in front". Chosen over the sides so the label/centre stage has
 * clear air instead of colliding with a neighbour swinging past below. */
const FEATURED_ANGLE = -90;
/** How many screen-pixels of drag equal one degree of orbit rotation. */
const DRAG_SENSITIVITY = 0.3;

/** Shortest signed distance (deg) from `angle` to FEATURED_ANGLE, wrapped
 * to -180..180 — used both to find which item is currently featured and,
 * per-item, by the CSS `--item-t` cosine falloff in globals.css. */
function angleDistance(angle: number) {
  return ((((angle - FEATURED_ANGLE) % 360) + 540) % 360) - 180;
}

function nearestServiceIndex(orbitAngle: number, count: number) {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < count; i++) {
    const dist = Math.abs(angleDistance(orbitAngle + (360 / count) * i));
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best;
}

function OrbitItem({ service, offsetDeg }: { service: Service; offsetDeg: number }) {
  const Icon = ICON_BY_SERVICE[service.id] ?? BulbIcon;

  return (
    <NextLink
      href={`/services#${service.id}`}
      data-cursor="Explore"
      className="orbit-item flex w-[112px] flex-col items-center gap-s09 text-center sm:w-[144px]"
      style={{ ["--item-offset" as string]: offsetDeg }}
    >
      <span className="orbit-icon flex items-center justify-center">
        <Icon className="size-[28px] sm:size-[38px]" />
      </span>
      {/* The name now lives once, in CentreStage — showing it here too was
          the exact repetition the brief asked to remove. Kept in the DOM
          (not deleted) as the link's accessible name, just visually
          hidden, so screen-reader/keyboard behaviour is unchanged. */}
      <span className="sr-only">{service.title}</span>
    </NextLink>
  );
}

/** The idle ellipse the icons ride on — the same `--orbit-rx`/`--orbit-ry`
 * custom properties the items themselves read, so it always matches the
 * real path exactly regardless of breakpoint. Faint (~10% opacity) with a
 * slow breathing pulse (`orbit-ring-breathe`, globals.css) — this is the
 * "resting" state; the travelling energy itself is `OrbitPulses` below,
 * layered on top. */
function OrbitPath() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 h-[calc(var(--orbit-ry)*2)] w-[calc(var(--orbit-rx)*2)] -translate-x-1/2 -translate-y-1/2"
    >
      <svg width="100%" height="100%" className="orbit-ring-breathe overflow-visible">
        <ellipse
          cx="50%"
          cy="50%"
          rx="50%"
          ry="50%"
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth="1"
          style={{ filter: "blur(1.5px)" }}
        />
      </svg>
    </div>
  );
}

/** Degrees a trailing echo sits behind its lead pulse — small enough to
 * read as one piece of energy with a short tail, not a second, separate
 * dot. */
const PULSE_TRAIL_DEG = 9;

/**
 * The "energy travelling around the orbit" layer, one pair per service —
 * a lead pulse riding exactly where that service's icon sits (doubling as
 * the brief's "subtle bloom behind the icon", since it's the same
 * position) plus a smaller, fainter echo a few degrees behind it. Both
 * reuse the *exact* cosine falloff `.orbit-item` already uses for
 * `--item-t` (globals.css) — same closeness-to-featured-angle math, same
 * `--orbit-angle`/`--orbit-rx`/`--orbit-ry` inputs, just applied to a
 * blurred dot instead of an icon — so "cyan near the edges, brightening
 * toward white at the featured angle, fading back to cyan just after" is
 * one continuous `color-mix()` read off a value that's already being
 * computed for six other elements, not a second animation system bolted
 * on. No extra JS: everything here is CSS reading the one motion value
 * ServiceOrbit already writes per frame. */
function OrbitPulses() {
  return (
    <>
      {services.map((_, i) => {
        const offsetDeg = (360 / services.length) * i;
        return (
          <div key={i} aria-hidden="true">
            <div className="orbit-pulse" style={{ ["--item-offset" as string]: offsetDeg }} />
            <div
              className="orbit-pulse orbit-pulse--trail"
              style={{ ["--item-offset" as string]: offsetDeg - PULSE_TRAIL_DEG }}
            />
          </div>
        );
      })}
    </>
  );
}

/** Slow, independently-phased light specks — "very slow, very minimal, no
 * obvious looping". Reuses the sitewide `ap-float`/`ap-pulse` keyframes
 * (already defined in globals.css for the hero pulse-dot and client-card
 * float) rather than inventing new ones; each speck just gets its own
 * duration/delay so six of them never read as one obvious repeating unit. */
function AmbientParticles() {
  const specks = [
    { left: "12%", top: "22%", size: 3, floatS: 11, pulseS: 6.5, delay: 0 },
    { left: "82%", top: "18%", size: 2, floatS: 13.5, pulseS: 8, delay: 1.2 },
    { left: "22%", top: "78%", size: 2.5, floatS: 9.5, pulseS: 7.2, delay: 2.4 },
    { left: "90%", top: "70%", size: 3, floatS: 14, pulseS: 5.8, delay: 0.6 },
    { left: "50%", top: "10%", size: 2, floatS: 12, pulseS: 9, delay: 3.1 },
    { left: "6%", top: "52%", size: 2.5, floatS: 10.5, pulseS: 6, delay: 1.8 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {specks.map((s, i) => (
        <span
          key={i}
          className="rounded-pill bg-teal-bright absolute"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animation: `ap-float ${s.floatS}s ease-in-out infinite, ap-pulse ${s.pulseS}s ease-in-out infinite`,
            animationDelay: `${s.delay}s, ${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/** The centre of the ellipse — the one place the service's name now lives
 * at all, since OrbitItem's own label went `sr-only`. No container, no
 * background, no panel — just type floating in the same negative space
 * the ellipse already leaves empty. `text-fluid-11` is the accordion-title
 * token from /services (`--text-fluid-11`, globals.css) — reused rather
 * than invented, ~40% up from the previous `text-h3-a` here, and it's
 * already the right semantic weight: this is the same "one service's own
 * name" role, just staged inside the orbit instead of a list row.
 * Title -> divider -> tagline stagger on their own delays so they read as
 * one sequence, not three arrivals — cross-fading the same way
 * TestimonialCarousel's quote does (AnimatePresence mode="wait", same
 * signature ease). */
function CentreStage({ service }: { service: Service }) {
  const EASE = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="pointer-events-none absolute top-1/2 left-1/2 w-[260px] -translate-x-1/2 -translate-y-1/2 text-center sm:w-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -8, transition: { duration: 0.25, ease: EASE } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-fluid-11 tracking-eyebrow-1 text-ivory leading-none font-bold uppercase text-balance"
          >
            {service.title}
          </motion.div>

          {/* A soft beam, not a rule — grows outward from the centre then
              the same parent exit fades it with everything else, so it
              recedes before the next service's beam grows in. */}
          <motion.div
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1 } }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
            style={{ transformOrigin: "center" }}
            className="mx-auto my-s16 h-px w-16 bg-[linear-gradient(90deg,transparent,var(--color-teal-bright)_50%,transparent)] opacity-70 shadow-[0_0_12px_4px_rgba(35,174,192,0.4)]"
          />

          <motion.p
            variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.28 }}
            className="text-ivory/42 text-sm-plus leading-snug font-light text-balance"
          >
            {TAGLINE_BY_SERVICE[service.id]}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * True elliptical orbit — six real services, evenly spaced (360/6 = 60°
 * apart) around a closed path, so there is never a "gap" state to
 * engineer: every item is always somewhere on the ellipse, continuously.
 * That's the structural difference from the horizontal marquee this
 * replaces (Marquee.tsx, still used as-is on /work — untouched, this is a
 * sibling component, not a repurposing).
 *
 * The only thing driven per-frame from JS is a single motion value,
 * `angle`, written straight to the `--orbit-angle` custom property on the
 * track div (bypassing React render entirely). Every item's actual
 * position falls out of plain CSS trig reading that one property — see
 * `.orbit-item` in globals.css. `activeIndex` (which service the centre
 * stage displays) is the one piece of state that *does* need a React
 * re-render, so it's derived from the same motion value via
 * `useMotionValueEvent` and only committed when the nearest item actually
 * changes — a handful of times a minute, not every frame.
 *
 * Hover/focus/drag softens the rotation speed; landing on a new item does
 * too, briefly (`SETTLE_MS`) — both routed through the same `speed` motion
 * value and an `interacting` ref so they never fight each other (a settle
 * dip won't override a visitor's own hover, and a hover always takes
 * priority over the automatic one).
 */
export function ServiceOrbit() {
  const angle = useMotionValue(0);
  const speed = useMotionValue(BASE_SPEED);
  const prefersReducedMotion = useReducedMotion();
  const dragStartAngle = useRef(0);
  const interacting = useRef(false);
  const settleTimer = useRef<number | undefined>(undefined);
  const lastIndex = useRef(0);
  const lastSwitchAt = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setActiveServiceId } = useActiveService();

  // Seed ClientWall with the initial featured service (index 0) — the
  // change-detection below only fires once the orbit actually *moves* to a
  // new index, so without this the first service never gets announced.
  useEffect(() => {
    setActiveServiceId(services[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    angle.set(angle.get() + (speed.get() * delta) / 1000);
  });

  useMotionValueEvent(angle, "change", (latest) => {
    const idx = nearestServiceIndex(latest, services.length);
    if (idx === lastIndex.current) return;

    const now = performance.now();
    if (!interacting.current && now - lastSwitchAt.current < MIN_HOLD_MS) return;

    lastIndex.current = idx;
    lastSwitchAt.current = now;
    setActiveIndex(idx);
    setActiveServiceId(services[idx].id);

    if (prefersReducedMotion || interacting.current) return;
    window.clearTimeout(settleTimer.current);
    animate(speed, SETTLE_SPEED, { duration: 0.4, ease: "easeOut" });
    settleTimer.current = window.setTimeout(() => {
      if (!interacting.current) animate(speed, BASE_SPEED, { duration: 0.6, ease: "easeOut" });
    }, SETTLE_MS);
  });

  const slowDown = () => {
    interacting.current = true;
    window.clearTimeout(settleTimer.current);
    animate(speed, SLOW_SPEED, { duration: 0.5, ease: "easeOut" });
  };

  const speedUp = () => {
    interacting.current = false;
    animate(speed, BASE_SPEED, { duration: 0.6, ease: "easeOut" });
  };

  const handlePanStart = () => {
    interacting.current = true;
    window.clearTimeout(settleTimer.current);
    dragStartAngle.current = angle.get();
    animate(speed, 0, { duration: 0.2, ease: "easeOut" });
  };

  const handlePan = (_: PointerEvent, info: PanInfo) => {
    angle.set(dragStartAngle.current + info.offset.x * DRAG_SENSITIVITY);
  };

  return (
    <section className="border-ivory/8 bg-midnight text-ivory relative overflow-hidden border-t py-[48px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.09] [background:radial-gradient(50%_120%_at_50%_45%,var(--color-teal),transparent_70%)]"
      />
      <Reveal>
        <motion.div
          onHoverStart={slowDown}
          onHoverEnd={speedUp}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={speedUp}
          style={{
            ["--orbit-angle" as string]: angle,
            ["--orbit-featured-angle" as string]: FEATURED_ANGLE,
          }}
          className="relative mx-auto h-[420px] w-full max-w-[440px] touch-pan-y select-none [--orbit-rx:186px] [--orbit-ry:82px] sm:h-[640px] sm:max-w-[980px] sm:[--orbit-rx:320px] sm:[--orbit-ry:132px]"
        >
          <AmbientParticles />
          <OrbitPath />
          <OrbitPulses />
          <CentreStage service={services[activeIndex]} />
          {services.map((service, i) => (
            <OrbitItem key={service.id} service={service} offsetDeg={(360 / services.length) * i} />
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}
