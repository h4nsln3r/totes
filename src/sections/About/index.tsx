import { useTranslation } from "react-i18next";

import SectionWrapper from "..";
import totespic from "../../assets/images/totesorig.jpg";
import BookUs from "../../components/Text/BookUs";

import "./about.scss";

interface Props {
  isMobile: boolean;
}

const Info: React.FC<Props> = ({ isMobile }) => {
  const { t } = useTranslation();
  return (
    <SectionWrapper sectionName="about">
      {!isMobile && (
        <div className="about__image-wrap">
          <img src={totespic} alt="Band" />
        </div>
      )}
      {!isMobile && (
        <div className="about__title-row">
          <h2 className="section__title">{t("info.title")}</h2>
          <p className="about__intro">{t("info.p1")}</p>
        </div>
      )}
      <div className="container flex__col flex__col--mobile-row">
        <div className="about__presstext">
          {isMobile && <p>{t("info.p1")}</p>}
          {isMobile && (
            <div className="about__image-mobile">
              <img src={totespic} alt="Band" />
            </div>
          )}
          <div className="about__presstext--long">
            <p>{t("info.p2")}</p>
          </div>
          {isMobile && <BookUs />}
        </div>
      </div>
      {!isMobile && (
        <div className="about__bookus-wrap">
          <BookUs />
        </div>
      )}
    </SectionWrapper>
  );
};

export default Info;
