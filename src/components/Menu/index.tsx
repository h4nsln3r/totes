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

const scrollToHero = () => {
  const el = document.getElementById('hero');
  if (!el) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const y = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
};

const Menu: React.FC<Props> = ({ isMobile, isOpen, setIsOpen }) => {
  const [menuWidth, setMenuWidth] = useState<number>(() => {
    if (typeof window === 'undefined') return 280;
    // 45vw på desktop, annars mobilbredd
    return window.innerWidth >= 768 ? window.innerWidth * 0.45 : 280;
  });
  const [isMenuOverMusic, setIsMenuOverMusic] = useState(false);

  const sectionIds = ['live', 'music', 'about', 'contact', 'past-gigs']; // 'merch' tillfälligt borttagen
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

  /** Ingen position:fixed — den nollställde scroll för många. Bara overflow när menyn är öppen. */
  useEffect(() => {
    if (!isMobile || !isOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [isMobile, isOpen]);

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
          activeSection !== 'contact' &&
          activeSection !== 'past-gigs'
            ? 'menu--light'
            : ''
        } ${activeSection === '' ? 'menu--no-active' : ''} ${shouldHideMenu ? 'menu--hide' : ''} ${
          isMobile && isOpen ? 'menu--mobile-open' : ''
        }`}
      >
        <div
          className="menu__logo"
          onClick={() => {
            if (isMobile && isOpen) setIsOpen(false);
            scrollToHero();
          }}
        >
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
          initial={isMobile ? false : { width: menuWidth, x: 0, opacity: 1 }}
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
          <MenuLinks
            activeSection={activeSection}
            isMobile={isMobile}
            onLinkClick={() => {
              if (!isMobile) return;
              setIsOpen(false);
            }}
          />
        </motion.div>
      </nav>
    </>
  );
};

export default Menu;
//
