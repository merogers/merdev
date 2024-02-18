import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectRoute from './components/ProtectRoute';

import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';

function App() {
  return (
    <div className="flex h-full flex-col">
      <Header title="My Portfolio" />
      <Routes>
        <Route path="/" element={<Home name="Michelle" title="Full Stack Developer" />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer title="My Portfolio" />
    </div>
  );
}

export default App;
