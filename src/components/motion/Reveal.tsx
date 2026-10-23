"use client";

import { useRef, type ReactNode } from "react";

import { EASE, gsap, MOTION_OK, REVEAL, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** ScrollTrigger start, relative to this group. */
  start?: string;
};

/**
 * Reveals every `[data-reveal]` descendant once the group scrolls into view.
 *
 * One ScrollTrigger per group rather than one per element, and one client
 * boundary — the children are still server-rendered and passed straight
 * through, so wrapping a section in this costs no interactivity and no HTML.
 *
 * Elements start hidden via the `.js-enabled [data-reveal]` rule in
 * globals.css, which is only applied once an inline script confirms JS is
 * alive. If this component never runs, nothing is hidden.
 */
export function Reveal({
  children,
  className,
  stagger = REVEAL.stagger,
  start = REVEAL.start,
}: RevealProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const targets = gsap.utils.toArray<HTMLElement>(
          "[data-reveal]",
          scope.current,
        );
        if (targets.length === 0) return;

        gsap.set(targets, { opacity: 0, y: REVEAL.y });

        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: REVEAL.duration,
          ease: EASE,
          stagger,
          scrollTrigger: { trigger: scope.current, start, once: true },
        });
      });
    },
    { scope },
  );

  return (
    <div className={className} ref={scope}>
      {children}
    </div>
  );
}
