import Helmet from "react-helmet";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Start from "./pages/Start";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import Music from "./pages/Music";
import Live from "./pages/Live";
import Contact from "./pages/Contact";
import { useRef } from "react";
import Menu from "./components/Menu";

export const PATHS = {
  START: "/totes/",
  MUSIC: "/totes/music",
  LIVE: "/totes/live",
  CONTACT: "/totes/contact",
};

const Routing = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  // const isStartPage = location.pathname === PATHS.START;
  const isMusicPage = location.pathname === PATHS.MUSIC;

  console.log("isMusicPage", isMusicPage);
  return (
    <div className="body">
      <Helmet>
        <title>Totes</title>
      </Helmet>
      {/* <Header
        isStartPage={isStartPage}
        isMusicPage={isMusicPage}
        containerRef={containerRef}
      /> */}

      <Menu />

      <Routes>
        <Route path={PATHS.START} element={<Start />} />
        <Route
          path={PATHS.MUSIC}
          element={<Music containerRef={containerRef} />}
        />
        <Route path={PATHS.LIVE} element={<Live />} />
        <Route path={PATHS.CONTACT} element={<Contact />} />
        <Route path="*" element={<Navigate replace to={PATHS.START} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Routing;
