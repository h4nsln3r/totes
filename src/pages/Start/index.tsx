import { useState } from "react";
import classNames from "classnames";
import PizzaSpecialbandpic from "../../assets/PizzaSpecial-11-27/bandpic.jpg"; // Importerar bilden
import PizzaSpecialeventpic from "../../assets/PizzaSpecial-11-27/eventpic.jpg"; // Importerar bilden
import totesImage from "./totes-massingshornet.jpg"; // Importerar bilden

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
    {
      // title: "Öland Roots",
      // date: "2024-06-19",
      // description: "Spelade på invigningen! Första funkbandet på Roots!",
      backgroundImage: totesImage, // Använd den importerade bilden
    },
    {
      // title: "Öland Roots",
      // date: "2024-06-19",
      // description: "Spelade på invigningen! Första funkbandet på Roots!",
      backgroundImage: totesImage, // Använd den importerade bilden
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

    // Fler objekt kan läggas till om behövs
  ];

  return (
    <div className="container">
      <div className="grid">
        {content.map((item, index) => (
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
              <div
                className="grid-item--expanded"
                style={{
                  backgroundImage: `url(${item.mainImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            )}
            {/* <h2>{item.title}</h2>
            <p>{item.description}</p> */}
          </div>
        ))}
      </div>
      <h1>Heja</h1>
    </div>
  );
};

export default Start;
