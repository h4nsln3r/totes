# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

Band website for Totes, a Malmö trio. Single-page app deployed to GitHub Pages at www.totes.band.

## Commands

```bash
npm run dev       # dev server with HMR
npm run build     # tsc + vite build (postbuild writes CNAME + 404.html to dist/)
npm run lint      # ESLint, zero warnings allowed
npm run preview   # preview the production build locally
```

## Architecture

Single-page app with a custom **section scroll-lock** — the main UX mechanism. Sections snap one at a time via wheel, touch, keyboard, and scrollbar. No router pages; all content is on one page with section IDs.

### Section system

Each section is wrapped in `SectionWrapper` (`src/sections/index.tsx`), which renders a `<section id={sectionName}>`. The hook `useSectionScrollLock` in `Routing.tsx` takes the ordered list of section IDs and intercepts scroll/wheel/touch/keyboard events to snap between them.

Active sections: `hero`, `live`, `music`, `about`, `contact`. `past-gigs` and `merch` are commented out in `Routing.tsx`.

**Critical sync point**: `SECTION_SCROLL_EXTRA_OFFSET_PX` in `src/constants/sectionScroll.ts` must stay in sync with the section IDs used in `Routing.tsx` and `Menu/Links`. Changing section offsets or adding/removing sections requires updating both places.

The menu auto-hides when `contact` is the active section (via `useScrollSpy`). Menu switches to light theme when scrolled over the `music` section.

### Data

- `src/data/gigs.ts` — `UPCOMING_GIGS` and `PAST_GIGS` arrays using the `Gig` type from `src/types/gigs.ts`. Gig dates are ISO strings (`YYYY-MM-DD`, `YYYY-MM`, or `YYYY`). Formatted for display in `src/utils/date.ts`.
- `src/data/merch.ts` — merch items (section currently inactive).

### i18n

All UI copy lives in `src/i18n.ts` — Swedish (default), English, and Spanish. The language switcher component exists but is commented out in the menu.

### Key dependencies

- **Framer Motion** — menu slide animation
- **MUI icons** — menu open/close icons
- **SCSS** — each section and component has a co-located `.scss` file; shared variables in `src/styles/variables.scss`
- **i18next / react-i18next** — translations
- **classnames** — conditional class merging
