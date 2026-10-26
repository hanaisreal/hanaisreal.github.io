import React, { Suspense, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { pickBackground, BackgroundItem } from './components/data/backgroundsData';
import AnalyticsTracker from './AnalyticsTracker';
import SeoHead from './SeoHead';
import NewPortfolio from './newui/NewPortfolio';
import ResearchPage from './pages/ResearchPage';
import CollectionsPage from './pages/CollectionsPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PublicationPage from './pages/PublicationPage';
import ProjectPage from './pages/ProjectPage';

// Under `npm start` the page editor (floating toolbar + editable fields) wraps
// every route; the built site never includes it.
const EditHost = process.env.NODE_ENV === 'development' ? React.lazy(() => import('./newui/edit/EditHost')) : null;

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

  const routes = (
    <Routes>
      <Route path="/" element={<NewPortfolio />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/projects" element={<Navigate to="/research" replace />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/publications/:slug" element={<PublicationPage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

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
      {EditHost ? (
        <Suspense fallback={null}>
          <EditHost>{routes}</EditHost>
        </Suspense>
      ) : (
        routes
      )}
    </>
  );
};

export default App;
