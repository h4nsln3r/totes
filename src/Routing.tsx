import { useState } from 'react';
import Helmet from 'react-helmet';

import { useMediaQuery } from './hooks/useMediaQuery';

import Menu from './components/Menu';
import Hero from './components/Sections/Hero';
import Music from './components/Sections/Music';
import Live from './components/Sections/Live';
import Info from './components/Sections/Info';

const Routing = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(isMobile ? false : true);

  return (
    <>
      <Helmet>
        <title>Totes</title>
      </Helmet>

      <Menu
        isOpen={isMenuOpen}
        setIsOpen={(isOpen: boolean) => setIsMenuOpen(isOpen)}
        isMobile={isMobile}
      />

      <main>
        <Hero isMobile={isMobile} isMenuOpen={isMenuOpen} />
        <Music />
        <Live isMobile={isMobile} />
        <Info />
      </main>
    </>
  );
};

export default Routing;
