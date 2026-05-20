import React from 'react';
import Masthead from './Masthead';
import HeroSection from './HeroSection';
import NewsSection from './NewsSection';
import AboutSection from './AboutSection';
import OngoingResearchSection from './OngoingResearchSection';
import PublicationsSection from './PublicationsSection';
import ProjectsSection from './ProjectsSection';
import './newPortfolio.css';

const NewPortfolio: React.FC = () => (
  <div>
    <Masthead />
    <div className="page">
      <HeroSection />
      <hr className="sec-rule" />
      <div className="intro-flow">
        <NewsSection />
        <AboutSection />
        <OngoingResearchSection />
      </div>
      <hr className="sec-rule" />
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

export default NewPortfolio;
