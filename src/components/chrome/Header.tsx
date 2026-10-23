"use client";

import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { navigation, profile } from "@/data/profile";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Fixed header that condenses once you leave the hero.
 *
 * The header box itself is a fixed height. What condenses is the backdrop —
 * it fades in and scales down from its top edge — while the row of content
 * translates up to stay centred in it. Transform and opacity only: no
 * animated padding, no height transition, no layout work per frame.
 *
 * Reduced motion keeps the state change (it's information, not decoration);
 * the global reduced-motion rule collapses the transition to instant.
 */
export function Header() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = scope.current;
      if (!element) return;

      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "is-condensed", targets: element },
      });
    },
    { scope },
  );

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 h-9 md:h-12"
      data-header
      ref={scope}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-line bg-base/70 backdrop-blur-md"
        data-header-backdrop
      />

      <div className="relative h-full" data-header-row>
        <Container className="flex h-full items-center justify-between gap-3">
          <Link
            className="text-h3 font-semibold tracking-tight text-ink transition-colors hover:text-accent"
            data-header-mark
            href="/"
            // Same-page link; a route prefetch buys nothing and competes for
            // bandwidth on the critical path.
            prefetch={false}
          >
            {profile.name}
            <span className="text-accent">.</span>
          </Link>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    // Inline vertical padding widens the touch area (tablets)
                    // without moving the line.
                    className="py-1 text-meta text-ink-muted transition-colors hover:text-ink"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            {/* 40px on phones to match the menu button; 36px beside CV. */}
            <ThemeToggle className="max-md:size-5" />
            {/* Below md the CV link lives in the menu panel, which keeps the
                row from crowding at 320px. */}
            <div className="hidden md:block">
              <Button download href={profile.cv} size="sm" variant="secondary">
                CV
              </Button>
            </div>
            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}
