import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { sectionCopy } from "@/data/profile";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section
      eyebrow={sectionCopy.skills.eyebrow}
      heading={sectionCopy.skills.heading}
      id="skills"
    >
      <Reveal stagger={0.09}>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <li className="flex" data-reveal key={group.id}>
              <Card className="h-full w-full p-3 md:p-4">
                <h3 className="text-h3 font-semibold text-ink">{group.label}</h3>
                <p className="mt-1 text-meta text-ink-faint">{group.note}</p>

                <ul className="mt-3 flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
