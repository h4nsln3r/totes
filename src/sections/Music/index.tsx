import SectionWrapper from "../../components/SectionWrapper";

interface Props {}

const MusicSection: React.FC<Props> = () => {
  return (
    <SectionWrapper id="music">
      <h2 className="section__title">Musik</h2>
      <p>Här kan du lyssna på vår senaste EP. Kommer snart på Spotify!</p>
      {/* Embed eller player här */}
    </SectionWrapper>
  );
};

export default MusicSection;
