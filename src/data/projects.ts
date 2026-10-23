/**
 * Case studies.
 *
 * This file is the whole projects section. Add an entry and you get a card, a
 * hover state, a `/work/<slug>` detail page, a sitemap entry and metadata — no
 * component changes required.
 *
 * Cards degrade: a missing `live` or `repo` hides that button rather than
 * rendering a dead link. `impact` is a TODO placeholder until it can be
 * replaced with a real, defensible number; see `isTodo()` in `src/lib/utils`.
 */

export type ProjectLinks = {
  live?: string;
  repo?: string;
  caseStudy?: string;
};

export type Project = {
  slug: string;
  title: string;
  role: string;
  period: string;
  /** One sentence. Used on the card. */
  summary: string;
  /** What was actually hard. */
  problem: string;
  /** What was built, and why that way. */
  approach: string;
  /** What changed. TODO until there's a real number behind it. */
  impact: string;
  stack: string[];
  links: ProjectLinks;
  /** Path under /public. */
  cover: string;
};

export const projects: Project[] = [
  {
    slug: "echooo-ai-platform",
    title: "AI features for an influencer marketing platform",
    role: "Full Stack Developer, Echooo.AI",
    period: "May 2025 — Present",
    summary:
      "AI-driven features built end to end: FastAPI services on the backend, Next.js and React on the front, and a typed contract holding the two together.",
    problem:
      "An AI feature is easy to demo and hard to ship. Model calls are slow, occasionally wrong, and never free — and none of that is allowed to leak into the interface. On a platform people run their working day on, a feature that hangs for eight seconds is not a feature.",
    approach:
      "The backend is Python and FastAPI with typed request and response models, so the frontend works against a contract rather than a guess. LLM and third-party AI APIs sit behind service boundaries — the UI talks to our API, never to a provider directly — which keeps prompt changes, retries and provider swaps out of the client entirely. PostgreSQL holds the state those models read and write. Performance work is continuous rather than a phase at the end: API paths and database queries get profiled and tightened as real usage patterns show up, not when someone complains. Features go from spec to release with product and design in the room rather than over a wall.",
    impact:
      "TODO: replace with a real metric — e.g. p95 latency on the AI path before/after, feature adoption, or cost per request.",
    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "REST APIs",
    ],
    links: { caseStudy: "/work/echooo-ai-platform" },
    cover: "/covers/echooo-ai-platform.svg",
  },
  {
    slug: "university-systems",
    title: "Student portals and an LMS, built in-house",
    role: "Software Developer, University of South Asia",
    period: "Mar 2022 — Jan 2025",
    summary:
      "Three years building the internal systems a university actually runs on — student information portals and learning management platforms.",
    problem:
      "A university's records don't live in one place. Enrolment, results, attendance and course material each arrive in their own format, usually downstream of a spreadsheet, and every department is certain its exception is the important one. A student information system that can't absorb that gets worked around within a term, and then it's just another spreadsheet.",
    approach:
      "Built the portals and the LMS in-house rather than bending an off-the-shelf product around a structure it was never designed for: React on the front against REST APIs, PHP behind them, and a data model shaped for the migrations that were still coming rather than only the ones already done. The unglamorous half was most of the work — authentication, real role boundaries between students, faculty and administration, and importing years of existing records without quietly losing any of them. It ran concurrently with a client-facing role at PlanLab, which is an effective way to find out how much scope you can actually carry.",
    impact:
      "TODO: replace with a real metric — e.g. students or staff on the system, records migrated, or manual hours removed per term.",
    stack: ["React.js", "PHP", "REST APIs", "GitHub"],
    links: { caseStudy: "/work/university-systems" },
    cover: "/covers/university-systems.svg",
  },
  {
    slug: "planlab-client-platforms",
    title: "Client web platforms at PlanLab Solutions",
    role: "Web Developer, PlanLab Solutions",
    period: "Nov 2020 — Jan 2025",
    summary:
      "Four years taking client web platforms from brief to production, held alongside the university role.",
    problem:
      "Agency work is a stream of one-off builds: different clients, different scopes, the same deadline. Every project is tempted to reinvent authentication, admin and deployment from scratch, and every project that gives in pays for it in month three, when somebody else has to pick it up.",
    approach:
      "Built client platforms in TypeScript against REST APIs, leaning on convention rather than cleverness so a handover stayed legible to whoever inherited it. The habit that came out of four years of it: decide early which parts are genuinely bespoke to this client and which are last quarter's problem wearing a new logo — and only build the first kind twice. Most of those years overlapped with the university role, which is its own lesson in what a schedule will actually hold.",
    impact:
      "TODO: this role has no description on LinkedIn either — add the clients or sectors you can name, what you built for them, and one number.",
    stack: ["TypeScript", "REST APIs", "GitHub"],
    links: { caseStudy: "/work/planlab-client-platforms" },
    cover: "/covers/planlab-client-platforms.svg",
  },
  {
    slug: "gsm-home-automation",
    title: "GSM home automation",
    role: "Final year project, University of Gujrat",
    period: "2018",
    summary:
      "Control household appliances from a mobile phone over GSM — the final year project of a software engineering degree, built with Python.",
    problem:
      "Home automation in 2018 assumed a house with reliable broadband and an occupant with an app store account. Plenty of houses had neither. Almost every one of them had a phone that could send a text message.",
    approach:
      "Used GSM as the transport instead of the internet: a phone sends a command, a GSM module receives it, and a Python control layer interprets it and switches the appliance. The interesting constraints were the unglamorous ones — parsing instructions off an unreliable channel, deciding what 'fail safe' means when a message arrives garbled or twice, and reporting the state of a physical switch back through a medium that can only answer in text.",
    impact:
      "TODO: replace with something concrete — e.g. number of appliances controlled, command round-trip time, or the grade it earned.",
    stack: ["Python", "GSM", "Embedded I/O"],
    links: { caseStudy: "/work/gsm-home-automation" },
    cover: "/covers/gsm-home-automation.svg",
  },

  // ---------------------------------------------------------------------------
  // TEMPLATE — copy, uncomment, fill in. Drop a cover at
  // `public/covers/<slug>.svg` (or .jpg/.png) and it appears in the grid and at
  // /work/<slug> with no component changes.
  //
  // {
  //   slug: "project-slug",
  //   title: "Project title",
  //   role: "Your role, Company or Client",
  //   period: "Mon YYYY — Mon YYYY",
  //   summary: "One sentence a recruiter can skim.",
  //   problem: "What was genuinely hard about this.",
  //   approach: "What you built, and why that way rather than the obvious way.",
  //   impact: "The number. Latency, revenue, adoption, time saved.",
  //   stack: ["Tech", "Tech", "Tech"],
  //   links: {
  //     live: "https://example.com",        // omit to hide the button
  //     repo: "https://github.com/…",       // omit to hide the button
  //     caseStudy: "/work/project-slug",
  //   },
  //   cover: "/covers/project-slug.svg",
  // },
  // ---------------------------------------------------------------------------
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
