# Portfolio — Muhammad Ridha Maulana

Personal portfolio site. Single-page, dark theme, built with Next.js App Router and
deployed on Vercel.

## Overview

- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4
- **Runtime:** Node.js 24
- **Package manager:** npm
- **Deploy target:** Vercel — https://rdhamlnn.vercel.app (static export from `out/`)
- **Repository:** https://github.com/rdhamlnn/portofolio (branch `main`)
- **Auto-deploy:** yes — `.github/workflows/deploy.yml` runs on every push to `main`. It
  needs the `VERCEL_TOKEN` repo secret (GitHub → Settings → Secrets → Actions). Vercel's own
  git integration is unavailable for this account (see Troubleshooting), so this replaces it.
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

Deploy (production, to the permanent alias):

```bash
npm run build                    # static export -> out/
npx vercel deploy --prod --yes   # https://rdhamlnn.vercel.app
```

Or just `git push` — GitHub Actions deploys automatically (see `.github/workflows/deploy.yml`).

Anonymous throwaway preview, if you ever need one:

```bash
npx vercel deploy out --temporary --yes   # expires in 60 min; claim URL printed at the end
```

The site is fully prerendered, so `next.config.ts` sets `output: "export"` and
`vercel.json` pins `outputDirectory: "out"` with `framework: null`. Do **not** let the
Vercel Next.js builder own the routing: the root route then resolves to 404 while
`/_next/*` assets still return 200 (see Troubleshooting).

## Project Structure

```
.github/
  workflows/deploy.yml    # push to main -> vercel deploy --prod -> verify alias 200
src/
  app/
    layout.tsx        # metadata, fonts, root shell
    page.tsx          # section composition order
    globals.css       # design tokens, keyframes, reveal + glass utilities
    icon.svg          # favicon
  components/
    Nav.tsx           # sticky nav, scroll progress, active section, mobile menu
    Hero.tsx          # hero, ambient canvas, typing role, stat strip, pointer parallax
    AmbientCanvas.tsx # cursor-reactive particle field (canvas 2D, no deps)
    TypingWords.tsx   # rotating role text
    Marquee.tsx       # double tech marquee (two opposed tracks, subtle parallax)
    About.tsx         # narrative + focus/principles cards (tilt + spotlight)
    SkillsExplorer.tsx# tabbed skill groups: count-up meters + shimmer
    Projects.tsx      # project list → detail explorer (crossfade panel)
    Timeline.tsx      # education/experience timeline (rail grows on scroll)
    Contact.tsx       # CTA + copy-email + channels (cursor glow border)
    Footer.tsx        # footer + magnetic back-to-top
    Reveal.tsx        # IntersectionObserver scroll reveal wrapper (5 axes)
    ScrollFX.tsx      # one rAF loop for parallax / rail-grow / dot-light
    fx.tsx            # TiltCard, CursorGlow, CountUp primitives
    icons.tsx         # BrandIcon / TechMark — brand marks + concept glyphs
    ui.tsx            # generic stroke glyphs (arrows, mail, copy, database...)
    brand-paths.ts    # GENERATED brand SVG paths — see scripts/make-brand-paths.py
    Section.tsx       # SectionShell / SectionHeading / Badge primitives
  data/
    site.ts           # ALL site content and copy
public/
  avatar.jpg          # profile photo (fetched from the GitHub avatar)
scripts/
  check-live.mjs      # runnable live check for a deployed URL
  make-brand-paths.py # regenerates src/components/brand-paths.ts
  make-favicon.py     # regenerates src/app/icon.svg
  brand-icons.json    # vendored simple-icons SVG source (CC0)
```

## Conventions

- Content, copy, and project metadata live in `src/data/site.ts`. Components render, they
  don't hardcode strings.
- Colors come from CSS custom properties in `globals.css` (`--accent`, `--accent-2`,
  `--line`, ...) exposed to Tailwind via `@theme inline`. Use the token names
  (`bg-accent`, `text-muted`, `border-line`) instead of raw hex.
- Animation is CSS-first, with a single JS rAF loop for anything scroll-driven. No
  animation library, and no new dependency for it.
  - CSS classes: `.reveal` (+ `data-axis` up/left/right/scale/blur/fade), `.stagger`
    (children rise in sequence), `.word` (word-by-word heading), `.animate-rise`,
    `.animate-panel`, `.animate-drift`, `.bar` (meter + shimmer), `.shine`,
    `.spotlight` / `.glow-border` / `.tilt` (pointer, driven by `--mx` / `--my` /
    `--rx` / `--ry` set in JS), `.magnet`.
  - `ScrollFX.tsx` is the only scroll listener on the page. It reads three data
    attributes: `[data-parallax="<speed>"]` (translate3d), `[data-grow]` (sets `--g`
    0..1 for the timeline rail) and `[data-dot]` (lights up past 72% viewport).
    Add a new scroll effect there instead of adding another listener.
- Pointer effects measure against the element box on `pointermove` and bail out for
  `pointerType === "touch"`, so they cost nothing on mobile.
- Every animation is disabled under `prefers-reduced-motion: reduce` — reveals snap
  visible, the rAF loop returns early, and pointer effects are skipped in JS. Verify
  with an `reducedMotion: "reduce"` Playwright context, not by eyeballing.
- Client components are marked `"use client"` only when they hold state or touch the DOM.
  Everything else stays a server component.
- Grid layouts always declare `grid-cols-1` before a `lg:grid-cols-[...]` override —
  an implicit single-column grid sizes to max-content and overflows on narrow screens.
