import Helmet from "react-helmet";
import { Navigate, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Music from "./pages/Music";
import Watch from "./pages/Watch";
import Contact from "./pages/Contact";
import Menu from "./components/Menu";
import SnapToTopOnScrollUp from "./hooks/SnapToTopOnScrollUp";

export const PATHS = {
  START: "/totes/",
  MUSIC: "/totes/music",
  WATCH: "/totes/watch",
  CONTACT: "/totes/contact",
};

const massa =
  "2000019000,2000040116,2000042267,2000040212,2000018998,2000042259,2000040733,2000040732,2000018997,2000018996,2000041745,2000018999,2000050889,2000052628,2000042502,2000043561,2000035459,2000041709,2000060627,2000060628,2000060625,2000060629,2000060626,2000060624";

const Routing = () => {
  console.log("massa", massa.split(",").length);
  return (
    <div className="body">
      <SnapToTopOnScrollUp />
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
    </div>
  );
};

export default Routing;
