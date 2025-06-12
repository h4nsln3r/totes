import React from "react";
import { FaYoutube } from "react-icons/fa";

interface Props {
  url: string;
  fontSize: number;
  color: string;
}

const YouTubeIcon: React.FC<Props> = ({ url, fontSize, color }) => {
  return (
    <a
      href={`https://www.youtube.com/${url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover"
      title="Följ oss på YouTube"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FaYoutube size={fontSize} color={color} />
    </a>
  );
};

export default YouTubeIcon;
