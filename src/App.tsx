// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewPortfolio from './newui/NewPortfolio';
import ComingSoon from './pages/ComingSoon';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<NewPortfolio />} />
      <Route path="/wordbank" element={<ComingSoon />} />
    </Routes>
  );
};

export default App;
