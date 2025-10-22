import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, Project } from '../components/data/projectData';
import ProjectModal from './ProjectModal';

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
          <h2>Featured collaborations and experiments</h2>
          <p>
            Each project is a conversation—between data and people, ambition and constraint.
            Here are a few that taught me how empathy and engineering can amplify one another.
          </p>
        </motion.div>

        <motion.div className="projects__grid" variants={gridVariants}>
          {projects.map((project) => (
            <motion.button
              type="button"
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="projects__card hana-card-hover"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
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
            </motion.button>
          ))}
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </motion.section>
  );
};

export default ProjectsSection;
