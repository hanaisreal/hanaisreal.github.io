import React from 'react';
import Masthead from '../newui/Masthead';
import PublicationsSection from '../newui/PublicationsSection';
import ProjectsSection from '../newui/ProjectsSection';
import ResearchEssay from '../newui/research-canvas/ResearchEssay';
import '../newui/newPortfolio.css';
import '../newui/research-canvas/researchMap.css';

const ResearchPage: React.FC = () => (
  <div>
    <Masthead />
    <main className="page page--publication page--research-sheet">
      <header className="page-intro">
        <h1 className="page-intro__title">Research</h1>
        <p className="page-intro__desc">
          Toward personalized AI agents that accurately capture intent and persistently
          preserve context.
        </p>
      </header>
      <ResearchEssay />
      <hr className="sec-rule" />
      <PublicationsSection />
      <hr className="sec-rule" />
      <ProjectsSection />
    </main>
    <footer className="site-footer">
      <span>Hana Oh</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  </div>
);

export default ResearchPage;
