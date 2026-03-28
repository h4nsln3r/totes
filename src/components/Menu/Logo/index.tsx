import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import totesLogoSymbol from "../../../assets/logo/totes_svart_symbol.png";

interface MenuLogoProps {
  isMobile: boolean;
  menuWidth: number;
  activeSection: string;
}

const MenuLogo: React.FC<MenuLogoProps> = ({ isMobile, menuWidth, activeSection }) => {
  const [showLogo, setShowLogo] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const showLogoAt = isMobile ? 90 : 200;
    const hideLogoAt = isMobile ? 60 : 120;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollingDown = scrollY > lastScrollY.current;
      lastScrollY.current = scrollY;

      if (scrollingDown) {
        if (scrollY > showLogoAt) setShowLogo(true);
      } else {
        if (scrollY < hideLogoAt) setShowLogo(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const imgClass = !isMobile ? "menu__logo--desktop" : "menu__logo--mobile";

  const variants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  const hideOnContact = activeSection === "contact";

  return (
    <AnimatePresence mode="wait">
      {showLogo && !hideOnContact && (
        <motion.div
          key="menu-logo-symbol"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.2 }}
          className="menu__logo-animation"
          style={{ width: menuWidth - 20 }}
        >
          <img src={totesLogoSymbol} alt="Totes Logo" className={imgClass} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuLogo;
