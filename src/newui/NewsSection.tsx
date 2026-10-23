import React from 'react';
import home from '../content/home.json';
import PlainField from './PlainField';
import RichField from './RichField';

// News items live in src/content/home.json; under `npm start` the date and text are editable in place.
const NewsSection: React.FC = () => (
  <section id="news" data-analytics-section="home_news">
    <h2 className="sec-heading">Recent Highlights</h2>
    <ul className="news-list">
      {home.news.map((item, i) => (
        <li key={i} className="news-item">
          <span className="news-item__date">
            [<PlainField file="home" id={`news.${i}`} field="date" value={item.date} />]
          </span>
          <RichField
            store="home"
            storeKey={`news.${i}`}
            html={item.html}
            uploadDir="home"
            className="news-item__text"
            placement="news"
          />
        </li>
      ))}
    </ul>
  </section>
);

export default NewsSection;
