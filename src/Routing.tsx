import Helmet from "react-helmet";
import { Navigate, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Music from "./pages/Music";
import Live from "./pages/Live";
import Contact from "./pages/Contact";

export const PATHS = {
  START: "/totes/",
  MUSIC: "/totes/music",
  LIVE: "/totes/live",
  CONTACT: "/totes/contact",
};

const Routing = () => {
  return (
    <>
      <Helmet>
        <title>Totes</title>
      </Helmet>
      <Header />
      <Routes>
        <Route path={PATHS.START} element={<Start />} />
        <Route path={PATHS.MUSIC} element={<Music />} />
        <Route path={PATHS.LIVE} element={<Live />} />
        <Route path={PATHS.CONTACT} element={<Contact />} />
        <Route path="*" element={<Navigate replace to={PATHS.START} />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Routing;
