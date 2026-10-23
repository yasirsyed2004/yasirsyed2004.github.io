/**
 * The experience timeline.
 *
 * Roles are grouped into `TimelineEntry` blocks. A block holding more than one
 * role is a set of *concurrent* positions and renders side by side, so
 * overlapping dates read as "both at once" rather than as a gap or a
 * contradiction. Blocks are ordered newest-first by start date.
 */

export type Role = {
  id: string;
  title: string;
  company: string;
  /** "Full-time", "Internship", … Omit when the source doesn't say. */
  employment?: string;
  start: string;
  end: string;
  /** Rendered verbatim, e.g. "May 2025 — Present". */
  period: string;
  /** e.g. "1 yr 5 mos". */
  duration?: string;
  location?: string;
  summary?: string;
  /** What the role actually involved, one line each. */
  highlights?: string[];
  stack: string[];
};

export type TimelineEntry = {
  id: string;
  /** One role, or several held at the same time. */
  roles: Role[];
};

export const timeline: TimelineEntry[] = [
  {
    id: "echooo",
    roles: [
      {
        id: "echooo-fullstack",
        title: "Full Stack Developer",
        company: "Echooo.AI",
        employment: "Full-time",
        start: "2025-05",
        end: "present",
        period: "May 2025 — Present",
        duration: "1 yr 5 mos",
        location: "Lahore, Pakistan · On-site",
        summary:
          "AI-driven features for an influencer marketing platform, built end to end.",
        highlights: [
          "Build AI-driven features end to end: FastAPI backends, Next.js and React frontends.",
          "Integrate LLM and third-party AI APIs into production workflows.",
          "Optimise API performance and database queries across the platform.",
          "Work directly with product and design to take features from spec to release.",
        ],
        stack: [
          "Python",
          "FastAPI",
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "REST APIs",
          "GitHub",
        ],
      },
    ],
  },
  {
    id: "usa-lecturer",
    roles: [
      {
        id: "usa-lecturer-role",
        title: "Lecturer",
        company: "University of South Asia",
        employment: "Full-time",
        start: "2024-02",
        end: "2025-05",
        period: "Feb 2024 — May 2025",
        duration: "1 yr 4 mos",
        location: "On-site",
        summary:
          "Taught e-commerce web development and front-end development.",
        stack: ["WordPress", "PHP", "Laravel", "React.js", "E-Commerce"],
      },
    ],
  },
  {
    // Confirmed concurrent on both profile entries. Rendered as a stacked pair.
    id: "concurrent-2020-2025",
    roles: [
      {
        id: "usa-software-developer",
        title: "Software Developer",
        company: "University of South Asia",
        employment: "Full-time",
        start: "2022-03",
        end: "2025-01",
        period: "Mar 2022 — Jan 2025",
        duration: "2 yrs 11 mos",
        location: "Lahore, Pakistan",
        summary:
          "Built and maintained the university's internal systems — student information portals and learning management platforms.",
        stack: ["React.js", "PHP", "REST APIs", "GitHub"],
      },
      {
        id: "planlab-web-developer",
        title: "Web Developer",
        company: "PlanLab Solutions",
        employment: "Full-time",
        start: "2020-11",
        end: "2025-01",
        period: "Nov 2020 — Jan 2025",
        duration: "4 yrs 3 mos",
        location: "Lahore, Pakistan",
        summary: "Shipped client web platforms from brief to production.",
        stack: ["TypeScript", "REST APIs", "GitHub"],
      },
    ],
  },
  {
    id: "pbte",
    roles: [
      {
        id: "pbte-web-developer",
        title: "Web Developer",
        company: "Punjab Board of Technical Education",
        employment: "Internship",
        start: "2018-09",
        end: "2019-03",
        period: "Sep 2018 — Mar 2019",
        duration: "7 mos",
        location: "Lahore, Pakistan",
        stack: [],
      },
    ],
  },
];

export const education = {
  institution: "University of Gujrat",
  degree: "BS Computer Software Engineering",
  period: "2014 — 2018",
  summary:
    "Four-year engineering programme: data structures, algorithms, database systems, object-oriented programming, software engineering and web technologies.",
  finalYearProject:
    "GSM-based home automation — control household appliances remotely from a mobile phone, built with Python.",
  stack: ["C#", "MySQL", "OOP", "Software Development"],
} as const;

/**
 * Domains, not job titles — what a recruiter is actually scanning for.
 * Every one is backed by a role above.
 */
export const domains = [
  "AI products & LLM integration",
  "E-commerce platforms",
  "Student information systems",
  "Learning management systems",
  "Client web platforms",
  "Teaching & mentoring",
] as const;
