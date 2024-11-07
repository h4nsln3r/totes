import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PATHS } from "../../Routing";
import MenuIcon from "@mui/icons-material/Menu";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./menu.scss";
import { useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="menu">
      <Link className="menu__logo" to={PATHS.START}>
        Totes
      </Link>
      <div className="menu__icon" onClick={() => setIsOpen(!isOpen)}>
        {!isOpen ? <MenuIcon /> : <ArrowForwardIosIcon />}
      </div>
      //Nashi
      <motion.div
        animate={{ width: isOpen ? 300 : 0 }}
        initial={{ width: 0 }}
        transition={{ duration: 0.6 }}
        className=""
        style={{
          // background: "lightblue",
          borderColor: "white",
          overflow: "hidden",
          originX: 1, // 0 Startar expansionen från vänster 1 FRÅN HÖGER
        }}
      >
        <ul>
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
      </motion.div>
    </nav>
  );
};

export default Menu;
