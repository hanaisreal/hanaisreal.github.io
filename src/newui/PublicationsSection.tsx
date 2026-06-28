import React from 'react';
import { Link } from 'react-router-dom';
import { publications } from '../components/data/publicationsData';

const PublicationsSection: React.FC = () => (
  <section id="publications" data-analytics-section="research_publications">
    <h2 className="sec-heading">Publications</h2>
    <div className="research-cards">
      {publications.map(pub => (
        <Link
          key={pub.slug}
          to={`/publications/${pub.slug}`}
          className="research-card"
          data-analytics-event="publication_open"
          data-analytics-item-id={pub.slug}
          data-analytics-item-name={pub.title}
          data-analytics-placement="publications_grid"
        >
          <div
            className="research-card__img"
            style={pub.image ? { backgroundImage: `url(${pub.image})` } : undefined}
          />
          <div className="research-card__body">
            <div className="research-card__meta">
              <span className="essay-tag">{pub.venue}</span>
              {pub.bestPaper && (
                <span className="pub__best-paper">★ Best Paper</span>
              )}
              {pub.status === 'Under Review' && (
                <span className="pub__status">{pub.status}</span>
              )}
            </div>
            <p className="research-card__title">{pub.title}</p>
            <p className="research-card__desc">{pub.tldr}</p>
            <p className="research-card__authors">{pub.authors}</p>
          </div>
        </Link>
      ))}
    </div>
    {publications.some(p => p.coFirstAuthors) && (
      <p className="pub__cofirst-note">* equal contribution</p>
    )}
  </section>
);

export default PublicationsSection;
