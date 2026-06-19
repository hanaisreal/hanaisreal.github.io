import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { pickBackground, BackgroundItem } from './components/data/backgroundsData';
import NewPortfolio from './newui/NewPortfolio';
import ResearchPage from './pages/ResearchPage';
import CollectionsPage from './pages/CollectionsPage';
import WorldPage from './pages/WorldPage';
// import Blog from './pages/Blog';
// import BlogPost from './pages/BlogPost';
import PublicationPage from './pages/PublicationPage';
import ProjectPage from './pages/ProjectPage';

const App: React.FC = () => {
  const [bg] = useState<BackgroundItem>(() => pickBackground(new Date().getHours()));
  const [bgLoaded, setBgLoaded] = useState(false);

  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setBgLoaded(true);
    img.src = `/pictures/backgrounds/${bg.file}`;
  }, [bg.file]);

  return (
    <>
      <div
        id="site-bg"
        className={bgLoaded ? 'is-loaded' : ''}
        style={{ backgroundImage: `url('/pictures/backgrounds/${bg.file}')` }}
      />
      <Routes>
        <Route path="/" element={<NewPortfolio bg={bg} />} />
        <Route path="/research" element={<ResearchPage />} />
        {/* <Route path="/essays" element={<Blog />} /> */}
        {/* <Route path="/essays/:slug" element={<BlogPost />} /> */}
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/world" element={<WorldPage />} />
        <Route path="/publications/:slug" element={<PublicationPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </>
  );
};

export default App;
