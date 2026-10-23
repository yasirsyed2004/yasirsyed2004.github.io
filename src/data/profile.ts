/**
 * Every string the site renders about the person lives here.
 * Components read from this file; they never hardcode copy.
 *
 * Source of truth: the LinkedIn profile as captured 2 September 2026.
 */

export type SocialLink = {
  label: string;
  href: string;
  /** Shown in the contact block; the human-readable target. */
  handle: string;
};

export type Profile = {
  name: string;
  title: string;
  headline: string;
  positioning: string;
  location: string;
  yearsExperience: number;
  availability: string;
  email: string;
  /** Display form; `tel:` href is derived. */
  phone: string | null;
  /**
   * TODO: add the GitHub profile URL.
   * Left null on purpose — the contact block, the footer and the JSON-LD
   * `sameAs` list render nothing for a null link rather than shipping a dead
   * one. Fill it in and all three light up.
   */
  github: string | null;
  linkedin: string;
  /** Served from `public/Yasir_Abbas_Resume.pdf`; the filename is what the browser saves. */
  cv: string;
  /**
   * Drop your headshot at `public/yasir-abbas.jpg` and it appears in About and
   * in the JSON-LD. If the file isn't there the portrait block removes itself
   * rather than showing a broken image, so this needs no second edit.
   */
  portrait: string | null;
  /**
   * TODO (optional): a Cal.com / Calendly URL. When set, the contact CTA
   * becomes "Book a call"; when null it falls back to email.
   */
  scheduling: string | null;
  about: string[];
};

export const profile: Profile = {
  name: "Yasir Abbas",
  title: "Full-Stack Developer",
  headline:
    "Full-Stack Developer @ Echooo.AI · Building AI products with Python (FastAPI) & Next.js",
  positioning:
    "Full-Stack Developer building AI-powered products — FastAPI on the back, Next.js on the front.",
  location: "Lahore, Pakistan",
  yearsExperience: 5,
  availability:
    "Open to full-stack and backend roles — remote or Lahore-based.",
  email: "yasir13abbas96@gmail.com",
  phone: "+92 332 5858208",
  github: null,
  linkedin: "https://www.linkedin.com/in/yasir-abbas-dev",
  cv: "/Yasir_Abbas_Resume.pdf",
  portrait: "/yasir-abbas.jpg",
  scheduling: null,
  about: [
    "Full-stack developer with five years of experience building web platforms and, most recently, AI-powered products.",
    "At Echooo.AI I build AI-driven features end to end — FastAPI services on the backend, Next.js and React on the front, with LLM integrations that turn model output into things users actually rely on. Before this I spent four years shipping client web platforms at PlanLab Solutions, and three years at the University of South Asia building internal systems — SIS portals, LMS — while lecturing on e-commerce and front-end development.",
    "I've built e-commerce sites, student information systems and learning management platforms from scratch, which means I've handled the unglamorous parts: auth, payments, data migrations, and the performance work that comes after launch.",
  ],
};

/** Derived once so no component builds a URL by hand. */
export const emailHref = `mailto:${profile.email}`;
export const phoneHref = profile.phone
  ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
  : null;

/**
 * TODO: replace with the production domain once deployed, or set
 * NEXT_PUBLIC_SITE_URL in the Vercel project. Drives canonical URLs, Open
 * Graph tags, sitemap.xml and the JSON-LD Person schema.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yasir-abbas.vercel.app";

export const seo = {
  title: `${profile.name} — ${profile.title}`,
  description:
    "Full-stack developer in Lahore with 5 years of experience. FastAPI and Python on the backend, Next.js and React on the front, with LLM integrations in production. Open to full-stack and backend roles, remote or Lahore-based.",
  keywords: [
    "Full-Stack Developer",
    "Backend Developer",
    "Python Developer",
    "Software Engineer",
    "PHP Developer",
    "FastAPI",
    "Next.js",
    "React",
    "TypeScript",
    "Laravel",
    "PostgreSQL",
    "LLM integration",
    "Lahore",
    "Remote",
  ],
} as const;

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: `${profile.location} · ${profile.yearsExperience} years`,
  headline: profile.name,
  subhead: profile.positioning,
  primaryCta: { label: "View work", href: "#work" },
  secondaryCta: { label: "Download CV", href: profile.cv },
  scrollCue: "Scroll",
} as const;

export const sectionCopy = {
  about: {
    eyebrow: "About",
    heading: "Five years of web platforms. Now AI products.",
  },
  experience: {
    eyebrow: "Experience",
    heading: "Teaching, client delivery, and now AI products.",
    concurrentNote: "Concurrent roles",
    asideEyebrow: "Timeline",
    asideRange: "2018 — Present",
    asideRolesLabel: "roles",
    asideEmployersLabel: "employers",
    asideNote: "Two of them ran at the same time.",
  },
  work: {
    eyebrow: "Selected work",
    heading: "Real problems, and what I did about them.",
    intro:
      "Case studies drawn from the roles above. Each one is the honest version: what was hard, what I built, what it changed.",
  },
  skills: {
    eyebrow: "Skills",
    heading: "What I reach for.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's talk.",
    intro:
      "Email is the fastest route. Everything else is below, and the CV is one click away.",
    bookCta: "Book a call",
    emailCta: "Email me",
  },
} as const;

export const footer = {
  note: `Built with Next.js, GSAP, Framer Motion and React Three Fiber. Designed and coded by ${profile.name}.`,
  copyright: `© ${new Date().getFullYear()} ${profile.name}`,
} as const;

/** Social links, filtered so a null URL never renders. */
export const socialLinks: SocialLink[] = [
  { label: "Email", href: emailHref, handle: profile.email },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    handle: profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, ""),
  },
  ...(phoneHref && profile.phone
    ? [{ label: "Phone", href: phoneHref, handle: profile.phone }]
    : []),
  ...(profile.github
    ? [
        {
          label: "GitHub",
          href: profile.github,
          handle: profile.github.replace(
            /^https?:\/\/(www\.)?github\.com\//,
            "@",
          ),
        },
      ]
    : []),
];
