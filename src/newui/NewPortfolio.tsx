import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ResearchSection from './ResearchSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import './newPortfolio.css';

const NewPortfolio: React.FC = () => (
  <main className="new-portfolio">
    <HeroSection />
    <AboutSection />
    <ResearchSection />
    <ProjectsSection />
    <ContactSection />
  </main>
);

export default NewPortfolio;
