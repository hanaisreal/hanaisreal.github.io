import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../components/data/projectData';

const categories = ['All', 'HCI', 'NLP', 'Computer Vision', 'Full-Stack', 'Data Science'];

// Projects with an award note
const awards: Record<string, string> = {
  'Reflective Autobiographical System': 'Grand Prize · KAIST Social Impact',
  'Personalized AI Consultation System': 'Top 10 · Upstage AI Challenge',
};

const ProjectsSection: React.FC = () => {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.tags.some((t) => t.includes(active)));

  return (
    <section id="projects">
      <div className="ed-section-rule">
        <div className="ed-section-rule__inner">
          <span className="ed-section-num">§ 05</span>
          <span className="ed-section-label">Projects</span>
          <div className="ed-section-rule__line" />
        </div>
      </div>

      <div className="ed-projects">
        {/* Filter */}
        <div className="ed-projects__filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`ed-projects__filter-btn${active === cat ? ' ed-projects__filter-btn--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="ed-projects__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                className="ed-project"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: 'easeOut' }}
                layout
              >
                <div className="ed-project__num">
                  P.{String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="ed-project__title">{project.title}</h3>
                <p className="ed-project__desc">{project.description}</p>

                <div className="ed-project__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="ed-project__tag">{tag}</span>
                  ))}
                </div>

                <div className="ed-project__links">
                  {project.github && (
                    <a
                      href={project.github}
                      className="ed-project__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.video && (
                    <a
                      href={project.video}
                      className="ed-project__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Demo ↗
                    </a>
                  )}
                  {awards[project.title] && (
                    <span className="ed-project__award">★ {awards[project.title]}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
