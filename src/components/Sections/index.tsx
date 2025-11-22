import React, { ReactNode } from 'react';
import './section.scss';

interface SectionWrapperProps {
  sectionName: string;
  children: ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ sectionName, children, className }) => {
  return (
    <section id={sectionName} className={`section ${sectionName} ${className && className}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;
