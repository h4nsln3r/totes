import SectionWrapper from "..";
import PastGigsAccordion from "./PastGigsAccordion";

import imageMain from "../../assets/images/totespic.png";
import imageAbout from "../../assets/images/totesabout.jpg";

import { PAST_GIGS, UPCOMING_GIGS } from "../../data/gigs";
import BookUs from "../../components/Text/BookUs";

import "./live.scss";
import LiveList from "./LiveList";
import { useTranslation } from "react-i18next";

interface Props {
  isMobile: boolean;
}

const Live: React.FC<Props> = ({ isMobile }) => {
  const { t } = useTranslation();
  return (
    <SectionWrapper sectionName="live">
      <h2 className="section__title">{t("live.title")}</h2>

      {!isMobile && (
        <img
          src={imageAbout}
          alt="Band"
          className="live__image live__image--desktop"
        />
      )}

      <div className="live__content">
        {UPCOMING_GIGS.length > 0 ? (
          <LiveList gigs={UPCOMING_GIGS} />
        ) : (
          <div className="live__empty">
            <h4>{t("live.empty")}</h4>
            <p>{t("live.moreSoon")}</p>
          </div>
        )}
        {!isMobile && <hr className="live__divider" />}
        <PastGigsAccordion gigs={PAST_GIGS} title={t("pastGigs.title")} />
        {!isMobile && <hr className="live__divider" />}

        {isMobile && (
          <img
            src={imageMain}
            alt="Band"
            className="live__image live__image--mobile"
          />
        )}
        <BookUs />
      </div>
    </SectionWrapper>
  );
};

export default Live;
