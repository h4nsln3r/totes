import { useState } from "react";
import Helmet from "react-helmet";

import { useMediaQuery } from "./hooks/useMediaQuery";

import Menu from "./components/Menu";
import Hero from "./components/Sections/Hero";
import Music from "./components/Sections/Music";
import Live from "./components/Sections/Live";
import About from "./components/Sections/About";

const Routing = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Totes</title>
      </Helmet>

      <Menu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        isMobile={isMobile}
      />

      <main>
        <Hero isMobile={isMobile} isMenuOpen={isMenuOpen} />
        <Music />
        <Live isMobile={isMobile} />
        <About isMobile={isMobile} />
      </main>
    </>
  );
};

export default Routing;
