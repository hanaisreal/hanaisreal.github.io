import React, { useState } from 'react';
import HeroSection from './HeroSection';
import ResearchSection from './ResearchSection';
import PublicationsSection from './PublicationsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import ChristmasToggle from './ChristmasToggle';
import './newPortfolio.css';

const NewPortfolio: React.FC = () => {
  const [isChristmasTheme, setIsChristmasTheme] = useState(false);

  return (
    <main className={`new-portfolio ${isChristmasTheme ? 'christmas-theme' : ''}`}>
      <ChristmasToggle onToggle={setIsChristmasTheme} />
      <HeroSection isChristmasTheme={isChristmasTheme} />
      <PublicationsSection />
      <ResearchSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
};

export default NewPortfolio;
