import React from 'react';

const AboutSection: React.FC = () => (
  <section id="about" className="hana-section hana-section--light">
    <div className="section-inner section-grid-two">
      <div className="about__intro">
        <span className="section-eyebrow text-themePurple">
          About
        </span>
        <h2>
          Building thoughtful technology with a human heartbeat
        </h2>
        <p>
          I thrive at the intersection of human narratives and intelligent systems.
          My academic journey at Seoul National University across Computer Science and Business Administration
          lets me think holistically—bridging user needs, technical feasibility, and responsible innovation.
        </p>
        <p>
          Most recently, I&apos;ve been prototyping conversational AI companions, accessible voice interfaces,
          and computer vision tools that respect context and support agency. I love collaborating with diverse teams
          where research insights turn into crafted experiences.
        </p>
      </div>

      <div className="about__focus-card">
        <h3>Focus areas</h3>
        <ul>
          <li>
            <span>01</span>
            <div>
              <h4>Human–AI Interaction</h4>
              <p>
                Designing AI-driven tools that communicate clearly, respect emotion, and adapt to real-world
                constraints—whether through voice, text, or visual cues.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h4>Learning &amp; Support Systems</h4>
              <p>
                Crafting interactive experiences that empower students, educators, and lifelong learners with
                feedback loops that feel human.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h4>Cultural Intelligence</h4>
              <p>
                Infusing international perspectives from growing up in China and Indonesia to make products that
                resonate beyond borders.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default AboutSection;
