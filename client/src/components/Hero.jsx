import React from 'react';

import Section from './Section/Section';
import Container from './Container/Container';

import { Link } from 'react-scroll';

import { FaAngleDoubleDown, FaFileDownload } from 'react-icons/fa';

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
            <div className='section__button-container'>
              <Link
                className='section__button-lg-primary section__button-lg-primary--margin'
                to='projects'
                smooth={true}
                spy={true}
                offset={-64}
              >
                <FaAngleDoubleDown className='section__button-icon' />
                Projects
              </Link>
              <a
                className='section__button-lg-outline'
                href='https://storage.googleapis.com/portfolio-misc/michelle_rogers_resume_latest.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaFileDownload className='section__button-icon' />
                Resume
              </a>
            </div>
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
