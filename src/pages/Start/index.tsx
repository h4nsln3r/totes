import { useState } from "react";
import classNames from "classnames";
import PizzaSpecialbandpic from "../../assets/PizzaSpecial-11-27/bandpic.jpg"; // Importerar bilden
import PizzaSpecialeventpic from "../../assets/PizzaSpecial-11-27/eventpic.jpg"; // Importerar bilden
import totesImage from "./totes-massingshornet.jpg"; // Importerar bilden
import Footer from "../../components/Footer";
import { FaClock, FaFacebook } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { Link } from "react-router-dom";

// type Props = {
//   // containerRef: RefObject<HTMLDivElement>;
// };

const Start = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const content = [
    {
      // title: "Öland Roots",
      // date: "2024-06-19",
      // description: "Spelade på invigningen! Första funkbandet på Roots!",
      backgroundImage: PizzaSpecialbandpic, // Använd den importerade bilden
      mainImage: PizzaSpecialeventpic,
    },
    // {
    //   // title: "Öland Roots",
    //   // date: "2024-06-19",
    //   // description: "Spelade på invigningen! Första funkbandet på Roots!",
    //   backgroundImage: totesImage, // Använd den importerade bilden
    // },
    // {
    //   // title: "Öland Roots",
    //   // date: "2024-06-19",
    //   // description: "Spelade på invigningen! Första funkbandet på Roots!",
    //   backgroundImage: totesImage, // Använd den importerade bilden
    // },
    // {
    //   // title: "Öland Roots",
    //   // date: "2024-06-19",
    //   // description: "Spelade på invigningen! Första funkbandet på Roots!",
    //   backgroundImage: totesImage, // Använd den importerade bilden
    // },
    // {
    //   // title: "Öland Roots",
    //   // date: "2024-06-19",
    //   // description: "Spelade på invigningen! Första funkbandet på Roots!",
    //   backgroundImage: totesImage, // Använd den importerade bilden
    // },

    // Fler objekt kan läggas till om behövs
  ];

  return (
    <>
      <div className="container">
        <div className="grid">
          {content.map((item, index) => (
            <>
              <div
                key={index}
                className={classNames("grid-item", {
                  expanded: expandedItem === index,
                  hide: expandedItem !== null && expandedItem !== index,
                })}
                onClick={() => handleClick(index)}
                style={{
                  backgroundImage: `url(${item.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {expandedItem === index && (
                  <>
                    <div
                      className="grid-item--expanded"
                      style={{
                        backgroundImage: `url(${item.mainImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <Footer
                      children={
                        <div className="flex--row">
                          <div>
                            <Link to="https://www.facebook.com/events/575031255206352/">
                              <FaFacebook />
                            </Link>
                          </div>
                          <div>
                            <Link to="https://www.google.com/maps/dir/?api=1&destination=55.59404%2C13.02338&fbclid=IwY2xjawGhm1xleHRuA2FlbQIxMAABHQRRtiayl5Kz0eOjaYJ3CSJj0aQ58GLjMDIJgfN8Y6uk6zm860u7YOuigg_aem_yWGOq57B-2uLo4dxqZ3a3g">
                              <SiGooglemaps />
                            </Link>
                          </div>
                          <div>
                            <FaClock />
                          </div>
                        </div>
                      }
                    />
                  </>
                )}
                {/* <h2>{item.title}</h2>
                  <p>{item.description}</p> */}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Start;
