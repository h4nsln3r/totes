import Helmet from "react-helmet";
import { Navigate, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages";

export const PATHS = {
  TOTES: "/totes/",
};

const Routing = () => {
  return (
    <div className="body">
      <Helmet>
        <title>Totes</title>
      </Helmet>

      <Menu />

      <Routes>
        <Route path={PATHS.TOTES} element={<Page />} />
        <Route path="*" element={<Navigate replace to={PATHS.TOTES} />} />
      </Routes>
    </div>
  );
};

export default Routing;
