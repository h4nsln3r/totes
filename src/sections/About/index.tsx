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
      <h2 className="section__title">{t("info.title")}</h2>
      <div className="container flex__col flex__col--mobile-row">
        <div className="about__presstext">
          <p>{t("info.p1")}</p>
          <div className="about__presstext--long">
            <p>{t("info.p2")}</p>
          </div>
          <BookUs />
        </div>
        {!isMobile && <img src={totespic} alt="Band" className="" />}
      </div>
      {isMobile && <img src={totespic} alt="Band" className="" />}
    </SectionWrapper>
  );
};

export default Info;
