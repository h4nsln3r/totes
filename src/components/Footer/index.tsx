import SocialMediaGroup from "../Icons/SocialMediaGroup";

import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="column middle-column">
        <div className="social-links">
          <SocialMediaGroup />
        </div>
      </div>
      <div className="column">
        <div className="contact-info">
          <p>Contact us: your.email@example.com</p>
        </div>
      </div>
      {/* <div className="column">
                test
            </div> */}
    </footer>
  );
};

export default Footer;
