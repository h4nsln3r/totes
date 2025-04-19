import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { PATHS } from '../../Routing';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './menu.scss';

const MenuLinks = ({
  location,
  setIsOpen,
}: {
  location: any;
  setIsOpen: (val: boolean) => void;
}) => {
  return (
    <ul>
      <li>
        <Link
          className={classNames('', { active: location.pathname === PATHS.WATCH })}
          to={PATHS.WATCH}
          onClick={() => setIsOpen(false)}
        >
          Live
        </Link>
      </li>
      <li>
        <Link
          className={classNames('', { active: location.pathname === PATHS.MUSIC })}
          to={PATHS.MUSIC}
          onClick={() => setIsOpen(false)}
        >
          Musik
        </Link>
      </li>
      <li>
        <Link
          className={classNames('', { active: location.pathname === PATHS.CONTACT })}
          to={PATHS.CONTACT}
          onClick={() => setIsOpen(false)}
        >
          Om
        </Link>
      </li>
    </ul>
  );
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isScrolledDown, setScrolledDown] = useState(false);
  const [menuWidth, setMenuWidth] = useState(300);
  const location = useLocation();

  // Dynamisk bredd för mobil/desktop
  useEffect(() => {
    const updateWidth = () => {
      setMenuWidth(window.innerWidth >= 768 ? 500 : 300);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Scroll-lyssnare
  useEffect(() => {
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={classNames('menu', { 'menu--scrolled': isScrolledDown })}>
      <Link onClick={() => setIsOpen(false)} className="menu__logo" to={PATHS.HOME}>
        Totes
      </Link>

      <div
        className={classNames('menu__icon', { 'menu__icon--close': isOpen })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? <MenuIcon fontSize="large" /> : <ArrowForwardIosIcon fontSize="large" />}
      </div>

      <motion.div
        className="menu__animation"
        animate={{ width: isOpen ? menuWidth : 0 }}
        initial={{ width: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen && <MenuLinks location={location} setIsOpen={setIsOpen} />}
      </motion.div>
    </nav>
  );
};

export default Menu;
