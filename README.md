# Portfolio — Muhammad Ridha Maulana

Personal portfolio site. Single-page, dark theme, built with Next.js App Router and
deployed on Vercel.

## Overview

- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4
- **Runtime:** Node.js 24
- **Package manager:** npm
- **Deploy target:** Vercel (static export from `out/`, anonymous temporary deployment)
- **Data:** all content lives in `src/data/site.ts` — edit that file, not the components

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server on http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run check <url>  # live smoke test against a deployed URL (needs playwright-core + Chrome)
```

Deploy:

```bash
npm run build                       # static export -> out/
npx vercel deploy out --temporary --yes   # anonymous deploy; claim URL printed at the end
```

The site is fully prerendered, so `next.config.ts` sets `output: "export"` and only the
`out/` directory is uploaded. Do **not** deploy the source directory: with the default
Vercel Next.js builder the root route resolves to 404 while `/_next/*` assets still return
200 (see Troubleshooting).

## Project Structure

```
src/
  app/
    layout.tsx        # metadata, fonts, root shell
    page.tsx          # section composition order
    globals.css       # design tokens, keyframes, reveal + glass utilities
    icon.svg          # favicon
  components/
    Nav.tsx           # sticky nav, scroll progress, active section, mobile menu
    Hero.tsx          # hero, ambient canvas, typing role, stat strip
    AmbientCanvas.tsx # cursor-reactive particle field (canvas 2D, no deps)
    TypingWords.tsx   # rotating role text
    Marquee.tsx       # infinite tech marquee
    About.tsx         # narrative + focus/principles cards
    SkillsExplorer.tsx# tabbed skill groups with animated meters
    Projects.tsx      # project list → detail explorer
    Timeline.tsx      # education/experience timeline
    Contact.tsx       # CTA + copy-email + channels
    Footer.tsx        # footer + back-to-top
    Reveal.tsx        # IntersectionObserver scroll reveal wrapper
    Section.tsx       # SectionShell / SectionHeading / Badge primitives
  data/
    site.ts           # ALL site content and copy
public/
  avatar.jpg          # profile photo (fetched from the GitHub avatar)
scripts/
  check-live.mjs      # runnable live check for a deployed URL
```

## Conventions

- Content, copy, and project metadata live in `src/data/site.ts`. Components render, they
  don't hardcode strings.
- Colors come from CSS custom properties in `globals.css` (`--accent`, `--accent-2`,
  `--line`, ...) exposed to Tailwind via `@theme inline`. Use the token names
  (`bg-accent`, `text-muted`, `border-line`) instead of raw hex.
- Animation is CSS-only where possible: `.reveal` (scroll reveal), `.animate-rise`
  (entry), `.animate-drift` (ambient), `.bar` (skill meter). No animation library.
- Client components are marked `"use client"` only when they hold state or touch the DOM.
  Everything else stays a server component.
- Grid layouts always declare `grid-cols-1` before a `lg:grid-cols-[...]` override —
  an implicit single-column grid sizes to max-content and overflows on narrow screens.

## Boundaries

**NEVER** touch or commit:

- `.env*` files and any real credentials
- `.vercel/` and `.next/` build output
- `node_modules/`

Do not add a new runtime dependency for animation, icons, or UI primitives — the site is
dependency-free beyond Next.js, React, and Tailwind on purpose.

## Dependencies

Runtime: `next`, `react`, `react-dom`.
Dev: `typescript`, `tailwindcss` (+ `@tailwindcss/postcss`), `eslint` + `eslint-config-next`,
`playwright-core` (used only by `scripts/check-live.mjs`).

## Configuration

- `next.config.ts` — only `reactStrictMode`; defaults otherwise.
- Tailwind v4 is configured entirely in `globals.css` via `@import "tailwindcss"` —
  there is no `tailwind.config.js`.
- Fonts: `Geist` and `Geist_Mono` through `next/font/google`, exposed as
  `--font-geist-sans` / `--font-geist-mono`.

## Error Handling

The ambient canvas bails out early if the 2D context is missing, pauses on
`document.hidden`, and tears down every listener on unmount. The copy-to-clipboard button
falls back to an unlabelled state when the clipboard API is denied (non-HTTPS or blocked
permission) instead of throwing.

## Troubleshooting

- **Root route returns 404 on Vercel while `/_next/*` assets and `index.html` return 200.**
  Cause: deploying the *source directory* lets `@vercel/next` build and own the routing, and
  the generated route table does not serve `/`. Fix: build with `output: "export"` and deploy
  the `out/` directory instead — static hosting serves `/` from `out/index.html` directly.
  Symptom to look for: `GET /` returns 404 with `content-disposition: inline; filename="404"`
  while `GET /index.html` returns 200 with the right `<title>`.
- **Horizontal scroll appears below ~414px.** Cause: a grid without an explicit
  `grid-cols-1` sizes to max-content. Check the layout wrappers first. Decorative layer
  children (drifting glow divs, the marquee track) legitimately sit outside the viewport —
  verify with `document.documentElement.scrollWidth - clientWidth === 0`, not by scanning
  every element's bounding box.
- **Avatar looks blurry.** `next/image` only requests the widths configured via `sizes` /
  `width`. Raise the requested width rather than scaling the source. `images.unoptimized`
  is required for static export, so `sizes` is what controls the delivered file.

## Review Triggers

Update this file when: commands, dependencies, runtime, deployment target, design tokens,
or the `src/data/site.ts` shape change.
