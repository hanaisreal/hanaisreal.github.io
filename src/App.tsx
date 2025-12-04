// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewPortfolio from './newui/NewPortfolio';
import Wordbank from './pages/Wordbank';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<NewPortfolio />} />
      <Route path="/wordbank" element={<Wordbank />} />
    </Routes>
  );
};

export default App;
