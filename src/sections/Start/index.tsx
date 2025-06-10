import SectionWrapper from "../../components/SectionWrapper";

import "./start.scss";

import totesLogoTop from "../../assets/logo/totes_line_1.png";
import totesLogoBottom from "../../assets/logo/totes_line_2.png";
import totespic from "../../assets/images/totespic.png";
import totesabout from "../../assets/images/totesabout.jpg";

interface Props {
  isMobile: boolean;
}

const Start: React.FC<Props> = ({ isMobile }) => {
  return (
    <SectionWrapper id="start" className="hero">
      <div className="logo-top">
        <img src={totesLogoTop} alt="Totes Logo" className="logo-img" />
      </div>

      <div className="hero-bottom-row">
        {isMobile ? (
          <img src={totespic} alt="Band" className="band-img" />
        ) : (
          <img
            src={totesabout}
            alt="Band"
            className="band-img band-img--mobile"
          />
        )}
        <div className="logo-bottom">
          <img src={totesLogoBottom} alt="Totes Logo" className="logo-img" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Start;
