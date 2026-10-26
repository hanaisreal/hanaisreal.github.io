import React from 'react';
import Masthead from './Masthead';
import { ProfileCard, Bio } from './HeroSection';
import NewsSection from './NewsSection';
import AboutSection from './AboutSection';
import { PublicationList } from './WorkList';
import './newPortfolio.css';


const NewPortfolio: React.FC = () => {
  return (
    <div>
      <Masthead />
      <div className="page page--home page--home--paper home-grid">
        <aside className="home-grid__side">
          <ProfileCard />
        </aside>
        <aside className="home-grid__news">
          <NewsSection />
        </aside>
        <div className="home-grid__main">
          <Bio />
          <PublicationList />
          <AboutSection />
        </div>
      </div>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default NewPortfolio;
