"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type PortraitProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Removes itself if the image isn't there.
 *
 * The photo is the one asset that has to be dropped in by hand, so the failure
 * mode matters: an absent file hides the block entirely rather than leaving a
 * broken-image icon on a page whose whole job is to look finished.
 */
export function Portrait({ src, alt, className }: PortraitProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-card border border-line bg-surface",
        className,
      )}
    >
      <Image
        alt={alt}
        className="h-full w-full object-cover"
        height={640}
        onError={() => setFailed(true)}
        sizes="(min-width: 1024px) 20rem, 100vw"
        src={src}
        width={640}
      />
      {/* Ties the photo to the page's palette instead of letting a bright
          studio background punch a hole in a near-black layout. On the light
          ground there is no hole to hide, and the wash would only fog it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/55 via-transparent to-transparent light:hidden"
      />
    </div>
  );
}
