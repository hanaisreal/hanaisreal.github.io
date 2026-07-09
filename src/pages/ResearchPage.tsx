import React from 'react';
import Masthead from '../newui/Masthead';
import PublicationsSection from '../newui/PublicationsSection';
import ProjectsSection from '../newui/ProjectsSection';
import '../newui/newPortfolio.css';

const ResearchPage: React.FC = () => (
  <div>
    <Masthead />
    <div className="page">
      <header className="page-intro">
        <h1 className="page-intro__title">Research</h1>
        <p className="page-intro__desc">
          Publications and projects in HCI, human-AI interaction, educational AI,
          cybersecurity awareness, and interactive systems.
        </p>
      </header>
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
