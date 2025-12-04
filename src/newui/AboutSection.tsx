import React from 'react';
import { motion } from 'framer-motion';
import ResearchInterestsViz from './ResearchInterestsViz';

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.6, ease: 'easeOut' },
  },
};

const AboutSection: React.FC = () => (
  <motion.section
    id="about"
    className="hana-section hana-section--light"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="section-inner section-grid-two">
      <motion.div className="about__intro" variants={sectionVariants}>
        <span className="section-eyebrow text-themePurple">
          About
        </span>
        <h2>
          Research at the intersection of HCI and AI
        </h2>
        <p>
          My research focuses on understanding how people interact with AI systems and designing interfaces that support
          rather than replace human reasoning.
        </p>
        <p>
          Through work across multiple research labs, I've analyzed large-scale interaction data, designed personalized
          AI interventions, and investigated how conversational systems can support perspective-taking and reasoning.
          I recently graduated from Seoul National University with a B.S. in Computer Science and Business Administration.
        </p>
      </motion.div>

      <motion.div className="about__focus-card" variants={cardVariants}>
        <ResearchInterestsViz />

        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
          My research interests are broad, but they all tie to advancing human capabilities through
          thoughtful AI design that preserves agency and supports critical thinking.
        </p>
      </motion.div>
    </div>
  </motion.section>
);

export default AboutSection;
