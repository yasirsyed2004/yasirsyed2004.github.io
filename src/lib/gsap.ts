"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The single GSAP registration point for the whole app.
 *
 * Every motion component imports gsap from here and never from "gsap"
 * directly, so plugins are registered exactly once, before any animation is
 * created, and never per component.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export { gsap, useGSAP, ScrollTrigger };

let splitTextRequest: Promise<typeof import("gsap/SplitText").SplitText> | null =
  null;

/**
 * SplitText, loaded on demand.
 *
 * Nothing needs it until a heading is about to scroll into view, and it is
 * dead weight in the critical bundle until then. Still the single registration
 * point — the plugin is registered here, once, the first time it is asked for,
 * and every later caller gets the same promise.
 */
export function loadSplitText() {
  splitTextRequest ??= import("gsap/SplitText").then(({ SplitText }) => {
    gsap.registerPlugin(SplitText);
    return SplitText;
  });

  return splitTextRequest;
}

/**
 * Every scroll animation is created inside a `gsap.matchMedia()` block gated on
 * this query. Reduced motion doesn't just skip the animation — the block never
 * runs, and toggling the OS setting live reverts everything automatically.
 */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export const DESKTOP_MOTION_OK = `(min-width: 1024px) and ${MOTION_OK}`;

export const EASE = "power3.out";

/** Shared reveal feel. One place to retune the whole site's rhythm. */
export const REVEAL = {
  y: 28,
  duration: 0.85,
  stagger: 0.08,
  start: "top 85%",
} as const;

/**
 * SplitText measures line breaks, so it must not run against a fallback face.
 * Races the font load against a ceiling so a stalled font file can never leave
 * a heading unrevealed.
 */
export function whenFontsReady(timeoutMs = 1200): Promise<unknown> {
  if (typeof document === "undefined") return Promise.resolve();

  return Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}
