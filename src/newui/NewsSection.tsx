import React from 'react';
import home from '../content/home.json';
import PlainField from './PlainField';
import RichField from './RichField';
import HomeIcon from './HomeIcon';

// News items live in src/content/home.json; under `npm start` the date, title,
// and text are editable in place.
const NewsSection: React.FC = () => (
  <section id="news" className="home-sec" data-analytics-section="home_news">
    <h2 className="home-sec__heading">News</h2>
    <ul className="home-news">
      {home.news.map((item, i) => (
        <li key={i} className="home-news__item">
          <HomeIcon name={item.icon} className="home-news__icon" />
          <div className="home-news__body">
            <PlainField className="home-news__date" file="home" id={`news.${i}`} field="date" value={item.date} />
            <PlainField as="p" className="home-news__title" file="home" id={`news.${i}`} field="title" value={item.title} />
            <RichField
              store="home"
              storeKey={`news.${i}`}
              html={item.html}
              uploadDir="home"
              className="home-news__text"
              placement="news"
            />
          </div>
        </li>
      ))}
    </ul>
  </section>
);

// Short lists beside the news: upcoming talks, honors, education, interests.
export const SideSections: React.FC = () => (
  <>
    <section className="home-sec" data-analytics-section="home_upcoming">
      <h2 className="home-sec__heading">Upcoming</h2>
      <ul className="home-side-list">
        {home.upcoming.map(item => (
          <li key={item.text}>
            <HomeIcon name={item.icon} className="home-side-list__icon" />
            <span>
              <span className="home-side-list__date">{item.date}</span>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
    <section className="home-sec" data-analytics-section="home_honors">
      <h2 className="home-sec__heading">Honors &amp; Awards</h2>
      <ul className="home-side-list">
        {home.honors.map(item => (
          <li key={item.text}>
            <HomeIcon name="award" className="home-side-list__icon" />
            <span>
              <span className="home-side-list__date">{item.year}</span>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
    <section className="home-sec" data-analytics-section="home_education">
      <h2 className="home-sec__heading">Education</h2>
      <ul className="home-side-list">
        {home.education.map(item => (
          <li key={item.degree}>
            <HomeIcon name="graduate-school" className="home-side-list__icon" />
            <span>
              <span className="home-side-list__date">{item.years}</span>
              {item.degree}
              <span className="home-side-list__sub">{item.school}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
    <section className="home-sec" data-analytics-section="home_interests">
      <h2 className="home-sec__heading">Interests</h2>
      <ul className="home-chips">
        {home.interests.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
    </section>
  </>
);

export default NewsSection;
