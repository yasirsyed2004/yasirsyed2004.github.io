"use client";

import { m, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { TagList } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";
import { isDev, isTodo } from "@/lib/utils";

// The padding/negative-margin pair grows the touch target without moving
// anything: these are flex items, so plain padding would add height.
const linkClasses =
  "-my-1 py-1 text-meta font-medium text-ink-muted transition-colors hover:text-accent";

/** Fast enough to read as feedback rather than as an animation. */
const spring = { type: "spring", stiffness: 320, damping: 30, mass: 0.6 } as const;

/**
 * Hover and tap are Framer Motion's; the card's scroll entrance is GSAP's, and
 * it targets the parent `<li>`. Two libraries in one component, never on the
 * same element.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { links } = project;
  const impactReady = !isTodo(project.impact);
  const reduced = useReducedMotion();

  return (
    <m.article
      animate="rest"
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors duration-300 hover:border-accent/45 focus-within:border-accent/60"
      initial="rest"
      transition={spring}
      // Variant *labels* rather than inline objects, so the cover below picks
      // the state up by propagation instead of needing its own listeners.
      //
      // Hover only, no `whileTap`: Framer adds `tabindex="0"` to any element
      // carrying a tap gesture so it can be keyboard-activated, which turned
      // every card into an extra, inert tab stop ahead of the link it
      // contains. Keyboard users get the `focus-within` border instead, and
      // the card is one stop shorter for it.
      variants={{ rest: { y: 0 }, hover: { y: -6 } }}
      whileHover={reduced ? undefined : "hover"}
    >
      <div className="relative aspect-[8/5] w-full overflow-hidden border-b border-line bg-surface-raised">
        <m.div
          className="h-full w-full"
          transition={spring}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.045 } }}
        >
          <Image
            alt=""
            className="h-full w-full object-cover"
            height={750}
            // Authored SVGs: nothing for the optimiser to do, and bypassing it
            // avoids shipping a raster of a vector.
            src={project.cover}
            unoptimized
            width={1200}
          />
        </m.div>
      </div>

      <div className="flex flex-1 flex-col p-3 md:p-4">
        <p className="text-meta text-ink-faint">{project.period}</p>

        <h3 className="mt-1 text-h3 font-semibold text-ink">
          {links.caseStudy ? (
            <Link
              className="transition-colors before:absolute before:inset-0 hover:text-accent"
              href={links.caseStudy}
              // Four case-study routes in the viewport means four RSC
              // prefetches competing with the critical path on a slow
              // connection, to save a few hundred ms on a click most visitors
              // never make. Fetch on click instead.
              prefetch={false}
            >
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-1 text-meta text-accent">{project.role}</p>

        <p className="mt-2 text-body text-ink-muted">{project.summary}</p>

        {impactReady ? (
          <p className="mt-2 text-body text-ink">{project.impact}</p>
        ) : null}

        {/* Placeholder impact never reaches production copy, but it is
            impossible to miss while developing. */}
        {isDev && !impactReady ? (
          <p className="mt-2 rounded border border-accent/40 bg-accent/10 p-1 text-meta text-accent">
            dev only — {project.impact}
          </p>
        ) : null}

        <TagList className="mt-3 mb-3" items={project.stack} label="Stack" />

        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-3">
          {links.caseStudy ? (
            <Link className={linkClasses} href={links.caseStudy} prefetch={false}>
              Read case study →
            </Link>
          ) : null}
          {links.live ? (
            <a
              className={linkClasses}
              href={links.live}
              rel="noopener noreferrer"
              target="_blank"
            >
              Live site ↗
            </a>
          ) : null}
          {links.repo ? (
            <a
              className={linkClasses}
              href={links.repo}
              rel="noopener noreferrer"
              target="_blank"
            >
              Repository ↗
            </a>
          ) : null}
        </div>
      </div>
    </m.article>
  );
}
