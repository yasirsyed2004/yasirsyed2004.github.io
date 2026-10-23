# Yasir Abbas — Portfolio

Personal portfolio site. Next.js App Router, TypeScript (strict), Tailwind CSS v4,
GSAP + ScrollTrigger, Framer Motion, React Three Fiber, Lenis. Deploy target: Vercel.

**All five build phases are complete.** Static build, scroll motion, WebGL hero,
Framer Motion polish, and the audit pass.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

Node 20+ (developed on 22.22).

---

## Before you deploy — what to fill in

| What | Where | Why |
|---|---|---|
| **Your photo** | overwrite `public/yasir-abbas.jpg` | A monogram placeholder ships in its place so nothing 404s and the layout is complete. Drop your headshot at the same path — square, 640px or larger — and it appears in About and in the JSON-LD. No code change. |
| **CV PDF** | overwrite `public/Yasir_Abbas_Resume.pdf` | Every "Download CV" button points at it (`profile.cv`). Replace the file at the same path to update the CV everywhere — no code change. |
| **GitHub URL** | `profile.github` in `src/data/profile.ts` | Currently `null`. Nothing breaks — the contact row, the footer link and the JSON-LD `sameAs` entry simply don't render. Set the URL and all three appear. |
| **Project `impact`** | `impact` on each entry in `src/data/projects.ts` | Still `TODO:` strings. They are **hidden from the public UI** and shown as a loud accent box in `npm run dev` only, so a placeholder can never ship as visible copy. Replace with real numbers. |

Optional: `profile.scheduling` — set a Cal.com/Calendly URL and the contact CTA
becomes "Book a call" instead of "Email me".

Optional: `NEXT_PUBLIC_SITE_URL` — set it on Vercel to the production domain. It
drives canonical URLs, Open Graph tags, `sitemap.xml` and the JSON-LD schema.
Without it the code falls back to a placeholder (`SITE_URL` in `profile.ts`).

### Two content decisions worth reviewing

- **Email.** The site uses `yasir13abbas96@gmail.com` (the address on GitHub).
  One string in `profile.ts` if you want another.
- **Availability.** The site says *"Open to full-stack and backend roles — remote
  or Lahore-based"*, which is your LinkedIn wording. Your original brief said
  "open to relocation". They are different claims; the profile won.
- **Phone number.** `+92 332 5858208` is published in the contact block and the
  JSON-LD. That is a deliberate recruiter convenience with a real cost — a phone
  number in public HTML gets scraped. Set `profile.phone` to `null` to remove it
  everywhere.

---

## All copy lives in `src/data/`

No component contains a hardcoded string.

| File | Holds |
|---|---|
| `profile.ts` | Name, positioning, about paragraphs, contact links, nav, every section's eyebrow/heading/intro, footer, SEO |
| `experience.ts` | The timeline (grouped so concurrent roles render side by side), education, domains |
| `projects.ts` | Case studies — typed, with a commented-out template entry |
| `skills.ts` | The six skill groups |

### Adding a project

Add an entry to `projects` in `src/data/projects.ts` (there is a commented
template at the bottom of the file) and drop a cover at
`public/covers/<slug>.svg`. You get a card in the grid, a `/work/<slug>` detail
page, a sitemap entry and metadata — no component changes.

Cards degrade: omit `links.live` or `links.repo` and that button disappears
rather than rendering a dead link.

Covers can be SVG or raster (the Echooo covers are WebP). An optional `gallery`
of screenshots renders under the write-up on the case-study page; put the
files in `public/work/<slug>/` and give each its real pixel size.

---

## Design tokens

Everything is defined once in `src/styles/globals.css` under `@theme`.

**Spacing is on an 8px grid by construction.** `--spacing` is redefined to
`0.5rem`, so every Tailwind spacing utility is a multiple of 8: `p-1` is 8px,
`p-2` is 16px, `gap-3` is 24px. Read the numbers as multiples of 8, not
Tailwind's default 4. There is no way to write a 5px gap by accident.

**Colour** is one accent hue — blue (`--color-accent: #4c8dff`) — on a
near-black ground (`#08090b`, deliberately not `#000`). No purple, no pink, no
gradient duos. Every text/background pair clears WCAG AA:

| Pair | Ratio |
|---|---|
| `ink` on `base` | 17.6:1 |
| `ink-muted` on `base` | 7.9:1 |
| `ink-faint` on `base` | 6.5:1 |
| `accent` on `base` | 6.2:1 |
| `on-accent` on `accent` | 6.0:1 |

