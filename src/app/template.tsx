"use client";

import { m } from "motion/react";
import { useEffect, type ReactNode } from "react";

/**
 * Route transition — on navigations only.
 *
 * `template.tsx` remounts on every navigation, which is exactly the mount
 * animation Framer Motion owns. But it also mounts on the *first* render, and
 * Framer server-renders its `initial` styles: an `opacity: 0` here would put
 * the entire page behind hydration. Chrome does not count an element at
 * opacity 0 as painted, so Largest Contentful Paint would be pinned to
 * whenever the main thread went quiet — measured at 3.9s on throttled mobile,
 * against a 0.9s first paint. With JavaScript off it would never come back
 * at all.
 *
 * So the first mount renders with no motion styles whatsoever and every
 * subsequent one fades. The landing page is never held back by a transition
 * the visitor did not trigger.
 */
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const isFirstRender = !hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <m.div
      animate={isFirstRender ? undefined : { opacity: 1 }}
      // Opacity only on navigation: a transform here would make this the
      // containing block for every `position: fixed` descendant, quietly
      // breaking ScrollTrigger's pinned timeline and the fixed header.
      data-motion-mount
      initial={isFirstRender ? false : { opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
