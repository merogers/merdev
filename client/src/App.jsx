import React from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import Main from './components/Main/Main';

import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Toast from './components/Toast';
import Login from './components/Login';
import Register from './components/Register';

import useLoginModal from './hooks/useLoginModal';
import useRegisterModal from './hooks/useRegisterModal';

// const onLogout = () => {
//   dispatch(logout())
//   dispatch(reset())
//   navigate('/')
// }

function App() {
  const { loginModal, toggleLoginModal } = useLoginModal();
  const { registerModal, toggleRegisterModal } = useRegisterModal();

  return (
    <Main>
      <Header
        title='merogers.dev'
        toggleLoginModal={toggleLoginModal}
        toggleRegisterModal={toggleRegisterModal}
      />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
      <Toast />
      <Modal show={loginModal} toggle={toggleLoginModal}>
        <Login toggleLoginModal={toggleLoginModal} />
      </Modal>
      <Modal show={registerModal} toggle={toggleRegisterModal}>
        <Register toggleRegisterModal={toggleRegisterModal} />
      </Modal>
    </Main>
  );
}

export default App;
