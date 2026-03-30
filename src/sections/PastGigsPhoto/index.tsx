import { useTranslation } from 'react-i18next';

import SectionWrapper from '..';
import eventPic from '../../assets/gigs/eventpic.jpg';
import './past-gigs-photo.scss';

const PastGigsPhoto = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper sectionName="past-gigs" className="past-gigs-photo">
      <div className="past-gigs-photo__frame">
        <h2 className="past-gigs-photo__title">{t('pastGigs.title')}</h2>
        <img className="past-gigs-photo__image" src={eventPic} alt="" draggable={false} />
      </div>
    </SectionWrapper>
  );
};

export default PastGigsPhoto;
