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
    slug: "iehsas-hrm",
    title: "IEHSAS HR management platform",
    role: "Deployment & customisation, IEHSAS",
    period: "Feb 2026",
    summary:
      "A multi-tenant HR platform for IEHSAS built on HRMGo, a commercial Laravel HR SaaS — deployed, branded and locked down as a private internal tool with separate super admin, company and HR workspaces.",
    problem:
      "IEHSAS needed one place to run staff administration — employees, payroll, timesheets, performance, training and recruitment — without commissioning a bespoke system. HR software is well-understood territory, and building it from scratch would have meant months of work on features that mature products already do well. The job was to choose a solid product and fit it to the organisation cleanly, including the parts it should not expose.",
    approach:
      "Chose HRMGo, a multi-tenant HR SaaS on Laravel 11, rather than building from scratch, and deployed it at hrm.batakhe.com with its three tiers configured: a super admin layer for companies, plans, email templates and system settings; company workspaces covering staff, employees, payroll, timesheets, performance, finance, assets, documents, policies and meetings; and an HR role for day-to-day administration. IEHSAS branding — dark and light logos and the favicon — is applied through the platform's brand settings. Out of the box the product ships as a public SaaS storefront, so I changed the routing to send the root URL straight to the login page and pointed the landing-page navigation there too, turning it into a private tool for one organisation rather than a sign-up site.",
    impact:
      "Live at hrm.batakhe.com as IEHSAS's internal HR system, delivered as a configured product in days rather than a bespoke build over months.",
    stack: [
      "HRMGo",
      "Laravel 11",
      "PHP",
      "MySQL",
      "Multi-tenant SaaS",
      "Role-based access",
    ],
    links: {
      live: "https://hrm.batakhe.com/login",
      caseStudy: "/work/iehsas-hrm",
    },
    cover: "/covers/iehsas-hrm.webp",
    gallery: [
      {
        src: "/work/iehsas-hrm/super-admin.webp",
        alt: "Super admin dashboard with paid users, total order amount and most purchased plan",
        caption:
          "Super admin — companies, plans and orders across the whole platform.",
        width: 1894,
        height: 885,
      },
      {
        src: "/work/iehsas-hrm/brand-settings.webp",
        alt: "Brand settings page showing the IEHSAS dark logo, light logo and favicon",
        caption:
          "Brand settings — IEHSAS logos and favicon applied across the platform.",
        width: 1893,
        height: 876,
      },
      {
        src: "/work/iehsas-hrm/company-dashboard.webp",
        alt: "Company dashboard with staff, tickets, account balance and jobs totals",
        caption:
          "Company workspace — staff, payroll, timesheets, performance and finance in one place.",
        width: 1894,
        height: 875,
      },
      {
        src: "/work/iehsas-hrm/hr-dashboard.webp",
        alt: "HR dashboard with the profile menu open and the HR navigation sidebar",
        caption:
          "HR role — day-to-day administration with its own scoped navigation.",
        width: 1887,
        height: 878,
      },
    ],
  },
  {
    slug: "iehsas-website",
    title: "IEHSAS corporate website",
    role: "Web Developer, IEHSAS",
    period: "2025",
    summary:
      "The public website for IEHSAS, a health, safety and environment training and consultancy firm — a WordPress site with a WooCommerce course catalogue, service pages, accreditations and certificate verification.",
    problem:
      "An HSE training and consultancy firm sells two very different things: accredited qualifications such as NEBOSH, OSHA, OTHM and NFPA to individuals, and consultancy, inspection and auditing services to companies. Each visitor arrives looking for something specific — a course, a fee, proof of accreditation, an office nearby — and the site has to answer before they move on. The content never stops growing: new courses, new service lines and new articles, most of them added by staff rather than a developer.",
    approach:
      "Built on WordPress with the Academia education theme, Elementor and WPBakery for page layouts, and Slider Revolution for the home page hero. Courses are WooCommerce products — 24 courses across eight categories, each with duration, level and an apply action — so staff can add and update the catalogue without code. A mega menu organises six service families (assessment, OH&S layouts, QHSE manuals, ISO consultancy, inspection and personnel secondment) and every qualification route into dedicated pages: more than 370 pages and a blog of over 160 articles, with XML sitemaps and Google Site Kit supporting search visibility and analytics. Enquiries come in through Contact Form 7, an online enrolment form and WhatsApp click-to-chat, while accreditation and client pages, certificate verification, and office details for Lahore, Islamabad, Karachi and the UK carry the trust signals a safety-training buyer looks for.",
    impact:
      "Live at iehsas.com — more than 370 pages, 160 articles and a 24-course catalogue, managed day to day by the IEHSAS team.",
    stack: [
      "WordPress",
      "WooCommerce",
      "Elementor",
      "WPBakery",
      "Slider Revolution",
      "Contact Form 7",
      "SEO",
    ],
    links: {
      live: "https://www.iehsas.com",
      caseStudy: "/work/iehsas-website",
    },
    cover: "/covers/iehsas-website.webp",
    gallery: [
      {
        src: "/work/iehsas-website/home.webp",
        alt: "IEHSAS home page hero with the headline Welcome To IEHSAS and an Enroll Now button",
        caption:
          "Home — the hero, mega-menu navigation and the firm's positioning.",
        width: 1920,
        height: 1200,
      },
      {
        src: "/work/iehsas-website/services.webp",
        alt: "Six service cards: accredited qualification, third-party trainings, auditing, consultancy, inspection and personnel secondment",
        caption: "What We Offer — the six service families at a glance.",
        width: 1920,
        height: 1105,
      },
      {
        src: "/work/iehsas-website/programs.webp",
        alt: "Popular programmes grid with NEBOSH IGC, Train the Trainer and OTHM qualifications",
        caption: "Popular programmes — the flagship qualifications.",
        width: 1920,
        height: 1200,
      },
      {
        src: "/work/iehsas-website/courses.webp",
        alt: "WooCommerce course catalogue with course cards and a course category sidebar",
        caption:
          "Course catalogue — WooCommerce products filtered by category, maintained by staff.",
        width: 1920,
        height: 1200,
      },
      {
        src: "/work/iehsas-website/clients.webp",
        alt: "Our Valuable Clients page with a grid of client company logos",
        caption: "Clients — the trust signals a corporate buyer looks for.",
        width: 1920,
        height: 1200,
      },
    ],
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
