import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Portrait } from "@/components/ui/Portrait";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { domains, education } from "@/data/experience";
import { profile, sectionCopy } from "@/data/profile";

const facts = [
  { label: "Based in", value: profile.location },
  {
    label: "Experience",
    value: `${profile.yearsExperience} years`,
    hint: "First role September 2018",
  },
  {
    label: "Education",
    value: education.degree,
    hint: `${education.institution} · ${education.period}`,
  },
  { label: "Availability", value: profile.availability },
];

export function About() {
  return (
    <Section
      eyebrow={sectionCopy.about.eyebrow}
      heading={sectionCopy.about.heading}
      id="about"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
        <div className="max-w-measure">
          <div className="space-y-3">
            {profile.about.map((paragraph) => (
              <SplitLines
                as="p"
                className="text-lead text-ink-muted"
                key={paragraph.slice(0, 40)}
                text={paragraph}
              />
            ))}
          </div>

          <Reveal className="mt-6" stagger={0.05}>
            <h3
              className="text-eyebrow tracking-[0.16em] text-ink-faint uppercase"
              data-reveal
            >
              Domains
            </h3>
            <ul className="mt-2 flex flex-wrap gap-1" data-reveal>
              {domains.map((domain) => (
                <li key={domain}>
                  <Tag>{domain}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="h-fit" stagger={0.06}>
          {profile.portrait ? (
            <div className="mb-4" data-reveal>
              <Portrait
                alt={`${profile.name}, ${profile.title}`}
                src={profile.portrait}
              />
            </div>
          ) : null}

          <dl className="divide-y divide-line border-t border-line">
            {facts.map((fact) => (
              <div className="py-2" data-reveal key={fact.label}>
                <dt className="text-eyebrow tracking-[0.16em] text-ink-faint uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-body text-ink">
                  {fact.value}
                  {fact.hint ? (
                    <span className="mt-1 block text-meta text-ink-faint">
                      {fact.hint}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
