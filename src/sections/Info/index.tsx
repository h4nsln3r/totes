import SectionWrapper from "../../components/SectionWrapper";
import SocialLinks from "../../components/SocialLinks";

interface Props {}

const InfoSection: React.FC<Props> = () => {
  return (
    <SectionWrapper id="info">
      <h2 className="section__title margin__bottom--1">Om</h2>
      <p className="text--m">
        Med starka melodier och svängiga rytmer rör sig Malmö-trion Totes
        lekfullt men självsäkert mellan rock, funk, blues och jazz.
      </p>
      <p className="text--m">
        Bandet består av Svante Berg, Hannes Linnér och Gabriel Fager Ferrari,
        som sedan 2023 har spelat sina medryckande poplåtar med ett gemensamt
        mål: att sprida glädje och uppmuntra till dans. Med stilsäker gitarr,
        mullrande bas och trummor med precis rätt tempo, bjuder Totes även på
        vacker stämsång och en skopa sexig saxofon
      </p>

      <SocialLinks />
    </SectionWrapper>
  );
};

export default InfoSection;
