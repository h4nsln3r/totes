import Helmet from 'react-helmet';
import { Navigate, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Page from './pages';
import { useEffect, useState } from 'react';
import { useMediaQuery } from './hooks/useMediaQuery';

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

      <Routes>
        <Route path={PATHS.TOTES} element={<Page isMobile={isMobile} isMenuOpen={isOpen} />} />
        <Route path="*" element={<Navigate replace to={PATHS.TOTES} />} />
      </Routes>
    </>
  );
};

export default Routing;
