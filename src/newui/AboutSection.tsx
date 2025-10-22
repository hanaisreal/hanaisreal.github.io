import React from 'react';
import { motion } from 'framer-motion';

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
          Building thoughtful technology with a human heartbeat
        </h2>
        <p>
          I thrive at the intersection of human narratives and intelligent systems.
          My academic journey at Seoul National University across Computer Science and Business Administration
          lets me think holistically—bridging user needs, technical feasibility, and responsible innovation.
        </p>
        <p>
          Most recently, I&apos;ve been prototyping conversational AI companions, accessible voice interfaces,
          and computer vision tools that respect context and support agency. I love collaborating with diverse teams
          where research insights turn into crafted experiences.
        </p>
      </motion.div>

      <motion.div className="about__focus-card" variants={cardVariants}>
        <h3>Focus areas</h3>
        <ul>
          <li>
            <span>01</span>
            <div>
              <h4>Human–AI Interaction</h4>
              <p>
                Designing AI-driven tools that communicate clearly, respect emotion, and adapt to real-world
                constraints—whether through voice, text, or visual cues.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h4>Learning &amp; Support Systems</h4>
              <p>
                Crafting interactive experiences that empower students, educators, and lifelong learners with
                feedback loops that feel human.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h4>Cultural Intelligence</h4>
              <p>
                Infusing international perspectives from growing up in China and Indonesia to make products that
                resonate beyond borders.
              </p>
            </div>
          </li>
        </ul>
      </motion.div>
    </div>
  </motion.section>
);

export default AboutSection;
