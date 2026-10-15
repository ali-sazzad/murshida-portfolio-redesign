# Murshida P. — Portfolio

A redesign of the personal portfolio of **Murshida P.**, Web Developer (BSc Computer Science, MSc Computer Science — Data Analytics in progress). The site keeps all of the original content and imagery and gives it a new visual language, motion system and navigation model.

**Live:** https://murshida-portfolio-redesign.vercel.app · **GitHub Pages:** https://ali-sazzad.github.io/murshida-portfolio/

## Highlights

- **Cursor lens hero** – a circular lens follows the pointer (or drifts on touch devices) and reveals an inverted colour version of the scene.
- **Floating dock navigation** with a sliding active indicator, a full-screen mobile menu and a *Connect* sheet.
- **Ink-wipe page transitions** powered by Astro view transitions; the dock and cursor persist between pages.
- **Smooth scrolling** with Lenis, scroll-reveal masks and word-by-word text fill.
- **Skills as a periodic table** of tools with a live specimen readout.
- **About** with a rotating-text portrait badge, education timeline and achievement stamps, plus a drag-and-inertia gallery rail.
- **Experience** as stacking, scaling cards; **Certificates** as an indexed list with hover wipes.
- Fully responsive, keyboard accessible, and respects `prefers-reduced-motion`.

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
