/**
 * Fixed film-grain overlay. Dark gradients band badly on 8-bit displays; a few
 * percent of static noise hides it. Pure CSS/SVG, no JS, no repaint cost —
 * the layer never moves and never animates.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      // No `mix-blend-mode`. A blended full-viewport fixed layer forces the
      // compositor to re-blend the whole screen on every paint, which is a real
      // cost on a mid-range phone for a texture nobody consciously sees. Plain
      // low opacity over a near-black ground looks the same and is free.
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "160px 160px",
      }}
    />
  );
}
