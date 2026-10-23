"use client";

import { useCallback, useRef } from "react";

import type { SplitText } from "gsap/SplitText";

import {
  EASE,
  gsap,
  loadSplitText,
  MOTION_OK,
  ScrollTrigger,
  useGSAP,
  whenFontsReady,
} from "@/lib/gsap";

type SplitLinesProps = {
  as?: "h1" | "h2" | "h3" | "p";
  text: string;
  className?: string;
  id?: string;
  start?: string;
};

/**
 * Line-by-line reveal: each line rises out from behind its own mask.
 *
 * The split is created lazily, inside `onEnter`, and reverted the moment the
 * animation finishes — so the DOM holds SplitText's wrapper elements for about
 * a second and never again. Nothing to go stale on resize, nothing left for a
 * screen reader to trip over, and no re-split bookkeeping.
 */
export function SplitLines({
  as = "p",
  text,
  className,
  id,
  start = "top 85%",
}: SplitLinesProps) {
  const ref = useRef<HTMLElement | null>(null);

  // A callback ref types cleanly across the tag union: a handler taking the
  // supertype is assignable to every `Ref<HTMLHeadingElement | ...>`.
  const setRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  const Tag = as;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        let split: SplitText | null = null;
        let trigger: ScrollTrigger | null = null;
        let cancelled = false;

        // Fonts first (line breaks must be measured against the real face),
        // and the plugin fetch runs alongside rather than after it.
        void Promise.all([whenFontsReady(), loadSplitText()]).then(([, Split]) => {
          if (cancelled) return;

          trigger = ScrollTrigger.create({
            trigger: element,
            start,
            once: true,
            onEnter: () => {
              split = Split.create(element, {
                type: "lines",
                mask: "lines",
                linesClass: "split-line",
              });

              gsap
                .timeline({
                  onComplete: () => {
                    split?.revert();
                    split = null;
                    gsap.set(element, { opacity: 1 });
                  },
                })
                .set(element, { opacity: 1 })
                .from(split.lines, {
                  yPercent: 108,
                  duration: 0.85,
                  ease: EASE,
                  stagger: 0.09,
                });
            },
          });
        });

        return () => {
          cancelled = true;
          trigger?.kill();
          split?.revert();
        };
      });
    },
    { scope: ref },
  );

  return (
    <Tag className={className} data-reveal id={id} ref={setRef}>
      {text}
    </Tag>
  );
}
