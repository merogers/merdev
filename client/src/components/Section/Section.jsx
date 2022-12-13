import React from 'react';

import './Section.scss';

const Section = ({ children, isDark, isHero, isDash, id }) => {
  const hero = isHero ? ' section--hero' : '';
  const dash = isDash ? ' section--dash' : '';
  const dark = isDark ? ' section--dark' : ' section--light';

  return (
    <section className={`section${hero}${dark}${dash}`} id={id}>
      {children}
    </section>
  );
};

export default Section;
