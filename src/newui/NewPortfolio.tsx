import React, { useState } from 'react';
import HeroSection from './HeroSection';
import ResearchSection from './ResearchSection';
import PublicationsSection from './PublicationsSection';
import ProjectsSection from './ProjectsSection';
// import BlogPostsSection from './BlogPostsSection';
import ContactSection from './ContactSection';
import ChristmasToggle from './ChristmasToggle';
import StickyHeader from './StickyHeader';
import ChristmasEasterEgg from './ChristmasEasterEgg';
import './newPortfolio.css';

const NewPortfolio: React.FC = () => {
  const [isChristmasTheme, setIsChristmasTheme] = useState(false);

  return (
    <main className={`new-portfolio ${isChristmasTheme ? 'christmas-theme' : ''}`}>
      <StickyHeader />
      <ChristmasToggle onToggle={setIsChristmasTheme} />
      {isChristmasTheme && <ChristmasEasterEgg />}
      <HeroSection isChristmasTheme={isChristmasTheme} />
      <PublicationsSection />
      <ResearchSection />
      <ProjectsSection />
      {/* <BlogPostsSection /> */}
      <ContactSection />
    </main>
  );
};

export default NewPortfolio;
