import { TimelineMotion } from "@/components/motion/TimelineMotion";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { education, timeline, type Role } from "@/data/experience";
import { sectionCopy } from "@/data/profile";

const copy = sectionCopy.experience;

const allRoles = timeline.flatMap((entry) => entry.roles);
const employerCount = new Set(allRoles.map((role) => role.company)).size;

function RoleCard({ role }: { role: Role }) {
  return (
    <Card as="article" className="h-full p-3 md:p-4">
      <p className="flex flex-wrap items-baseline gap-1 text-meta">
        <span className="font-medium text-accent">{role.period}</span>
        {role.duration ? (
          <span className="text-ink-faint">· {role.duration}</span>
        ) : null}
      </p>

      <h3 className="mt-1 text-h3 font-semibold text-ink">{role.title}</h3>

      <p className="mt-1 text-meta text-ink-muted">
        {role.company}
        {role.employment ? ` · ${role.employment}` : ""}
        {role.location ? ` · ${role.location}` : ""}
      </p>

      {role.summary ? (
        <p className="mt-2 max-w-[68ch] text-body text-ink-muted">
          {role.summary}
        </p>
      ) : null}

      {role.highlights?.length ? (
        <ul className="mt-2 max-w-[68ch] space-y-1">
          {role.highlights.map((highlight) => (
            <li
              className="relative pl-2 text-body text-ink-muted before:absolute before:top-[0.7em] before:left-0 before:h-1 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-accent/60 before:content-['']"
              key={highlight}
            >
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}

      <TagList className="mt-3" items={role.stack} label="Stack" />
    </Card>
  );
}

export function Experience() {
  return (
    <Section eyebrow={copy.eyebrow} heading={copy.heading} id="experience">
      <TimelineMotion>
        <div className="grid gap-4 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
          {/* Pinned beside the list on desktop; plain content everywhere else. */}
          <aside className="hidden self-start lg:block" data-timeline-aside>
            <p className="text-eyebrow font-medium tracking-[0.16em] text-accent uppercase">
              {copy.asideEyebrow}
            </p>
            <p className="mt-2 text-h3 font-semibold text-ink">
              {copy.asideRange}
            </p>

            <dl className="mt-4 space-y-1">
              <div className="flex items-baseline gap-1">
                <dt className="text-h3 font-semibold text-ink tabular-nums">
                  {allRoles.length}
                </dt>
                <dd className="text-meta text-ink-muted">
                  {copy.asideRolesLabel}
                </dd>
              </div>
              <div className="flex items-baseline gap-1">
                <dt className="text-h3 font-semibold text-ink tabular-nums">
                  {employerCount}
                </dt>
                <dd className="text-meta text-ink-muted">
                  {copy.asideEmployersLabel}
                </dd>
              </div>
            </dl>

            <p className="mt-3 max-w-[26ch] text-meta text-ink-faint">
              {copy.asideNote}
            </p>
          </aside>

          <div>
            <ol className="relative" data-timeline-list>
              {/* The rail. Decorative — the ordered list carries the semantics.
                  Its fill scrubs with scroll progress; with no JS or reduced
                  motion it simply sits at full height. */}
              <div
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-1 w-px bg-line"
              >
                <div
                  className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-accent to-accent/25"
                  data-timeline-fill
                />
              </div>

              {timeline.map((entry) => {
                const isConcurrent = entry.roles.length > 1;

                return (
                  <li
                    className="relative pb-6 pl-4 last:pb-0 md:pb-8 md:pl-6"
                    key={entry.id}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-2 left-1 h-1 w-1 -translate-x-1/2 rounded-full bg-accent ring-4 ring-base"
                    />

                    <div data-reveal data-timeline-item>
                      {isConcurrent ? (
                        <p className="mb-2 text-eyebrow tracking-[0.16em] text-ink-faint uppercase">
                          {copy.concurrentNote}
                        </p>
                      ) : null}

                      <div
                        className={
                          isConcurrent
                            ? "grid gap-2 md:grid-cols-2 md:gap-3"
                            : undefined
                        }
                      >
                        {entry.roles.map((role) => (
                          <RoleCard key={role.id} role={role} />
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Education sits after the roles: same column, deliberately not a
                timeline node, because it isn't a job. */}
            <div className="mt-4 pl-4 md:pl-6">
              <div data-reveal data-timeline-item>
                <Card as="article" className="p-3 md:p-4">
                  <p className="text-meta font-medium text-accent">
                    {education.period}
                  </p>
                  <h3 className="mt-1 text-h3 font-semibold text-ink">
                    {education.degree}
                  </h3>
                  <p className="mt-1 text-meta text-ink-muted">
                    {education.institution}
                  </p>
                  <p className="mt-2 max-w-[68ch] text-body text-ink-muted">
                    {education.summary}
                  </p>
                  <p className="mt-2 max-w-[68ch] text-body text-ink-muted">
                    <span className="text-ink">Final year project — </span>
                    {education.finalYearProject}
                  </p>
                  <TagList
                    className="mt-3"
                    items={education.stack}
                    label="Coursework"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </TimelineMotion>
    </Section>
  );
}
