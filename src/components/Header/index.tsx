import { Link } from "react-router-dom";
import { PATHS } from "../../Routing";
import Menu from "../Menu/Menu";

import "./header.scss";

import './header.scss';
const Header = () => {
  return (
    <header className="header">
      <div className="header__title">
        <Link to={PATHS.START}>
          <h1 className="title">Totes</h1>
        </Link>
      </div>
      <Menu />
    </header>
  );
};

export default Header;
