// src/sections/MusicSection/MusicSection.tsx
import SectionWrapper from "../../components/SectionWrapper";

const MusicSection: React.FC = () => {
  return (
    <SectionWrapper id="music" className="section section--music">
      <h2 className="section__title">Musik</h2>
      <br />
      <div className="video-viewport">
        <iframe
          src="https://player.mux.com/THOaoITPqwRE01eluqYK5O02B79601myxS02JQA5S00CqNxo?autoplay=1&muted=1&loop=1&playsinline=1"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          title="Totes Reel 2025"
        ></iframe>
      </div>
    </SectionWrapper>
  );
};

export default MusicSection;
