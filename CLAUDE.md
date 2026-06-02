# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server at localhost:3000
npm run build      # production build → ./build/
npm test           # run tests (interactive watch mode)
npm run deploy     # build + push to gh-pages branch (triggers GitHub Actions)
```

`NODE_OPTIONS=--openssl-legacy-provider` is already wired into the start/build scripts — do not remove it.

## Architecture

**Stack:** React 18 + TypeScript, bootstrapped with CRA (`react-scripts 5`). No custom webpack config. Framer Motion for animation, Three.js + Matter.js for interactive visuals, Tailwind CSS available but styles are primarily in custom CSS files.

**Entry point:** `src/index.tsx` → `src/App.tsx` (React Router v6) → routes to page components.

**Two UI layers exist:**
- `src/newui/` — the active UI. `NewPortfolio.tsx` is the root component; it composes all sections. Styles live in `src/newui/newPortfolio.css`.
- `src/components/Portfolio.tsx` — old UI, unused.

**Routing:** Currently only `"/"` is active. `/blog` and `/wordbank` routes exist in commented-out code in `App.tsx` and `Navigation.tsx`/`Masthead.tsx`.

**Content data** lives as plain TypeScript arrays in `src/components/data/`:
- `projectData.ts` — side projects and research projects
- `publicationsData.ts` — academic publications
- `researchData.ts` — research experience
- `blogData.ts` / `blogPostsData.ts` — blog/essay posts (typed as `BlogPost[]`)

**CSS custom properties** (defined in `newPortfolio.css` `:root`):
- `--col: 740px` — max content width used throughout
- `--text`, `--muted`, `--link`, `--border`, `--award` — semantic color tokens

**AmbientHeroBackground** (`src/newui/AmbientHeroBackground.tsx`) — canvas-based particle/word animation rendered inside `.hero-shell`. Uses `requestAnimationFrame` with Matter.js physics. Heavy component; changes here affect perceived page load.

**ResearchInterestsViz** (`src/newui/ResearchInterestsViz.tsx`) — Three.js visualization, 385 lines. Isolated; no shared state with the rest of the app.

**Navigation:** `Masthead.tsx` (sticky top nav, scroll-to-section) and `Navigation.tsx` (pill-style, same links) both hardcode nav items as local arrays — keep them in sync when adding routes.

**Deployment:** GitHub Actions (`.github/workflows/*.yml`) runs `npm ci && npm run build` on push to `main`, then deploys to GitHub Pages. Node 22 is required.
