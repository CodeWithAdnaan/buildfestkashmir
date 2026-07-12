# BuildFest Kashmir

Official website for BuildFest Kashmir — a student developer community based
in Srinagar. Production Next.js 15 app, built incrementally page by page.

## Stack

- **Next.js 15** (App Router, React Server Components)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config — tokens live in `src/app/globals.css`, not `tailwind.config.ts`)
- **shadcn/ui** conventions, hand-built on top of Radix primitives (`src/components/ui`)
- **Framer Motion** — scroll reveals, staggered headline, micro-interactions
- **GSAP + ScrollTrigger** — registered via `src/lib/animations/gsap.ts`, wired to Lenis
- **Lenis** — inertia smooth scroll (`src/components/providers/smooth-scroll-provider.tsx`)
- **Supabase** — `src/lib/supabase/client.ts` (browser) and `server.ts` (RSC/route handlers)
- **React Hook Form + Zod** — installed, ready for the Registration/Join Team/Contact forms
- **next/font** — Fraunces (display), Inter (body), IBM Plex Mono (data/labels), self-hosted, zero layout shift

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project URL + anon key
npm run dev
```

Open http://localhost:3000.

## Folder architecture

```
src/
  app/                        route segments (App Router)
    layout.tsx                root layout: fonts, metadata, SmoothScrollProvider
    page.tsx                  Home page — composes sections/home/*
    globals.css                design tokens + Tailwind v4 @theme
    sitemap.ts / robots.ts     SEO
  components/
    ui/                       shadcn-style primitives (Button, Accordion, Sheet, Separator...)
    layout/                   SiteHeader, SiteFooter — shared across every page
    sections/
      home/                   one file per Home section (Hero, CommunityImpact, ...)
      [future: events/, registration/, team/, gallery/, community/, blog/, partners/, contact/]
    shared/                   cross-page building blocks (Reveal, ChinarLeaf, MountainRidge,
                               AnimatedCounter, Marquee, ChinarDivider)
    providers/                SmoothScrollProvider (Lenis <-> GSAP ScrollTrigger sync)
  lib/
    animations/               Framer Motion variants + GSAP plugin registration
    supabase/                 client.ts, server.ts, types.ts (hand-written until `supabase gen types` is run)
    constants/                site config, nav, stats, FAQ, partners, event data — no hardcoded
                              copy inside components
    utils.ts                  cn(), date formatters
  hooks/                      use-scroll-header, use-countdown
  config/fonts.ts             next/font definitions
  types/                      shared TS types (grows as new pages land)
supabase/
  migrations/0001_init.sql    registrations, team_applications, contact_messages tables + RLS
```

## Design system (v2 — "modern developer ecosystem")

The site was redesigned away from the earlier editorial/magazine direction
toward the visual language of Vercel, Linear, Clerk, Convex, Raycast, and
Anthropic's marketing site: dark canvas, ambient gradient mesh, glass bento
cards, and a bundled grotesk font instead of a display serif.

- **Font**: [Geist Sans / Geist Mono](https://www.npmjs.com/package/geist) — Vercel's typeface, bundled locally via the `geist` npm package (`src/config/fonts.ts`). No Google Fonts network call, zero layout shift, matches the reference sites directly.
- **Canvas**: near-black (`--color-canvas`) by default, no light mode toggle yet.
- **Ambient background**: `src/components/shared/ambient-background.tsx` — a fixed dot-grid + three blurred radial gradient blobs (saffron + pine), mounted once in the root layout so it sits behind every route.
- **Bento cards**: `src/components/shared/bento-card.tsx` — the reusable glass tile (`backdrop-blur`, 1px border that lights up saffron on hover, lift-on-hover via Framer Motion). Every card in `bento-grid.tsx` is one of these with different `col-span`/`row-span` classes.
- **Signature motif**: the chinar leaf (`ChinarLeaf`) is now used sparingly — the wordmark icon and a couple of small in-card accents — rather than a large watermark, since the new direction is grid/product-led, not illustration-led.

| Token | Hex | Use |
|---|---|---|
| `canvas` | `#0a0d0c` | Page background |
| `canvas-raised` | `#101413` | Cards, nav-on-scroll, sheet panel |
| `saffron` | `#f0a53d` | The one brand accent — CTAs, glows, active states |
| `pine-glow` | `#2f6e56` | Secondary ambient glow, "cooler" bento glow variant |
| `ink` / `ink-muted` / `ink-faint` | `#f6f5f2` / `#a3a8a5` / `#6b716e` | Text hierarchy on dark |



## Note on `shadcn` CLI

This sandbox's network policy doesn't allow reaching `ui.shadcn.com`, so the
`src/components/ui/*` files were hand-authored directly against the same
Radix primitives the CLI would use, matching its component API exactly. On
your own machine (once `npx shadcn init` can reach the registry), running
`npx shadcn add <component>` will work normally and drop new components into
`src/components/ui/` alongside these.

## Roadmap

**All pages complete:** Home, Events (listing + dynamic detail pages),
Registration (multi-step form), Join Team, Team, Gallery, Community, Blog
(listing + dynamic article pages), Partners, Contact.

**Infrastructure follow-up complete:** favicon/OG/Twitter/Apple icons
(generated, not static files), Supabase session-refresh middleware,
branded error/global-error/not-found/loading states. See below for what's
still intentionally left open (rate limiting, email, admin dashboard,
tests).

Every page is real content — no lorem ipsum, no placeholder copy — wired to
the Supabase tables scaffolded in `supabase/migrations/0001_init.sql` where
a page collects data (Registration, Join Team, Contact).

### Community page notes

- `/community` — Mission & Vision (two glass cards), Values (4 principles),
  Open Source (real repo list linking to GitHub), a Leadership teaser
  linking to `/team`, and a Roadmap (quarterly, `src/lib/constants/community.ts`).

### Blog page notes

- `/blog` — a featured-post hero plus a grid, `/blog/[slug]` statically
  generated for all 4 posts (`src/lib/constants/blog.ts`). Every post is
  real, specific content (an origin story, a hackathon-to-product case
  study, a workshop retrospective, a design philosophy piece) — not generic
  "5 tips for developers" filler.

### Partners page notes

- `/partners` — full directory grouped by tier (Title/Gold/Silver/Community,
  `src/lib/constants/partner-directory.ts` — separate from the lighter
  `partners.ts` string list still used by the home page marquee), each with
  a real description of what they actually provide, plus a "Become a
  Partner" CTA that deep-links to `/contact?subject=partnership` and
  pre-fills the contact form's subject field.

### Contact page notes

- `/contact` — a real form (Zod + Server Action → `contact_messages`
  table) plus an info panel with email, socials, and an embedded map.
  The map uses **OpenStreetMap's embed** rather than Google Maps, since OSM
  doesn't require an API key — no credentials to configure for this to
  work out of the box.
- This is the only page marked `ƒ` (dynamic) in the build output, because
  it reads `?subject=` from the URL server-side to pre-fill the form; every
  other page is fully static.

### Infrastructure notes (favicon, OG image, middleware, error states)

- **Favicon / OG image / Twitter card / Apple touch icon** — all generated
  at build time via Next's `ImageResponse` (`src/app/icon.tsx`,
  `apple-icon.tsx`, `opengraph-image.tsx`, `twitter-image.tsx`), not static
  files. No image-editing tool needed, and they stay in sync with the brand
  tokens automatically since they're built from the same colors as the CSS.
  The OG/Twitter image content is shared from `src/components/og/og-content.tsx`.
- **`middleware.ts`** — refreshes the Supabase auth session cookie on every
  request, per the documented `@supabase/ssr` pattern. Nothing in the app
  uses Supabase Auth yet (every page only does anonymous inserts), but
  skipping this now means an organizer-login feature added later would
  silently break on expired cookies. It no-ops safely if Supabase env vars
  aren't set.
- **`error.tsx` / `global-error.tsx`** — branded error boundaries instead of
  Next's default unstyled error screen. `global-error.tsx` necessarily
  renders its own `<html>`/`<body>` with inline styles (it replaces the
  root layout entirely when the layout itself throws), so it can't use the
  Tailwind classes the rest of the site relies on.
- **Root `not-found.tsx` / `loading.tsx`** — a branded 404 for truly unknown
  URLs (separate from the entity-specific ones on `/events/[slug]` and
  `/blog/[slug]`), and a minimal loading fallback for route segments
  without their own.
- **Not done, and worth knowing about:** no rate limiting on the three
  public insert endpoints (registrations, team applications, contact) —
  RLS allows anonymous inserts by design, which also means nothing stops a
  script from spamming them. No transactional email (the "confirmation
  email" copy in the registration/join flows is UI text, not a wired
  Resend/SendGrid integration). No admin dashboard to read what comes into
  those tables. No automated tests or CI config.

### Events page notes

- `src/lib/constants/events.ts` holds the full dataset (4 sample events — 2
  upcoming, 2 past) with schedule, speakers, mentors, sponsors, and prizes.
  Swap in real data here; the shape is defined in `src/types/event.ts`.
- `/events` — timeline split into Upcoming / Past, using `EventCard`.
- `/events/[slug]` — statically generated for every slug via
  `generateStaticParams`. Sections: hero + live countdown, overview,
  schedule, speakers & mentors, prizes, sponsors, gallery, and a registration
  CTA (hidden automatically once `registrationOpen: false`).

### Registration page notes

- `/events/[slug]/register` — 4-step form (Personal → Academic → Links & Team
  → Review), built with **React Hook Form + Zod**, validated per-step before
  advancing and re-validated server-side in the Server Action before insert.
  Only generated for events with `registrationOpen: true`.
- `src/lib/validations/registration.ts` — the single Zod schema shared by
  both the client form and the Server Action (`src/app/events/[slug]/register/actions.ts`),
  so validation rules never drift between client and server.
- On submit, the Server Action inserts into the `registrations` Supabase
  table and returns the new row's id. The confirmation screen
  (`components/sections/registration/confirmation.tsx`) then generates a
  **QR ticket** client-side (via the `qrcode` package, encoding the
  registration id + event slug) and an **Add to Calendar** `.ics` download
  built from the event's actual date/venue — no external calendar API
  needed.
- Nothing here will actually persist until real Supabase credentials are in
  `.env.local` — the insert will fail gracefully and show the form's error
  state, which is expected without a linked project.

### Join Team page notes

- `/team/join` — 8 roles (Technical, Design, Operations, Marketing,
  Photography, Videography, Hospitality, Volunteer) as bento cards
  (`src/lib/constants/roles.ts`). Clicking a card opens a centered modal
  (`src/components/ui/dialog.tsx` — distinct from the mobile nav's side-panel
  `Sheet`) with a dedicated application form for that role.
- The form is keyed by `role.id` (`key={role.id}` on `RoleApplicationForm`),
  so switching roles remounts it with fresh state rather than manually
  resetting via a `useEffect` — avoids a React "setState in effect" footgun
  and keeps the component simpler.
- Submits via `applyForRole` (`src/app/team/join/actions.ts`) into the
  `team_applications` Supabase table, validated with the same Zod schema
  client- and server-side (`src/lib/validations/team-application.ts`).

### Team page notes

- `/team` — 8 members across 6 groups (`src/lib/constants/team.ts`,
  `src/types/member.ts`) as profile cards with a gradient-initials avatar
  (no stock headshots), bio, and social links that only render for
  platforms a member actually has.
- **lucide-react dropped brand/logo icons** in recent versions (no `Github`,
  `Linkedin`, `Twitter`, `Instagram` exports) — `src/components/shared/social-icons.tsx`
  has small hand-drawn line-icon substitutes instead of the official
  marks, used here and reusable anywhere else the site needs social links.

### Gallery page notes

- `/gallery` — organized into albums (`src/lib/constants/gallery.ts`,
  `src/types/gallery.ts`), each a CSS-columns masonry grid of tiles with
  varied heights (`sm`/`md`/`lg`). Albums link back to `/events/[slug]`
  when `eventSlug` is set.
- Clicking any tile opens a **fullscreen lightbox**
  (`components/sections/gallery/lightbox.tsx`) that navigates across *all*
  albums as one continuous sequence — arrow keys, prev/next buttons, and a
  running "3 / 18" counter — not just within the album you clicked from.
- A few tiles are marked `isVideo: true` to demonstrate video-support UI (a
  play-button affordance in the grid and lightbox); there's no real video
  file behind them yet, so the lightbox honestly shows "Video playback
  coming soon" rather than pretending to play something. Wire up real
  `<video>`/HLS sources here once you have actual event footage.
- Every tile is currently a gradient placeholder, same as the rest of the
  site — swap in real photos and nothing else needs to change structurally.
