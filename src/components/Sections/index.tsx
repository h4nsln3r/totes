import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './section.scss';

interface SectionWrapperProps {
  sectionName: string;
  children: ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ sectionName, children, className }) => {
  return (
    <section id={sectionName} className={classNames('section', sectionName, className)}>
      {children}
    </section>
  );
};

export default SectionWrapper;
