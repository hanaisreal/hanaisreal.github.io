import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewPortfolio from './newui/NewPortfolio';
import ResearchPage from './pages/ResearchPage';
import PhotosPage from './pages/PhotosPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<NewPortfolio />} />
    <Route path="/research" element={<ResearchPage />} />
    <Route path="/essays" element={<Blog />} />
    <Route path="/essays/:slug" element={<BlogPost />} />
    <Route path="/photos" element={<PhotosPage />} />
  </Routes>
);

export default App;
