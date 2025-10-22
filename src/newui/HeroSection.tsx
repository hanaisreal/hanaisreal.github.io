import React from 'react';
import Navigation from './Navigation';

const HeroSection: React.FC = () => (
  <section className="hero hero--dark" id="home">
    <div className="hero__bar" />
    <div className="hero__pattern hero__pattern--left" aria-hidden="true" />
    <div className="hero__pattern hero__pattern--right" aria-hidden="true" />
    <div className="hero__orb hero__orb--mint" aria-hidden="true" />
    <div className="hero__orb hero__orb--pink" aria-hidden="true" />

    <div className="hero__content hana-fade-in">
      <div className="hero__identity">
        <span>HANA</span>
        <span>OH</span>
        <span>PORT-</span>
        <span>FOLIO</span>
      </div>
      <div className="hero__copy">
        <Navigation />
        <h1>Designer &amp; Developer exploring humane AI experiences</h1>
        <p>
          I’m Hana Oh, a Computer Science and Business Administration student at Seoul National University.
          With an international upbringing across China and Indonesia, I combine cultural empathy with technical
          rigor to craft meaningful human-computer interactions. My work spans AI-powered storytelling, medical
          imaging tools, and data-driven services that support real people in moments that matter.
        </p>
        <p>
          Currently, I’m focused on blending human-centered research with intelligent systems design, building
          interfaces that feel supportive, conversational, and trustworthy—whether that’s empowering seniors to
          capture life stories or helping students receive compassionate feedback from AI collaborators.
        </p>
      </div>
      <div className="hero__stats">
        <div className="hero__chip">
          <span className="hero__chip-dot" />
          HCI&nbsp;Researcher
        </div>
        <div className="hero__chip">
          <span className="hero__chip-dot hero__chip-dot--mint" />
          AI&nbsp;+&nbsp;Empathy
        </div>
        <div className="hero__chip">
          <span className="hero__chip-dot hero__chip-dot--blue" />
          Design Systems
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
