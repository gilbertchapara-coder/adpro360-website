"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import NextLink from "next/link";
import { Heading } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { SignatureAccent } from "@/components/shared/SignatureAccent";
import { FrameCorners } from "@/components/shared/FrameCorners";
import { useMagnetic } from "@/lib/hooks/useMagnetic";
import { useGlare } from "@/lib/hooks/useGlare";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { heroStats, heroRotatorWords } from "@/lib/content";

const HERO_WORD = "Proactive.";

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
      <div className="text-fluid-01 tracking-tighter-2 bg-[image:linear-gradient(120deg,#23AEC0,#2589CE)] bg-clip-text leading-none font-light text-transparent">
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
  const glareRef = useGlare<HTMLDivElement>();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 180]);
  const parallaxOpacity = useTransform(scrollY, [0, 1000], [1, 0.5]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggleShowreel = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setPlaying(true))
        .catch((error) => {
          console.error("Showreel play() rejected", error);
          setPlaying(false);
        });
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="bg-midnight px-gutter-x pt-hero-pt text-ivory perspective-[1000px] relative flex min-h-screen flex-col justify-end overflow-hidden">
      <motion.div
        style={{ y: parallaxY, opacity: parallaxOpacity }}
        className="absolute -inset-[6%]"
      >
        <div className="absolute inset-0 animate-[ap-drift_26s_ease-in-out_infinite] opacity-[var(--opacity-hero-ambient)]">
          <MediaSlot
            src="/images/hero-showreel-ambient-drone.jpg"
            alt="AdPro 360 showreel — production still"
            priority
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,19,31,.92)_0%,rgba(8,19,31,.55)_40%,rgba(8,19,31,.96)_100%)]" />
      <div className="rounded-pill absolute -top-[20%] -right-[10%] size-[60vw] bg-[radial-gradient(circle,rgba(35,174,192,.28),rgba(37,137,206,.06)_55%,transparent_70%)] blur-2xl" />

      {/* The real showreel, in the slot the card's own design already
          promised ("Two minutes of proof" + a play button sitting over a
          still). Was a plain link to /work — now plays HeroFilm.mp4 in
          place, click-to-play so the 47MB source only loads on demand.
          `preload="metadata"` (not "none") — the moov atom here is ~22KB,
          negligible, but having the browser resolve the resource ahead of
          the click made programmatic `.play()` fire reliably; with "none"
          it silently never progressed past readyState 0. "See the work"
          below still covers the /work navigation this used to do. */}
      <div
        ref={glareRef}
        role="button"
        tabIndex={0}
        aria-label={playing ? "Pause the AdPro 360 showreel" : "Play the AdPro 360 showreel"}
        onClick={toggleShowreel}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleShowreel();
          }
        }}
        data-glare=""
        data-cursor={playing ? "Pause" : "Watch"}
        className="ease-signature z-card-accent right-gutter-x border-ivory/18 bg-ivory/7 p-s17 text-ivory rotate-x-[var(--rx,0deg)] rotate-y-[var(--ry,0deg)] hover:-translate-y-s03 active:scale-[0.98] hover:border-teal/60 nav:block absolute top-[22vh] hidden w-[268px] cursor-pointer rounded-2xl border backdrop-blur-xl backdrop-saturate-[var(--saturate-glass)] transition-transform duration-[var(--duration-slower)]"
      >
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
        <div className="mb-s05 text-3xs tracking-eyebrow-4 text-teal font-bold uppercase">
          Showreel · 90 sec
        </div>
        <div className="text-md-plus leading-relaxed-4 tracking-tight-2">
          Two minutes of proof, {rotatorWord}.
        </div>
      </div>

      <div className="max-w-content pb-s27 relative mx-auto w-full">
        <Reveal className="mb-s25 gap-s09 rounded-pill border-ivory/16 bg-ivory/6 py-s05 pr-s13 pl-s07 tracking-eyebrow-4 text-ivory/78 inline-flex items-center border text-xs font-bold uppercase backdrop-blur-sm">
          <span className="rounded-pill bg-teal size-[7px] animate-[ap-pulse_2.6s_ease-in-out_infinite]" />
          Media · Creative · Production
        </Reveal>

        <Heading as="h1" variant="display-hero">
          <span aria-hidden="true">
            {HERO_WORD.split("").map((char, i) => (
              <Reveal key={i} as="span" delay={i * 16} className="inline-block">
                {char}
              </Reveal>
            ))}
          </span>
          <span className="absolute h-px w-px overflow-hidden [clip:rect(0,0,0,0)]">
            Proactive.
          </span>
          <br />
          <Reveal as="span" delay={260} className="inline-block">
            <SignatureAccent dot>Never reactive.</SignatureAccent>
          </Reveal>
        </Heading>

        {/* Single support line — the "AdPro 360 is a full-service..." paragraph
            that used to sit here was cut; WhoWeAre already covers that ground
            one scroll further down, so keeping both was two agencies' worth
            of self-introduction stacked on one screen. */}
        <Reveal delay={340}>
          <p className="mt-s17 max-w-copy-xs text-lede leading-snug-2 tracking-tight-2 text-ivory/86 text-balance">
            Media, creative and production for Zambia&rsquo;s most ambitious brands — strategy to
            broadcast, under one roof.
          </p>
        </Reveal>

        <Reveal delay={420}>
          <div className="mt-hero-content-mt gap-s16 border-ivory/14 pt-s23 grid max-w-copy grid-cols-2 border-t md:grid-cols-3">
            {heroStats.map((stat) => (
              <HeroStat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </Reveal>

        <div className="mt-s26 gap-s18 pb-s25 flex flex-wrap items-center justify-between">
          <div className="gap-s11 flex flex-wrap items-center">
            <NextLink
              ref={magnetic.ref}
              href="/contact"
              data-magnetic=""
              className="ease-signature gap-s11 rounded-pill px-s23 py-s15 text-base-plus tracking-tight-3 shadow-glow hover:shadow-glow-hover inline-flex items-center bg-[image:var(--gradient-brand)] font-bold text-white transition-[transform,box-shadow] duration-[var(--duration-moderate-plus)] hover:-translate-y-0.5 active:scale-[0.97]"
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
            <span className="w-s26 h-px bg-[linear-gradient(90deg,rgba(245,244,241,.5),transparent)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
