import { useState } from 'react';
import Helmet from 'react-helmet';

import { useMediaQuery } from './hooks/useMediaQuery';

import Menu from './components/Menu';
import Hero from './sections/Hero';
import Music from './sections/Music';
import Live from './sections/Live';
// import Merch from "./sections/Merch";
import About from './sections/About';
import Contact from './sections/Contact';
// import Merch from './sections/Merch';
import { SECTION_SCROLL_EXTRA_OFFSET_PX, SECTION_SCROLL_MENU_HEIGHT_PX } from './constants/sectionScroll';
import { useSectionScrollLock } from './hooks/useSectionScrollLock';

const Routing = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useSectionScrollLock(['hero', 'live', 'music', 'about', 'contact'], {
    disabled: isMenuOpen,
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
        <Music />
        {/* <Merch /> */}
        <About isMobile={isMobile} />
        <Contact isMobile={isMobile} />
      </main>
    </>
  );
};

export default Routing;
