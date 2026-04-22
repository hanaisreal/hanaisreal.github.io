import React from 'react';
import { motion } from 'framer-motion';
import { publications } from '../components/data/publicationsData';

// Highlight "Hana Oh" in author string
function formatAuthors(authors: string) {
  const parts = authors.split('Hana Oh');
  if (parts.length === 1) return <>{authors}</>;
  return (
    <>
      {parts[0]}
      <span className="ed-pub__authors-me">Hana Oh</span>
      {parts[1]}
    </>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const PublicationsSection: React.FC = () => (
  <section id="publications">
    <div className="ed-section-rule">
      <div className="ed-section-rule__inner">
        <span className="ed-section-num">§ 02</span>
        <span className="ed-section-label">Publications</span>
        <div className="ed-section-rule__line" />
      </div>
    </div>

    <div className="ed-pubs">
      <div className="ed-pubs__list">
        {publications.map((pub, i) => (
          <motion.article
            key={i}
            className="ed-pub"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={itemVariants}
          >
            <div className="ed-pub__year">{pub.year}</div>

            <div className="ed-pub__center">
              <h3 className="ed-pub__title">{pub.title}</h3>

              {pub.insight && (
                <div className="ed-pub__insight">
                  <div className="ed-pub__insight-inner">
                    <p className="ed-pub__insight-text">"{pub.insight}"</p>
                  </div>
                </div>
              )}

              <p className="ed-pub__authors">{formatAuthors(pub.authors)}</p>
            </div>

            <div className="ed-pub__right">
              <span className="ed-pub__venue">{pub.venue}</span>
              <span
                className={`ed-pub__status${
                  pub.status === 'Accepted' ? ' ed-pub__status--accepted' : ''
                }`}
              >
                {pub.status}
              </span>
              {pub.bestPaper && (
                <span className="ed-pub__best-paper">★ Best Paper</span>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default PublicationsSection;
