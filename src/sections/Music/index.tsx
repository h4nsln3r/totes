import { useTranslation } from 'react-i18next';
import MuxPlayer from '@mux/mux-player-react';

import SectionWrapper from '..';
import './music.scss';

const MUSIC_PLAYBACK_ID = 'THOaoITPqwRE01eluqYK5O02B79601myxS02JQA5S00CqNxo';
const MUSIC_POSTER_URL = `https://image.mux.com/${MUSIC_PLAYBACK_ID}/thumbnail.jpg?time=0`;

const Music: React.FC = () => {
  const { t } = useTranslation();
  // const title = t('music.title');

  return (
    <SectionWrapper sectionName="music">
      {/* <div className="music__title-column">
        <h2 className="section__title music__title">
          {title.split("").map((char, i) => (
            <span key={i} className="music__title-letter">{char}</span>
          ))}
        </h2>
      </div> */}

      <div className="video-viewport">
        <MuxPlayer
          playbackId={MUSIC_PLAYBACK_ID}
          poster={MUSIC_POSTER_URL}
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
