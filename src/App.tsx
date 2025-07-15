// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';  // Remove BrowserRouter import
import Home from './components/Portfolio';

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <footer>
        <p>&copy; 2025 Hana Oh. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;