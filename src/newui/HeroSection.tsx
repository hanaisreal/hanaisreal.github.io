import React from 'react';

const HeroSection: React.FC = () => (
  <section id="home">
    <div className="profile">
      <img
        className="profile__img"
        src={`${process.env.PUBLIC_URL}/pictures/profile.jpeg`}
        alt="Hana Oh"
      />
      <div>
        <h1 className="profile__name">Hana Oh</h1>
        <p className="profile__affil">
          HCI Researcher · Seoul National University
        </p>
        <div className="profile__links">
          <a className="profile__link" href="mailto:hana2001@snu.ac.kr">Email</a>
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

    <div className="bio">
      <p>
        I am an HCI researcher at Seoul National University (B.S. Computer Science &amp; Business Administration).
        My research focuses on <strong>human–AI interaction</strong>, educational technology, and digital resilience —
        designing AI systems that augment rather than replace human agency.
      </p>
      <p>
        I am interested in how people think and make decisions alongside AI, and how we can build
        interfaces that preserve human autonomy and critical thinking.
      </p>
    </div>
  </section>
);

export default HeroSection;
