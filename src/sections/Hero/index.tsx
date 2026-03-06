import { useEffect } from "react";
import SectionWrapper from "..";

import totesLogoTop from "../../assets/logo/totes_line_1.png";
import totesLogoBottom from "../../assets/logo/tes.png";
import totespic from "../../assets/images/totespic.png";
import totesabout from "../../assets/images/totesabout.jpg";

import "./hero.scss";

interface Props {
  isMobile: boolean;
  isMenuOpen: boolean;
}

const Hero: React.FC<Props> = ({ isMobile, isMenuOpen }) => {
  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.classList.add("hero-img-loaded");
  };

  useEffect(() => {
    const section = document.querySelector(".hero");
    if (!section) return;
    section.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      if (img.complete) img.classList.add("hero-img-loaded");
    });
  }, [isMobile]);

  return (
    <SectionWrapper sectionName="hero">
      <div className="logo-top">
        {!isMenuOpen && isMobile ? (
          <img
            src={totesLogoTop}
            alt="Totes Logo"
            className="logo-img"
            onLoad={onImgLoad}
          />
        ) : (
          !isMobile && (
            <img
              src={totesLogoTop}
              alt="Totes Logo"
              className="logo-img logo-img--desk"
              onLoad={onImgLoad}
            />
          )
        )}
      </div>

      <div className="hero__image-row">
        {isMobile ? (
          <img
            src={totesabout}
            alt="Band"
            className="band-img band-img--mobile"
            onLoad={onImgLoad}
          />
        ) : (
          <img
            src={totespic}
            alt="Band"
            className="band-img"
            onLoad={onImgLoad}
          />
        )}
        <div className="logo-bottom">
          <img
            src={totesLogoBottom}
            alt="Totes Logo"
            className="logo-img"
            onLoad={onImgLoad}
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Hero;
