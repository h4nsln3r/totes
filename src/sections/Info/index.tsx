import SectionWrapper from "../../components/SectionWrapper";

interface Props {}

const InfoSection: React.FC<Props> = () => {
  return (
    <SectionWrapper id="info">
      <h2 className="section__title">Om</h2>
    </SectionWrapper>
  );
};

export default InfoSection;
