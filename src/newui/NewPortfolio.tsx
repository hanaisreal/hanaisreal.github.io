import React from 'react';
import { HomeHero } from './HeroSection';
import NewsSection, { SideSections } from './NewsSection';
import { ProjectStrip, PublicationCards } from './WorkList';
import './newPortfolio.css';


const NewPortfolio: React.FC = () => {
  return (
    <div>
      <div className="page page--home page--home--paper home-ac">
        <HomeHero />
        <PublicationCards />
        <div className="home-ac__cols">
          <NewsSection />
          <aside className="home-ac__side">
            <SideSections />
          </aside>
        </div>
        <ProjectStrip />
      </div>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default NewPortfolio;
