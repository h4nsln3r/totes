import { useTranslation } from 'react-i18next';
import AllLinks from '../../Links/AllLinks';
import './bookus.scss';

const BookUs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bookus">
      <p className="bookus__text">{t('live.bookUs')}</p>
      <p className="bookus__mail">
        <a href="mailto:ittakestotes@gmail.com">ittakestotes@gmail.com</a>
        <br /> {t('common.orSocials')}
      </p>
      <AllLinks />
    </div>
  );
};

export default BookUs;
