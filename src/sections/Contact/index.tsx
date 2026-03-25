import SectionWrapper from '..';
import './contact.scss';

const CONTACT_EMAIL = 'ittakestotes@gmail.com';

interface Props {
  isMobile: boolean;
}

const Contact: React.FC<Props> = () => {
  return (
    <SectionWrapper sectionName="contact" className="contact">
      <div className="contact__stage">
        {/* Instrumenten lägger du in själv. */}
        <div className="contact__instruments" aria-hidden />

        <div className="contact__email">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;

