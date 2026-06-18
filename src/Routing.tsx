import { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

import { useMediaQuery } from './hooks/useMediaQuery';

import Menu from './components/Menu';
import Hero from './sections/Hero';
import Music from './sections/Music';
import Live from './sections/Live';
// import Merch from "./sections/Merch";
import About from './sections/About';
import Contact from './sections/Contact';
import Gallery from './sections/Gallery';
// import PastGigsPhoto from './sections/PastGigsPhoto';
// import Merch from './sections/Merch';
import { SECTION_SCROLL_EXTRA_OFFSET_PX, SECTION_SCROLL_MENU_HEIGHT_PX } from './constants/sectionScroll';
import { useSectionScrollLock } from './hooks/useSectionScrollLock';

const Routing = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Släpp snap-låset när galleriet nåtts → fri scroll genom bilderna.
  const [isAtGallery, setIsAtGallery] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('gallery');
      if (!el) return;
      const reached = window.scrollY + SECTION_SCROLL_MENU_HEIGHT_PX >= el.offsetTop - 2;
      setIsAtGallery(reached);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useSectionScrollLock(['hero', 'live', 'music', 'about', 'contact', 'gallery'], {
    disabled: isMenuOpen || isAtGallery,
    menuHeightPx: SECTION_SCROLL_MENU_HEIGHT_PX,
    wheelThresholdPx: 140,
    touchThresholdPx: 65,
    unlockAfterMs: 1000,
    // Kompensera för att Music-videon ska kännas "fullskärm" även med den fasta menyn.
    // Menyn döljs i `contact`, så vi kompenserar menyns 50px här.
    sectionExtraOffsetPx: SECTION_SCROLL_EXTRA_OFFSET_PX,
  });

  return (
    <>
      <Helmet>
        <title>TOTES</title>
      </Helmet>

      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} isMobile={isMobile} />

      <main>
        <Hero isMobile={isMobile} isMenuOpen={isMenuOpen} />
        <Live isMobile={isMobile} isMenuOpen={isMenuOpen} />
        <Music isMobile={isMobile} />
        {/* <Merch /> */}
        <About isMobile={isMobile} />
        <Contact isMobile={isMobile} />
        <Gallery isMobile={isMobile} />
        {/* <PastGigsPhoto /> */}
      </main>
    </>
  );
};

export default Routing;
