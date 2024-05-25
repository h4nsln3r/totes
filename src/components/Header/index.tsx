import { Link } from "react-router-dom";
import { PATHS } from "../../Routing";
import Menu from "../Menu";

import "./header.scss";
import YouTubeEmbed from "../Media/Youtube/Embed";
import classNames from "classnames";
import { RefObject, useEffect, useState } from "react";

export type Props = {
  isStartPage: boolean;
  isMusicPage: boolean;
  containerRef: RefObject<HTMLDivElement>; // Change type to RefObject;
};

const Header = ({ isStartPage, isMusicPage, containerRef }: Props) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateDimensions(); // Uppdatera dimensionerna när komponenten mountas

    window.addEventListener("resize", updateDimensions); // Lyssna på resize-händelsen

    return () => {
      window.removeEventListener("resize", updateDimensions); // Ta bort event listener när komponenten unmountas
    };
  }, []);

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
          "initvideo--hide": !isStartPage,
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
