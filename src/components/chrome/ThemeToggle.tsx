"use client";

import { useEffect } from "react";

import {
  setTheme,
  syncThemeWithEnvironment,
  useTheme,
} from "@/lib/theme-client";
import { cn } from "@/lib/utils";

const iconClasses = "h-[1.125rem] w-[1.125rem]";

/**
 * Light / dark switch.
 *
 * Both glyphs are server-rendered and CSS picks the visible one from
 * `data-theme`, so the right icon is on screen from the first frame — before
 * hydration, and without a mismatch. Only the accessible name waits for the
 * client, because it is the one thing that has to be *said* differently.
 *
 * The icon shows where a click takes you: a sun in the dark theme, a moon in
 * the light one.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();

  useEffect(() => syncThemeWithEnvironment(), []);

  const label =
    theme === null
      ? "Toggle colour theme"
      : `Switch to ${theme === "light" ? "dark" : "light"} theme`;

  return (
    <button
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-pill border border-line-strong p-1 text-ink",
        "transition-colors duration-200 ease-out-soft hover:border-accent/60 hover:text-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent",
        className,
      )}
      onClick={() => {
        // Read the document, not React state: the attribute is the source of
        // truth and is correct even before this component has hydrated.
        const current = document.documentElement.getAttribute("data-theme");
        setTheme(current === "light" ? "dark" : "light");
      }}
      title={label}
      type="button"
    >
      {/* Sun — shown in the dark theme. */}
      <svg
        aria-hidden="true"
        className={cn(iconClasses, "light:hidden")}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon — shown in the light theme. */}
      <svg
        aria-hidden="true"
        className={cn(iconClasses, "hidden light:block")}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        viewBox="0 0 24 24"
      >
        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
      </svg>
    </button>
  );
}
