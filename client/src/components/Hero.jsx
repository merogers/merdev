import React from 'react';

import Section from './Section/Section';
import Container from './Container/Container';
import Loader from './Loader/Loader';

import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <Section isDark={true} isHero={true} id='hero'>
      <Container>
        <div className='section__hero-content'>
          <h1 className='section__h1'>
            Hi I'm <span className='section__accent'>Michelle</span> and I'm a
            <span className='section__accent'> Full-Stack Web Developer</span>
          </h1>
          <Loader />
          <Link
            className='section__button-lg-primary'
            to='projects'
            smooth={true}
            spy={true}
            offset={-64}
          >
            View Projects
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
