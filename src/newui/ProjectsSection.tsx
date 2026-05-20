import React from 'react';
import { projects } from '../components/data/projectData';

const awards: Record<string, string> = {
  'Reflective Autobiographical System': 'Grand Prize · KAIST Social Impact',
  'Personalized AI Consultation System': 'Top 10 · Upstage AI Challenge',
};

const renderProject = (project: typeof projects[number]) => (
  <li key={project.title} className={`proj${project.group === 'side' ? ' proj--side' : ''}`}>
    <div className="proj__topline">
      <p className="proj__title">{project.title}</p>
      {project.duration && <span className="proj__duration">{project.duration}</span>}
    </div>
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
);

const ProjectsSection: React.FC = () => {
  const selected = projects.filter((project) => project.group !== 'side');
  const side = projects.filter((project) => project.group === 'side');

  return (
    <section id="projects">
      <h2 className="sec-heading">Selected Projects</h2>
      <ul className="proj-list">
        {selected.map(renderProject)}
      </ul>

      {side.length > 0 && (
        <div className="side-projects">
          <h3 className="side-projects__heading">Side Projects</h3>
          <p className="side-projects__note">
            Earlier engineering and data projects, placed separately from research-facing work.
          </p>
          <ul className="proj-list proj-list--side">
            {side.map(renderProject)}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
