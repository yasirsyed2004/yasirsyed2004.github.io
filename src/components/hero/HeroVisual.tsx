"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useTheme } from "@/lib/theme-client";
import { HeroFallback } from "./HeroFallback";

/**
 * Loaded only after the gate below opens, so mobile and reduced-motion users
 * never download the three.js bundle at all — not just "don't render it".
 */
const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => null,
});

/**
 * Hard requirement, not a nice-to-have: no canvas on small screens or under
 * reduced motion. `pointer: fine` is in there because the cursor parallax is
 * half the point — on a touch device the scene is just battery.
 */
const CANVAS_OK =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference) and (pointer: fine)";

/** Cheap probe: a blocked or unavailable WebGL context should fall back, not throw. */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const wrapper = useRef<HTMLDivElement>(null);
  /** 0 at the top of the hero, 1 once it has scrolled away. GSAP writes it. */
  const progress = useRef(0);

  const [allowed, setAllowed] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const theme = useTheme();

  // --- gate -----------------------------------------------------------------
  useEffect(() => {
    const query = window.matchMedia(CANVAS_OK);

    const sync = () => setAllowed(query.matches && hasWebGL());

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // --- unmount once scrolled past, remount on the way back -------------------
  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;

    let timer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        if (entry.isIntersecting) {
          setOnScreen(true);
        } else {
          // Hysteresis: a fast scroll past and back shouldn't churn a WebGL
          // context. The CSS composition is underneath the whole time, so the
          // teardown is invisible either way.
          timer = window.setTimeout(() => setOnScreen(false), 600);
        }
      },
      { threshold: 0 },
    );

    observer.observe(element);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // --- stop rendering entirely when the tab is hidden ------------------------
  useEffect(() => {
    const sync = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const active = allowed && onScreen;

  // --- scroll: dolly the camera and fade the scene out ------------------------
  useGSAP(
    () => {
      if (!active) return;

      const element = wrapper.current;
      if (!element) return;

      // GSAP owns the scroll value only. It writes a plain number, which the
      // R3F frame loop reads — no library ever touches the same object twice.
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      gsap.to(element, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom 25%",
          scrub: true,
        },
      });

      return () => trigger.kill();
    },
    { dependencies: [active], scope: wrapper },
  );

  return (
    <div className="absolute inset-0" ref={wrapper}>
      {/* Always present. It is the hero visual on its own when there is no
          canvas, and the atmosphere behind the geometry when there is — so the
          canvas mounting or unmounting never leaves a hole. */}
      <HeroFallback rings={!active} />

      {active ? (
        <div className="absolute inset-0">
          <Scene
            frameloop={tabVisible ? "always" : "never"}
            progress={progress}
            theme={theme ?? "dark"}
          />
        </div>
      ) : null}
    </div>
  );
}
