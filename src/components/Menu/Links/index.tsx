import React, { useMemo } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  SECTION_SCROLL_EXTRA_OFFSET_PX,
  SECTION_SCROLL_MENU_HEIGHT_PX,
} from "../../../constants/sectionScroll";

interface MenuLinksProps {
  activeSection: string;
  isMobile: boolean;
  /** När mobilmenyn är öppen: stagger-animation på länkar */
  mobileNavOpen?: boolean;
  onLinkClick?: () => void;
}

const mobileListVariantsClosed = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.055, delayChildren: 0.06 },
  },
};

const mobileItemVariants = {
  closed: { opacity: 0, x: 20 },
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 420, damping: 30 },
  },
};

const MenuLinks: React.FC<MenuLinksProps> = ({
  activeSection,
  isMobile,
  mobileNavOpen,
  onLinkClick,
}) => {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      { label: t("nav.live"), id: "live" },
      { label: t("nav.music"), id: "music" },
      { label: t("nav.about"), id: "about" },
    ],
    [t]
  );

  const displayLinks = links;

  /** Måste matcha `SECTION_SCROLL_MENU_HEIGHT_PX` / `.menu { height }` */
  const FIXED_MENU_HEIGHT_PX = SECTION_SCROLL_MENU_HEIGHT_PX;
  /** Endast Live: scrolla in i sektionen så musik-ytan försvinner och bara ljus/vit Live-yta syns */
  const LIVE_SCROLL_INTO_SECTION_PX = isMobile ? 88 : 64;

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY;

    if (id === "live") {
      const y = top - FIXED_MENU_HEIGHT_PX - 8 + LIVE_SCROLL_INTO_SECTION_PX;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      return;
    }

    // Samma landning som scroll-lock (`useSectionScrollLock`): undvik att föregående sektion syns ovanför.
    const extra = SECTION_SCROLL_EXTRA_OFFSET_PX[id] ?? 0;
    const y = top - FIXED_MENU_HEIGHT_PX + extra;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  if (isMobile && mobileNavOpen) {
    return (
      <motion.ul
        variants={mobileListVariantsClosed}
        initial="closed"
        animate="open"
      >
        {displayLinks.map((link) => (
          <motion.li key={link.id} variants={mobileItemVariants}>
            <a
              className={classNames({ active: activeSection === link.id })}
              onClick={() => {
                scrollToId(link.id);
                onLinkClick?.();
              }}
            >
              {link.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    );
  }

  return (
    <ul>
      {displayLinks.map((link) => (
        <li key={link.id}>
          <a
            className={classNames({ active: activeSection === link.id })}
            onClick={() => {
              scrollToId(link.id);
              onLinkClick?.();
            }}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuLinks;
