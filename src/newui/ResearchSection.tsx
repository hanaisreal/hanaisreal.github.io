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
    className="hana-section hana-section--white"
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
          Translating qualitative insight into compassionate technology
        </h2>
        <p>
          From identity transitions to student counseling, my research explores how we can use AI respectfully.
          I lean on interviews, affinity diagramming, and rapid prototyping to uncover the human motivation behind
          every dataset.
        </p>
      </motion.div>

      <motion.div
        className="research__grid"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {researchExperiences.map((experience) => (
          <motion.article
            key={experience.title}
            className="research__card hana-card-hover"
            variants={cardVariants}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="research__card-heading">
              <h3>{experience.title}</h3>
              <span>{experience.duration}</span>
            </div>
            <p>{experience.description}</p>
            <div className="research__tags">
              {experience.keyTechnologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <p className="research__advisor">Advisor: {experience.advisor}</p>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </motion.section>
);

export default ResearchSection;
