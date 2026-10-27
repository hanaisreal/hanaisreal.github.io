import React from 'react';
import Masthead from './Masthead';
import { HomeHero } from './HeroSection';
import NewsSection, { SideSections } from './NewsSection';
import AboutSection from './AboutSection';
import { PublicationCards } from './WorkList';
import './newPortfolio.css';


const NewPortfolio: React.FC = () => {
  return (
    <div>
      <Masthead />
      <div className="page page--home page--home--paper home-ac">
        <HomeHero />
        <PublicationCards />
        <div className="home-ac__cols">
          <NewsSection />
          <aside className="home-ac__side">
            <SideSections />
          </aside>
        </div>
        <AboutSection />
      </div>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default NewPortfolio;
