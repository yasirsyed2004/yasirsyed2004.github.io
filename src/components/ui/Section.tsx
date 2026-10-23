import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  /** Render children outside the container (for full-bleed layouts). */
  bleed?: boolean;
};

export function Section({
  id,
  eyebrow,
  heading,
  intro,
  children,
  className,
  bleed = false,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      // The section's own top padding clears the fixed header on every
      // breakpoint, so anchored headings need no extra scroll-margin.
      className={cn("py-section-sm md:py-section", className)}
      id={id}
    >
      <Container>
        <Reveal className="max-w-measure">
          <header>
            <p
              className="text-eyebrow font-medium tracking-[0.16em] text-accent uppercase"
              data-reveal
            >
              {eyebrow}
            </p>

            <SplitLines
              as="h2"
              className="mt-2 text-h2 font-semibold text-ink"
              id={headingId}
              text={heading}
            />

            {intro ? (
              <p className="mt-3 text-lead text-ink-muted" data-reveal>
                {intro}
              </p>
            ) : null}
          </header>
        </Reveal>
      </Container>

      {bleed ? (
        <div className="mt-6 md:mt-8">{children}</div>
      ) : (
        <Container className="mt-6 md:mt-8">{children}</Container>
      )}
    </section>
  );
}
