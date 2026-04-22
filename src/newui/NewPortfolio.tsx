import React from 'react';
import Masthead from './Masthead';
import HeroSection from './HeroSection';
import NewsSection from './NewsSection';
import PublicationsSection from './PublicationsSection';
import ResearchSection from './ResearchSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import './newPortfolio.css';

const NewPortfolio: React.FC = () => (
  <div>
    <Masthead />
    <HeroSection />
    <NewsSection />
    <PublicationsSection />
    <ResearchSection />
    <ProjectsSection />
    <ContactSection />
  </div>
);

export default NewPortfolio;
