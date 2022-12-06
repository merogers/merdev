import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Section from './components/Section/Section';
import Container from './components/Container/Container';
import Form from './components/Form/Form';
import Button from './components/Button/Button';
import Project from './components/Project/Project';
import Modal from './components/Modal/Modal';
import Main from './components/Main/Main';

import Login from './components/Login';

import projects from './projects';

import { FaAngleDown, FaSmile } from 'react-icons/fa';

import useLoginModal from './hooks/useLoginModal';

import { Link } from 'react-scroll';

// const onLogout = () => {
//   dispatch(logout())
//   dispatch(reset())
//   navigate('/')
// }

function App() {
  const { loginModal, toggleLoginModal } = useLoginModal();

  return (
    <Main>
      <Header title='merogers.dev' toggleLoginModal={toggleLoginModal} />
      <Section isDark={true} isHero={true} id='hero'>
        <Container>
          <div className='section__hero-content'>
            <h1 className='section__h1'>
              Hi I'm <span className='section__accent'>Michelle</span> and I'm a
              <span className='section__accent'> Full-Stack Web Developer</span>
            </h1>

            <Link
              className='section__button-primary'
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
          <Form>
            <h2 className='section__h2'>Contact</h2>
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
      <Modal show={loginModal} toggle={toggleLoginModal}>
        <Login toggleLoginModal={toggleLoginModal} />
      </Modal>
    </Main>
  );
}

export default App;
