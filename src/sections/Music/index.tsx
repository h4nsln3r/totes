// import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';

import SectionWrapper from '..';
import BouncingDrums from './BouncingDrums';
import './music.scss';

/** Bredare master — används från 768px och uppåt. */
const MUSIC_PLAYBACK_ID_DESKTOP = 'THOaoITPqwRE01eluqYK5O02B79601myxS02JQA5S00CqNxo';

/**
 * Vertikal / mobilanpassad master (`totes_reel_2026-mobile`).
 * Här ska **Playback ID** in (Mux → öppna asset → sektionen “Playback IDs”), inte ID:t i asset-listan
 * (det är Asset ID → Mux: "used an Asset ID, but we needed a Playback ID" / network error i spelaren).
 * Ersätt `MUSIC_PLAYBACK_ID_DESKTOP` nedan med det playback-id:t när du har kopierat det.
 */
const MUSIC_PLAYBACK_ID_MOBILE = "HS2yJjm1Sc02AwUzoKPEbdx9q00QMJr6CcLRu4UaMCuGw";

interface Props {
  isMobile: boolean;
}

const Music: React.FC<Props> = ({ isMobile }) => {
  // const { t } = useTranslation();
  // const title = t('music.title');
  const [drumsDismissed, setDrumsDismissed] = useState(false);
  const playerRef = useRef<HTMLElement | null>(null);

  const playbackId = isMobile ? MUSIC_PLAYBACK_ID_MOBILE : MUSIC_PLAYBACK_ID_DESKTOP;
  const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`;

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const dismissDrums = () => setDrumsDismissed(true);
    // Web component-events är mest tillförlitliga via addEventListener.
    player.addEventListener('play', dismissDrums);
    player.addEventListener('playing', dismissDrums);

    return () => {
      player.removeEventListener('play', dismissDrums);
      player.removeEventListener('playing', dismissDrums);
    };
  }, [playbackId]);

  return (
    <SectionWrapper sectionName="music">
      <BouncingDrums dismissRequested={drumsDismissed} />
      {/* <div className="music__title-column">
        <h2 className="section__title music__title">
          {title.split("").map((char, i) => (
            <span key={i} className="music__title-letter">{char}</span>
          ))}
        </h2>
      </div> */}

      <div className="video-viewport">
        <MuxPlayer
          ref={(el) => {
            playerRef.current = el as unknown as HTMLElement | null;
          }}
          key={playbackId}
          playbackId={playbackId}
          poster={posterUrl}
          streamType="on-demand"
          autoPlay={false}
          muted={false}
          loop
          playsInline
          accentColor="#1e3a32"
          primaryColor="#1e3a32"
        />
      </div>
    </SectionWrapper>
  );
};

export default Music;
