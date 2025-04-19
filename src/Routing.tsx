import Helmet from 'react-helmet';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Music from './pages/Music';
import Watch from './pages/Watch';
import Contact from './pages/Contact';
import Menu from './components/Menu';
import SnapToTopOnScrollUp from './hooks/SnapToTopOnScrollUp';

export const PATHS = {
  HOME: '/totes/',
  MUSIC: '/totes/music',
  WATCH: '/totes/watch',
  CONTACT: '/totes/contact',
};

const Routing = () => {
  return (
    <div className="body">
      <SnapToTopOnScrollUp />
      <Helmet>
        <title>Totes</title>
      </Helmet>

      <Menu />

      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.MUSIC} element={<Music />} />
        <Route path={PATHS.WATCH} element={<Watch />} />
        <Route path={PATHS.CONTACT} element={<Contact />} />
        <Route path="*" element={<Navigate replace to={PATHS.HOME} />} />
      </Routes>
    </div>
  );
};

export default Routing;
