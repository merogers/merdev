import React, { useState, useRef } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Section from './components/Section/Section';
import Container from './components/Container/Container';
import Form from './components/Form/Form';
import Button from './components/Button/Button';
import Project from './components/Project/Project';

import { FaAngleDown, FaSmile } from 'react-icons/fa';
// const onLogout = () => {
//   dispatch(logout())
//   dispatch(reset())
//   navigate('/')
// }

function App() {
  // Refs to scroll to each section
  const refs = {
    hero: useRef(null),
    projects: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({
      alignToTop: true,
      behavior: 'smooth',
    });
  };

  const projects = [
    {
      title: 'My Portfolio',
      description:
        'My portfolio site, made with React, Express, Node.js and MongoDB.',
      imgSrc:
        'https://storage.googleapis.com/portfolio-screenshots/wallhaven-g8qpqd.jpg',
      demoLink: 'https://merogers.dev',
      codeLink: 'https://github.com/fetchcat/merdev',
      tags: [
        'HTML5',
        'SASS',
        'JavaScript',
        'React',
        'Redux',
        'Express.js',
        'Node.js',
        'MongoDB',
        'JWT',
        'Google Cloud',
      ],
    },
    {
      title: 'Peace of Mind',
      description:
        'Peace of Mind is an application meant to assist in the day-to-day self-care and mental health of the user by providing an all-in-one solution for journaling and daily gratitude.',
      imgSrc:
        'https://storage.googleapis.com/portfolio-screenshots/wallhaven-g8qpqd.jpg',
      demoLink: 'https://peaceofmind.merogers.dev',
      codeLink: 'https://github.com/fetchcat/peaceofmind',
      tags: [
        'HTML5',
        'SASS',
        'JavaScript',
        'React',
        'Passport.js',
        'Express.js',
        'Node.js',
        'MySQL',
        'JWT',
        'Google Cloud',
      ],
    },
    {
      title: 'SmartBrain 2022',
      description: 'Coming Soon...',
      imgSrc:
        'https://storage.googleapis.com/portfolio-screenshots/wallhaven-g8qpqd.jpg',
      demoLink: 'https://peaceofmind.merogers.dev',
      codeLink: 'https://github.com/fetchcat/peaceofmind',
      tags: [
        'HTML5',
        'SASS',
        'JavaScript',
        'React',
        'Express.js',
        'Node.js',
        'MySQL',
        'JWT',
        'Google Cloud',
      ],
    },
  ];

  return (
    <>
      <Header title='merogers.dev' refs={refs} scrollTo={scrollTo} />
      <Section isDark={true} isHero={true} id='hero'>
        <Container>
          <div className='section__hero-content'>
            <h1 className='section__h1'>
              Hi I'm <span className='section__accent'>Michelle</span> and I'm a
              <span className='section__accent'> Full-Stack Web Developer</span>
            </h1>
            <div
              className='section__scroll-indicator'
              onClick={() => scrollTo(refs.projects)}
            >
              <h3 className='section__h3'>View Projects</h3>
              <FaAngleDown className='section-scroll-icon' size='2rem' />
            </div>
          </div>
        </Container>
      </Section>
      <Section id='projects'>
        <Container>
          <h2 className='section__h2'>Projects</h2>
          {projects &&
            projects.map((project) => (
              <Project project={project} key={project.title} />
            ))}
        </Container>
      </Section>
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
            reestablish myself in this constantly evolving and fulfilling
            career.
          </p>
          <p className='section__p'>
            Feel free to send me a message if you want to take your web
            applications to the next level <FaSmile />
          </p>
        </Container>
      </Section>
      <Section id='contact'>
        <Container>
          <h2 className='section__h2'>Contact</h2>
          <Form>
            <label className='form__label'>
              <span>Name</span>
              <input type='text' className='form__input' />
            </label>
            <label className='form__label'>
              <span>Email</span>
              <input type='text' className='form__input' />
            </label>
            <label className='form__label'>
              <span>Message</span>
              <textarea className='form__input form__textarea'></textarea>
            </label>
            <div className='form__button-container'>
              <Button />
            </div>
          </Form>
        </Container>
      </Section>
      <Footer />

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
}

export default App;
