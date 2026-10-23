import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { sectionCopy } from "@/data/profile";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  if (projects.length === 0) return null;

  return (
    <Section
      eyebrow={sectionCopy.work.eyebrow}
      heading={sectionCopy.work.heading}
      id="work"
      intro={sectionCopy.work.intro}
    >
      <Reveal stagger={0.1}>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li className="flex" data-reveal key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
