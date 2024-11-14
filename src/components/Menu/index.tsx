import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { PATHS } from "../../Routing";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./menu.scss";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledDown, setScrolledDown] = useState(false);

  const location = useLocation(); // Hämta den aktuella sökvägen

  useEffect(() => {
    setIsOpen(false);
    // TODO Bygg om så att det är två seperata compoeneter
    // en som är statisk däruppe och en som footern som kommer fram när man scrollar ner och försvinner på toppen
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolledDown(true);
      } else {
        setScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="menu">
        {!isScrolledDown && (
          <Link
            onClick={() => setIsOpen(false)}
            className="menu__logo"
            to={PATHS.START}
          >
            Totes
          </Link>
        )}
        {/* TODO -> När man scrollar ner ska bara logga och menu ikonen följa med like sticky */}
        {!isScrolledDown && (
          <>
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
              transition={{ duration: 0.4 }}
            >
              <ul>
                <li>
                  <Link
                    className={classNames("", {
                      active: location.pathname === PATHS.WATCH,
                    })}
                    to={PATHS.WATCH}
                    onClick={() => setIsOpen(false)}
                  >
                    Se
                  </Link>
                </li>
                <li>
                  <Link
                    className={classNames("", {
                      active: location.pathname === PATHS.MUSIC,
                    })}
                    to={PATHS.MUSIC}
                    onClick={() => setIsOpen(false)}
                  >
                    Musik
                  </Link>
                </li>
                <li>
                  <Link
                    className={classNames("", {
                      active: location.pathname === PATHS.CONTACT,
                    })}
                    to={PATHS.CONTACT}
                    onClick={() => setIsOpen(false)}
                  >
                    Om
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </nav>

      <nav
        className={classNames("", {
          "menu menu__sticky--is-scrolled-down": isScrolledDown,
          menu__sticky: !isScrolledDown,
        })}
      >
        <Link
          onClick={() => setIsOpen(!isOpen)}
          className="menu__logo"
          to={PATHS.START}
        >
          Totes
        </Link>
        {/* TODO -> När man scrollar ner ska bara logga och menu ikonen följa med like sticky */}
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
          transition={{ duration: 0.4 }}
        >
          <ul>
            <li>
              <Link
                className={classNames("", {
                  active: location.pathname === PATHS.WATCH,
                })}
                to={PATHS.WATCH}
                onClick={() => setIsOpen(!isOpen)}
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
                onClick={() => setIsOpen(!isOpen)}
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
                onClick={() => setIsOpen(!isOpen)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>
      </nav>
    </>
  );
};

export default Menu;
