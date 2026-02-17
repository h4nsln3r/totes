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
  return (
    <SectionWrapper sectionName="hero">
      <div className="logo-top">
        {!isMenuOpen && isMobile ? (
          <img src={totesLogoTop} alt="Totes Logo" className="logo-img" />
        ) : (
          !isMobile && (
            <img
              src={totesLogoTop}
              alt="Totes Logo"
              className="logo-img logo-img--desk"
            />
          )
        )}
      </div>

      {isMobile ? (
        <img
          src={totesabout}
          alt="Band"
          className="band-img band-img--mobile"
        />
      ) : (
        <img src={totespic} alt="Band" className="band-img" />
      )}
      <div className="logo-bottom">
        <img src={totesLogoBottom} alt="Totes Logo" className="logo-img" />
      </div>
    </SectionWrapper>
  );
};

export default Hero;
