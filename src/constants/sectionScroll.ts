/** Fast menyhöjd — ska matcha `useSectionScrollLock` / `menu.scss`. */
export const SECTION_SCROLL_MENU_HEIGHT_PX = 50;

/**
 * Extra vertikal offset per sektion vid scroll-till-sektion (meny + scroll-lock).
 * Håll synkad mellan `Routing.tsx` och `Menu/Links`.
 */
export const SECTION_SCROLL_EXTRA_OFFSET_PX: Record<string, number> = {
  live: 56,
  music: 50,
  about: 50,
  contact: 50,
  'past-gigs': 50,
};
