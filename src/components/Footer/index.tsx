import SocialMediaGroup from "../Icons/SocialMediaGroup";

import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__col">
        <SocialMediaGroup />
      </div>
      <div className="footer__col">
        <p>Contact us: your.email@example.com</p>
      </div>
      <div className="footer__col">
        <p>Foto:</p>
      </div>
    </footer>
  );
};

export default Footer;
