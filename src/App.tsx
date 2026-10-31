import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
