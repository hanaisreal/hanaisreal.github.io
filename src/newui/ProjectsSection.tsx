import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, Project } from '../components/data/projectData';
import ProjectModal from './ProjectModal';

const filterCategories = [
  'All',
  'HCI',
  'NLP',
  'Computer Vision',
  'User Research',
  'Cultural Computing',
  'Social Computing'
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    return project.tags.includes(activeFilter);
  });

  return (
    <motion.section
      id="projects"
      className="hana-section hana-section--light projects"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="projects__sheen projects__sheen--pink" aria-hidden="true" />
      <div className="projects__sheen projects__sheen--mint" aria-hidden="true" />

      <div className="section-inner projects__inner">
        <motion.div className="projects__intro" variants={sectionVariants}>
          <span className="section-eyebrow text-themePink">Projects</span>
          <h2>Additional Projects</h2>
          <p>
            Research investigating how people interact with AI systems, examining trust, agency, and cultural factors
            that shape human-AI collaboration across diverse contexts and communities.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {filterCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`projects__filter ${activeFilter === category ? 'projects__filter--active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects List */}
        <div className="projects__list">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              className="projects__item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <div className="projects__item-media">
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
                <div className="projects__item-overlay">
                  <button
                    className="projects__item-btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="projects__item-content">
                <div className="projects__item-header">
                  {project.duration && (
                    <span className="projects__item-duration">{project.duration}</span>
                  )}
                  <h3>{project.title}</h3>
                </div>

                <p className="projects__item-description">
                  {project.description}
                </p>

                <div className="projects__item-footer">
                  <div className="projects__item-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="projects__item-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="projects__item-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__item-link"
                        title="View on GitHub"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    <button
                      className="projects__item-cta"
                      onClick={() => setSelectedProject(project)}
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </motion.section>
  );
};

export default ProjectsSection;
