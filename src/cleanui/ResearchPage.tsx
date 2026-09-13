import React from 'react';
import SiteHeader, { SiteFooter } from './SiteHeader';
import PublicationsSection from '../newui/PublicationsSection';
import ProjectsSection from '../newui/ProjectsSection';
import '../newui/newPortfolio.css';
import './clean.css';

const ResearchPage: React.FC = () => (
  <div>
    <SiteHeader />
    <div className="c-sheet">
    <main className="c-main c-main--research">
      <PublicationsSection />
      <ProjectsSection />
    </main>
    </div>
    <SiteFooter />
  </div>
);

export default ResearchPage;
