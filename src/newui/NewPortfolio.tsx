import React, { useState, useCallback } from 'react';
import Masthead from './Masthead';
import HeroSection from './HeroSection';
import NewsSection from './NewsSection';
import AboutSection from './AboutSection';
import SplashScreen from './SplashScreen';
import { BackgroundItem } from '../components/data/backgroundsData';
import './newPortfolio.css';


interface Props {
  bg: BackgroundItem;
}

type HomeSurface = 'photo' | 'paper';

const HOME_SURFACE_KEY = 'hana-oh-home-surface';

let splashAlreadyShown = false;

const NewPortfolio: React.FC<Props> = ({ bg }) => {
  const [splashDone, setSplashDone] = useState(splashAlreadyShown);
  const [surface, setSurface] = useState<HomeSurface>(() => {
    try {
      return window.localStorage.getItem(HOME_SURFACE_KEY) === 'paper' ? 'paper' : 'photo';
    } catch {
      return 'photo';
    }
  });

  const handleSplashDone = useCallback(() => {
    splashAlreadyShown = true;
    setSplashDone(true);
  }, []);

  const handleSurfaceChange = useCallback((nextSurface: HomeSurface) => {
    setSurface(nextSurface);
    try {
      window.localStorage.setItem(HOME_SURFACE_KEY, nextSurface);
    } catch {
      // The preference still works for this visit when storage is unavailable.
    }
  }, []);

  return (
    <div>
      {!splashDone && (
        <SplashScreen bg={bg} onDone={handleSplashDone} />
      )}
      <Masthead />
      <div className={`page page--home page--home--${surface}`}>
        <div className="surface-picker" role="group" aria-label="Homepage background">
          <span className="surface-picker__label">Background</span>
          <button
            type="button"
            className="surface-picker__option"
            aria-pressed={surface === 'photo'}
            onClick={() => handleSurfaceChange('photo')}
          >
            Photo
          </button>
          <button
            type="button"
            className="surface-picker__option"
            aria-pressed={surface === 'paper'}
            onClick={() => handleSurfaceChange('paper')}
          >
            Paper
          </button>
        </div>
        <HeroSection />
        <hr className="sec-rule" />
        <div className="intro-flow">
          <NewsSection />
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
