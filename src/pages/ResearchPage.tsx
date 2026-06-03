import React from 'react';
import Masthead from '../newui/Masthead';
import PublicationsSection from '../newui/PublicationsSection';
import ProjectsSection from '../newui/ProjectsSection';
import '../newui/newPortfolio.css';

const ResearchPage: React.FC = () => (
  <div>
    <Masthead />
    <div className="page">
      <PublicationsSection />
      <hr className="sec-rule" />
      <ProjectsSection />
    </div>
    <footer className="site-footer">
      <span>Hana Oh</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  </div>
);

export default ResearchPage;
