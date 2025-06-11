import { useEffect, useState } from "react";

import StartSection from "../sections/Start";
import LiveSection from "../sections/Live";
import MusicSection from "../sections/Music";
import InfoSection from "../sections/Info";

const Page: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateWidth = () => {
      setIsMobile(window.innerWidth >= 768 ? true : false);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <>
      <StartSection isMobile={isMobile} />
      <LiveSection isMobile={isMobile} />
      <MusicSection />
      <InfoSection />
    </>
  );
};

export default Page;
