import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";

import { Footer } from "@/components/chrome/Footer";
import { Header } from "@/components/chrome/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Grain } from "@/components/ui/Grain";
import { education, timeline } from "@/data/experience";
import { SITE_URL, profile, seo } from "@/data/profile";
import { themeScript } from "@/lib/theme";
import "@/styles/globals.css";

const display = Space_Grotesk({
  variable: "--font-display-face",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body-face",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seo.title,
    template: `%s — ${profile.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: seo.title,
    title: seo.title,
    description: seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Browser chrome follows the OS scheme; matches `--color-base` in each theme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
  ],
  colorScheme: "dark light",
};

const currentRole = timeline[0]?.roles[0];

/** JSON-LD Person schema. Rendered server-side, no client cost. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: seo.description,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  ...(profile.phone ? { telephone: profile.phone } : {}),
  ...(profile.portrait ? { image: `${SITE_URL}${profile.portrait}` } : {}),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  worksFor: {
    "@type": "Organization",
    name: currentRole?.company ?? "Echooo.AI",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.institution,
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: education.degree,
  },
  knowsAbout: [...seo.keywords],
  sameAs: [profile.linkedin, profile.github].filter(
    (value): value is string => typeof value === "string",
  ),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${display.variable} ${body.variable} h-full antialiased`}
      lang="en"
      // The inline script below adds `js-enabled` and `data-theme` before
      // hydration, so the client's <html> legitimately differs from the server's.
      // Scoped to this element's own attributes; children still hydrate strictly.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-base text-ink">
        {/* Marks the document before first paint so animation start states are
            only ever applied when JavaScript is actually alive. Without it,
            `[data-reveal]` stays fully visible — content is never gated behind
            an animation that might not run. The same script sets `data-theme`
            so a light-theme visitor never sees a dark first frame. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* Framer Motion server-renders its `initial` styles, which would leave
            a mount-animated element at opacity 0 for anyone with JavaScript
            turned off. `<noscript>` is only parsed when scripting is disabled,
            so this releases exactly those elements and costs nothing
            otherwise — the same contract the `.js-enabled` guard gives the
            GSAP reveals. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-motion-mount]{opacity:1!important;transform:none!important}</style>",
          }}
        />

        <a
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-pill focus:bg-accent focus:px-3 focus:py-2 focus:text-on-accent"
          href="#main"
        >
          Skip to content
        </a>

        <MotionProvider>
          <Header />

          {/* tabIndex lets the skip link move focus here, not just scroll. */}
          <main className="flex-1" id="main" tabIndex={-1}>
            {children}
          </main>

          <Footer />
        </MotionProvider>
        <Grain />

        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          type="application/ld+json"
        />
        {process.env.VERCEL_ENV ? <Analytics /> : null}
      </body>
    </html>
  );
}
