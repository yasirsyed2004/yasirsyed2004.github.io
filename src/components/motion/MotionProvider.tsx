"use client";

import type Lenis from "lenis";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import "lenis/dist/lenis.css";

/**
 * Lenis smooths *wheel* scrolling. On a touch device it improves nothing over
 * native momentum scrolling and still costs parse and init time on the slowest
 * hardware, so it is gated on a fine pointer as well as on motion preference.
 */
const SMOOTH_OK =
  "(prefers-reduced-motion: no-preference) and (pointer: fine)";

/**
 * The single client root for motion. Owns three global concerns:
 *
 *  1. Smooth scrolling and the GSAP/Lenis handshake.
 *  2. Same-page anchor behaviour.
 *  3. Framer Motion's reduced-motion policy.
 *
 * Lenis drives scroll from `gsap.ticker` (one RAF loop for the whole page, not
 * two competing ones) and pushes `ScrollTrigger.update()` on every scroll event
 * so triggers resolve against Lenis' position rather than the browser's.
 *
 * Under `prefers-reduced-motion: reduce`, or on a touch device, Lenis is never
 * instantiated — native scrolling, no interception. The listener means flipping
 * the OS setting takes effect immediately, without a reload.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const query = window.matchMedia(SMOOTH_OK);
    let tick: ((time: number) => void) | null = null;
    let cancelled = false;

    // Imported on demand: a touch device or a reduced-motion visitor never
    // downloads or parses Lenis at all, rather than shipping it and declining
    // to use it.
    const start = () => {
      if (lenisRef.current || !query.matches) return;

      void import("lenis").then(({ default: Lenis }) => {
        if (cancelled || lenisRef.current || !query.matches) return;

        const lenis = new Lenis({
          autoRaf: false,
          duration: 1.05,
          smoothWheel: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        lenisRef.current = lenis;
        ScrollTrigger.refresh();
      });
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      tick = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
      gsap.ticker.lagSmoothing(500, 33);
      ScrollTrigger.refresh();
    };

    const onChange = () => (query.matches ? start() : stop());

    start();
    query.addEventListener("change", onChange);

    return () => {
      cancelled = true;
      query.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  /**
   * Same-page hash links. Lenis disables native smooth scrolling, so anchors
   * would otherwise jump instantly while everything else glides.
   *
   * Focus moves immediately rather than on scroll completion — a keyboard user
   * hitting "Skip to content" should not wait out an animation — and history is
   * pushed so Back still works.
   */
  useEffect(() => {
    const focus = (target: Element) => {
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }
      (target as HTMLElement).focus({ preventScroll: true });
    };

    const scrollTo = (target: Element) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement);
      } else {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      );
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      focus(target);
      scrollTo(target);
      window.history.pushState(null, "", hash);
    };

    const onPopState = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (target) scrollTo(target);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  /**
   * `reducedMotion="user"` makes every Framer Motion animation in the tree
   * respect the OS setting without a single check at the call site — transform
   * and opacity animations are skipped, layout changes still apply. It is the
   * Framer-side counterpart to the `gsap.matchMedia()` gate the scroll layer
   * uses, so both libraries honour the same preference by construction.
   *
   * `LazyMotion` with the `domAnimation` feature set covers variants, gestures
   * and tween/spring animation — everything this site uses — at roughly half
   * the bundle of the full `motion` component. `strict` makes an accidental
   * `motion.*` import (which would pull the whole thing back in) a build-time
   * error rather than a silent regression.
   */
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
