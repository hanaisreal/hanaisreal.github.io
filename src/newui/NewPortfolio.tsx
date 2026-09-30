import React, { useState, useCallback } from 'react';
import Masthead from './Masthead';
import HeroSection from './HeroSection';
import NewsSection from './NewsSection';
import AboutSection from './AboutSection';
import ResearchOverviewSection from './ResearchOverviewSection';
import { PublicationList } from './WorkList';
import SplashScreen from './SplashScreen';
import { BackgroundItem } from '../components/data/backgroundsData';
import './newPortfolio.css';


interface Props {
  bg: BackgroundItem;
}

let splashAlreadyShown = false;

const NewPortfolio: React.FC<Props> = ({ bg }) => {
  const [splashDone, setSplashDone] = useState(splashAlreadyShown);
  const handleSplashDone = useCallback(() => {
    splashAlreadyShown = true;
    setSplashDone(true);
  }, []);

  return (
    <div>
      {!splashDone && (
        <SplashScreen bg={bg} onDone={handleSplashDone} />
      )}
      <Masthead />
      <div className="page page--home page--home--paper">
        <HeroSection />
        <hr className="sec-rule" />
        <div className="intro-flow">
          <NewsSection />
          <ResearchOverviewSection />
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
