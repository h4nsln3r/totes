import { useEffect } from "react";
import SectionWrapper from "..";

import TO from "../../assets/logo/to.png";
import TES from "../../assets/logo/tes.png";
import TotesBand from "../../assets/images/totespic.png";
import TotesBandMobile from "../../assets/images/totesabout.jpg";

import "./hero.scss";

interface Props {
  isMobile: boolean;
  isMenuOpen?: boolean;
}

const Hero: React.FC<Props> = (props) => {
  const { isMobile } = props;
  // prop används inte i aktiv layout just nu (det finns bara i kommenterad kod),
  // men vi "markerar" den som använd för att klara noUnusedLocals.
  void props.isMenuOpen;
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
      {!isMobile ? (
        <>
      <div className="col--55">
        <img
            src={TO}
            alt="Totes Logo"
            className="hero__logo"
            onLoad={onImgLoad}
          />
          <img
            src={TotesBand}
            alt="Band"
            className="hero__image"
            onLoad={onImgLoad}
          />
      </div>
      <div className="col--45 col--flex-end margin__bottom--2">        
        <img
            src={TES}
            alt="Totes Logo"
            className="hero__logo "
            onLoad={onImgLoad}
          />
      </div>
      </>
      ):(
        <div className="hero__container">   
          <img
            src={TO}
            alt="Totes Logo"
            className="hero__logo hero__logo--sm hero__logo--sm-1"
            onLoad={onImgLoad}
          />
          <img
            src={TotesBandMobile}
            alt="Band"
            className="band-img"
            onLoad={onImgLoad}
          />
                  <img
            src={TES}
            alt="Totes Logo"
            className="hero__logo hero__logo--sm hero__logo--sm-2"
            onLoad={onImgLoad}
          />
        </div>
      )}
      {/* <div className="logo-top">
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
      </div> */}
    </SectionWrapper>
  );
};

export default Hero;
