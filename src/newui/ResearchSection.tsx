import React from 'react';
import { motion } from 'framer-motion';
import { researchExperiences } from '../components/data/researchData';

const themes = [
  {
    num: 'Theme 01',
    name: 'Human Agency\nin AI Systems',
    desc: 'Designing AI systems that augment rather than replace human decision-making. Studying how interface design shapes perceived control and autonomy in collaborative workflows.',
    tags: ['Human-AI Interaction', 'Interface Design', 'Agency'],
  },
  {
    num: 'Theme 02',
    name: 'AI in\nEducation',
    desc: 'How LLM-based tools reshape learning, critical thinking, and student autonomy in real classroom settings — field studies grounded in actual classroom deployment.',
    tags: ['Educational Technology', 'LLMs', 'Critical Thinking'],
  },
  {
    num: 'Theme 03',
    name: 'Digital Resilience\n& Literacy',
    desc: 'Building literacy and protective capabilities for vulnerable populations — older adults and young learners — navigating AI-generated misinformation and deepfakes.',
    tags: ['Deepfakes', 'Older Adults', 'Cybersecurity'],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
});

const ResearchSection: React.FC = () => (
  <section id="research">
    {/* ── THEMES ── */}
    <div className="ed-section-rule">
      <div className="ed-section-rule__inner">
        <span className="ed-section-num">§ 03</span>
        <span className="ed-section-label">Research Themes</span>
        <div className="ed-section-rule__line" />
      </div>
    </div>

    <div className="ed-themes">
      <div className="ed-themes__grid">
        {themes.map((t, i) => (
          <motion.div key={t.num} className="ed-theme" {...fadeUp(i * 0.1)}>
            <div className="ed-theme__num">{t.num}</div>
            <h3 className="ed-theme__name" style={{ whiteSpace: 'pre-line' }}>
              {t.name}
            </h3>
            <p className="ed-theme__desc">{t.desc}</p>
            <div className="ed-theme__tags">
              {t.tags.map((tag) => (
                <span key={tag} className="ed-theme__tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* ── EXPERIENCE ── */}
    <div className="ed-section-rule">
      <div className="ed-section-rule__inner">
        <span className="ed-section-num">§ 04</span>
        <span className="ed-section-label">Research Experience</span>
        <div className="ed-section-rule__line" />
      </div>
    </div>

    <div className="ed-exp">
      <div className="ed-exp__list">
        {researchExperiences.map((exp, i) => (
          <motion.div key={exp.lab} className="ed-exp__row" {...fadeUp(i * 0.1)}>
            <div>
              <p className="ed-exp__lab">{exp.lab}</p>
              <p className="ed-exp__advisor">
                {exp.advisor} · {exp.institution}
              </p>
            </div>

            <div>
              {exp.projects.map((proj) => (
                <div key={proj.projectTitle} style={{ marginBottom: '0.75rem' }}>
                  <h4 className="ed-exp__project-title">{proj.projectTitle}</h4>
                  <p className="ed-exp__project-desc">{proj.description}</p>
                  <div className="ed-exp__tags">
                    {proj.keyTechnologies.map((t) => (
                      <span key={t} className="ed-exp__tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="ed-exp__period">{exp.overallDuration}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ResearchSection;