`ink-faint` started at 4.33:1 and was raised — it failed AA for normal text.

**Light theme.** A header toggle switches to a light palette defined as a
token override (`:root[data-theme="light"]` in `globals.css`), so no component
carries light-specific colours. Same single blue, darkened to `#1f5fd6` so it
still clears AA as text. The first visit follows the OS preference; an explicit
choice is saved in `localStorage` and synced across tabs. An inline script sets
`data-theme` before first paint, so there is no flash. With JavaScript off the
site renders dark. Use the `light:` variant for the rare case a component needs
to differ (only the portrait overlay does). Theme logic: `src/lib/theme.ts`
(server-safe) and `src/lib/theme-client.ts` (hook + toggle runtime).

| Pair (light) | Ratio |
|---|---|
| `ink` on `base` | 18.0:1 |
| `ink-muted` on `base` | 7.6:1 |
| `ink-faint` on `base` | 5.5:1 |
| `accent` on `base` | 5.3:1 |
| `on-accent` on `accent` | 5.7:1 |

**Type** is Space Grotesk (display) + Inter (body), self-hosted via `next/font`,
with fluid `clamp()` sizes defined as `--text-*` tokens.

---

## Structure

```
src/
  app/            layout.tsx, page.tsx, template.tsx, work/[slug]/page.tsx,
                  not-found.tsx, opengraph-image.tsx, icon.svg, sitemap.ts, robots.ts
  components/
    chrome/       Header, Footer
    hero/         Hero, HeroVisual, Scene, HeroFallback
    sections/     About, Experience, Projects, ProjectCard, Skills, Contact
    ui/           Button, Card, Tag, Container, Section, Grain, Portrait
    motion/       MotionProvider, Reveal, SplitLines, TimelineMotion
  data/           profile.ts, experience.ts, projects.ts, skills.ts
  lib/            gsap.ts (single registration point), polymorphic.ts, utils.ts
  styles/         globals.css
```

Two departures from the planned structure, both deliberate:

- `components/chrome/` — the fixed header and footer are page furniture, not
  section content and not primitives.
- The planned `useReveal` / `useSplitReveal` **hooks** ship as the **components**
  `Reveal` and `SplitLines`. A hook has to be called from the component that
  owns the markup, which would have forced every section to become a client
  component. As wrappers they take server-rendered children straight through, so
  `About`, `Experience`, `Projects`, `Skills` and `Contact` all stay server
  components and the client bundle only carries motion code.

---

## Motion architecture

Strict library boundaries. **Nothing is animated by two libraries.**

| Library | Owns | Where |
|---|---|---|
| **GSAP + ScrollTrigger** | Everything scroll-driven: section reveals, the pinned timeline, the rail scrub, SplitText line reveals, the header condense, the hero camera dolly | `components/motion/*`, `chrome/Header.tsx`, `hero/HeroVisual.tsx` |
| **Framer Motion** | Component state: the hero mount entrance, project-card hover, route transitions | `hero/Hero.tsx`, `sections/ProjectCard.tsx`, `app/template.tsx` |
| **R3F** | The hero 3D scene only | `hero/Scene.tsx` |

Where they meet, they meet on *different elements*: GSAP reveals the project
grid's `<li>`, Framer animates the `<article>` inside it. GSAP scrubs the hero
canvas wrapper, Framer animates the hero text.

**One registration point.** `src/lib/gsap.ts` registers `useGSAP` and
`ScrollTrigger` exactly once, and hands out `SplitText` through an async
`loadSplitText()` — nothing needs SplitText until a heading is about to scroll
into view, so it stays out of the critical bundle until then.

**Every animation lives in `useGSAP()` with a scope ref**, so cleanup is
automatic. There is no manual `kill()` anywhere in the codebase.

**Transform and opacity only.** Nothing animates `top`, `left`, `width`,
`height` or `box-shadow`. The header "condense" is the one that usually cheats:
here the header box is a fixed height, and what shrinks is the backdrop
(`scaleY` from its top edge) while the content row translates up to stay centred
in it.

**Lenis is synced to GSAP's ticker** — one RAF loop for the page, not two
competing ones — and pushes `ScrollTrigger.update()` on every scroll event.
`lagSmoothing(0)` keeps them in step after a dropped frame. It is imported
dynamically and only on a fine pointer: on a touch device Lenis improves nothing
over native momentum scrolling and would still cost parse time.

