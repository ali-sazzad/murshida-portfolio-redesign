# Murshida P. — Portfolio Redesign

A redesign of the personal portfolio of **Murshida P.**, Web Developer (BSc Computer Science, MSc Computer Science — Data Analytics in progress). The site keeps all of the original content and imagery and gives it a new visual language, motion system and navigation model.

**Live:** https://murshida-portfolio-redesign.vercel.app · **GitHub Pages:** https://ali-sazzad.github.io/murshida-portfolio-redesign/

## Before & after

A 1-minute walkthrough of the original site next to the redesign: **[docs/before-after.mp4](docs/before-after.mp4)** (download or open on GitHub to play).

<video src="docs/before-after.mp4" controls muted width="100%"></video>

## Highlights

- **Black & white identity** – a pure monochrome palette (white paper, black ink, one neutral grey) with greyscale imagery, matching the original client look. Colour is reserved for the skill atoms and certificate ribbons.
- **Cursor lens hero** – a circular lens follows the pointer (or drifts on touch devices) and reveals an inverted version of the scene.
- **Floating dock navigation** with a sliding active indicator, a full-screen mobile menu and a *Connect* sheet.
- **Ink-wipe page transitions** powered by Astro view transitions; the dock and cursor persist between pages.
- **Smooth scrolling** with Lenis, scroll-reveal masks and word-by-word text fill.
- **Skills as atom clusters** – Languages, Frameworks, Data and Tooling are fused molecules of overlapping atoms with orbiting electrons; hover or tap an atom for a live readout.
- **About** as an editorial layout: pinned portrait, word-fill lead statement, "at a glance" facts, numbered education and achievements, plus a drag-and-inertia gallery rail.
- **Experience** as stacking, scaling cards.
- **Certificates as a folder stack** – each certificate is a tabbed folder with a guilloche-patterned certificate, ribbon and rotating seal that lands on the previous one as you scroll.
- Visible custom cursor on light backgrounds, fully responsive, keyboard accessible, and respects `prefers-reduced-motion`.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Astro](https://astro.build) (static output, view transitions) |
| UI islands | [React](https://react.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com), shadcn/ui-style `cva` components |
| Motion | CSS + [Lenis](https://lenis.darkroom.engineering) smooth scroll |
| Typography | Manrope, Playfair Display, IBM Plex Mono, Exo 2 |

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in ./dist
npm run preview   # serve the production build
```

Requires Node.js 22 or later.

## Project structure

```
src/
  components/   React islands (Chrome, HeroLens, SkillsTable, Rail, Cursor) + Astro partials
  data/         content.ts — all copy, links and asset references
  layouts/      Base.astro — shell, fonts, page transitions, scroll + reveal logic
  pages/        index, about, skills, projects, experience, certifications
  styles/       global.css — theme tokens, motion utilities
public/img/     profile photo, skill icons, achievement graphics
```

All editable content lives in [`src/data/content.ts`](src/data/content.ts).

## Deployment

### Vercel

Import the repository in Vercel — the Astro preset is detected automatically (build: `npm run build`, output: `dist`). No environment variables are required.

### GitHub Pages

A workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes the site on every push to `main`.

1. In the repository go to **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` — the site is published at `https://<user>.github.io/<repo>/`.

The workflow sets `BASE_PATH` and `SITE_URL` so links and assets resolve under the repository path; builds without these variables (Vercel, local) use the site root.

## License

© Murshida P. All rights reserved. Content and imagery belong to the owner.
