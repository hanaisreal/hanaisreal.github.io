import React from 'react';
import { motion } from 'framer-motion';
import { researchExperiences } from '../components/data/researchData';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const ResearchSection: React.FC = () => (
  <motion.section
    id="research"
    className="hana-section hana-section--light research-timeline"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="section-inner research">
      <motion.div className="research__intro" variants={sectionVariants}>
        <span className="section-eyebrow text-themePurple">
          Research
        </span>
        <h2>
          Research Experiences
        </h2>
        <p>
          During my studies at Seoul National University, I conducted research focusing on human-AI interaction patterns and system design.
        </p>
      </motion.div>

      <div className="timeline">
        <div className="timeline__line"></div>
        {researchExperiences.map((experience, index) => (
          <motion.article
            key={experience.title}
            className="timeline__item"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="timeline__marker"></div>
            <div className="timeline__content">
              <div className="timeline__header">
                <h3>{experience.title}</h3>
                <span className="timeline__duration">{experience.duration}</span>
              </div>
              <p className="timeline__description">{experience.description}</p>
              <div className="timeline__tags">
                {experience.keyTechnologies.map((tech) => (
                  <span key={tech} className="timeline__tag">{tech}</span>
                ))}
              </div>
              <p className="timeline__advisor">Advisor: {experience.advisor}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </motion.section>
);

export default ResearchSection;
