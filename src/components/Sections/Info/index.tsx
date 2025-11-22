import SectionWrapper from '..';
import AllLinks from '../../Links';
import totespic from '../../../assets/images/totesorig.jpg';

import './Info.scss';

interface Props {}

const Info: React.FC<Props> = () => {
  return (
    <SectionWrapper sectionName="info">
      <h2 className="section__title">Om</h2>
      <div className="flex__col flex__col--mobile-row">
        <div>
          <p>
            Med starka melodier och svängiga rytmer rör sig Malmö-trion Totes lekfullt men
            självsäkert mellan rock, funk, blues och jazz.
          </p>
          <p>
            Bandet består av Svante Berg, Hannes Linnér och Gabriel Fager Ferrari, som sedan 2023
            har spelat sina medryckande poplåtar med ett gemensamt mål: att sprida glädje och
            uppmuntra till dans. Med stilsäker gitarr, mullrande bas och trummor med precis rätt
            tempo, bjuder Totes även på vacker stämsång och en skopa sexig saxofon
          </p>
          <br />
          <div className="live__book">
            <p>Vill du boka oss?</p>
            <p>
              Hör av dig till: <a href="ittakestotes@gmail.com">ittakestotes@gmail.com</a>
              <br /> - eller skriv på någon socialmedia!
            </p>
          </div>
          <AllLinks />
        </div>
        <img src={totespic} alt="Band" className="" />
      </div>
    </SectionWrapper>
  );
};

export default Info;
