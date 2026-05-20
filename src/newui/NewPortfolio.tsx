import React from 'react';
import Masthead from './Masthead';
import HeroSection from './HeroSection';
import PretextCurrentWork from './PretextCurrentWork';
import NewsSection from './NewsSection';
import PublicationsSection from './PublicationsSection';
import ResearchSection from './ResearchSection';
import ProjectsSection from './ProjectsSection';
import './newPortfolio.css';

const NewPortfolio: React.FC = () => (
  <div>
    <Masthead />
    <div className="page">
      <HeroSection />
      <PretextCurrentWork />
      <hr className="sec-rule" />
      <NewsSection />
      <hr className="sec-rule" />
      <PublicationsSection />
      <hr className="sec-rule" />
      <ResearchSection />
      <hr className="sec-rule" />
      <ProjectsSection />
    </div>
    <footer className="site-footer">
      <span>Hana Oh</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  </div>
);

export default NewPortfolio;
