import SectionWrapper from "../../components/SectionWrapper";

interface Props {}

const InfoSection: React.FC<Props> = () => {
  return (
    <SectionWrapper id="info">
      <h2 className="section__title">Om</h2>
      <p>
        Med starka melodier och svängiga rytmer rör sig Malmö-trion Totes
        lekfullt men självsäkert mellan rock, funk, blues och jazz. Bandet
        består av Svante Berg, Hannes Linnér och Gabriel Fager Ferrari, som
        sedan 2023 har spelat sina medryckande poplåtar med ett gemensamt mål:
        att sprida glädje och uppmuntra till dans. Med stilsäker gitarr,
        mullrande bas och trummor med precis rätt tempo, bjuder Totes även på
        vacker stämsång och en skopa sexig saxofon
      </p>
    </SectionWrapper>
  );
};

export default InfoSection;
