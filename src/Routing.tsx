import Helmet from 'react-helmet';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './components/Menu';

export const PATHS = {
  HOME: '/totes/',
};

const Routing = () => {
  return (
    <div className="body">
      <Helmet>
        <title>Totes</title>
      </Helmet>

      <Menu />

      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path="*" element={<Navigate replace to={PATHS.HOME} />} />
      </Routes>
    </div>
  );
};

export default Routing;
