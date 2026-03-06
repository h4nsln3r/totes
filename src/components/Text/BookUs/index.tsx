import { useTranslation } from 'react-i18next';
import AllLinks from '../../Links/AllLinks';
import './bookus.scss';

interface BookUsProps {
  variant?: 'footer' | 'block';
}

const BookUs: React.FC<BookUsProps> = ({ variant = 'block' }) => {
  const { t } = useTranslation();

  if (variant === 'footer') {
    return (
      <footer className="bookus bookus--footer">
        <div className="bookus__content">
          <span className="bookus__text">{t('live.bookUs')}</span>
          <span className="bookus__separator"> · </span>
          <span className="bookus__mail">
            <a href="mailto:ittakestotes@gmail.com">ittakestotes@gmail.com</a>
          </span>
          <span className="bookus__separator"> · </span>
          <span className="bookus__socials-label">{t('common.orSocials')}</span>
        </div>
        <AllLinks />
      </footer>
    );
  }

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
