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
          M.S. Student in Intelligence and Information · Seoul National University
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
        I am an HCI researcher and M.S. student at Seoul National University, advised by Prof. Bongwon Suh.
        I work at the intersection of <strong>HCI and AI</strong>, studying how AI systems can support continuity in
        human experience.
      </p>
      <p>
        I am increasingly interested in the computational methods that enable AI to adapt meaningfully to
        individual users at scale. My recent work examines how AI can support human expression and awareness in
        real-world contexts, from AI-mediated narrative writing to experiential simulations that build intuition
        in everyday users.
      </p>
      <p>
        As a next step, I am exploring how to design AI-mediated interventions that shift how people understand
        themselves and their context, and how to build interactive systems that make AI&apos;s interpretation of
        human experience visible and actionable to users.
      </p>
    </div>
  </section>
);

export default HeroSection;
