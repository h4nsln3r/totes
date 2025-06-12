import Helmet from "react-helmet";
import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Page from "./pages";
import { useEffect, useState } from "react";

export const PATHS = {
  TOTES: "/totes/",
};

const Routing = () => {
  const [isOpen, setIsOpen] = useState<boolean>(
    window.innerWidth >= 768 ? true : false
  );

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateWidth = () => {
      setIsMobile(window.innerWidth >= 768 ? false : true);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [window.innerWidth >= 768]);

  console.log("isMobile", isMobile);
  return (
    <>
      <Helmet>
        <title>Totes</title>
      </Helmet>

      <Nav
        isOpen={isOpen}
        setIsOpen={(isOpen: boolean) => setIsOpen(isOpen)}
        isMobile={isMobile}
      />

      <Routes>
        <Route
          path={PATHS.TOTES}
          element={<Page isMobile={isMobile} isMenuOpen={isOpen} />}
        />
        <Route path="*" element={<Navigate replace to={PATHS.TOTES} />} />
      </Routes>
    </>
  );
};

export default Routing;
