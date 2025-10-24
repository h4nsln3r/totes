import StartSection from "../sections/Start";
import LiveSection from "../sections/Live";
import MusicSection from "../sections/Music";
import InfoSection from "../sections/Info";

interface Props {
  isMobile: boolean;
  isMenuOpen: boolean;
}

const Page: React.FC<Props> = ({ isMenuOpen, isMobile }) => {
  return (
    <>
      <StartSection isMobile={isMobile} isMenuOpen={isMenuOpen} />
      <MusicSection />
      <LiveSection isMobile={isMobile} />
      <InfoSection />
    </>
  );
};

export default Page;
