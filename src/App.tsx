// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Portfolio';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <footer>
          <p>&copy; 2024 Hana Oh. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;