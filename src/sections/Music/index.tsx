// src/sections/MusicSection/MusicSection.tsx
import SectionWrapper from "../../components/SectionWrapper";
// import reel from "../../assets/video/totes_reel_2025_v1.mp4"; // <— viktigt

const MusicSection: React.FC = () => {
  return (
    <SectionWrapper id="music" className="section section--music">
      <h2 className="section__title">Musik</h2>

      <div className="video-wrap">
        {/* <video
          className="video-player"
          controls
          preload="metadata"
          playsInline
          // poster="/poster.jpg" // valfritt: lägg en stillbild i /public och avkommentera
        >
          <source src={reel} type="video/mp4" />
          Din webbläsare stödjer inte HTML5-video.
        </video> */}
      </div>
    </SectionWrapper>
  );
};

export default MusicSection;
