import { FaFacebook, FaInstagram, FaSoundcloud, FaYoutube } from 'react-icons/fa';
import './socialMediaIcons.scss'; // Ensure the CSS file is in the same directory

const SocialMediaIcons = () => {
  return (
    <div>
      <div className="icon-container">
        <a href='https://www.instagram.com/totesband'
          target='_blank'
          className="icon-column">
          <FaSoundcloud className="icon" />
        </a>
        <a href='https://www.instagram.com/totesband'
          target='_blank'
          className="icon-column">
          <FaYoutube className="icon" />
        </a>
        <a href='https://www.instagram.com/totesband'
          target='_blank'
          className="icon-column">
          <FaInstagram className="icon" />
        </a>
        <a href='https://www.instagram.com/totesband'
          target='_blank'
          className="icon-column">
          <FaFacebook className="icon" />
        </a>
      </div>
    </div>
  );
};

export default SocialMediaIcons;
