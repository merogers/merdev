import React from 'react';

import Section from './Section/Section';
import Container from './Container/Container';

import { FaSmile } from 'react-icons/fa';

const About = () => {
  return (
    <Section isDark={true} id='about'>
      <Container>
        <h2 className='section__h2'>About</h2>
        <p className='section__p'>
          The combination of creative design and technical problem solving is
          what led me to web development.
        </p>
        <p className='section__p'>
          I originally started coding websites while I was in high-school and
          took an online diploma program in development and e-commerce. Once
          complete, I started my own freelance development and IT business.{' '}
        </p>
        <p className='section__p'>
          I have worked the last several years as a cook and am now looking to
          reestablish myself in this constantly evolving and fulfilling career.
        </p>
        <p className='section__p'>
          Feel free to send me a message if you want to take your web
          applications to the next level <FaSmile />
        </p>
      </Container>
    </Section>
  );
};

export default About;
