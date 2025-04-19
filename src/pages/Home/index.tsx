import './home.scss';
import bandImg from '../../assets/massing/totes-massingshornet.jpg'; // byt till din egen bild

const gigs = [
  { date: '25/5', venue: 'Pizza Special' },
  { date: '3/5', venue: 'Sallys Café' },
  { date: '18/5', venue: 'Ailé' },
  { date: '23/6', venue: 'Söderport' },
];

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="logo-top">to</div>
        <img src={bandImg} alt="Band" className="band-img" />
        <div className="logo-bottom">tes</div>
      </section>

      <section className="live">
        <h2>Live</h2>
        <ul className="gig-list">
          {gigs.map((gig, index) => (
            <li key={index} className="gig-item">
              <span>{gig.date}</span>
              <span>{gig.venue}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
