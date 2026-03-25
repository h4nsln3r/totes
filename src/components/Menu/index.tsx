import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuLinks from './Links';
import MenuLogo from './Logo';
import useScrollSpy from '../../hooks/useScrollSpy';

import './menu.scss';
// import LanguageSwitcher from './LanguageSwitcher';

interface Props {
  isOpen: boolean;
  isMobile: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MENU_HEIGHT = 50;

const Menu: React.FC<Props> = ({ isMobile, isOpen, setIsOpen }) => {
  const [menuWidth, setMenuWidth] = useState<number>(() => {
    if (typeof window === 'undefined') return 280;
    // 45vw på desktop, annars mobilbredd
    return window.innerWidth >= 768 ? window.innerWidth * 0.45 : 280;
  });
  const [isMenuOverMusic, setIsMenuOverMusic] = useState(false);

  const sectionIds = ['live', 'music', 'about', 'contact']; // 'merch' tillfälligt borttagen
  const activeSection = useScrollSpy(sectionIds);
  const shouldHideMenu = activeSection === 'contact';

  useEffect(() => {
    const DESKTOP_MENU_WIDTH_VW = 45;
    const updateWidth = () => {
      // 45vw på desktop (fungerar även som "45% av viewport-bredden")
      setMenuWidth(window.innerWidth >= 768 ? window.innerWidth * (DESKTOP_MENU_WIDTH_VW / 100) : 280);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const checkMenuOverMusic = () => {
      const musicEl = document.getElementById('music');
      if (musicEl) {
        setIsMenuOverMusic(window.scrollY + MENU_HEIGHT >= musicEl.offsetTop);
      }
    };
    checkMenuOverMusic();
    window.addEventListener('scroll', checkMenuOverMusic);
    window.addEventListener('resize', checkMenuOverMusic);
    return () => {
      window.removeEventListener('scroll', checkMenuOverMusic);
      window.removeEventListener('resize', checkMenuOverMusic);
    };
  }, []);

  return (
    <nav
      className={`menu ${
        isMenuOverMusic &&
        activeSection !== 'live' &&
        activeSection !== 'about' &&
        activeSection !== 'contact'
          ? 'menu--light'
          : ''
      } ${activeSection === '' ? 'menu--no-active' : ''} ${shouldHideMenu ? 'menu--hide' : ''}`}
    >
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="menu__logo">
        <MenuLogo isMobile={isMobile} isOpen={isOpen} menuWidth={menuWidth} />
      </div>

      <div className="menu__controls">
        {isMobile && (
          <div className="menu__icon" onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? <MenuIcon fontSize="large" /> : <ArrowForwardIosIcon fontSize="medium" />}
          </div>
        )}
        {/* isOpen && <LanguageSwitcher isMenuOpen={isOpen} isMobile={isMobile} /> */}
      </div>

      <motion.div
        className="menu__animation"
        animate={{
          width: !isMobile
            ? menuWidth
            : isOpen
              ? activeSection === ''
                ? 200
                : menuWidth
              : 0,
        }}
        initial={{ width: !isMobile ? menuWidth : 0 }}
        transition={{ duration: 0.3 }}
      >
        {(!isMobile || isOpen) && <MenuLinks activeSection={activeSection} isMobile={isMobile} />}
      </motion.div>
    </nav>
  );
};

export default Menu;
//
