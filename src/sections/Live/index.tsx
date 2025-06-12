import SectionWrapper from "../../components/SectionWrapper";

import imageMain from "../../assets/images/totespic.png";
import imageAbout from "../../assets/images/totesabout.jpg";

import "./live.scss";

interface Gig {
  date: string;
  venue: string;
}

const gigs: Gig[] = [
  { date: "25/5", venue: "Pizza Special" },
  { date: "3/5", venue: "Sallys Café" },
  { date: "18/5", venue: "Ailé" },
  { date: "23/6", venue: "Söderport" },
];

interface Props {
  isMobile: boolean;
}

const LiveSection: React.FC<Props> = ({ isMobile }) => {
  return (
    <SectionWrapper id="live">
      <h2 className="section__title">Live</h2>

      {isMobile && (
        <img
          src={imageAbout}
          alt="Band"
          className="section--live__image section--live__image--desktop"
        />
      )}

      <div className="section--live__content">
        <ul className="section--live__list">
          {gigs.map((gig, i) => (
            <li key={i} className="section--live__item">
              <span className="section--live__date">{gig.date}</span>
              <span className="section--live__venue">{gig.venue}</span>
            </li>
          ))}
        </ul>

        {isMobile && <hr className="section--live__divider" />}

        {!isMobile && (
          <img
            src={imageMain}
            alt="Band"
            className="section--live__image section--live__image--mobile"
          />
        )}

        <div className="section--live__book">
          <p>Vill du boka oss?</p>
          <p>
            Hör av dig till: <a href="mailto:info@totes.com">info@totes.com</a>
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LiveSection;
