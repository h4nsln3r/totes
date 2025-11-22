import React, { ReactNode } from 'react';
import '../Sections.scss';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className }) => {
  return (
    <section id={id} className={`section section--${id} ${className && className}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;
