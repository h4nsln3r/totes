import Helmet from "react-helmet";
import { Navigate, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Footer from "./components/Footer";
import Music from "./pages/Music";
import Watch from "./pages/Watch";
import Contact from "./pages/Contact";
import Menu from "./components/Menu";

export const PATHS = {
  START: "/totes/",
  MUSIC: "/totes/music",
  WATCH: "/totes/watch",
  CONTACT: "/totes/contact",
};

const Routing = () => {
  return (
    <div className="body">
      <Helmet>
        <title>Totes</title>
      </Helmet>

      <Menu />

      <Routes>
        <Route path={PATHS.START} element={<Start />} />
        <Route path={PATHS.MUSIC} element={<Music />} />
        <Route path={PATHS.WATCH} element={<Watch />} />
        <Route path={PATHS.CONTACT} element={<Contact />} />
        <Route path="*" element={<Navigate replace to={PATHS.START} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Routing;
