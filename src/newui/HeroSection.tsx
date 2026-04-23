import React from 'react';
import { motion } from 'framer-motion';
import PhotoMosaic from './PhotoMosaic';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

const roles = [
  'Human–AI Interaction',
  'Educational Technology',
  'Digital Resilience & Literacy',
  'Critical Thinking Systems',
];

const contactLinks = [
  { label: 'Email',    href: 'mailto:hana2001@snu.ac.kr' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hana-oh-921945290/' },
  { label: 'GitHub',   href: 'https://github.com/hanaisreal' },
];

const HeroSection: React.FC = () => (
  <section className="ed-hero" id="home">
    <div className="ed-hero__grid">

      {/* ── LEFT ── */}
      <div className="ed-hero__left">
        <motion.p className="ed-hero__kicker" {...fadeUp(0.05)}>
          HCI Researcher · Seoul National University
        </motion.p>

        <motion.h1 className="ed-hero__name" {...fadeUp(0.1)}>
          Hana Oh
        </motion.h1>

        <motion.p className="ed-hero__tagline" {...fadeUp(0.2)}>
          I study how people <em>think with AI</em> —<br />
          and design for the humans in the loop.
        </motion.p>

        <motion.ul className="ed-hero__role-list" {...fadeUp(0.32)}>
          {roles.map((r) => (
            <li key={r}>
              <span className="ed-hero__role-dot" />
              {r}
            </li>
          ))}
        </motion.ul>

        <motion.div className="ed-hero__bio" {...fadeUp(0.42)}>
          <p>
            My work spans human–AI interaction, NLP, and educational technology.
            I design AI systems that preserve human agency — tools that augment
            rather than replace.
          </p>
          <p>
            B.S. Computer Science &amp; Business Administration,
            Seoul National University.
          </p>
        </motion.div>

        <motion.div className="ed-hero__contacts" {...fadeUp(0.52)}>
          {contactLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="ed-hero__contact-link"
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="ed-hero__col-divider" />

      {/* ── RIGHT: photo mosaic ── */}
      <motion.div
        className="ed-hero__right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
      >
        <PhotoMosaic />
      </motion.div>

    </div>
  </section>
);

export default HeroSection;
