"use client";

import { useSyncExternalStore } from "react";

import { LIGHT_QUERY, THEME_STORAGE_KEY, type Theme } from "./theme";

/** Light / dark theme — the client runtime. See `theme.ts` for the model. */

function readStored(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    // Storage blocked (private mode, sandboxed iframe): theme still works for
    // the session, it just isn't remembered.
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia(LIGHT_QUERY).matches ? "light" : "dark";
}

function apply(theme: Theme) {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") === theme) return;

  root.classList.add("theme-switching");
  root.setAttribute("data-theme", theme);

  // Two frames: the first commits the new colours with transitions off, the
  // second hands hover/focus transitions back.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.remove("theme-switching")),
  );
}

/** Explicit choice from the toggle. Persisted, and wins over the OS from now on. */
export function setTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // See readStored().
  }
  apply(theme);
}

/**
 * Keeps the document in step with things that change outside this tab's
 * toggle: the OS preference (only while no explicit choice is stored) and a
 * choice made in another tab. Mount once.
 */
export function syncThemeWithEnvironment(): () => void {
  const query = window.matchMedia(LIGHT_QUERY);

  const onSystemChange = () => {
    if (!readStored()) apply(systemTheme());
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    apply(readStored() ?? systemTheme());
  };

  query.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);

  return () => {
    query.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

/** The server can't know the visitor's theme; `null` means "not yet known". */
function getServerSnapshot(): Theme | null {
  return null;
}

/**
 * The active theme, or `null` during server render and hydration. Anything
 * that must look right on the very first frame should be styled from CSS
 * (`light:` variant) rather than branch on this.
 */
export function useTheme(): Theme | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
