/** Framer-motion variants för expand/collapse (höjd + opacity), t.ex. accordion och utfall. */
export const heightExpandVariants = {
  collapsed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
} as const;
