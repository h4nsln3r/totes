import React, { ReactNode } from 'react';
import './section.scss';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children }) => {
  return (
    <section id={id} className={`section section--${id}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;
