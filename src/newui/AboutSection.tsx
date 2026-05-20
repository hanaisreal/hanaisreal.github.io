import React from 'react';

const AboutSection: React.FC = () => (
  <section id="about">
    <h2 className="sec-heading">About Me</h2>
    <div className="bio">
      <p>
        I am an HCI researcher and M.S. student at Seoul National University, advised by{' '}
        <a
          className="text-link"
          href="https://scholar.google.com/citations?user=-nlhtEkAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prof. Bongwon Suh
        </a>
        . I work at the intersection of <strong>HCI and AI</strong>, studying how AI systems can support continuity in
        human experience.
      </p>
      <p>
        I am increasingly interested in the <strong>computational methods</strong> that enable AI to adapt meaningfully to
        individual users at scale.
      </p>
    </div>
  </section>
);

export default AboutSection;
