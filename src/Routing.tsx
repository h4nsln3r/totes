import { useState } from "react";
import Helmet from "react-helmet";

import { useMediaQuery } from "./hooks/useMediaQuery";

import Menu from "./components/Menu";
import Hero from "./sections/Hero";
import Music from "./sections/Music";
import Live from "./sections/Live";
import About from "./sections/About";

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
