import Helmet from 'react-helmet';
import Nav from './components/Nav';
import Page from './pages';
import { useState } from 'react';
import { useMediaQuery } from './hooks/useMediaQuery';
import Pages from './pages';

export const PATHS = {
  TOTES: '/totes/',
};

const Routing = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isOpen, setIsOpen] = useState<boolean>(isMobile ? false : true);

  return (
    <>
      <Helmet>
        <title>Totes</title>
      </Helmet>

      <Nav isOpen={isOpen} setIsOpen={(isOpen: boolean) => setIsOpen(isOpen)} isMobile={isMobile} />

      <Pages isMobile={isMobile} isMenuOpen={isOpen} />
    </>
  );
};

export default Routing;
