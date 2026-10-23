import React, { useState, useCallback } from 'react';
import Masthead from './Masthead';
import { ProfileCard, Bio } from './HeroSection';
import NewsSection from './NewsSection';
import AboutSection from './AboutSection';
import { PublicationList } from './WorkList';
import SplashScreen from './SplashScreen';
import { BackgroundItem } from '../components/data/backgroundsData';
import './newPortfolio.css';


interface Props {
  bg: BackgroundItem;
}

// The greeting splash plays once per browser: after it has been seen, a flag
// in localStorage skips it on later visits and page loads. If storage is
// unavailable (private mode, blocked), it still plays only once per load.
const SPLASH_SEEN_KEY = 'hana_splash_seen';
let splashAlreadyShown = false;

const splashSeen = () => {
  if (splashAlreadyShown) return true;
  try {
    return localStorage.getItem(SPLASH_SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

const NewPortfolio: React.FC<Props> = ({ bg }) => {
  const [splashDone, setSplashDone] = useState(splashSeen);
  const handleSplashDone = useCallback(() => {
    splashAlreadyShown = true;
    try {
      localStorage.setItem(SPLASH_SEEN_KEY, '1');
    } catch {
      // Not remembered across loads; fine.
    }
    setSplashDone(true);
  }, []);

  return (
    <div>
      {!splashDone && (
        <SplashScreen bg={bg} onDone={handleSplashDone} />
      )}
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
