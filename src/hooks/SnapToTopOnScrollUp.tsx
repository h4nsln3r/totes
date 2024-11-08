import { useEffect, useState } from "react";

const SnapToTopOnScrollUp = () => {
  const [lastScrollY, setLastScrollY] = useState(0); // För att hålla koll på senaste scrollpositionen

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY; // Aktuell scrollposition

      // Om användaren scrollar uppåt och är nära toppen
      if (currentScrollY < 50 && currentScrollY < lastScrollY) {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Rulla till toppen med en smidig animation
      }

      // Uppdatera den senaste scrollpositionen
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Ta bort event listener när komponenten avmonteras
    };
  }, [lastScrollY]); // Den senaste scrollpositionen används som beroende

  return null; // Ingen rendering behövs
};

export default SnapToTopOnScrollUp;
