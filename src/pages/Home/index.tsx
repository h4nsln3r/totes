import "./home.scss";

import totesLogoTop from "../../assets/logo/totes_line_1.png";
import totesLogoBottom from "../../assets/logo/totes_line_2.png";

import totespic from "../../assets/images/totespic.png";
import SectionWrapper from "../../components/SectionWrapper";

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

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="logo-top">
          <img src={totesLogoTop} alt="Totes Logo" className="logo-img" />
        </div>

        <div className="hero-bottom-row">
          <img src={totespic} alt="Band" className="band-img" />
          <div className="logo-bottom">
            <img src={totesLogoBottom} alt="Totes Logo" className="logo-img" />
          </div>
        </div>
      </div>

      <SectionWrapper id="live">
        <h2 className="gig-title">Live</h2>
        <ul className="gig-list">
          {gigs.map((gig, i) => (
            <li key={i} className="gig-item">
              <span className="gig-date">{gig.date}</span>
              <span className="gig-venue">{gig.venue}</span>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <SectionWrapper id="music">
        <h2>Musik</h2>
        <p>Här kan du lyssna på vår senaste EP. Kommer snart på Spotify!</p>
        {/* Embed eller player här */}
      </SectionWrapper>

      <SectionWrapper id="info">
        <h2>Om oss</h2>
      </SectionWrapper>
    </div>
  );
};

export default Home;
