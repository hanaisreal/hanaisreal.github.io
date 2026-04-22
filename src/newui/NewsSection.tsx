import React from 'react';
import { motion } from 'framer-motion';

const newsItems = [
  {
    date: 'Apr 2026',
    text: (
      <>
        <span className="ed-news__award">★ Best Paper Award</span> at CHI 2026 — When Scaffolding Breaks.
      </>
    ),
  },
  {
    date: 'Jan 2025',
    text: (
      <>
        Two papers accepted to <span className="ed-news__venue">CHI 2026</span> — DeepAware (1st author) and When Scaffolding Breaks.
      </>
    ),
  },
  {
    date: 'Feb 2025',
    text: <>Graduated from Seoul National University — B.S. Computer Science &amp; Business Administration.</>,
  },
  {
    date: '2024',
    text: (
      <>
        Research intern at <span className="ed-news__venue">KIXLAB (KAIST)</span>, HCI+Design Lab, and Human Computing Lab at SNU.
      </>
    ),
  },
];

const colVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const NewsSection: React.FC = () => (
  <section id="news">
    <div className="ed-section-rule">
      <div className="ed-section-rule__inner">
        <span className="ed-section-num">§ 01</span>
        <span className="ed-section-label">News</span>
        <div className="ed-section-rule__line" />
      </div>
    </div>

    <div className="ed-news">
      <div className="ed-news__grid">
        {newsItems.map((item, i) => (
          <motion.div
            key={i}
            className="ed-news__col"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={colVariants}
          >
            <div className="ed-news__date">{item.date}</div>
            <p className="ed-news__text">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default NewsSection;
