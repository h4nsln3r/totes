import React, { useState } from "react";
import AnimateHeight from "react-animate-height";

interface Gig {
  id: number;
  date: string;
  location: string;
  title: string;
}

const Watch: React.FC = () => {
  // Sätter showUpcoming till true från början
  const [showUpcoming, setShowUpcoming] = useState<boolean>(true);
  const [showPast, setShowPast] = useState<boolean>(false);

  const upcomingGigs: Gig[] = [
    {
      id: 1,
      date: "2024-11-27",
      location: "Stockholm",
      title: "Pizza Special",
      // image:
    },
  ];

  const pastGigs: Gig[] = [
    { id: 3, date: "2023-10-10", location: "Malmö", title: "Concert C" },
    { id: 4, date: "2023-08-05", location: "Uppsala", title: "Concert D" },
  ];

  //senaste gigget eller nästa som kommer ska ta hela sidan.
  //under kommande spelningar
  //längst ner på skärmen ska man kunna trycka vidare för att öppna nästa accordion och kanske stänga den där uppe
  //spelningarna ska ta hela sidan iallafall

  return (
    <div className="container container__center">
      <div className="watchlist">
        <div
          onClick={() => setShowUpcoming(!showUpcoming)}
          style={{ cursor: "pointer" }}
        >
          <h2>Kommande spelningar {showUpcoming ? "▲" : "▼"}</h2>
        </div>
        <AnimateHeight height={showUpcoming ? "auto" : 0} duration={500}>
          <ul>
            {upcomingGigs.map((gig) => (
              <li key={gig.id}>
                <strong>{gig.title}</strong> - {gig.date} - {gig.location}
              </li>
            ))}
          </ul>
        </AnimateHeight>

        <div
          onClick={() => setShowPast(!showPast)}
          style={{ cursor: "pointer" }}
        >
          <h2>Tidigare spelningar {showPast ? "▲" : "▼"}</h2>
        </div>
        <AnimateHeight height={showPast ? "auto" : 0} duration={500}>
          <ul>
            {pastGigs.map((gig) => (
              <li key={gig.id}>
                <strong>{gig.title}</strong> - {gig.date} - {gig.location}
              </li>
            ))}
          </ul>
        </AnimateHeight>
      </div>
    </div>
  );
};

export default Watch;
