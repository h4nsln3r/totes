import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuLinks from './Links';
import MenuLogo from './Logo';
import useScrollSpy from '../../hooks/useScrollSpy';

import './menu.scss';
import LanguageSwitcher from './LanguageSwitcher';

interface Props {
  isOpen: boolean;
  isMobile: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Menu: React.FC<Props> = ({ isMobile, isOpen, setIsOpen }) => {
  const [menuWidth, setMenuWidth] = useState<number>(300);

  const sectionIds = ['music', 'live', 'about']; // 'merch' tillfälligt borttagen
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const updateWidth = () => {
      setMenuWidth(window.innerWidth >= 768 ? 380 : 280);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <nav className={`menu ${activeSection === 'music' ? 'menu--light' : ''} ${activeSection === '' ? 'menu--no-active' : ''}`}>
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="menu__logo">
        <MenuLogo isMobile={isMobile} isOpen={isOpen} menuWidth={menuWidth} activeSection={activeSection} />
      </div>

      <div className="menu__controls">
        <div className="menu__icon" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? <MenuIcon fontSize="large" /> : <ArrowForwardIosIcon fontSize="medium" />}
        </div>
        {isOpen && <LanguageSwitcher isMenuOpen={isOpen} isMobile={isMobile} />}
      </div>

      <motion.div
        className="menu__animation"
        animate={{
          width: isOpen
            ? isMobile && activeSection === ''
              ? 200
              : menuWidth
            : 0,
        }}
        initial={{ width: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen && <MenuLinks activeSection={activeSection} isMobile={isMobile} />}
      </motion.div>
    </nav>
  );
};

export default Menu;
//
