import React, { useState } from 'react';
import Masthead from '../newui/Masthead';
import { collections, getLanguages } from '../components/data/collectionsData';
import '../newui/newPortfolio.css';

const CollectionsPage: React.FC = () => {
  const [active, setActive] = useState('all');
  const languages = getLanguages();
  const visible = active === 'all'
    ? collections
    : collections.filter(c => c.language === active);

  return (
    <div>
      <Masthead />
      <div className="page collections-page">
        <header className="collections-header">
          <h1 className="collections-title">untranslatable words</h1>
          <p className="collections-subtitle">Some feelings are real but nameless until you find out another language named them exactly. This is a collection of words I've been looking for without knowing it.</p>
        </header>

        <div className="collections-filters">
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => setActive(lang)}
              className={`collections-filter-btn${active === lang ? ' is-active' : ''}`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="collections-scattered">
          {visible.map((item, i) => (
            <article key={item.original} className={`collection-card collection-card--rot${(i % 7)}`}>
              <div className="collection-card__photo">
                {item.src ? (
                  <img src={item.src} alt={item.original} draggable={false} />
                ) : (
                  <div className="collection-card__photo-placeholder" />
                )}
              </div>
              <div className="collection-card__body">
                <div className="collection-card__words">
                  <span className="collection-card__original">{item.original}</span>
                  <span className="collection-card__korean">{item.korean}</span>
                </div>
                <p className="collection-card__desc">{item.description}</p>
                <span className="collection-card__lang">{item.language}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default CollectionsPage;
