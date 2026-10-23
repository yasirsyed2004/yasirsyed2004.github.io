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
    slug: "iehsas-lms",
    title: "IEHSAS learning management system",
    role: "Full-Stack Developer, IEHSAS",
    period: "Jul 2025 — Jun 2026",
    summary:
      "A learning management system for the Institute of Engineering, Health Sciences and Applied Sciences — proctored online entry tests, enrolment, courses, and an internal task and reporting module for staff.",
    problem:
      "Admission at a technical institute starts with an entry test, and running it in person limits who can apply and how quickly. Moving it online raises a harder question: a test that can be answered from another tab, or by someone else, measures nothing. After the test, enrolment moves through documents, verification and course selection — usually on paper and over email — while the staff processing it need visibility into their own workload.",
    approach:
      "Built on Laravel 12 with MySQL, server-rendered Blade views and role-based access through Spatie Permission for administrators, staff and students. Candidates move from a test introduction to registration — one attempt per CNIC or passport — to a timed test proctored in the browser: camera and microphone are required, face-api.js checks that a face stays in frame, periodic webcam snapshots are stored against the attempt, and tab switches or leaving fullscreen are recorded as violations with escalating warnings before auto-submission. Administrators manage a question bank of multiple-choice and true/false questions with marks and ordering, review each attempt with its snapshots, and grant retakes individually. Passing candidates continue into enrolment with document upload, approval and generated PDF enrolment forms, then into courses organised by category, module and lesson with progress tracking and reviews. A separate staff module covers departments, tasks with comments, attachments, progress logs, reviews and an audit trail, shareable read-only task links, and daily activity reports with monthly PDF and Excel exports.",
    impact:
      "Live at lms.batakhe.com, running the institute's online entry tests, enrolment and staff reporting.",
    stack: [
      "Laravel 12",
      "PHP",
      "MySQL",
      "Blade",
      "Bootstrap 5",
      "Alpine.js",
      "Spatie Permission",
      "face-api.js",
      "DomPDF",
      "Laravel Excel",
    ],
    links: {
      live: "https://lms.batakhe.com",
      caseStudy: "/work/iehsas-lms",
    },
    cover: "/covers/iehsas-lms.webp",
    gallery: [
      {
        src: "/work/iehsas-lms/entry-test.webp",
        alt: "Entry test introduction showing duration, question count, passing score and proctoring instructions",
        caption:
          "Entry test — the rules up front: duration, passing score, one attempt per CNIC, and what proctoring requires.",
        width: 1920,
        height: 1070,
      },
      {
        src: "/work/iehsas-lms/registration.webp",
        alt: "Student registration form with course selection and identity fields",
        caption:
          "Registration — course selection and identity details before the test unlocks.",
        width: 1792,
        height: 1140,
      },
      {
        src: "/work/iehsas-lms/question-bank.webp",
        alt: "Admin question bank listing questions with type, options, marks and order",
        caption:
          "Question bank — multiple-choice and true/false questions with marks and ordering, filterable by test.",
        width: 1891,
        height: 876,
      },
      {
        src: "/work/iehsas-lms/attempts.webp",
        alt: "Admin attempt statistics: total attempts, completed, passed and average score",
        caption:
          "Attempt overview — completion, pass count and average score at a glance.",
        width: 1893,
        height: 348,
      },
    ],
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
