/**
 * Skills, grouped. Deliberately no proficiency percentages — a bar reading
 * "Python 87%" tells a recruiter nothing and costs credibility.
 *
 * Grouping follows the tech-stack breakdown on the current LinkedIn profile,
 * plus an AI group: LLM and third-party AI integration is the headline of the
 * current role and belongs above the fold of this section, not buried in
 * "other".
 */

export type SkillGroup = {
  id: string;
  label: string;
  /** One line on how the group is actually used. */
  note: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    label: "Backend",
    note: "Where most of the work happens.",
    items: ["Python", "FastAPI", "PHP", "Laravel", "REST API design"],
  },
  {
    id: "frontend",
    label: "Frontend",
    note: "Typed end to end, against the same contracts.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML & CSS"],
  },
  {
    id: "ai",
    label: "AI & integrations",
    note: "Model output turned into product surfaces.",
    items: [
      "LLM API integration",
      "Third-party AI APIs",
      "AI feature development",
    ],
  },
  {
    id: "data",
    label: "Data",
    note: "Schema design, migrations, and the query work after launch.",
    items: ["PostgreSQL", "MySQL", "SQL", "Data migrations"],
  },
  {
    id: "languages",
    label: "Languages",
    note: "In rough order of how often they come up.",
    items: ["Python", "TypeScript", "JavaScript", "PHP", "C#", "SQL"],
  },
  {
    id: "platforms",
    label: "Platforms & tooling",
    note: "Still useful, still in rotation.",
    items: ["WordPress", "E-commerce builds", "Git", "GitHub"],
  },
];
