import InstagramIcon from "../Instagram";
import YoutubeIcon from "../Youtube";
import "./socialmediagroup.scss"; // Ensure the CSS file is in the same directory

const SocialMediaGroup = () => {
  return (
    <div className="socialmediagroup__container">
      <YoutubeIcon />
      <InstagramIcon />
    </div>
  );
};

export default SocialMediaGroup;
