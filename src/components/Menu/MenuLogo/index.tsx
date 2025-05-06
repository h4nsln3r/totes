import { motion } from "framer-motion";

import totesLogo from "../../../assets/logo/totes_svart_symbol.png";
import totesLogoTop from "../../../assets/logo/totes_line_1.png";

interface MenuLogoProps {
  isMobile: boolean;
  isOpen: boolean;
  menuWidth: number;
}

const MenuLogo: React.FC<MenuLogoProps> = ({ isMobile, isOpen, menuWidth }) => {
  return isMobile ? (
    <img src={totesLogo} alt="Totes Logo" className="menu__logo-img" />
  ) : (
    <motion.div
      className="menu__animation"
      animate={{ width: !isOpen ? menuWidth : 0 }}
      initial={{ width: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={totesLogoTop}
        alt="Totes Logo"
        className="menu__logo-img--big"
      />
    </motion.div>
  );
};

export default MenuLogo;
