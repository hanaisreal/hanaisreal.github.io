import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../components/data/projectData';

interface ProjectsSectionProps {
  onOpen?: (path: string, rect: DOMRect) => void;
}

function getProjectRibbonLabel(project: typeof projects[number]) {
  if (project.duration) return project.duration;
  return project.tags.slice(0, 2).join(' · ');
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpen }) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (!onOpen) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onOpen(path, event.currentTarget.getBoundingClientRect());
  };

  return (
    <section
      id="projects"
      className="projects-section"
      data-analytics-section="research_projects"
    >
      <h2 className="sec-heading">Projects</h2>
      <div className="project-notes">
        {projects.map(project => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="project-note"
            onClick={(event) => handleClick(event, `/projects/${project.slug}`)}
            data-analytics-event="project_open"
            data-analytics-item-id={project.slug}
            data-analytics-item-name={project.title}
            data-analytics-placement="projects_list"
          >
            <div className="project-note__ribbon" aria-label={getProjectRibbonLabel(project)}>
              <span className="project-note__ribbon-text">{getProjectRibbonLabel(project)}</span>
            </div>
            <div className="project-note__body">
              <h3 className="project-note__title">{project.title}</h3>
              <p className="project-note__meta">{project.tags.join(' · ')}</p>
              <p className="project-note__summary">{project.tldr}</p>
              {project.image && (
                <figure className="project-note__figure">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="project-note__image"
                    loading="lazy"
                  />
                </figure>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