- **Icons are inline SVG, never text glyphs and never an icon package.** `→`, `↗`, `↑`
  render differently per platform (emoji fallback on some, missing glyph on others) and
  `GH` / `@` as a "logo" is a placeholder, not a mark. Use `icons.tsx` for brand marks
  (via `brandByName`) and `ui.tsx` for generic glyphs. Both inherit `currentColor`, so
  color comes from the surrounding text class and size from `h-*` / `w-*`.
- A name with no real brand mark gets a drawn concept glyph, not a fake logo — `REST API`
  and `Database Design` map to `Braces` / `Database`. The mapping lives in `CONCEPT` in
  `icons.tsx`; add an entry there rather than inventing a brand.
- `src/components/brand-paths.ts` is **generated**. To add a mark: add the slug to
  `scripts/brand-icons.json` (fetch it from simple-icons), add the name -> key pair in
  `scripts/make-brand-paths.py`, then run `python3 scripts/make-brand-paths.py`.
  Never hand-edit a path or hand-pick a viewBox — every mark uses the canonical
  `0 0 24 24` grid, which is already optically consistent across brands.
- All marks come from [simple-icons](https://simpleicons.org) (CC0-1.0), so they are
  free to use without attribution. Keep the credits line in this file if you swap sources.

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

- `next.config.ts` — `output: "export"` + `images.unoptimized` (required by static export)
  and `reactStrictMode`. `vercel.json` — `framework: null`, `outputDirectory: "out"`.
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
- **`scrollWidth` is a few px wider than `clientWidth` on mobile, but nothing looks
  broken.** Cause: `.reveal[data-axis="left"|"right"]` offsets by `translateX`, and an
  element that has not been revealed yet sits at that offset. If the offset exceeds the
  section padding (`px-5` = 20px), it widens the document. `body { overflow-x: hidden }`
  hides it visually, so the page does not actually scroll sideways — which is why the
  measurement and the screenshot disagree. Fix: keep the horizontal reveal offset under
  20px (currently 18px). Note an element starts at `opacity: 0` but **still contributes
  to scrollWidth**, so measure right after load, before any scrolling.
- **A `<Reveal>` wrapper never becomes visible.** Cause: `IntersectionObserver` never
  fires for an element inside a `display: none` subtree, so `data-shown` stays `false`
  and `.reveal` keeps `opacity: 0` forever. This bit the hero scroll cue, which is
  `hidden sm:flex`. Fix: for anything the layout hides at some breakpoint, use a plain
  `animate-rise` div instead of `Reveal`. If a section ever renders below the fold with
  `content-visibility: auto`, the same trap applies.
- **A pointer effect never shows up but the CSS looks right.** Check whether the custom
  property is being set on the element or on its wrapper — `.glow-border::after` on an
  `<a>` reads `--mx` from the `CursorGlow` div *around* that `<a>`, so `el.style` is empty
  while `getComputedStyle(el).getPropertyValue("--mx")` resolves fine. Assert on the
  pseudo-element's computed `opacity` and on the wrapper's inline `--mx`, not on the
  element's own inline style.
- **Testing effects with Playwright.** `page.locator(".sel").scrollIntoView()` animates
  under `scroll-behavior: smooth`, so `getBoundingClientRect()` and hover coordinates are
  stale — inject `html{scroll-behavior:auto !important}` or use `window.scrollTo`.
  Playwright here lives in the Hermes install, not this project: import it with
  `createRequire(import.meta.url)("/usr/local/lib/hermes-agent/node_modules/playwright")`
  and launch with `executablePath: "/usr/bin/google-chrome"` (the bundled headless shell
  is not downloaded). Keep those scripts in `/tmp`, never in this repo.
- **A brand icon renders as an empty box or nothing at all.** Check the path is non-empty
  and that the `<svg>` has a `viewBox`. `path.getBBox()` returning `0x0`, or the rendered
  rect being `0x0`, means the mark did not draw. A quick sweep that walks every `<svg>`
  and flags zero-size ones catches this in one pass — it found 67/67 good after the icon
  work. Note `getBBox()` returns all-zero when the parent has `display: none`, so scroll
  the element into view (or check the rendered rect instead) before trusting it.
- **Avatar looks blurry.** `next/image` only requests the widths configured via `sizes` /
  `width`. Raise the requested width rather than scaling the source. `images.unoptimized`
  is required for static export, so `sizes` is what controls the delivered file.
- **`git push` fails with `403 ... denied to <user>` on a repo the token can read.**
  Cause: a fine-grained PAT (prefix `github_pat_`) only reaches repositories explicitly
  selected when the token was created, so anything created afterwards — including your own
  new repo — stays out of scope. Fix: `gh auth login --web --scopes repo,workflow,read:org`
  and complete the device flow; that issues a `gho_` token with full scope.
- **`git push` fails with `could not read Username for 'https://github.com'`.** Cause: the
  credential helper was neutralised, or a stale separate helper is configured. `gh auth
  setup-git` installs `!gh auth git-credential`, which is the helper that actually works —
  leave it enabled and do not override it per-command.
- **`vercel git connect` fails with `You need to add a Login Connection to your GitHub
  account first. (400)`.** The Vercel account was created with an email/SMS login, not via
  GitHub, so it has no Git integration. Deploy hooks fail the same way (`The project is not
  connected to any repository so it cannot have deploy hooks`). Fix: deploy from GitHub
  Actions with an account token instead — see `.github/workflows/deploy.yml`. Adding the
  login connection in the Vercel dashboard is the alternative.
- **Vercel API returns `User not found.` for `GET /v2/user` on a valid token.** Expected for
  an account-level access token: it can drive deploys, but the user endpoint is not readable.
  Verify a token with `vercel project ls --token <t>` instead — a good token lists projects.

## Review Triggers

Update this file when: commands, dependencies, runtime, deployment target, design tokens,
or the `src/data/site.ts` shape change.
