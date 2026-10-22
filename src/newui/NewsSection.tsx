import React from 'react';

const newsItems = [
  {
    date: 'Sep 2026',
    text: (
      <>
        <strong>ToneCanvas</strong> accepted as a poster at <span className="news-item__venue">UIST 2026</span>. See
        you in Detroit!
      </>
    ),
  },
  {
    date: 'Apr 2026',
    text: (
      <>
        Presenting <strong>DeepAware</strong> at <span className="news-item__venue">CHI 2026</span> in Barcelona.
      </>
    ),
  },
  {
    date: 'Jan 2026',
    text: (
      <>
        Two papers accepted to <span className="news-item__venue">CHI 2026</span>: <strong>DeepAware</strong> and{' '}
        <strong>When Scaffolding Breaks</strong>, with one{' '}
        <span className="news-item__award">Best Paper Award</span>.
      </>
    ),
  },
];

const NewsSection: React.FC = () => (
  <section id="news" data-analytics-section="home_news">
    <h2 className="sec-heading">Recent Highlights</h2>
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
