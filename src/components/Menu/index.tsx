import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuLinks from './MenuLinks';
import useScrollSpy from '../../hooks/useScrollSpy';
import totesLogo from '../../assets/logo/totes_svart_symbol.png';

import './menu.scss';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(window.innerWidth >= 768 ? true : false);
  const [menuWidth, setMenuWidth] = useState<number>(300);

  const sectionIds = ['live', 'music', 'info'];
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const updateWidth = () => {
      setMenuWidth(window.innerWidth >= 768 ? 500 : 220);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <nav className="menu">
      <div
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="menu__logo"
      >
        <img src={totesLogo} alt="Totes Logo" className="menu__logo-img" />
      </div>
      <div className="menu__icon" onClick={() => setIsOpen(!isOpen)}>
        {!isOpen ? <MenuIcon fontSize="large" /> : <ArrowForwardIosIcon fontSize="medium" />}
      </div>

      <motion.div
        className="menu__animation"
        animate={{ width: isOpen ? menuWidth : 0 }}
        initial={{ width: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen && <MenuLinks activeSection={activeSection} />}
      </motion.div>
    </nav>
  );
};

export default Menu;
