import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

const HeroSection: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="ed-hero" id="home">
      <div className="ed-hero__grid">

        {/* ── LEFT ── */}
        <div className="ed-hero__left">
          <motion.p className="ed-hero__kicker" {...fadeUp(0.05)}>
            HCI Researcher · Human–AI Interaction
          </motion.p>

          <motion.h1 className="ed-hero__name" {...fadeUp(0.1)}>
            Hana
          </motion.h1>
          <motion.div className="ed-hero__name-italic" {...fadeUp(0.2)}>
            Oh
          </motion.div>

          <motion.ul className="ed-hero__role-list" {...fadeUp(0.3)}>
            {roles.map((r) => (
              <li key={r}>
                <span className="ed-hero__role-dot" />
                {r}
              </li>
            ))}
          </motion.ul>

          <motion.div className="ed-hero__contacts" {...fadeUp(0.45)}>
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

        {/* ── RIGHT ── */}
        <div className="ed-hero__right">
          <motion.div
            className="ed-hero__photo-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/pictures/profile_main.png`}
              alt="Hana Oh"
              className="ed-hero__photo"
              style={{ opacity: hovered ? 0 : 1, position: 'absolute', inset: 0 }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/pictures/profile.jpeg`}
              alt="Hana Oh"
              className="ed-hero__photo"
              style={{ opacity: hovered ? 1 : 0, position: 'absolute', inset: 0 }}
            />
            <div className="ed-hero__photo-caption">Hana Oh · Seoul, 2024</div>
          </motion.div>

          <motion.p className="ed-hero__standfirst" {...fadeUp(0.25)}>
            I study how people <strong>think with AI</strong> — and what happens to human reasoning when intelligent systems take over the cognitive work.
          </motion.p>

          <motion.div className="ed-hero__body" {...fadeUp(0.38)}>
            <p>
              My research sits at the intersection of human–AI interaction, NLP, and educational technology. I design and study AI systems that preserve human agency — systems that augment rather than replace.
            </p>
            <p>
              Recent projects include experiential deepfake simulations for older adults, LLM-based writing scaffolds in K-12 EFL classrooms, and AI-assisted history education in real classroom settings.
            </p>
            <p>
              I recently graduated from Seoul National University with a B.S. in Computer Science and Business Administration.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
