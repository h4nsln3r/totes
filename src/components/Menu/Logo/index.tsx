import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import totesLogoSymbol from "../../../assets/logo/totes_svart_symbol.png";

interface MenuLogoProps {
  isMobile: boolean;
  isOpen: boolean;
  menuWidth: number;
}

const MenuLogo: React.FC<MenuLogoProps> = ({ isMobile, menuWidth, isOpen }) => {
  const [showLogo, setShowLogo] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollingDown = scrollY > lastScrollY.current;
      lastScrollY.current = scrollY;

      if (scrollingDown) {
        if (scrollY > 200) setShowLogo(true);
      } else {
        if (scrollY < 300) setShowLogo(false);
      }

      if (isMobile && isOpen) {
        setShowLogo(true);
        return;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, isOpen]);

  const imgClass = !isMobile ? "menu__logo--desktop" : "menu__logo--mobile";

  const variants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  return (
    <AnimatePresence mode="wait">
      {showLogo && (
        <motion.div
          key="menu-logo-symbol"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.2 }}
          className={"menu__animation"}
          style={{ width: menuWidth - 20 }}
        >
          <img src={totesLogoSymbol} alt="Totes Logo" className={imgClass} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuLogo;
