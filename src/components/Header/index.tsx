import { Link } from "react-router-dom";
import { PATHS } from "../../Routing";
import Menu from "../Menu";

import "./header.scss";
import YouTubeEmbed from "../Media/Youtube/Embed";
import classNames from "classnames";
import { RefObject, useEffect, useState } from "react";

//TODO GÖR SÅ ATT youtube init grejer lägger seig snyggt uppe till vänster när man går till musik!!

export type Props = {
  isStartPage: boolean;
  isMusicPage: boolean;
  containerRef: RefObject<HTMLDivElement>; // Change type to RefObject;
};

const Header = ({ isStartPage, isMusicPage, containerRef }: Props) => {
  const [containerWidth, setContainerWidth] = useState(200);
  const [containerHeight, setContainerHeight] = useState(100);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        if (isMusicPage) {
          //Todo if music page i want to render the youtube vidoe width setContainerHeight(200); cant make it update when i change to start page
          setContainerHeight(100);
          setContainerWidth(200); // Du kan justera bredden efter behov
          console.log("isMusicPage containerWidth", containerWidth);
          console.log("isMusicPage containerHeight", containerHeight);
        } else {
          setContainerWidth(containerRef.current.offsetWidth);
          setContainerHeight(containerRef.current.offsetHeight);
          console.log("!isMusicPage containerWidth", containerWidth);
          console.log("!isMusicPage containerHeight", containerHeight);
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [isMusicPage, containerRef, isStartPage]);

  console.log("containerWidth", containerWidth);
  console.log("containerHeight", containerHeight);

  return (
    <header className="header">
      <div className="header__title">
        <Link to={PATHS.START}>
          <h1 className="title">Totes</h1>
        </Link>
      </div>
      <Menu />
      <div
        className={classNames("initvideo", {
          "initvideo--hide": !(isStartPage || isMusicPage),
          "initvideo--music": isMusicPage,
        })}
      >
        <YouTubeEmbed
          videoId="xvplQdhiNxI"
          height={containerHeight}
          width={containerWidth}
        />
      </div>
    </header>
  );
};

export default Header;
