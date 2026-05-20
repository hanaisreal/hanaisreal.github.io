import React from 'react';
import AmbientHeroBackground from './AmbientHeroBackground';

const HeroSection: React.FC = () => (
  <section id="home" className="hero-shell">
    <AmbientHeroBackground />
    <div className="profile">
      <img
        className="profile__img"
        src={`${process.env.PUBLIC_URL}/pictures/profile.jpeg`}
        alt="Hana Oh"
      />
      <div>
        <h1 className="profile__name">Hana Oh</h1>
        <p className="profile__affil">
          M.S. Student in Intelligence and Information · Seoul National University
        </p>
        <div className="profile__links">
          <a className="profile__link" href="mailto:hana2001@snu.ac.kr">hana2001@snu.ac.kr</a>
          <a
            className="profile__link"
            href={`${process.env.PUBLIC_URL}/HanaOh_CV_260519.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
          <a
            className="profile__link"
            href="https://github.com/hanaisreal"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="profile__link"
            href="https://linkedin.com/in/hana-oh-921945290/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
