import { useSelector } from 'react-redux';

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
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Main>
      <Header title="michellerogers.ca" />
      {user && <Dashboard />}
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
      <Toast />
      <Login />
      <Register />
    </Main>
  );
}

export default App;
