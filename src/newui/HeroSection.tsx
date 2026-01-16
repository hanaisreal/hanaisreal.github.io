import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import ResearchInterestsViz from './ResearchInterestsViz';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

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
const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:hana2001@snu.ac.kr',
    icon: <HiOutlineMail />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/hana-oh-921945290/',
    icon: <FaLinkedin />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/hanaisreal',
    icon: <FaGithub />,
  },
];

interface HeroSectionProps {
  isChristmasTheme?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isChristmasTheme = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
  <motion.section
    className={`hero hana-section hana-section--light ${isChristmasTheme ? 'hero--christmas' : ''}`}
    id="home"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <div className="hero__inner">
      <motion.header className="hero__header" variants={headerVariants}>
        <Navigation />
      </motion.header>

      <hr className="hero__divider" />

      <motion.div className="hero__body" variants={bodyVariants}>
        <motion.div className="hero__portrait-section">
          <motion.figure
            className="hero__portrait hero__portrait--hover-effect"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/pictures/profile_main.png`}
              alt="Hana Oh"
              className="hero__portrait-img hero__portrait-img--main"
              style={{ opacity: isHovered ? 0 : 1 }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/pictures/profile.jpeg`}
              alt="Hana Oh"
              className="hero__portrait-img hero__portrait-img--hover"
              style={{ opacity: isHovered ? 1 : 0 }}
            />
          </motion.figure>

          <motion.div
            className="hero__name-section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="hero__name">
              {isChristmasTheme ? '🎄 Hana Oh 🎅' : 'Hana Oh'}
            </h1>
            <p className="hero__title">
              {isChristmasTheme
                ? '🎁 Computer Science & Business Student • HCI Researcher • Holiday Researcher 🎁'
                : 'Computer Science & Business Student • HCI Researcher'
              }
            </p>
          </motion.div>

          <motion.div
            className="hero__contact-links"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          >
            {contactLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="hero__contact-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="hero__copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="hero__description">
            My research lies at the intersection of human-AI interaction, NLP, and AI (broadly human-computer interaction). I'm interested in understanding how people interact with AI systems and designing interfaces that preserve <span className="hero__highlight-term hero__highlight--agency">human agency</span> in collaborative workflows.
          </p>
          <p>
          I am currently interested in building conversational systems that support <span className="hero__highlight-term hero__highlight--perspective">perspective-taking</span> and reasoning to foster <span className="hero__highlight-term hero__highlight--thinking">critical thinking</span>.
            My previous work has been around building systems for personalized AI interventions for <span className="hero__highlight-term hero__highlight--resilience">digital resilience</span>, and analyzing human interaction with AI in educational contexts.
            I recently graduated from Seoul National University with a B.S. in Computer Science and Business Administration.
          </p>
          <p>
            Besides, I love to travel, write, swim, and <span className="hero__highlight-term hero__highlight--draw">draw</span> :)
          </p>
        </motion.div>
      </motion.div>
    </div>

    <motion.section
      className="hana-section hana-section--light"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="section-inner">
        <motion.div className="research-interests__intro">
          <span className="section-eyebrow text-themePurple">
            Research Interests
          </span>
        </motion.div>

        <ResearchInterestsViz />

        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', textAlign: 'center', color: 'var(--muted)' }}>
          My research interests are broad, but they all tie to advancing human capabilities through
          thoughtful AI design that preserves agency and supports critical thinking.
        </p>
      </div>
    </motion.section>
  </motion.section>
  );
};

export default HeroSection;
