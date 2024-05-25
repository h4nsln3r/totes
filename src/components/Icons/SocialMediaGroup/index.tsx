import InstagramIcon from "../Instagram";
import YoutubeIcon from "../Youtube";
import "./socialMediaGroup.scss"; // Ensure the CSS file is in the same directory

const SocialMediaGroup = () => {
  return (
    <div className="socialmediaicons">
      <div className="socialmediaicons__container">
        <YoutubeIcon />
        <InstagramIcon />
      </div>
    </div>
  );
};

export default SocialMediaGroup;
