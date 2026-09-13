import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { pickBackground, BackgroundItem } from './components/data/backgroundsData';
import AnalyticsTracker from './AnalyticsTracker';
import SeoHead from './SeoHead';
import HomePage from './cleanui/HomePage';
import ResearchPage from './cleanui/ResearchPage';
import CollectionsPage from './pages/CollectionsPage';
// import Blog from './pages/Blog';
// import BlogPost from './pages/BlogPost';
import PublicationPage from './pages/PublicationPage';
import ProjectPage from './pages/ProjectPage';
import './cleanui/clean.css';

const App: React.FC = () => {
  const [bg] = useState<BackgroundItem>(() => pickBackground(new Date().getHours()));
  const [bgLoaded, setBgLoaded] = useState(false);
  const location = useLocation();
  const isCollections = location.pathname.startsWith('/collections');

  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setBgLoaded(true);
    img.src = `/pictures/backgrounds/${bg.file}`;
  }, [bg.file]);

  return (
    <>
      <AnalyticsTracker />
      <SeoHead />
      {isCollections && (
        <div
          id="site-bg"
          className={[bgLoaded ? 'is-loaded' : '', 'site-bg--blurred'].join(' ').trim()}
          style={{ backgroundImage: `url('/pictures/backgrounds/${bg.file}')` }}
        />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research" element={<ResearchPage />} />
        {/* <Route path="/essays" element={<Blog />} /> */}
        {/* <Route path="/essays/:slug" element={<BlogPost />} /> */}
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/publications/:slug" element={<PublicationPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </>
  );
};

export default App;
