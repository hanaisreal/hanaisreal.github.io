// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Works from './components/Works';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/works">Works</Link></li>

          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/works" element={<Works />} />
        </Routes>

        <footer>
          <p>&copy; 2024 Hana Oh. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;