import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/variables.scss";
import "./footer.scss";
import { PATHS } from "../../Routing";
import SocialMediaGroup from "../Icons/SocialMediaGroup";

interface Props {
  children?: any;
}
const Footer = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`footer ${isVisible ? "footer--visible" : "footer--hidden"}`}
    >
      {children ? (
        children
      ) : (
        <>
          <div className="footer__col">
            <SocialMediaGroup />
          </div>
          <div className="footer__col">
            <Link to={PATHS.START}>Totes</Link>
          </div>
          <div className="footer__col">
            <Link className="footer__contact" to={PATHS.CONTACT}>
              Book us
            </Link>
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer;
