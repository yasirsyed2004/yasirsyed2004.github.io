/**
 * Light / dark theme — the server-safe half.
 *
 * The theme lives in one place — `data-theme` on `<html>` — and everything
 * else reads it from there: CSS through the token overrides in globals.css,
 * React through `useTheme()` in `theme-client.ts`. No context provider, no
 * prop drilling, and the server never needs to know which theme a visitor
 * picked.
 *
 * An explicit choice is persisted. Until a visitor makes one, the site follows
 * the OS preference, live.
 *
 * This file is imported by the root layout (a Server Component), so it holds
 * no React hooks; the runtime lives in `theme-client.ts`.
 */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export const LIGHT_QUERY = "(prefers-color-scheme: light)";

/**
 * Runs inline before first paint (see the root layout), so a light-theme
 * visitor never sees a dark frame. Also carries the `.js-enabled` marker the
 * reveal guard depends on — one blocking script rather than two.
 *
 * Kept as plain ES5 in a string: it executes before any bundle has loaded.
 */
export const themeScript = `(function(){var d=document.documentElement;d.classList.add("js-enabled");var t=null;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("${LIGHT_QUERY}").matches?"light":"dark"}d.setAttribute("data-theme",t)})()`;
