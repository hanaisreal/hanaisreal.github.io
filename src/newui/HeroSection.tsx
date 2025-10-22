import React from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const identityVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const copyVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.35,
      duration: 0.75,
      ease: 'easeOut',
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
      delay: 0.55,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const HeroSection: React.FC = () => (
  <motion.section
    className="hero hero--dark"
    id="home"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <div className="hero__bar" />
    <div className="hero__pattern hero__pattern--left" aria-hidden="true" />
    <div className="hero__pattern hero__pattern--right" aria-hidden="true" />
    <div className="hero__orb hero__orb--mint" aria-hidden="true" />
    <div className="hero__orb hero__orb--pink" aria-hidden="true" />

    <div className="hero__content hana-fade-in">
      <motion.div className="hero__identity" variants={identityVariants}>
        <div className="hero__portrait">
          <span className="hero__portrait-glow" />
          <img
            src={`${process.env.PUBLIC_URL}/pictures/profile.jpeg`}
            alt="Hana Oh portrait"
          />
        </div>
        <div className="hero__name">
          <span className="hero__name-tag">Hana Oh</span>
          <span className="hero__name-sub">
            Human-centered technologist shaping delightful AI experiences.
          </span>
        </div>
      </motion.div>
      <motion.div className="hero__copy" variants={copyVariants}>
        <Navigation />
        <h1>Designer &amp; Developer exploring humane AI experiences</h1>
        <p>
          I’m Hana Oh, a Computer Science and Business Administration student at Seoul National University.
          With an international upbringing across China and Indonesia, I combine cultural empathy with technical
          rigor to craft meaningful human-computer interactions. My work spans AI-powered storytelling, medical
          imaging tools, and data-driven services that support real people in moments that matter.
        </p>
        <p>
          Currently, I’m focused on blending human-centered research with intelligent systems design, building
          interfaces that feel supportive, conversational, and trustworthy—whether that’s empowering seniors to
          capture life stories or helping students receive compassionate feedback from AI collaborators.
        </p>
      </motion.div>
      <motion.div className="hero__stats" variants={statsVariants}>
        <motion.div
          className="hero__chip"
          variants={chipVariants}
          whileHover={{ scale: 1.05 }}
        >
          <span className="hero__chip-dot" />
          HCI&nbsp;Researcher
        </motion.div>
        <motion.div
          className="hero__chip"
          variants={chipVariants}
          whileHover={{ scale: 1.05 }}
        >
          <span className="hero__chip-dot hero__chip-dot--mint" />
          AI&nbsp;+&nbsp;Empathy
        </motion.div>
        <motion.div
          className="hero__chip"
          variants={chipVariants}
          whileHover={{ scale: 1.05 }}
        >
          <span className="hero__chip-dot hero__chip-dot--blue" />
          Design Systems
        </motion.div>
      </motion.div>
    </div>
  </motion.section>
);

export default HeroSection;
