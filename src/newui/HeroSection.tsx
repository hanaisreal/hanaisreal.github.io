import React from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const bodyVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const HeroSection: React.FC = () => (
  <motion.section
    className="hero"
    id="home"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <div className="hero__inner">
      <motion.header className="hero__header" variants={headerVariants}>
        <h1>Hana Oh</h1>
        <p className="hero__subtitle">
          Computer Science & Business Student • HCI Researcher
        </p>
        <Navigation />
      </motion.header>

      <hr className="hero__divider" />

      <motion.div className="hero__body" variants={bodyVariants}>
        <motion.figure
          className="hero__portrait"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/pictures/profile.jpeg`}
            alt="Hana Oh"
          />
        </motion.figure>

        <motion.div className="hero__copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>HCI researcher interested in human-AI collaboration</h2>
          <p>
            My research lies at the intersection of human-computer interaction and artificial intelligence. I'm interested in understanding how people interact with AI systems and designing interfaces that preserve human agency in collaborative workflows.
          </p>
          <p>
            My work examines large-scale interaction patterns, personalized AI interventions for digital resilience, and perspective-taking in conversational systems.
          </p>
          <ul className="hero__highlights">
            <li>Research experience across HCI labs at KAIST and Seoul National University.</li>
            <li>Work with large-scale interaction data and mixed-method user studies.</li>
            <li>Focus on deepfake detection, conversational AI, and perspective-taking systems.</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  </motion.section>
);

export default HeroSection;
