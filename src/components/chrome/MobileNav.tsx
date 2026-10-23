"use client";

import { m } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { navigation, profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Section navigation below md, where the inline nav is hidden.
 *
 * A disclosure, not a modal: the page stays scrollable and interactive, the
 * panel closes on a link tap, Escape, a tap outside, or the viewport growing
 * past md. Hash links still go through MotionProvider's smooth-scroll handler;
 * this component only closes itself on the same click.
 */
export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = () => wide.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <div className={cn("md:hidden", className)} ref={root}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className={cn(
          "inline-flex size-5 items-center justify-center rounded-pill border border-line-strong text-ink",
          "transition-colors duration-200 ease-out-soft hover:border-accent/60 hover:text-accent",
          "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent",
        )}
        onClick={() => setOpen((value) => !value)}
        ref={toggle}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="h-[1.125rem] w-[1.125rem]"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={1.75}
          viewBox="0 0 24 24"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open ? (
        <m.nav
          animate={{ opacity: 1, y: 0 }}
          aria-label="Sections"
          className="absolute inset-x-3 top-full mt-1 rounded-card border border-line bg-surface p-2 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.35)]"
          id={panelId}
          initial={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className="divide-y divide-line">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  className="flex items-center justify-between py-2 text-h3 font-semibold text-ink transition-colors hover:text-accent"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-meta text-ink-faint">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Button
            className="mt-2 w-full"
            download
            href={profile.cv}
            variant="secondary"
          >
            Download CV
          </Button>
        </m.nav>
      ) : null}
    </div>
  );
}
