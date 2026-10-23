import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { profile, sectionCopy, socialLinks } from "@/data/profile";

export function Contact() {
  const otherLinks = socialLinks.filter((link) => link.label !== "Email");

  return (
    <Section
      eyebrow={sectionCopy.contact.eyebrow}
      heading={sectionCopy.contact.heading}
      id="contact"
      intro={sectionCopy.contact.intro}
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-6">
        <Reveal stagger={0.1}>
          <a
            className="inline-block text-h2 font-semibold break-all text-ink transition-colors hover:text-accent"
            data-reveal
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>

          {otherLinks.length > 0 ? (
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {otherLinks.map((link) => {
                // Only http(s) destinations leave the tab; tel: must not.
                const isExternal = link.href.startsWith("http");

                return (
                <li data-reveal key={link.label}>
                  <a
                    className="group flex items-baseline justify-between gap-3 py-2"
                    href={link.href}
                    {...(isExternal
                      ? { rel: "noopener noreferrer", target: "_blank" }
                      : {})}
                  >
                    <span className="text-h3 font-semibold text-ink transition-colors group-hover:text-accent">
                      {link.label}
                    </span>
                    <span className="text-meta text-ink-faint">
                      {link.handle}
                    </span>
                  </a>
                </li>
                );
              })}
            </ul>
          ) : null}
        </Reveal>

        <Reveal>
          <div data-reveal>
            <Card className="p-3 md:p-4">
              <p className="flex items-center gap-1 text-eyebrow font-medium tracking-[0.16em] text-accent uppercase">
                <span
                  aria-hidden="true"
                  className="inline-block h-1 w-1 rounded-full bg-accent"
                />
                Availability
              </p>

              <p className="mt-2 text-lead text-ink">{profile.availability}</p>
              <p className="mt-1 text-meta text-ink-faint">
                Currently in {profile.location}.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                {/* Falls back to email until a scheduling link exists. */}
                {profile.scheduling ? (
                  <Button external href={profile.scheduling}>
                    {sectionCopy.contact.bookCta}
                  </Button>
                ) : (
                  <Button href={`mailto:${profile.email}`}>
                    {sectionCopy.contact.emailCta}
                  </Button>
                )}
                <Button download href={profile.cv} variant="secondary">
                  Download CV
                </Button>
              </div>
            </Card>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
