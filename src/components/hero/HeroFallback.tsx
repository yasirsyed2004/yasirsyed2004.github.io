type HeroFallbackProps = {
  /**
   * Draw the ring-and-core composition. True when this is the whole hero
   * visual; false when the WebGL cluster is on top and only the atmosphere
   * behind it is wanted.
   */
  rings?: boolean;
};

/**
 * The hero's CSS composition.
 *
 * This is not a loading state and never reads as one. It is the entire hero
 * visual on mobile, under `prefers-reduced-motion: reduce`, where WebGL is
 * unavailable, before hydration, and once the canvas has unmounted on
 * scroll-past. When the canvas *is* running, the rings drop out and what
 * remains is the atmosphere it sits in.
 *
 * Pure CSS: nothing to download, nothing to paint after the first frame, and
 * it occupies exactly the same box as the canvas, so swapping between them
 * shifts nothing.
 */
export function HeroFallback({ rings = true }: HeroFallbackProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Primary accent bloom, upper right. */}
      <div
        className="absolute -top-[20%] right-[-10%] h-[70vmax] w-[70vmax] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-accent) 26%, transparent) 0%, color-mix(in oklab, var(--color-accent-strong) 8%, transparent) 42%, transparent 68%)",
        }}
      />

      {/* Cooler counterweight, lower left — same hue, no second colour. */}
      <div
        className="absolute bottom-[-25%] left-[-15%] h-[55vmax] w-[55vmax] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-accent) 14%, transparent) 0%, transparent 62%)",
        }}
      />

      {rings ? (
        // On narrow screens the text column is the full width, so a vertically
        // centred core would sit on the subhead. Below md the composition
        // drops into the empty space under the CTAs instead.
        <div className="absolute top-[88%] right-[10%] -translate-y-1/2 md:top-1/2 md:right-[14%]">
          {[26, 40, 54, 68].map((size, index) => (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
              key={size}
              style={{
                width: `${size}vmin`,
                height: `${size}vmin`,
                opacity: 0.26 - index * 0.05,
              }}
            />
          ))}
          <div
            className="absolute top-1/2 left-1/2 h-[10vmin] w-[10vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, color-mix(in oklab, var(--color-accent) 85%, white 10%) 0%, var(--color-accent-strong) 55%, color-mix(in oklab, var(--color-accent-strong) 40%, transparent) 100%)",
            }}
          />
        </div>
      ) : null}

      {/* Hairline horizon. */}
      <div className="absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

      {/* Fade into the page ground so the section has no hard edge. */}
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-transparent to-base" />
    </div>
  );
}
