import SectionWrapper from '..';
import eventPic from '../../assets/gigs/eventpic.jpg';
import totesOrig from '../../assets/images/totesorig.jpg';
import './past-gigs-photo.scss';

const PastGigsPhoto = () => {
  return (
    <SectionWrapper sectionName="past-gigs" className="past-gigs-photo">
      <div className="past-gigs-photo__frame">
        <picture>
          <source media="(min-width: 768px)" srcSet={totesOrig} />
          <img className="past-gigs-photo__image" src={eventPic} alt="" draggable={false} />
        </picture>
      </div>
    </SectionWrapper>
  );
};

export default PastGigsPhoto;
