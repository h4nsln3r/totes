import SectionWrapper from '..';
import AllLinks from '../../Links/AllLinks';
import totespic from '../../../assets/images/totesorig.jpg';

import './Info.scss';
import { useTranslation } from 'react-i18next';

interface Props {}

const Info: React.FC<Props> = () => {
  const { t } = useTranslation();
  return (
    <SectionWrapper sectionName="info">
      <h2 className="section__title">{t('info.title')}</h2>
      <div className="flex__col flex__col--mobile-row">
        <div>
          <p>{t('info.p1')}</p>
          <p>{t('info.p2')}</p>
          <br />
          <div className="live__book">
            <p>{t('live.bookUs')}</p>
            <p>
              <a href="mailto:ittakestotes@gmail.com">ittakestotes@gmail.com</a>
              <br /> {t('common.orSocials')}
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
