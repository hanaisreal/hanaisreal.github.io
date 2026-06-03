import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../components/data/projectData';

const ProjectsSection: React.FC = () => (
  <section id="projects">
    <h2 className="sec-heading">Projects</h2>
    <div className="research-cards">
      {projects.map(project => (
        <Link key={project.slug} to={`/projects/${project.slug}`} className="research-card">
          <div
            className="research-card__img"
            style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}
          />
          <div className="research-card__body">
            <div className="research-card__meta">
              {project.tags.slice(0, 2).map(t => (
                <span key={t} className="essay-tag">{t}</span>
              ))}
              {project.duration && (
                <span className="research-card__year">{project.duration}</span>
              )}
            </div>
            <p className="research-card__title">{project.title}</p>
            <p className="research-card__desc">{project.tldr}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default ProjectsSection;
