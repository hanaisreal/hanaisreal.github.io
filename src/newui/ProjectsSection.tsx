import React from 'react';
import { projects } from '../components/data/projectData';

const awards: Record<string, string> = {
  'Reflective Autobiographical System': 'Grand Prize · KAIST Social Impact',
  'Personalized AI Consultation System': 'Top 10 · Upstage AI Challenge',
};

const ProjectsSection: React.FC = () => (
  <section id="projects">
    <h2 className="sec-heading">Projects</h2>
    <ul className="proj-list">
      {projects.map((project) => (
        <li key={project.title} className="proj">
          <p className="proj__title">{project.title}</p>
          <p className="proj__desc">{project.description}</p>
          <div className="proj__footer">
            {project.github && (
              <a
                href={project.github}
                className="proj__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            )}
            {project.video && (
              <a
                href={project.video}
                className="proj__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo ↗
              </a>
            )}
            {awards[project.title] && (
              <span className="proj__award">★ {awards[project.title]}</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default ProjectsSection;
