import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

import SectionWrapper from "..";
import "./music.scss";

const Music: React.FC = () => {
  const { t } = useTranslation();
  const playerRef = useRef<any>(null);
  const [showPlay, setShowPlay] = useState(true);

  const handleStart = () => {
    const player = playerRef.current;
    if (!player) return;

    player.volume = 0.8;
    player.muted = false;
    player.play();
    setShowPlay(false);
  };

  return (
    <SectionWrapper sectionName="music">
      <h2 className="section__title">{t("music.title")}</h2>
      <br />

      <div className="video-viewport">
        {showPlay && (
          <button className="unmute-overlay" onClick={handleStart}>
            Click to play 🔊
          </button>
        )}

        <MuxPlayer
          ref={playerRef}
          playbackId="THOaoITPqwRE01eluqYK5O02B79601myxS02JQA5S00CqNxo"
          streamType="on-demand"
          autoPlay={false}
          muted={false}
          loop
          playsInline
        />
      </div>
    </SectionWrapper>
  );
};

export default Music;
