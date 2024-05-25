// import { useEffect, useRef, useState } from "react";

import { RefObject } from "react";
// import YouTubeEmbed from "../../components/Media/Youtube/Embed";
type Props = {
  containerRef: RefObject<HTMLDivElement>;
};

const Music = ({ containerRef }: Props) => {
  return <div className="container" ref={containerRef}></div>;
};

export default Music;