**Anchor links are intercepted** so `#work` glides instead of jumping while the
rest of the page is smooth-scrolling. Focus moves *immediately* rather than on
scroll completion — a keyboard user pressing "Skip to content" should not wait
out an animation — history is pushed so Back works, and modifier-clicks are left
alone.

**SplitText leaves no residue.** The split is created lazily inside `onEnter` and
reverted the instant the animation finishes, so its wrapper elements exist in the
DOM for about a second and never again. Nothing to go stale on resize, nothing
for a screen reader to trip over.

---

## The 3D hero

One WebGL scene, above the fold only.

- Eight fresnel shells — icosahedrons and drei rounded boxes — drifting slowly.
  A hand-written fresnel shader, so no environment map, no HDRI fetch and not a
  single light in the scene. One geometry per shape kind and **one material for
  all eight meshes**, which also gives the scroll fade a single uniform to scrub.
- **Cursor parallax is damped, never a 1:1 follow**, and frame-rate independent
  so it feels the same at 60 and 144fps.
- Two owners, two axes: the render loop owns camera x/y (parallax), GSAP owns the
  z dolly. GSAP writes a plain number into a ref that the frame loop reads — it
  never touches a three.js object, so the render loop stays the single authority
  over the scene graph.
- `next/dynamic` with `ssr: false`, `dpr={[1, 2]}`.
- **Rendering stops completely** (`frameloop="never"`) when the tab is hidden, and
  the canvas **unmounts entirely** once the hero is scrolled past — with a 600ms
  hysteresis so a fast scroll down and back doesn't churn a WebGL context.
- **No canvas at all on mobile, under reduced motion, or without a fine pointer**
  — and because the gate sits in front of the dynamic import, those visitors
  never download the three.js chunk (869KB raw) at all, rather than downloading
  it and declining to use it.
- The CSS composition in `HeroFallback` is always mounted underneath. It is the
  whole hero visual when there is no canvas and the atmosphere behind the
  geometry when there is, so mounting or unmounting the canvas never leaves a
  hole. **Measured CLS from the canvas: 0.**

---

## Accessibility and progressive enhancement

Verified on the production build, not asserted:

| Check | Result |
|---|---|
| Lighthouse accessibility (mobile) | **100** |
| Keyboard traversal | 26 stops, every one with a visible focus ring, none scrolled off-screen, no trap, Shift+Tab reverses cleanly |
| Skip link | first tab stop; moves focus to `#main`, not just scroll |
| Focus in the pinned timeline | escapes normally — pinning does not trap |
| Headings / landmarks | exactly one `h1`; every `<section>` labelled by its heading |
| Images | no `img` without `alt` |
| Console errors / failed requests | **0** |
| React key + hydration warnings (dev) | **0** |
| JavaScript disabled: elements left hidden | **0** |
| Reduced motion: Lenis instantiated / canvas rendered / timeline pinned | **no / no / no** |
| Reduced motion: elements left hidden | **0** |
| 4× CPU throttle: elements left hidden | **0**, ~35fps during scroll |

### Nothing is gated behind an animation

Two independent guards, because the two libraries fail differently.

**GSAP.** `[data-reveal]` elements are hidden by `.js-enabled [data-reveal]` in
`globals.css`, and `.js-enabled` is added by an inline script that runs before
first paint. No JavaScript, no class, nothing hidden.

**Framer Motion** server-renders its `initial` styles, which is a sharper edge:
an `opacity: 0` in the SSR output stays there forever if the page never
hydrates. Two things handle it — a `<noscript>` block releases any
`[data-motion-mount]` element, and, more importantly, **every animation above the
fold is transform-only**, so there is no opacity to be stuck at in the first
place.

`prefers-reduced-motion: reduce` is not bolted on afterwards. Every scroll
animation is created inside a `gsap.matchMedia()` block gated on
`(prefers-reduced-motion: no-preference)`, so under reduce the block never runs
and GSAP reverts anything already applied. Framer gets the same policy from one
`MotionConfig reducedMotion="user"` at the root. Toggling the OS setting takes
effect live, without a reload.

---

## Performance — measured, and one target missed

Lighthouse mobile, median of three runs against `next start` on the build
machine:

| Metric | Result | Target |
|---|---|---|
| Accessibility | **100** | ≥ 95 ✅ |
| Best practices | **100** | — ✅ |
| SEO | **100** | — ✅ |
| Cumulative Layout Shift | **0** | none ✅ |
| First Contentful Paint | 0.9 s | — |
| Total Blocking Time | 250–350 ms | — |
| **Performance** | **83** | ≥ 90 ❌ |
| **Largest Contentful Paint** | **3.7 s simulated** | < 2.5 s ❌ |

**Read the LCP number carefully.** *Observed* LCP is **~0.72 s** — the hero
subhead paints at first contentful paint, with no JavaScript dependency. The 3.7s
figure is Lighthouse's Lantern *simulation*, which on this run pins LCP to
Time to Interactive (3.7s vs TTI 3.7s, two milliseconds apart). Under real
device throttling instead of simulation, LCP measures **2.4 s and equals FCP** —
i.e. the largest element is painting as early as anything can.

Three real defects were found and fixed while measuring, all of which had put
LCP behind hydration:

1. `template.tsx` server-rendered the **entire page** at `opacity: 0` for its
   route transition. Chrome does not count an element at opacity 0 as painted, so
   nothing could be LCP until hydration finished — and with JavaScript off the
   page would never have appeared at all. It now animates on navigations only;
   the first render carries no motion styles.
2. The hero headline faded in on mount — LCP 3.7 s. Transform-only: 0.86 s.
3. The **subhead** then became the LCP element (it is the larger text block) and
   was still fading — LCP 3.66 s. Every above-the-fold element is now
   transform-only: 0.72 s.

Bundle work done for the same reason: SplitText and Lenis are dynamically
imported, Framer runs through `LazyMotion` with the `domAnimation` feature set
(`strict` mode makes an accidental full `motion.*` import a build error), route
prefetch is off for the four case-study links, the 26KB default favicon is a
0.3KB SVG, and the grain overlay lost its `mix-blend-mode` — a blended
full-viewport fixed layer forces the compositor to re-blend the whole screen on
every paint, for a texture nobody consciously sees.

**What is left, honestly.** The remaining gap is main-thread cost, and the single
largest contributor is React's own hydration: `react-dom` accounts for ~382ms of
long tasks on a 4×-throttled CPU before any of this site's code runs. Two
measurement caveats worth knowing before you accept the 83:

- This was measured on a shared cloud vCPU. Lighthouse was noisy across
  identical builds — TBT swung 180 → 350ms between runs of the same bundle.
- TTFB was **458ms from `next start` on localhost**. On Vercel's CDN that is
  typically 30–80ms, and it comes straight off FCP and LCP.

**Re-measure on the real deployment** with PageSpeed Insights before treating 83
as the number. If it still falls short there, the next levers in order of value
are: drop the route-transition wrapper entirely, replace the Framer card hover
with a CSS `:hover` transform (removing four client components), and serve the
scroll reveals from an IntersectionObserver on coarse-pointer devices so GSAP
loads only where Lenis already does.

---

## SEO

Next Metadata API with a title template, Open Graph and Twitter cards, a
generated OG image (`app/opengraph-image.tsx`, rendered with `next/og`),
`sitemap.xml`, `robots.txt`, per-case-study canonical URLs, and JSON-LD `Person`
schema including `worksFor`, `alumniOf`, `hasCredential`, `telephone` and
`sameAs` — every one of them driven from `src/data/`, so they cannot drift from
the visible copy.

---

## Resolved versions

| Package | Version |
|---|---|
| next | 16.3.4 |
| react / react-dom | 19.2.8 |
| typescript | 5.9.3 |
| tailwindcss | 4.3.3 |
| @tailwindcss/postcss | 4.3.3 |
| gsap | 3.15.0 |
| @gsap/react | 2.1.2 |
| motion | 13.1.1 |
| three | 0.185.1 |
| @types/three | 0.185.4 |
| @react-three/fiber | 9.7.0 |
| @react-three/drei | 10.7.8 |
| lenis | 1.3.26 |
| @vercel/analytics | 2.0.1 |
| eslint | 9.39.5 |
| eslint-config-next | 16.3.4 |

GSAP 3.15 ships `ScrollTrigger` and `SplitText` in the public package — both are
free under the Webflow-era licence, and both are in use.

---

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import it in Vercel. Framework preset: Next.js. No build overrides needed.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Enable Web Analytics in the project. `@vercel/analytics` is wired and only
   loads when `VERCEL_ENV` is present, so local production builds stay
   console-clean.
5. Re-run Lighthouse against the deployed URL — see the performance note above.
