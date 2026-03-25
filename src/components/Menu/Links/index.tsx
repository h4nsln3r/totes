import React, { useMemo } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface MenuLinksProps {
  activeSection: string;
  isMobile: boolean;
}

const MenuLinks: React.FC<MenuLinksProps> = ({ activeSection, isMobile }) => {
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

  /** Måste matcha `.menu { height }` i menu.scss */
  const FIXED_MENU_HEIGHT_PX = 50;
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

    if (id === "music") {
      // Matchar scroll-lockens landning: videon ska inte släppa in nästa sektion i botten.
      const y = isMobile ? top - window.innerHeight * 0.1 + 5 : top;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      return;
    }

    if (id === "about") {
      // Matcha scroll-lockens landning: vi vill undvika att "nästa sektion smyger in" i botten.
      const y = isMobile ? top - window.innerHeight * 0.1 + 5 : top;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      return;
    }

    const y = isMobile ? top - window.innerHeight * 0.1 + 5 : top;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  return (
    <ul>
      {displayLinks.map((link) => (
        <li key={link.id}>
          <a
            className={classNames({ active: activeSection === link.id })}
            onClick={() => scrollToId(link.id)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuLinks;
