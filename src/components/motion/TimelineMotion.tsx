"use client";

import { useRef, type ReactNode } from "react";

import {
  DESKTOP_MOTION_OK,
  gsap,
  MOTION_OK,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap";

/**
 * The experience timeline's scroll behaviour.
 *
 * Three things, all scroll-position driven, so all GSAP:
 *  - the aside pins beside the list while you read it (desktop only),
 *  - its rail fills as a scrub of your progress through the list,
 *  - each entry scrubs in as it crosses the lower third of the viewport,
 *    which means scrolling back up plays it in reverse rather than snapping.
 *
 * Markup stays in the server component; this only reaches into its own scope
 * for the data attributes it owns.
 */
export function TimelineMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-timeline-item]",
          root,
        );

        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                end: "top 64%",
                scrub: 0.4,
              },
            },
          );
        });

        const fill = root.querySelector<HTMLElement>("[data-timeline-fill]");
        const list = root.querySelector<HTMLElement>("[data-timeline-list]");

        if (fill && list) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: list,
                start: "top 80%",
                end: "bottom 55%",
                scrub: true,
              },
            },
          );
        }
      });

      mm.add(DESKTOP_MOTION_OK, () => {
        const aside = root.querySelector<HTMLElement>("[data-timeline-aside]");
        const list = root.querySelector<HTMLElement>("[data-timeline-list]");
        if (!aside || !list) return;

        ScrollTrigger.create({
          trigger: list,
          start: "top 20%",
          // Releases exactly as the list's end reaches the aside's lower edge,
          // so the panel never floats on past the content it summarises.
          end: "bottom 50%",
          pin: aside,
          pinSpacing: false,
        });
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
