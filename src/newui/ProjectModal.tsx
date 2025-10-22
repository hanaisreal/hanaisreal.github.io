import React, { useEffect } from 'react';
import { Project } from '../components/data/projectData';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal hana-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div className="modal__content hana-fade-in" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="modal__close" aria-label="Close project details">
          ×
        </button>
        <h3>{project.title}</h3>
        {project.image && (
          <img src={project.image} alt={project.title} className="modal__media" />
        )}
        {project.video && (
          <video controls className="modal__media">
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <p className="modal__description">{project.description}</p>
        <div className="modal__tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="modal__meta">
          <span className="modal__meta-label">Role:</span>
          <span>{project.role}</span>
        </div>
        {project.github && (
          <a
            className="modal__link"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub →
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
