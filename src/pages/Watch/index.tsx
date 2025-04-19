import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import PizzaSpecialbandpic from '../../assets/PizzaSpecial-11-27/bandpic.jpg'; // Importerar bilden
import PizzaSpecialeventpic from '../../assets/PizzaSpecial-11-27/eventpic.jpg'; // Importerar bilden
import TotesMassinghornet from '../../assets/massing/totes-massingshornet.jpg'; // Importerar bilden
import classNames from 'classnames';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { FaClock, FaFacebook } from 'react-icons/fa';
import { SiGooglemaps } from 'react-icons/si';

const Watch: React.FC = () => {
  const [showUpcoming, setShowUpcoming] = useState<boolean>(true);
  const [expandedCommingItem, setExpandedCommingItem] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setExpandedCommingItem(expandedCommingItem === index ? null : index);
  };

  function resetExpandedCommingItem() {
    if (expandedCommingItem !== null) {
      setExpandedCommingItem(null);
    } else {
      setShowUpcoming(!showUpcoming);
    }
  }

  const [showPast, setShowPast] = useState<boolean>(false);
  const [expandedPreviousItem, setExpandedPreviousItem] = useState<number | null>(null);
  const handleClick2 = (index: number) => {
    setExpandedPreviousItem(expandedPreviousItem === index ? null : index);
  };

  const content = [
    {
      // title: "Öland Roots",
      // date: "2024-06-19",
      // description: "Spelade på invigningen! Första funkbandet på Roots!",
      backgroundImage: PizzaSpecialbandpic, // Använd den importerade bilden
      mainImage: PizzaSpecialeventpic,
    },
  ];

  const content2 = [
    {
      // title: "Öland Roots",
      // date: "2024-06-19",
      // description: "Spelade på invigningen! Första funkbandet på Roots!",
      backgroundImage: TotesMassinghornet, // Använd den importerade bilden
      mainImage: TotesMassinghornet,
    },
  ];

  //senaste gigget eller nästa som kommer ska ta hela sidan.
  //under kommande spelningar
  //längst ner på skärmen ska man kunna trycka vidare för att öppna nästa accordion och kanske stänga den där uppe
  //spelningarna ska ta hela sidan iallafall

  return (
    <div className="container container__center">
      <div className="watchlist">
        <div
          className="watchlist__accordion"
          onClick={() => resetExpandedCommingItem()}
          style={{ cursor: 'pointer' }}
        >
          {expandedCommingItem === null ? (
            <h4>Kommande spelningar {showUpcoming ? '▲' : '▼'}</h4>
          ) : (
            <div>X</div>
          )}
        </div>

        <AnimateHeight height={showUpcoming ? 'auto' : 0} duration={500}>
          {/* <ul>
            {upcomingGigs.map((gig) => (
              <li key={gig.id}>
                <strong>{gig.title}</strong> - {gig.date} - {gig.location}
              </li>
            ))}
          </ul> */}
          <div className="grid">
            {content.map((item, index) => (
              <>
                <div
                  key={index}
                  className={classNames('grid-item', {
                    expanded: expandedCommingItem === index,
                    hide: expandedCommingItem !== null && expandedCommingItem !== index,
                  })}
                  onClick={() => handleClick(index)}
                  style={{
                    backgroundImage: `url(${item.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {expandedCommingItem === index && (
                    <>
                      <div
                        className={classNames('grid-item--expanded', {
                          expanded: expandedCommingItem === index,
                          hide: expandedCommingItem !== null && expandedCommingItem !== index,
                        })}
                        style={{
                          backgroundImage: `url(${item.mainImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
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
        </AnimateHeight>
        {expandedCommingItem === null ? (
          <>
            <div
              className="watchlist__accordion"
              onClick={() => setShowPast(!showPast)}
              style={{ cursor: 'pointer' }}
            >
              <h4>Tidigare spelningar {showPast ? '▲' : '▼'}</h4>
            </div>
            <AnimateHeight height={showPast ? 'auto' : 0} duration={500}>
              {/* <ul>
            {pastGigs.map((gig) => (
              <li key={gig.id}>
                <strong>{gig.title}</strong> - {gig.date} - {gig.location}
              </li>
            ))}
          </ul> */}

              <div className="grid">
                {content2.map((item, index) => (
                  <>
                    <div
                      key={index}
                      className={classNames('grid-item', {
                        expanded: expandedPreviousItem === index,
                        hide: expandedPreviousItem !== null && expandedPreviousItem !== index,
                      })}
                      onClick={() => handleClick2(index)}
                      style={{
                        backgroundImage: `url(${item.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {expandedPreviousItem === index && (
                        <>
                          <div
                            className={classNames('grid-item--expanded', {
                              expanded: expandedPreviousItem === index,
                              hide: expandedPreviousItem !== null && expandedPreviousItem !== index,
                            })}
                            style={{
                              backgroundImage: `url(${item.mainImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
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
            </AnimateHeight>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Watch;
