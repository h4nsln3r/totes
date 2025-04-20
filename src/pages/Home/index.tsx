import './home.scss';

import bandImg from '../../assets/massing/totes-massingshornet.jpg';
import SectionWrapper from '../../components/SectionWrapper';

interface Gig {
  date: string;
  venue: string;
}

const gigs: Gig[] = [
  { date: '25/5', venue: 'Pizza Special' },
  { date: '3/5', venue: 'Sallys Café' },
  { date: '18/5', venue: 'Ailé' },
  { date: '23/6', venue: 'Söderport' },
];

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="logo-top">to</div>
        <img src={bandImg} alt="Band" className="band-img" />
        <div className="logo-bottom">tes</div>
      </div>

      <SectionWrapper id="live">
        <h2>Live</h2>
        <ul className="gig-list">
          {gigs.map((gig, i) => (
            <li key={i} className="gig-item">
              <span>{gig.date}</span>
              <span>{gig.venue}</span>
            </li>
          ))}
        </ul>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </SectionWrapper>

      <SectionWrapper id="music">
        <h2>Musik</h2>
        <p>Här kan du lyssna på vår senaste EP. Kommer snart på Spotify & Bandcamp!</p>
        {/* Embed eller player här */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </SectionWrapper>

      <SectionWrapper id="info">
        <h2>Om oss</h2>
        <p>
          Vi är ett indieband från Sverige med rötterna i funk och pop. Vi gillar falafel, feta
          synthar och långa promenader.
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br /> <br />
        <br />
        <br />
        <br /> <br />
        <br />
        <br />
        <br />
        <br /> <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </SectionWrapper>
    </div>
  );
};

export default Home;
