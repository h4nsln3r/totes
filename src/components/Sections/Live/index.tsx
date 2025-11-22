import SectionWrapper from '..';

import imageMain from '../../../assets/images/totespic.png';
import imageAbout from '../../../assets/images/totesabout.jpg';

import './live.scss';

interface Gig {
  date: string;
  venue: string;
}

// const oldGigs: Gig[] = [
//   { date: "25/5", venue: "Pizza Special" },
//   { date: "3/5", venue: "Sallys Café" },
//   { date: "18/5", venue: "Ailé" },
//   { date: "23/6", venue: "Söderport" },
// { date: "5/10", venue: "Octoberfest i Kalmar" },
// { date: "25/10", venue: "Privat spelning - Malmö" }
// ];

const gigs: Gig[] = [];

interface Props {
  isMobile: boolean;
}

const Live: React.FC<Props> = ({ isMobile }) => {
  return (
    <SectionWrapper sectionName="live">
      <h2 className="section__title">Live</h2>

      {!isMobile && (
        <img src={imageAbout} alt="Band" className="live__image live__image--desktop" />
      )}

      <div className="live__content">
        {gigs && gigs.length > 0 ? (
          <ul className="live__list">
            {gigs.map((gig, i) => (
              <li key={i} className="live__item">
                <span className="live__date">{gig.date}</span>
                <span className="live__venue">{gig.venue}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}

        {!isMobile && <hr className="live__divider" />}

        {isMobile && <img src={imageMain} alt="Band" className="live__image live__image--mobile" />}

        <div className="live__book">
          <p>Vill du boka oss?</p>
          <p>
            Hör av dig till: <a href="ittakestotes@gmail.com">ittakestotes@gmail.com</a>
            <br /> - eller skriv på någon socialmedia!
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Live;
