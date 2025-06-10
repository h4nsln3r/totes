import SectionWrapper from "../../components/SectionWrapper";

import totespic from "../../assets/images/totespic.png";
import totesabout from "../../assets/images/totesabout.jpg";

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
      <div className="gig">
        <h2 className="gig-title">Live</h2>
        {isMobile && <img src={totesabout} alt="Band" className="gig--img" />}
      </div>
      <div className="gig-list">
        <ul className="">
          {gigs.map((gig, i) => (
            <li key={i} className="gig-item">
              <span className="gig-date">{gig.date}</span>
              <span className="gig-venue">{gig.venue}</span>
            </li>
          ))}
        </ul>
        {isMobile && <hr />}
        {!isMobile && <img src={totespic} alt="Band" className="gig--img" />}
        <div className="bookus">
          <p>Vill du boka oss?</p>
          <p>
            Hör av dig till: <a href="tes">info@totes.com</a>
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LiveSection;
