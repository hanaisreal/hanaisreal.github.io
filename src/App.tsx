// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';  // Remove BrowserRouter import
import NewPortfolio from './newui/NewPortfolio';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<NewPortfolio />} />
    </Routes>
  );
};

export default App;
