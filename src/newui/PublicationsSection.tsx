import React from 'react';
import { motion } from 'framer-motion';
import { publications } from '../components/data/publicationsData';

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

const PublicationsSection: React.FC = () => (
  <motion.section
    id="publications"
    className="hana-section hana-section--light publications"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="section-inner publications__inner">
      <motion.div className="publications__intro" variants={sectionVariants}>
        <span className="section-eyebrow text-themePink">Publications</span>
        <h2>Research contributions</h2>
        <p>
          My research has resulted in publications at top-tier HCI venues, focusing on
          human-AI interaction in educational and social contexts.
        </p>
      </motion.div>

      <motion.div
        className="publications__grid"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {publications.map((publication, index) => (
          <motion.article
            key={index}
            className="publication__card hana-card-hover"
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            <div className="publication__year">{publication.year}</div>
            <div className="publication__content">
              <h3 className="publication__title">{publication.title}</h3>
              <p className="publication__authors">{publication.authors}</p>
              <div className="publication__venue-info">
                <span className="publication__venue">{publication.venue}</span>
                <span className={`publication__status publication__status--${publication.type}`}>
                  {publication.status}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </motion.section>
);

export default PublicationsSection;