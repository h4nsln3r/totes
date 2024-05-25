export type Props = {
  videoId: string;
  width?: number;
  height?: number;
};

const YouTubeEmbed = ({ videoId, height, width }: Props) => {
  const srcUrl = `https://www.youtube.com/embed/${videoId}?si=I0ZzaX1K2IYYauJ1`;

  return (
    <iframe
      width={width}
      height={height}
      src={srcUrl}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default YouTubeEmbed;
