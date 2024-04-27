import Helmet from 'react-helmet';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import StartPage from './pages/Start';

export const PATHS = {
  START: '/',
  MUSIC: '/totes/music'
};

const Routing = () => {

  return (
    <>
      <Helmet>
        <title>Totes</title>
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.START} element={<StartPage />} />
          <Route path="*" element={<Navigate replace to={PATHS.START} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing;