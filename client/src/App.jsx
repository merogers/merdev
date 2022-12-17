import React, { useState } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Toast from './components/Toast';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  return (
    <Main>
      <Header
        title='merogers.dev'
        setLoginModal={setLoginModal}
        setRegisterModal={setRegisterModal}
      />
      <Dashboard />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
      <Toast />
      <Login loginModal={loginModal} setLoginModal={setLoginModal} />
      <Register
        registerModal={registerModal}
        setRegisterModal={setRegisterModal}
      />
    </Main>
  );
}

export default App;
