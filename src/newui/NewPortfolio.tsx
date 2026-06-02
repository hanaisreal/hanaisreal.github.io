import React from 'react';
import Masthead from './Masthead';
import HeroSection from './HeroSection';
import NewsSection from './NewsSection';
import AboutSection from './AboutSection';
import OngoingResearchSection from './OngoingResearchSection';
import './newPortfolio.css';

const NowSection: React.FC = () => (
  <section id="now">
    <h2 className="sec-heading">Now</h2>
    <div className="now-copy">
      <p>Writing my M.S. thesis on AI-mediated reflection in everyday contexts.</p>
      <p>Taking a seminar on probabilistic models for structured prediction.</p>
      <p>Thinking about what it means for a system to actually understand someone.</p>
    </div>
  </section>
);

const ReadingSection: React.FC = () => (
  <section id="reading">
    <h2 className="sec-heading">Currently Reading</h2>
    <div className="reading-list">
      The Timeless Way of Building — Christopher Alexander<br />
      Mindstorms — Seymour Papert<br />
      Ways of Seeing — John Berger
    </div>
  </section>
);

const NewPortfolio: React.FC = () => (
  <div>
    <Masthead />
    <div className="page">
      <HeroSection />
      <hr className="sec-rule" />
      <div className="intro-flow">
        <NowSection />
        <ReadingSection />
      </div>
      <hr className="sec-rule" />
      <div className="intro-flow">
        <NewsSection />
        <AboutSection />
        <OngoingResearchSection />
      </div>
    </div>
    <footer className="site-footer">
      <span>Hana Oh</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  </div>
);

export default NewPortfolio;
