import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGlobeEurope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -8 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 8 },
};

interface Props {
  isMenuOpen: boolean;
  isMobile: boolean;
}

const LanguageSwitcher: React.FC<Props> = ({ isMenuOpen }) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = i18n.language?.startsWith('sv') ? 'sv' : 'en';

  const changeLang = (lng: 'en' | 'sv') => {
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
                <span className="flag">🇬🇧</span>
                <span>{t('lang.english')}</span>
              </button>

              <button
                className={`lang-modal__option ${current === 'sv' ? 'is-active' : ''}`}
                onClick={() => changeLang('sv')}
                type="button"
                aria-label="Svenska"
              >
                <span className="flag">🇸🇪</span>
                <span>{t('lang.swedish')}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LanguageSwitcher;
