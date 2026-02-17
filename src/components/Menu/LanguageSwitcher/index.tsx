import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGlobeEurope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -8 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 8 },
};

const FLAG_EN = 'https://flagcdn.com/w40/gb.png';
const FLAG_SV = 'https://flagcdn.com/w40/se.png';
const FLAG_ES = 'https://flagcdn.com/w40/es.png';

interface Props {
  isMenuOpen: boolean;
  isMobile: boolean;
}

const LanguageSwitcher: React.FC<Props> = ({ isMenuOpen }) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = i18n.language?.startsWith('sv') ? 'sv' : i18n.language?.startsWith('es') ? 'es' : 'en';

  const changeLang = (lng: 'en' | 'sv' | 'es') => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <>
      <button
        className={`menu__lang-btn ${isMenuOpen ? 'menu__lang-btn--floating' : ''}`}
        aria-label={t('lang.change')}
        onClick={() => setOpen(true)}
        type="button"
      >
        <FaGlobeEurope />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lang-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="lang-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={`lang-modal__option ${current === 'en' ? 'is-active' : ''}`}
                onClick={() => changeLang('en')}
                type="button"
                aria-label="English"
              >
                <img src={FLAG_EN} alt="" className="lang-modal__flag" width={32} height={24} />
              </button>

              <button
                className={`lang-modal__option ${current === 'sv' ? 'is-active' : ''}`}
                onClick={() => changeLang('sv')}
                type="button"
                aria-label="Svenska"
              >
                <img src={FLAG_SV} alt="" className="lang-modal__flag" width={32} height={24} />
              </button>

              <button
                className={`lang-modal__option ${current === 'es' ? 'is-active' : ''}`}
                onClick={() => changeLang('es')}
                type="button"
                aria-label="Español"
              >
                <img src={FLAG_ES} alt="" className="lang-modal__flag" width={32} height={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LanguageSwitcher;
