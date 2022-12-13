import React from 'react';

import Section from './Section/Section';
import Container from './Container/Container';

import { Link } from 'react-scroll';

import { FaArrowDown } from 'react-icons/fa';

import Portrait from '../assets/ud_programmer.svg';

const Hero = () => {
  return (
    <Section isDark={true} isHero={true} id='hero'>
      <Container>
        <div className='section__hero-container'>
          <div className='section__hero-content'>
            <h1 className='section__h1'>
              Hi I'm <span className='section__accent'>Michelle</span> and I'm a
              <span className='section__accent'> Full-Stack Web Developer</span>
            </h1>
            <Link
              className='section__button-lg-primary'
              to='projects'
              smooth={true}
              spy={true}
              offset={-64}
            >
              <FaArrowDown className='section__button-icon' />
              View Projects
            </Link>
          </div>
          <div className='section__portrait-container'>
            <img src={Portrait} className='section__portrait' />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
