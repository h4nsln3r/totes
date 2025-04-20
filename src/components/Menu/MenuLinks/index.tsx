import React from 'react';
import classNames from 'classnames';

interface MenuLinksProps {
  activeSection: string;
  setIsOpen: (val: boolean) => void;
}

const MenuLinks: React.FC<MenuLinksProps> = ({ activeSection, setIsOpen }) => {
  const links = [
    { label: 'Live', id: 'live' },
    { label: 'Musik', id: 'music' },
    { label: 'Om', id: 'info' },
  ];

  return (
    <ul>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={`#${link.id}`}
            className={classNames({ active: activeSection === link.id })}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuLinks;
