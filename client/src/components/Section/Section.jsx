import React from 'react';

import './Section.scss';

const Section = ({ children, isDark, isHero, id }) => {
  return (
    <section
      className={`section${isDark ? ' section--dark' : ' section--light'}${
        isHero ? ' section--hero' : ''
      }`}
     id={id}
    >
      {children}
    </section>
  );
};

export default Section;
