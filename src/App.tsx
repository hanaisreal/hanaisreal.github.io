import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { pickBackground, BackgroundItem } from './components/data/backgroundsData';
import AnalyticsTracker from './AnalyticsTracker';
import SeoHead from './SeoHead';
import NewPortfolio from './newui/NewPortfolio';
import ProjectsPage from './pages/ProjectsPage';
import CollectionsPage from './pages/CollectionsPage';
// Blog is hidden until the posts are revised.
// import Blog from './pages/Blog';
// import BlogPost from './pages/BlogPost';
import PublicationPage from './pages/PublicationPage';
import ProjectPage from './pages/ProjectPage';

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
      <div
        id="site-bg"
        className={[
          bgLoaded ? 'is-loaded' : '',
          isCollections ? 'site-bg--blurred' : '',
        ].join(' ').trim()}
        style={{ backgroundImage: `url('/pictures/backgrounds/${bg.file}')` }}
      />
      <Routes>
        <Route path="/" element={<NewPortfolio bg={bg} />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/research" element={<Navigate to="/projects" replace />} />
        {/* <Route path="/blog" element={<Blog />} /> */}
        {/* <Route path="/blog/:slug" element={<BlogPost />} /> */}
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/publications/:slug" element={<PublicationPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
