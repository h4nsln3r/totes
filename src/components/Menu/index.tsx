import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PATHS } from "../../Routing";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./menu.scss";
import { useState } from "react";
import classNames from "classnames";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Hämta den aktuella sökvägen

  return (
    <nav className="menu">
      <Link className="menu__logo" to={PATHS.START}>
        Totes
      </Link>

      <div
        className={classNames("menu__icon", {
          "menu__icon--close": isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? (
          <MenuIcon fontSize="large" />
        ) : (
          <ArrowForwardIosIcon fontSize="large" />
        )}
      </div>

      <motion.div
        className="menu__animation"
        animate={{ width: isOpen ? 300 : 0 }}
        initial={{ width: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ul>
          <li>
            <Link
              className={classNames("", {
                active: location.pathname === PATHS.WATCH,
              })}
              to={PATHS.WATCH}
            >
              Watch
            </Link>
          </li>
          <li>
            <Link
              className={classNames("", {
                active: location.pathname === PATHS.MUSIC,
              })}
              to={PATHS.MUSIC}
            >
              Music
            </Link>
          </li>
          <li>
            <Link
              className={classNames("", {
                active: location.pathname === PATHS.CONTACT,
              })}
              to={PATHS.CONTACT}
            >
              Contact
            </Link>
          </li>
        </ul>
      </motion.div>
    </nav>
  );
};

export default Menu;
