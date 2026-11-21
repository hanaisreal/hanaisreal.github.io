import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AnalyticsTracker from './AnalyticsTracker';
import SeoHead from './SeoHead';
import NewPortfolio from './newui/NewPortfolio';
import ResearchPage from './pages/ResearchPage';
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
      {/* Blog is hidden for now: its pages send visitors home. To bring it back,
          route /blog to <Blog /> and /blog/:slug to <BlogPost /> from ./pages. */}
      <Route path="/blog/*" element={<Navigate to="/" replace />} />
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
