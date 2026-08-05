"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import NextLink from "next/link";
import { Heading } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { FrameCorners } from "@/components/shared/FrameCorners";
import { HeroObjectSequence } from "./HeroObjectSequence";
import { HeroSequenceProvider } from "./hero-sequence-context";
import { HeroHeadline, HeroBody } from "./HeroSequenceText";
import { useMagnetic } from "@/lib/hooks/useMagnetic";
import { useGlare } from "@/lib/hooks/useGlare";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { heroStats, heroRotatorWords } from "@/lib/content";

function useRotator(words: string[], intervalMs = 2600) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs, prefersReducedMotion]);

  return words[index];
}

function HeroStat({ value, label }: { value: string; label: string }) {
  const display = useCountUp(value);
  return (
    <div>
      <div className="text-fluid-01 tracking-tighter-2 bg-[image:linear-gradient(120deg,var(--color-teal),var(--color-azure))] bg-clip-text leading-none font-light text-transparent">
        {display}
      </div>
      <div className="mt-s07 text-eyebrow leading-body-tight tracking-eyebrow-3 text-ivory/50 font-bold uppercase">
        {label}
      </div>
    </div>
  );
}

export function Hero() {
  const rotatorWord = useRotator(heroRotatorWords);
  const magnetic = useMagnetic<HTMLAnchorElement>();
  /* maxTiltDeg=0 — this card is a primary click target (play/pause), not a
   * passive link like the tilt cards elsewhere. The mouse-tracked rotateX/
   * rotateY was shifting the card's rendered position as the cursor moved
   * toward its lower half (small, off-center element under a section-wide
   * `perspective`, so the tilt isn't centred on the card itself) — the
   * element visually receded from under the cursor exactly where a user
   * was trying to click. Keeps the glare/sheen mouse-follow sheen (--mx/
   * --my), only the rotation is disabled. */
  const glareRef = useGlare<HTMLDivElement>(0);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 180]);
  const parallaxOpacity = useTransform(scrollY, [0, 1000], [1, 0.5]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  /* `playing` is set from the video's own `onPlay`/`onPause` events below,
   * not from this function or the play() promise — confirmed live that
   * play() can genuinely succeed (video.paused === false) while a
   * `.then(() => setPlaying(true))` chain here still hadn't fired, leaving
   * the ▶ overlay stuck on screen over an actually-playing video. The
   * native events are the one source of truth the browser guarantees. */
  const toggleShowreel = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch((error) => {
        console.error("Showreel play() rejected", error);
      });
    } else {
      video.pause();
    }
  };

  return (
    <HeroSequenceProvider>
    <section className="bg-midnight px-gutter-x pt-hero-pt text-ivory perspective-[1000px] relative flex min-h-screen flex-col justify-end overflow-hidden">
      <motion.div
        style={{ y: parallaxY, opacity: parallaxOpacity }}
        className="absolute -inset-[6%]"
      >
        {/* 4 textless cinematic object loops replacing the former still-photo
            ambient background — see HeroObjectSequence for the crossfade/
            reduced-motion logic and lib/content/home.ts's heroObjects for
            the per-object brief. Dropped the old ap-drift pan/zoom that
            wrapped the still photo: that animation existed to keep an
            otherwise-static image from feeling dead, which doesn't apply to
            footage that's already deliberately, slowly in motion — layering
            an independent zoom/pan on top of it would fight the object's
            own choreography rather than support it. */}
        <div className="absolute inset-0">
          <HeroObjectSequence />
        </div>
      </motion.div>
      {/* Directional, not just vertical: the object is the storyteller and
          needs to read clearly on its own side, but the headline column
          (left, in normal document flow below) still needs a dependable
          contrast floor underneath it regardless of which object/frame is
          behind it. A second, horizontal wash — heavier stage-left, clear
          by center — does that without touching the vertical wash's own
          job (protecting the header/CTA bands top and bottom). */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-midnight)_75%,transparent)_0%,color-mix(in_srgb,var(--color-midnight)_48%,transparent)_40%,color-mix(in_srgb,var(--color-midnight)_80%,transparent)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-midnight)_62%,transparent)_0%,transparent_58%)]" />

      {/* Atmosphere, replacing the old oversized ghost-text "Proactive." —
          that word competed with the cinematic objects for focal attention
          once they existed; this is deliberately not another word or
          shape, just depth: a faint blueprint-style grid (the kind of
          precision-instrument texture a compass/lens/orbit already imply)
          and a soft cyan bloom, both low enough opacity to read as ambient
          light rather than content. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(color-mix(in_srgb,var(--color-teal)_70%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-teal)_70%,transparent)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      <div className="rounded-pill absolute -top-[20%] -right-[10%] size-[60vw] bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-teal)_28%,transparent),color-mix(in_srgb,var(--color-azure)_6%,transparent)_55%,transparent_70%)] blur-2xl" />

      {/* The real showreel, in the slot the card's own design already
          promised ("Two minutes of proof" + a play button sitting over a
          still). Was a plain link to /work — now plays HeroFilm.mp4 in
          place, click-to-play so the 47MB source only loads on demand.
          `preload="metadata"` (not "none") — the moov atom here is ~22KB,
          negligible, but having the browser resolve the resource ahead of
          the click made programmatic `.play()` fire reliably; with "none"
          it silently never progressed past readyState 0. "See the work"
          below still covers the /work navigation this used to do.

          Below `nav` (900px) this was `hidden` outright — the card only
          made sense as a floating aside next to desktop's side-by-side
          text, and nothing replaced it, so mobile visitors had no reel at
          all. Same single video element, same click target; only the
          positioning is responsive — in-flow, full-width, ordered after
          the CTA row (`order-2` — `section` is `flex flex-col`, so this
          purely visual reorder needs no DOM move) below `nav`, then back
          to the absolute floating card at `nav` and up. */}
      <div
        ref={glareRef}
        role="button"
        tabIndex={0}
        aria-labelledby="showreel-state showreel-eyebrow showreel-desc"
        onClick={toggleShowreel}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleShowreel();
          }
        }}
        data-glare=""
        data-cursor={playing ? "Pause" : "Watch"}
        className="ease-signature z-card-accent border-ivory/18 bg-ivory/7 p-s17 text-ivory hover:-translate-y-s03 active:scale-[0.98] hover:border-teal/60 relative order-3 mx-auto mt-s20 w-full max-w-[380px] cursor-pointer rounded-2xl border backdrop-blur-xl backdrop-saturate-[var(--saturate-glass)] transition-transform duration-[var(--duration-slower)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-teal nav:absolute nav:top-[22vh] nav:right-gutter-x nav:mx-0 nav:mt-0 nav:w-[268px] nav:max-w-none"
      >
        {/* Accessible name built from aria-labelledby (below), not
            aria-label -- this control's visible content is a whole card
            (eyebrow + description), not a short label, and an aria-label
            that doesn't literally contain that visible text fails WCAG
            2.5.3 Label in Name (a voice-control user saying what they see
            can't activate it). aria-labelledby concatenates the referenced
            nodes' own text, so the accessible name is guaranteed to
            contain what's visibly shown -- this state prefix is the only
            part that isn't already visible on the card. */}
        <span id="showreel-state" className="sr-only">
          {playing ? "Pause" : "Play"}
        </span>
        <div className="glare-layer" />
        <div className="mb-s15 bg-surface-dark relative aspect-[16/10] overflow-hidden rounded-sm">
          <div className="sheen-layer" />
          <video
            ref={videoRef}
            src="/videos/hero-film.mp4"
            poster="/images/hero-showreel-behind-the-scenes.jpg"
            preload="metadata"
            playsInline
            muted
            loop
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={(event) => {
              console.error("Showreel failed to load", event.currentTarget.error);
            }}
            className="absolute inset-0 size-full object-cover"
          />
          <FrameCorners className="inset-s09" />
          <span
            className={`ease-signature absolute inset-0 flex items-center justify-center transition-opacity duration-[var(--duration-moderate)] ${
              playing ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <span className="size-s32 rounded-pill bg-ivory/92 text-midnight flex items-center justify-center pl-[3px] text-base">
              ▶
            </span>
          </span>
        </div>
        <div
          id="showreel-eyebrow"
          className="mb-s05 text-3xs tracking-eyebrow-4 text-teal font-bold uppercase"
        >
          Showreel · 30 sec
        </div>
        <div id="showreel-desc" className="text-md-plus leading-relaxed-4 tracking-tight-2">
          Thirty seconds of proof, {rotatorWord}.
        </div>
      </div>

      {/* The orbit no longer lives in the hero — it was a floating third
          element competing with the headline/showreel for attention, and
          only ever had real breathing room above 1600px anyway (measured
          extensively in an earlier pass). It's now its own large standalone
          section between ClientWall and Services (see OrbitBridge.tsx /
          app/page.tsx), where it can be sized as a genuine "constellation"
          instead of a compact widget shoehorned beside the text column. */}

      <div className="max-w-content pb-s27 relative mx-auto w-full">
        <Reveal className="mb-s25 gap-s09 rounded-pill border-ivory/16 bg-ivory/6 py-s05 pr-s13 pl-s07 tracking-eyebrow-4 text-ivory/78 inline-flex items-center border text-xs font-bold uppercase backdrop-blur-sm">
          <span className="rounded-pill bg-teal size-[7px] animate-[ap-pulse_2.6s_ease-in-out_infinite]" />
          Media · Creative · Production
        </Reveal>

        {/* The oversized ghost word "Proactive." used to lead this heading
            — removed completely (not replaced with another background
            word) once the cinematic hero objects gave the composition a
            second focal point of its own; keeping both competed for
            attention. The atmosphere layer above (blueprint grid + bloom)
            carries the "premium background" job instead. */}
        <Heading as="h1" variant="display-hero">
          <HeroHeadline className="inline-block" />
        </Heading>

        {/* Headline + body both now come from the active chapter
            (HeroSequenceProvider) instead of static copy — see
            HeroSequenceText for the per-object reveal effects and
            lib/content/home.ts's heroObjects for the copy itself. The old
            on-scroll Reveal wrapper is gone here on purpose: Reveal only
            ever fires once per element (`viewport:{once:true}`), so it
            would have played for chapter 1 and then silently never
            animated again for chapters 2-4 — the chapter-beat-driven
            animation inside HeroHeadline/HeroBody replaces it entirely for
            this one spot. */}
        <HeroBody className="mt-s24 max-w-copy-xs text-lede leading-snug-2 tracking-tight-2 text-ivory/86 text-balance" />

        <Reveal delay={420}>
          <div className="mt-hero-content-mt gap-s16 border-ivory/14 pt-s23 grid max-w-copy grid-cols-2 border-t md:grid-cols-3">
            {heroStats.map((stat) => (
              <HeroStat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </Reveal>

        <div className="mt-hero-content-gap gap-s18 pb-s25 flex flex-wrap items-center justify-between">
          <div className="gap-s11 flex flex-wrap items-center">
            <NextLink
              ref={magnetic.ref}
              href="/contact"
              data-magnetic=""
              className="ease-signature gap-s11 rounded-pill px-s23 py-s15 text-base-plus tracking-tight-3 shadow-glow hover:shadow-glow-hover inline-flex items-center bg-[image:var(--gradient-brand)] font-bold text-white transition-[transform,box-shadow] duration-[var(--duration-moderate)] hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <motion.span
                style={{ x: magnetic.x, y: magnetic.y }}
                className="gap-s11 inline-flex items-center"
              >
                Book a consultation
                <span className="text-lg">↗</span>
              </motion.span>
            </NextLink>
            <NextLink
              href="/work"
              data-cursor="Browse"
              className="ease-signature gap-s09 rounded-pill border-ivory/28 px-s21 py-s14 text-ivory hover:border-teal hover:text-teal active:scale-[0.97] inline-flex items-center border text-base font-bold transition-[color,border-color,transform] duration-[var(--duration-moderate)]"
            >
              See the work
            </NextLink>
            <span className="gap-s06 pl-s03 text-ivory/50 inline-flex items-center text-sm">
              <span className="rounded-pill bg-teal size-[6px] animate-[ap-pulse_2.6s_ease-in-out_infinite]" />
              Reply within one working day
            </span>
          </div>
          <div className="gap-s09 text-eyebrow tracking-eyebrow-5 text-ivory/38 flex items-center font-bold uppercase">
            Scroll
            <span className="w-s26 h-px bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-ivory)_50%,transparent),transparent)]" />
          </div>
        </div>
      </div>
    </section>
    </HeroSequenceProvider>
  );
}
