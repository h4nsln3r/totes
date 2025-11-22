import SectionWrapper from '../../components/Section';

import './start.scss';

import totesLogoTop from '../../assets/logo/totes_line_1.png';
import totesLogoBottom from '../../assets/logo/tes.png';
import totespic from '../../assets/images/totespic.png';
import totesabout from '../../assets/images/totesabout.jpg';

interface Props {
  isMobile: boolean;
  isMenuOpen: boolean;
}

const Start: React.FC<Props> = ({ isMobile, isMenuOpen }) => {
  console.log('isMobile', isMobile);
  console.log('isMenuOpen', isMenuOpen);
  return (
    <SectionWrapper id="start" className="hero">
      <div className="logo-top">
        {!isMenuOpen && isMobile ? (
          <>
            {console.log('HEja')}
            <img src={totesLogoTop} alt="Totes Logo" className="logo-img" />
          </>
        ) : (
          !isMobile && (
            <img src={totesLogoTop} alt="Totes Logo" className="logo-img logo-img--desk" />
          )
        )}
      </div>

      <div className="hero-bottom-row">
        {isMobile ? (
          <img src={totesabout} alt="Band" className="band-img band-img--mobile" />
        ) : (
          <img src={totespic} alt="Band" className="band-img" />
        )}
        <div className="logo-bottom">
          <img src={totesLogoBottom} alt="Totes Logo" className="logo-img" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Start;
