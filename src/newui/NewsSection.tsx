import React from 'react';

const newsItems = [
  {
    date: 'Sep 2026',
    text: (
      <>
        <strong>ToneCanvas</strong> accepted as a poster at <span className="news-item__venue">UIST 2026</span> (Detroit).
      </>
    ),
  },
  {
    date: 'Jan 2026',
    text: (
      <>
        Two papers accepted to <span className="news-item__venue">CHI 2026</span>: <strong>DeepAware</strong> and{' '}
        <strong>When Scaffolding Breaks</strong>, with <strong>When Scaffolding Breaks</strong> receiving a{' '}
        <span className="news-item__award">Best Paper Award</span>.
      </>
    ),
  },
];

const NewsSection: React.FC = () => (
  <section id="news" data-analytics-section="home_news">
    <h2 className="sec-heading">News</h2>
    <ul className="news-list">
      {newsItems.map((item, i) => (
        <li key={i} className="news-item">
          <span className="news-item__date">[{item.date}]</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default NewsSection;
