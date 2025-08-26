// import YoutubeIcon from "../../components/Icons/YoutubeIcon";
import YouTubeEmbed from "../../components/Media/Youtube/Embed";
import SectionWrapper from "../../components/SectionWrapper";

interface Props {}

const MusicSection: React.FC<Props> = () => {
  return (
    <SectionWrapper id="music">
      <h2 className="section__title">Musik</h2>

      <div className="player">
        <YouTubeEmbed videoId={"xvplQdhiNxI"} />
      </div>
      {/* <div className="section--music--bottom">
        <YoutubeIcon color={"red"} fontSize={100} url={"@OfficiallyTotes"} />
      </div> */}
    </SectionWrapper>
  );
};

export default MusicSection;
