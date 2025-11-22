import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface MenuLinksProps {
  activeSection: string;
}

const MenuLinks: React.FC<MenuLinksProps> = ({ activeSection }) => {
  const { t } = useTranslation();

  const links = [
    { label: t('nav.music'), id: 'music' },
    { label: t('nav.live'), id: 'live' },
    { label: t('nav.about'), id: 'about' },
  ];

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = window.innerWidth >= 768 ? -62 : -74;

      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <ul>
      {links.map((link) => (
        <li key={link.id}>
          <a
            className={classNames({ active: activeSection === link.id })}
            onClick={() => scrollToId(link.id)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuLinks;
