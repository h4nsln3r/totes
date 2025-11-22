import SectionWrapper from '..';
import PastGigsAccordion from './PastGigsAccordion';

import imageMain from '../../../assets/images/totespic.png';
import imageAbout from '../../../assets/images/totesabout.jpg';

import { PAST_GIGS } from '../../../data/gigs';

import './live.scss';
import LiveList from './LiveList';
import { useTranslation } from 'react-i18next';

interface Gig {
  date: string;
  venue: string;
  city: string;
  link?: string;
}

const gigs: Gig[] = [
  // {
  //   date: '2025',
  //   city: 'Malmö',
  //   venue: 'Pizzeria Special',
  //   // notes: Bra spelning, 11 låtar, 2 set, gratis mat + öl, många vänner där.
  // },
];

interface Props {
  isMobile: boolean;
}

const Live: React.FC<Props> = ({ isMobile }) => {
  const { t } = useTranslation();
  return (
    <SectionWrapper sectionName="live">
      <h2 className="section__title">{t('live.title')}</h2>

      {!isMobile && (
        <img src={imageAbout} alt="Band" className="live__image live__image--desktop" />
      )}

      <div className="live__content">
        {gigs && gigs.length > 0 ? (
          <LiveList gigs={gigs} />
        ) : (
          <div className="live__empty">
            <h4>{t('live.empty')}</h4>
            <p>{t('live.moreSoon')}</p>
          </div>
        )}
        {!isMobile && <hr className="live__divider" />}
        <PastGigsAccordion gigs={PAST_GIGS} title={t('pastGigs.title')} />
        {!isMobile && <hr className="live__divider" />}

        {isMobile && <img src={imageMain} alt="Band" className="live__image live__image--mobile" />}

        <div className="live__book">
          <p>{t('live.bookUs')}</p>
          <p>
            <a href="mailto:ittakestotes@gmail.com">ittakestotes@gmail.com</a>
            <br /> {t('common.orSocials')}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Live;
