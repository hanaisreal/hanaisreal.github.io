import React, { useState } from 'react';
import { projects, Project } from '../components/data/projectData';
import ProjectModal from './ProjectModal';

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="hana-section hana-section--light projects">
      <div className="projects__sheen projects__sheen--pink" aria-hidden="true" />
      <div className="projects__sheen projects__sheen--mint" aria-hidden="true" />

      <div className="section-inner projects__inner">
        <div className="projects__intro">
          <span className="section-eyebrow text-themePink">Projects</span>
          <h2>Featured collaborations and experiments</h2>
          <p>
            Each project is a conversation—between data and people, ambition and constraint.
            Here are a few that taught me how empathy and engineering can amplify one another.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project) => (
            <button
              type="button"
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="projects__card hana-card-hover"
            >
              {project.image && (
                <img src={project.image} alt={project.title} loading="lazy" />
              )}
              {project.video && (
                <video
                  muted
                  loop
                  playsInline
                  onMouseEnter={(event) => event.currentTarget.play()}
                  onMouseLeave={(event) => event.currentTarget.pause()}
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              )}
              <div className="projects__card-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="projects__tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default ProjectsSection;
