import type { SVGProps } from "react";

/**
 * Six hand-authored icons for ServiceOrbit — not a generic library. Each
 * service's micro-animation targets a specific sub-part (a flap, three
 * bars, glowing rays, typing dots, a travelling signal, a locking centre),
 * which a fixed-path library icon can't expose. Every animated part is
 * CSS-only (see the `icon-*` keyframes in globals.css) so the orbit's
 * per-frame JS cost stays limited to the one shared `--orbit-angle` custom
 * property — these run on the compositor independently of it.
 *
 * Megaphone/mic/compass/spark (the first pass) were replaced on a UX
 * review pass: a megaphone reads "broadcast", not "social"; a mic and a
 * "connected stakeholders" comms icon were too close to the same idea; a
 * compass communicates wandering exploration more than a strategy's fixed
 * position; sparkles are decorative rather than meaning "an idea". Bulb,
 * chat bubbles, a small stakeholder network and a target replace them —
 * each should read correctly with the label removed (it now is, see
 * `.orbit-item`'s `sr-only` label in ServiceOrbit.tsx).
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Film & Production — slate flap swings open, holds, closes. */
export function SlateIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="9" width="18" height="12" rx="1.5" />
      <path
        className="icon-slate-flap"
        d="M3 9 21 9 21 5 3 8Z"
        style={{ transformOrigin: "3px 9px" }}
      />
    </svg>
  );
}

/** Media Buying — three bars grow and drop, like a live report refreshing. */
export function BarsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect
        className="icon-bar icon-bar-1"
        x="4"
        y="12"
        width="3.4"
        height="8"
        rx="1"
        fill="currentColor"
        stroke="none"
      />
      <rect
        className="icon-bar icon-bar-2"
        x="10.3"
        y="8"
        width="3.4"
        height="12"
        rx="1"
        fill="currentColor"
        stroke="none"
      />
      <rect
        className="icon-bar icon-bar-3"
        x="16.6"
        y="4"
        width="3.4"
        height="16"
        rx="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/** Digital & Social — two overlapping bubbles, a typing indicator lifting
 * in the front one: an active conversation, not a broadcast. */
export function ChatBubblesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M20 6.8a3 3 0 0 0-3-3h-5.5a3 3 0 0 0-3 3v2.6a3 3 0 0 0 3 3h.4v2.2l2.6-2.2H17a3 3 0 0 0 3-3V6.8Z"
        opacity={0.5}
      />
      <path d="M4 12.2a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2.8a3 3 0 0 1-3 3h-3.8L6.2 20.6v-2.6H7a3 3 0 0 1-3-3v-2.8Z" />
      <circle
        className="icon-chat-dot icon-chat-dot-1"
        cx="7.2"
        cy="13.6"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
      <circle
        className="icon-chat-dot icon-chat-dot-2"
        cx="10"
        cy="13.6"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
      <circle
        className="icon-chat-dot icon-chat-dot-3"
        cx="12.8"
        cy="13.6"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/** Corporate Communications — a small signal travels from the centre node
 * out to each connected stakeholder, staggered: the message reaching
 * people, not a mouth speaking. */
export function NetworkPulseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <line x1="12" y1="6.2" x2="12" y2="9.6" />
      <line x1="17.3" y1="14.7" x2="13.5" y2="12.7" />
      <line x1="6.7" y1="14.7" x2="10.5" y2="12.7" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19.2" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="4.8" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <circle
        className="icon-signal icon-signal-1"
        cx="12"
        cy="8"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
      <circle
        className="icon-signal icon-signal-2"
        cx="15.4"
        cy="13.7"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
      <circle
        className="icon-signal icon-signal-3"
        cx="8.6"
        cy="13.7"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/** Brand Strategy — a fixed position, not a search: the centre gives one
 * small, deliberate settle every few seconds rather than spinning or
 * wandering. */
export function TargetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.4" />
      <circle
        className="icon-target-core"
        cx="12"
        cy="12"
        r="1.6"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/** Creative Campaigns — the bulb's rays glow in on a stagger, filament
 * brightening with them: an idea landing, not a decorative twinkle. */
export function BulbIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="10" r="5.5" />
      <path d="M9.6 15.2v-1c0-.6-.3-1-.9-1.4" />
      <path d="M14.4 15.2v-1c0-.6.3-1 .9-1.4" />
      <path d="M9.5 18h5" />
      <path d="M10.3 21h3.4" />
      <g>
        <line className="icon-bulb-ray icon-bulb-ray-1" x1="12" y1="1" x2="12" y2="2.6" />
        <line className="icon-bulb-ray icon-bulb-ray-2" x1="4.6" y1="4.6" x2="5.7" y2="5.7" />
        <line className="icon-bulb-ray icon-bulb-ray-3" x1="19.4" y1="4.6" x2="18.3" y2="5.7" />
        <line className="icon-bulb-ray icon-bulb-ray-4" x1="2.2" y1="10.2" x2="3.9" y2="10.2" />
        <line className="icon-bulb-ray icon-bulb-ray-5" x1="20.1" y1="10.2" x2="21.8" y2="10.2" />
      </g>
      <circle
        className="icon-bulb-filament"
        cx="12"
        cy="10"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
