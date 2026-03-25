import SectionWrapper from "..";
import totespic from "../../assets/images/totesabout.jpg";
import saxPic from "../../assets/sketches/sax.png";

import "./about.scss";
import { useEffect, useRef, useState } from "react";

interface Props {
  isMobile: boolean;
}

const Info: React.FC<Props> = ({ isMobile }) => {
  void isMobile;
  const [enterCount, setEnterCount] = useState(0);
  const inViewRef = useRef(false);

  useEffect(() => {
    const aboutEl = document.getElementById("about");
    if (!aboutEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nextInView = Boolean(entry?.isIntersecting);

        if (nextInView && !inViewRef.current) {
          setEnterCount((c) => c + 1);
        }
        inViewRef.current = nextInView;
      },
      // Trigga senare så saxen inte "läcker in" när bara en liten del av about
      // syns (känns då som den kommer från Hero).
      { threshold: 0.85 }
    );

    io.observe(aboutEl);
    return () => io.disconnect();
  }, []);

  return (
    <SectionWrapper sectionName="about">
      <div className="col--55 margin__top--auto">
        <img className="about__image" src={totespic} alt="Band" />
      </div>
      <div className="col--45">
        <div className="about__sax-wrap" aria-hidden>
          <img
            key={enterCount}
            className="about__sax about__sax--entered"
            src={saxPic}
            alt=""
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Info;
// {!isMobile && (
//   <div className="about__image-wrap">
//     <img src={totespic} alt="Band" />
//   </div>
// )}
// {!isMobile && (
//   <div className="about__title-row">
//     <h2 className="section__title">{t("info.title")}</h2>
//     <p className="about__intro">{t("info.p1")}</p>
//   </div>
// )}
// <div className="container flex__col flex__col--mobile-row">
//   <div className="about__presstext">
//     {isMobile && <p>{t("info.p1")}</p>}
//     {isMobile && (
//       <div className="about__image-mobile">
//         <img src={totespic} alt="Band" />
//       </div>
//     )}
//     <div className="about__presstext--long">
//       <p>{t("info.p2")}</p>
//     </div>
//     {isMobile && <BookUs variant="footer" />}
//   </div>
// </div>
// {!isMobile && (
//   <div className="about__bookus-wrap">
//     <BookUs variant="footer" />
//   </div>
// )}