import { Link } from "react-router-dom";
import { PATHS } from "../../Routing";
import "./menu.scss";

const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to={PATHS.START}>Totes</Link>
        </li>
        <li>
          <Link to={PATHS.WATCH}>Watch</Link>
        </li>
        <li>
          <Link to={PATHS.MUSIC}>Music</Link>
        </li>
        <li>
          <Link to={PATHS.CONTACT}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
