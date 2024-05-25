import { Link } from "react-router-dom";
import { PATHS } from "../../Routing";
import SocialMediaGroup from "../Icons/SocialMediaGroup";

import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__col">
        <SocialMediaGroup />
      </div>
      <div className="footer__col">
        <Link className="footer__contact" to={PATHS.CONTACT}>
          Book us
        </Link>
      </div>
      <div className="footer__col">
        <p className="footer__co">Fotos?:</p>
      </div>
    </footer>
  );
};

export default Footer;
