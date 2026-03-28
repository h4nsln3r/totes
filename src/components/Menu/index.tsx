import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

  const mobilePanelTransition = {
    type: 'spring' as const,
    stiffness: 380,
    damping: 34,
    mass: 0.85,
  };

  return (
    <>
      {isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.button
              type="button"
              aria-label="Stäng meny"
              className="menu__mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      )}

      <nav
        className={`menu ${
          isMenuOverMusic &&
          activeSection !== 'live' &&
          activeSection !== 'about' &&
          activeSection !== 'contact'
            ? 'menu--light'
            : ''
        } ${activeSection === '' ? 'menu--no-active' : ''} ${shouldHideMenu ? 'menu--hide' : ''} ${
          isMobile && isOpen ? 'menu--mobile-open' : ''
        }`}
      >
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="menu__logo">
          <MenuLogo isMobile={isMobile} menuWidth={menuWidth} activeSection={activeSection} />
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
          className={`menu__animation${isMobile ? ' menu__animation--mobile-sheet' : ''}`}
          animate={
            isMobile
              ? {
                  x: isOpen ? 0 : '100%',
                  opacity: isOpen ? 1 : 0,
                }
              : {
                  width: menuWidth,
                  x: 0,
                  opacity: 1,
                }
          }
          initial={
            isMobile
              ? { x: '100%', opacity: 0 }
              : { width: menuWidth, x: 0, opacity: 1 }
          }
          transition={
            isMobile
              ? {
                  x: mobilePanelTransition,
                  opacity: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                }
              : { duration: 0.3 }
          }
          style={isMobile ? { pointerEvents: isOpen ? 'auto' : 'none' } : undefined}
        >
          {(!isMobile || isOpen) && (
            <MenuLinks
              activeSection={activeSection}
              isMobile={isMobile}
              mobileNavOpen={isMobile && isOpen}
              onLinkClick={() => {
                if (!isMobile) return;
                window.setTimeout(() => setIsOpen(false), 220);
              }}
            />
          )}
        </motion.div>
      </nav>
    </>
  );
};

export default Menu;
//
