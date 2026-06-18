import React, { useMemo } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import {
  SECTION_SCROLL_EXTRA_OFFSET_PX,
  SECTION_SCROLL_MENU_HEIGHT_PX,
} from "../../../constants/sectionScroll";

interface MenuLinksProps {
  activeSection: string;
  onLinkClick?: () => void;
}

const MenuLinks: React.FC<MenuLinksProps> = ({ activeSection, onLinkClick }) => {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      { label: t("nav.live"), id: "live" },
      { label: t("nav.music"), id: "music" },
      { label: t("nav.about"), id: "about" },
      { label: t("nav.contact"), id: "contact" },
    ],
    [t]
  );

  const displayLinks = links;

  /** Måste matcha `SECTION_SCROLL_MENU_HEIGHT_PX` / `.menu { height }` */
  const FIXED_MENU_HEIGHT_PX = SECTION_SCROLL_MENU_HEIGHT_PX;

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY;
    // Samma landning som `useSectionScrollLock` / `scrollToSectionId` + `SECTION_SCROLL_EXTRA_OFFSET_PX`.
    const extra = SECTION_SCROLL_EXTRA_OFFSET_PX[id] ?? 0;
    const y = top - FIXED_MENU_HEIGHT_PX + extra;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
    onLinkClick?.();
  };

  return (
    <ul>
      {displayLinks.map((link) => (
        <li key={link.id}>
          <a
            href={`#${link.id}`}
            className={classNames({ active: activeSection === link.id })}
            onClick={(e) => onNavClick(e, link.id)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuLinks;
