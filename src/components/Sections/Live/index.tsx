import SectionWrapper from '..';
import PastGigsAccordion from './PastGigsAccordion';

import imageMain from '../../../assets/images/totespic.png';
import imageAbout from '../../../assets/images/totesabout.jpg';

import { PAST_GIGS } from '../../../data/gigs';

import './live.scss';
import LiveList from './LiveList';

interface Gig {
  date: string;
  venue: string;
  city: string;
  link?: string;
}

const gigs: Gig[] = [
  {
    date: '2025',
    city: 'Malmö',
    venue: 'Pizzeria Special',
    // notes: Bra spelning, 11 låtar, 2 set, gratis mat + öl, många vänner där.
  },
];

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
          <LiveList gigs={gigs} />
        ) : (
          <div className="live__empty">
            <h4>Inga gigs för tillfället… </h4>
            <p>Fler datum släpps löpande – följ oss i sociala kanaler.</p>
          </div>
        )}
        {!isMobile && <hr className="live__divider" />}
        <PastGigsAccordion gigs={PAST_GIGS} />
        {!isMobile && <hr className="live__divider" />}

        {isMobile && <img src={imageMain} alt="Band" className="live__image live__image--mobile" />}

        <div className="live__book">
          <p>Vill du boka oss?</p>
          <p>
            <a href="mailto:ittakestotes@gmail.com">ittakestotes@gmail.com</a>
            <br /> - eller skriv på någon socialmedia!
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Live;
