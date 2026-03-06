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
  const title = t("live.title");

  return (
    <SectionWrapper sectionName="live">
      {!isMobile ? (
        <div className="live__left-column">
          <img
            src={imageAbout}
            alt="Band"
            className="live__image live__image--desktop"
          />
          <BookUs />
        </div>
      ) : null}

      <div className="live__content">
        {UPCOMING_GIGS.length > 0 ? (
          <>
            <h3 className="live__shows-title">{t("live.shows")}</h3>
            <LiveList gigs={UPCOMING_GIGS} />
          </>
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
        {isMobile && <BookUs />}
      </div>

      <div className="live__title-column">
        <h2 className="section__title live__title">
          {title.split("").map((char, i) => (
            <span key={i} className="live__title-letter">{char}</span>
          ))}
        </h2>
      </div>
    </SectionWrapper>
  );
};

export default Live;
