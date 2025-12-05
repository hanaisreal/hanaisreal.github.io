// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewPortfolio from './newui/NewPortfolio';
import ComingSoon from './pages/ComingSoon';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<NewPortfolio />} />
      <Route path="/wordbank" element={<ComingSoon />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
    </Routes>
  );
};

export default App;
