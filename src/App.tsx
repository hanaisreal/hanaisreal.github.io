// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewPortfolio from './newui/NewPortfolio';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<NewPortfolio />} />
      {/* <Route path="/wordbank" element={<ComingSoon />} /> */}
      {/* <Route path="/blog" element={<Blog />} /> */}
      {/* <Route path="/blog/:id" element={<BlogPost />} /> */}
    </Routes>
  );
};

export default App;
