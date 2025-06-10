import Helmet from "react-helmet";
import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Page from "./pages";

export const PATHS = {
  TOTES: "/totes/",
};

const Routing = () => {
  return (
    <>
      <Helmet>
        <title>Totes</title>
      </Helmet>

      <Nav />

      <Routes>
        <Route path={PATHS.TOTES} element={<Page />} />
        <Route path="*" element={<Navigate replace to={PATHS.TOTES} />} />
      </Routes>
    </>
  );
};

export default Routing;
