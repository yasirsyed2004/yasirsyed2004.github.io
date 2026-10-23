"use client";

import { m } from "motion/react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero, profile } from "@/data/profile";
import { HeroVisual } from "./HeroVisual";

/**
 * The hero's entrance is a *mount* animation, so it belongs to Framer Motion —
 * GSAP owns nothing above the fold except the scroll dolly on the canvas, which
 * targets a different element entirely.
 *
 * `MotionConfig reducedMotion="user"` in the root provider means these are
 * skipped under reduced motion with no check here.
 */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.1 } },
};

/**
 * Every hero element animates on TRANSFORM ONLY — no opacity anywhere above
 * the fold.
 *
 * Chrome does not count an element at `opacity: 0` as painted, so anything
 * faded in on mount cannot become the Largest Contentful Paint until hydration
 * finishes. Measured on throttled mobile: the headline painted at 0.86s, but
 * the subhead — the larger text block, and therefore the real LCP candidate —
 * did not land until 3.66s purely because it was fading.
 *
 * Sliding instead of fading also means nothing up here is gated behind
 * JavaScript at all: the `<noscript>` release in the root layout becomes a
 * safety net rather than the thing holding the hero up.
 */
const item = {
  hidden: { y: 16 },
  show: {
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const headline = {
  hidden: { y: 24 },
  show: {
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center overflow-hidden pt-12 pb-8"
      id="hero"
    >
      <HeroVisual />

      <Container className="relative z-10">
        <m.div animate="show" initial="hidden" variants={container}>
          <m.p
            className="flex items-center gap-1 text-eyebrow font-medium tracking-[0.16em] text-accent uppercase"
            data-motion-mount
            variants={item}
          >
            <span
              aria-hidden="true"
              className="inline-block h-1 w-1 rounded-full bg-accent"
            />
            {hero.eyebrow}
          </m.p>

          <m.h1
            className="mt-3 max-w-[14ch] text-display font-semibold text-ink"
            data-motion-mount
            id="hero-heading"
            variants={headline}
          >
            {hero.headline}
          </m.h1>

          <m.p
            className="mt-3 max-w-[36ch] text-lead text-ink-muted md:max-w-[44ch]"
            data-motion-mount
            variants={item}
          >
            {hero.subhead}
          </m.p>

          <m.div
            className="mt-5 flex flex-wrap items-center gap-2"
            data-motion-mount
            variants={item}
          >
            <Button href={hero.primaryCta.href} trailing="↓">
              {hero.primaryCta.label}
            </Button>
            <Button download href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </m.div>

          <m.p
            className="mt-4 text-meta text-ink-faint"
            data-motion-mount
            variants={item}
          >
            {profile.availability}
          </m.p>
        </m.div>
      </Container>

      {/* Scroll cue. Decorative; the nav and CTAs are the real affordances. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-3 hidden justify-center md:flex"
      >
        <span className="flex flex-col items-center gap-1 text-eyebrow tracking-[0.16em] text-ink-faint uppercase">
          {hero.scrollCue}
          <span className="block h-5 w-px bg-gradient-to-b from-ink-faint to-transparent" />
        </span>
      </div>
    </section>
  );
}
