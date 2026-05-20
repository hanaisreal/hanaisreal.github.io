import React from 'react';

const newsItems = [
  {
    date: 'May 2026',
    text: <>ToneCanvas is under review at <span className="news-item__venue">UIST 2026</span>.</>,
  },
  {
    date: 'Apr 2026',
    text: (
      <>
        <span className="news-item__award">★ Best Paper Award</span> at CHI 2026 —{' '}
        <em>When Scaffolding Breaks</em>.
      </>
    ),
  },
  {
    date: 'Jan 2026',
    text: (
      <>
        Two papers accepted to <span className="news-item__venue">CHI 2026</span> —
        DeepAware (1st author) and When Scaffolding Breaks.
      </>
    ),
  },
  {
    date: 'Sep 2025',
    text: <>Started M.S. in Intelligence and Information at Seoul National University.</>,
  },
  {
    date: 'Aug 2025',
    text: <>Graduated from Seoul National University, B.S. Computer Science &amp; Engineering and Business Administration.</>,
  },
];

const NewsSection: React.FC = () => (
  <section id="news">
    <h2 className="sec-heading">News</h2>
    <ul className="news-list">
      {newsItems.map((item, i) => (
        <li key={i} className="news-item">
          <span className="news-item__date">{item.date}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default NewsSection;
