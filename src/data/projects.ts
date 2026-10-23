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

/** A screenshot on the case-study page. Dimensions are the file's own. */
export type ProjectShot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
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
  /** Optional screens, shown on the case-study page under the write-up. */
  gallery?: ProjectShot[];
};

export const projects: Project[] = [
  {
    slug: "echooo-dashboard",
    title: "Echooo.AI influencer campaign platform",
    role: "Full Stack Developer, Echooo.AI",
    period: "May 2025 — Present",
    summary:
      "A multi-role SaaS platform that runs influencer campaigns end to end — creator discovery, outreach, content approval, payments and results analytics — for agencies, brands and creators.",
    problem:
      "Influencer campaigns are usually run across spreadsheets, direct messages, email threads and screenshots of insights. Finding creators whose audience matches the brief, contacting them at scale, approving their content, paying them and proving the result each happen in a different tool, and the data never connects. Brands cannot see what their budget delivered, and agencies cannot grow past the number of conversations their team can keep track of.",
    approach:
      "The campaign is the unit of work, and it moves through one pipeline: Discover, Outreach, Content, Result and Payment. The Next.js frontend uses role-scoped parallel routes, so agency teams, brand clients, creators and internal operations each get their own workspace from a single codebase. Behind it is a FastAPI service on PostgreSQL (SQLAlchemy with Alembic migrations), with Redis-backed background jobs and WebSockets for real-time chat and notifications. Discovery combines live search across social platforms with demographic and audience filters; shortlists roll up reach, engagement, creator tiers and audience location; the results view reports views, engagement rate and cost per view, broken down by content theme and length. LLM providers — OpenAI, Gemini and Claude — sit behind a service layer that powers brief parsing and campaign insights, alongside electronic contracts, creator payments, a Shopify affiliate integration and an MCP connector that lets AI assistants work with an account. As a full-stack developer on the team, I build features end to end across the frontend and the API.",
    impact:
      "In production at dashboard.echooo.ai, serving agency teams, brand clients and creators across Pakistan, the UAE and the wider MENA region.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "LLM APIs",
      "Docker",
      "Google Cloud",
    ],
    links: {
      live: "https://dashboard.echooo.ai",
      caseStudy: "/work/echooo-dashboard",
    },
    cover: "/covers/echooo-dashboard.webp",
    gallery: [
      {
        src: "/work/echooo-dashboard/campaigns.webp",
        alt: "Campaign board showing each campaign's market, dates and pipeline counts",
        caption:
          "Campaign board — every campaign's market, dates and pipeline from discovered to onboarded. Budgets redacted.",
        width: 1893,
        height: 875,
      },
      {
        src: "/work/echooo-dashboard/discovery.webp",
        alt: "Creator discovery table with demographic filters for location, gender and age",
        caption:
          "Discovery — creator search with audience and demographic filters.",
        width: 1896,
        height: 874,
      },
      {
        src: "/work/echooo-dashboard/shortlist.webp",
        alt: "Shortlist overview with total reach, creator tier composition and top locations",
        caption:
          "Shortlist — combined reach, engagement, creator tiers and audience location before outreach begins.",
        width: 1896,
        height: 878,
      },
      {
        src: "/work/echooo-dashboard/profile-analytics.webp",
        alt: "Creator profile analytics with performance trend, top countries and audience gender",
        caption:
          "Profile analytics — follower trend, audience countries and audience gender and age for a single creator.",
        width: 1896,
        height: 590,
      },
      {
        src: "/work/echooo-dashboard/results.webp",
        alt: "Campaign results analytics with views, engagement, insights and breakdown charts",
        caption:
          "Results — campaign views, engagement and automated insights, broken down by theme and content length. Cost per view redacted.",
        width: 1890,
        height: 873,
      },
    ],
  },
  {
    slug: "echooo-website",
    title: "Echooo.ai marketing website",
    role: "Full Stack Developer, Echooo.AI",
    period: "2026",
    summary:
      "The public website for Echooo.ai — product storytelling, solution pages for each customer segment, pricing, creator sign-up and demo booking, in light and dark themes.",
    problem:
      "An AI-native platform is hard to explain in one headline. Echooo has four autonomous agents, two discovery modes and customers ranging from small brands to enterprises, agencies and government — plus creators, a second audience with entirely different goals. The site had to make the product legible to each of them and turn interest into either a booked demo or a creator sign-up.",
    approach:
      "Built with the Next.js App Router and Tailwind CSS. The product is shown rather than described: the home page uses working interface mock-ups of the real dashboard — campaign board, shortlist and agent panels, labelled as illustrative data — instead of stock imagery. Each customer segment has its own solution page, pricing compares plans with a monthly and yearly toggle, and the creators page funnels straight into dashboard registration. Demo booking, a light and dark theme, JSON-LD structured data, generated Open Graph images, and the legal pages that platform integrations require (privacy, terms, refunds and data deletion) are all part of the build, along with documentation for the Echooo AI connector.",
    impact:
      "Live at echooo.ai as the front door to the platform — the route by which brands book demos and creators register on the dashboard.",
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JSON-LD",
      "Open Graph",
      "Light & dark themes",
    ],
    links: {
      live: "https://echooo.ai",
      caseStudy: "/work/echooo-website",
    },
    cover: "/covers/echooo-website.webp",
    gallery: [
      {
        src: "/work/echooo-website/home.webp",
        alt: "Echooo.ai home page hero with an interactive campaign board mock-up",
        caption:
          "Home — the headline beside a live mock-up of the campaign board.",
        width: 1920,
        height: 1200,
      },
      {
        src: "/work/echooo-website/agencies.webp",
        alt: "Agencies solution page with the headline One platform. All your clients.",
        caption: "Solution pages — one per customer segment.",
        width: 1920,
        height: 1200,
      },
      {
        src: "/work/echooo-website/pricing.webp",
        alt: "Pricing page comparing five plans with a monthly and yearly toggle",
        caption: "Pricing — five plans with a monthly and yearly toggle.",
        width: 1920,
        height: 1200,
      },
      {
        src: "/work/echooo-website/creators.webp",
        alt: "Creators page with a sign-up call to action and a sample campaign brief",
        caption:
          "For creators — a separate funnel into dashboard registration.",
        width: 1920,
        height: 1200,
      },
    ],
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
  //   gallery: [                            // optional; omit for no screens
  //     {
  //       src: "/work/project-slug/screen.webp",
  //       alt: "What the screen shows",
  //       caption: "One line under the image.",
  //       width: 1920,                      // the file's real pixel size
  //       height: 1200,
  //     },
  //   ],
  // },
  // ---------------------------------------------------------------------------
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
