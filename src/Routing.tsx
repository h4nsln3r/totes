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
import { useSectionScrollLock } from './hooks/useSectionScrollLock';

const Routing = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useSectionScrollLock(['hero', 'live', 'music', 'about', 'contact'], {
    disabled: isMobile,
    menuHeightPx: 50,
    wheelThresholdPx: 140,
    unlockAfterMs: 1000,
    // Kompensera för att Music-videon ska kännas "fullskärm" även med den fasta menyn.
    // Menyn döljs i `contact`, så vi kompenserar menyns 50px här.
    sectionExtraOffsetPx: { live: 56, music: 50, about: 50, contact: 50 },
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
