import SectionWrapper from '../../components/SectionWrapper';
import SocialLinks from '../../components/SocialLinks';
import totespic from '../../assets/images/totespic.png';

interface Props {}

const InfoSection: React.FC<Props> = () => {
  return (
    <SectionWrapper id="info" className="section__info">
      <h2 className="section__title margin__bottom--1">Om</h2>
      <div className="section__flex-col--2">
        <div>
          <p className="text--m">
            Med starka melodier och svängiga rytmer rör sig Malmö-trion Totes lekfullt men
            självsäkert mellan rock, funk, blues och jazz.
          </p>
          <p className="text--m">
            Bandet består av Svante Berg, Hannes Linnér och Gabriel Fager Ferrari, som sedan 2023
            har spelat sina medryckande poplåtar med ett gemensamt mål: att sprida glädje och
            uppmuntra till dans. Med stilsäker gitarr, mullrande bas och trummor med precis rätt
            tempo, bjuder Totes även på vacker stämsång och en skopa sexig saxofon
          </p>
          <br />
          <p>Kontakt: ittakestotes@gmail.com</p>
          <p>Eller skriv till oss på instagram!</p>
          <SocialLinks />
        </div>
        <img src={totespic} alt="Band" className="" />
      </div>
    </SectionWrapper>
  );
};

export default InfoSection;
