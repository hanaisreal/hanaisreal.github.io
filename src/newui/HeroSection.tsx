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
          Human-centered technologist shaping delightful AI experiences.
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
          <h2>Designer &amp; developer exploring humane AI experiences</h2>
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
          <ul className="hero__highlights">
            <li>HCI researcher turning qualitative insight into product strategy.</li>
            <li>Exploring AI and empathy to craft voice-first and conversational tools.</li>
            <li>Design systems advocate translating research into inclusive interfaces.</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  </motion.section>
);

export default HeroSection;
