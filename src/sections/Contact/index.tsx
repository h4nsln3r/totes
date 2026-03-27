import SectionWrapper from '..';
import './contact.scss';
import saxPic from '../../assets/sketches/sax.png';
import basPic from '../../assets/sketches/bas.png';
import gitarrPic from '../../assets/sketches/gitarr.png';
import trummorPic from '../../assets/sketches/trummor.png';

const CONTACT_EMAIL = 'ittakestotes@gmail.com';

interface Props {
  isMobile: boolean;
}

const Contact: React.FC<Props> = ({ isMobile }) => {
  void isMobile;
  return (
    <SectionWrapper sectionName="contact" className="contact">
      <div className="contact__stage">
        <div className="contact__instruments" aria-hidden>
          <img className="contact__instrument contact__instrument--sax" src={saxPic} alt="" draggable={false} />
          <img className="contact__instrument contact__instrument--bas" src={basPic} alt="" draggable={false} />
          <img className="contact__instrument contact__instrument--gitarr" src={gitarrPic} alt="" draggable={false} />
          <img className="contact__instrument contact__instrument--trummor" src={trummorPic} alt="" draggable={false} />
        </div>

        <div className="contact__email">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;

