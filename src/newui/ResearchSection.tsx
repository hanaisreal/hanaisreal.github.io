import React from 'react';
import { researchExperiences } from '../components/data/researchData';

const ResearchSection: React.FC = () => (
  <section id="research" className="hana-section hana-section--white">
    <div className="section-inner research">
      <div className="research__intro">
        <span className="section-eyebrow text-themePurple">
          Research
        </span>
        <h2>
          Translating qualitative insight into compassionate technology
        </h2>
        <p>
          From identity transitions to student counseling, my research explores how we can use AI respectfully.
          I lean on interviews, affinity diagramming, and rapid prototyping to uncover the human motivation behind
          every dataset.
        </p>
      </div>

      <div className="research__grid">
        {researchExperiences.map((experience) => (
          <article key={experience.title} className="research__card hana-card-hover">
            <div className="research__card-heading">
              <h3>{experience.title}</h3>
              <span>{experience.duration}</span>
            </div>
            <p>{experience.description}</p>
            <div className="research__tags">
              {experience.keyTechnologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <p className="research__advisor">Advisor: {experience.advisor}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ResearchSection;
