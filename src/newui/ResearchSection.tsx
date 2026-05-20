import React from 'react';
import { researchExperiences } from '../components/data/researchData';

const ResearchSection: React.FC = () => (
  <section id="research">
    <h2 className="sec-heading">Research Experience</h2>
    <ul className="exp-list">
      {researchExperiences.map((exp) => (
        <li key={exp.lab} className="exp">
          <div className="exp__top">
            <span className="exp__lab">{exp.lab}</span>
            <span className="exp__period">{exp.overallDuration}</span>
          </div>
          <p className="exp__sub">{exp.role} · {exp.advisor} · {exp.institution}</p>
          {exp.projects.map((proj) => (
            <div key={proj.projectTitle}>
              <p className="exp__proj-title">{proj.projectTitle}</p>
              <p className="exp__proj-desc">{proj.description}</p>
            </div>
          ))}
        </li>
      ))}
    </ul>
  </section>
);

export default ResearchSection;
