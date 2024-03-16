import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/globals.scss';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <div className="container"></div>
    </Router>
  );
}
