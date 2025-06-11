import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import totesLogoTop from "../../../assets/logo/totes_line_1.png";
import totesLogoAlt from "../../../assets/logo/totes_svart_symbol.png"; // ersätt med din riktiga fil

interface MenuLogoProps {
  isMobile: boolean;
  isOpen: boolean;
  menuWidth: number;
}

const MenuLogo: React.FC<MenuLogoProps> = ({ isMobile, isOpen, menuWidth }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [useAltLogo, setUseAltLogo] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollingDown = scrollY > lastScrollY.current;
      lastScrollY.current = scrollY;

      // Hysteres för att visa/gömma loggan
      if (scrollingDown) {
        if (scrollY > 200) setShowLogo(true);
        if (scrollY > 700) setUseAltLogo(true);
      } else {
        if (scrollY < 300) setShowLogo(false);
        if (scrollY < 500) setUseAltLogo(false);
      }
    };

    handleScroll(); // direkt vid mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  const logoToShow = useAltLogo ? totesLogoAlt : totesLogoTop;
  const imgClass = isMobile
    ? useAltLogo
      ? "menu__logo--mobile-alt"
      : "menu__logo--mobile"
    : useAltLogo
    ? "menu__logo--desktop-alt"
    : "menu__logo--desktop";

  return (
    <AnimatePresence mode="wait">
      {showLogo && (
        <motion.div
          key={logoToShow}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.2 }}
          className={"menu__animation"}
          style={{ width: !isOpen ? menuWidth : 0 }}
        >
          <img src={logoToShow} alt="Totes Logo" className={imgClass} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuLogo;
