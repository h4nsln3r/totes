import { useEffect, useRef, useState } from 'react';

import SectionWrapper from '..';

import { UPCOMING_GIGS } from '../../data/gigs';

import './live.scss';
import LiveList from './LiveList';
import TotesBass from '../../assets/sketches/bas.png';

import TotesBandMobile from '../../assets/images/totespic.png';

interface Props {
  isMobile: boolean;
  isMenuOpen?: boolean;
}

const Live: React.FC<Props> = ({ isMobile }) => {
  void isMobile;
  const [enterCount, setEnterCount] = useState(0);
  const inViewRef = useRef(false);

  useEffect(() => {
    const liveEl = document.getElementById('live');
    if (!liveEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nextInView = Boolean(entry?.isIntersecting);

        // Trigga animation varje gång vi "går in" i viewporten igen.
        if (nextInView && !inViewRef.current) {
          setEnterCount((c) => c + 1);
        }

        inViewRef.current = nextInView;
      },
      { threshold: 0.25 }
    );

    io.observe(liveEl);
    return () => io.disconnect();
  }, []);

  return (
    <SectionWrapper sectionName="live">
        {!isMobile ? (
          <>
        <div className="col--55 col--flex-end">
        <img
          src={TotesBass}
          alt="Totes Logo"
          key={enterCount}
          className="live__images live__images--entered"
        />
      </div>

      <div className="col--45 live__right">
        <div className="live__up-wrap">
          {/* Vi vill ha format som i bilden (t.ex. 25/5), så vi kör compact även på desktop. */}
          <LiveList gigs={UPCOMING_GIGS} compactDates />
        </div>

        {/*
          Past gigs: kommenterat tills vi är nöjda med gigg-listans "växa från mitten"-beteende.
          När vi är klara kan vi aktivera igen.
        */}
      </div>
          </>
        ) : (
          <>
          <h2 className="live__mobile-title">Live</h2>
            <LiveList gigs={UPCOMING_GIGS} compactDates={true} />
           <img src={TotesBandMobile} alt="Band" className="live__image live__image--mobile" />
           <p className="live__mobile-cta">Vill du boka oss?<br />Hör av dig till <a href="mailto:ittakestotes@gmail.com">ittakestotes@gmail.com</a></p>
          </>
        )}

    </SectionWrapper>
  );
};

export default Live;



// {isMobile && (
//   <h2
//     className={`live__mobile-heading${isMenuOpen ? ' live__mobile-heading--menu-open' : ''}`}
//     aria-hidden={isMenuOpen ? true : undefined}
//   >
//     {title}
//   </h2>
// )}
// {!isMobile ? (
//   <div className="live__left-column">
//     <img src={imageAbout} alt="Band" className="live__image live__image--desktop" />
//     <BookUs />
//   </div>
// ) : null}

// <div className="live__content">
//   {UPCOMING_GIGS.length > 0 ? (
//     <>
//       {/* <h3 className="live__shows-title">{t("live.shows")}</h3> */}
//       <LiveList gigs={UPCOMING_GIGS} compactDates={isMobile} />
//     </>
//   ) : (
//     <div className="live__empty">
//       <span className="live__empty-icon" aria-hidden>
//         <FaMusic />
//       </span>
//       <h4>{t('live.empty')}</h4>
//       <p>{t('live.moreSoon')}</p>
//     </div>
//   )}
//   {!isMobile && <hr className="live__divider" />}
//   {/* <PastGigsAccordion gigs={PAST_GIGS} title={t('pastGigs.title')} /> */}
//   {!isMobile && <hr className="live__divider" />}

//   {isMobile && (
//     <div className="live__image-mobile-wrap">
//       <img src={imageMain} alt="Band" className="live__image live__image--mobile" />
//     </div>
//   )}
//   {isMobile && <BookUs variant="minimal" />}
// </div>

// <div className="live__title-column">
//   <h2 className="section__title live__title">
//     {title.split('').map((char, i) => (
//       <span key={i} className="live__title-letter">
//         {char}
//       </span>
//     ))}
//   </h2>
// </div>