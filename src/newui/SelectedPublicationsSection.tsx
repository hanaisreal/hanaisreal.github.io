import React from 'react';
import { Link } from 'react-router-dom';
import { publications } from '../components/data/publicationsData';
import AuthorList from './AuthorList';

const SelectedPublicationsSection: React.FC = () => {
  const hasCoFirst = publications.some((p) => p.coFirstAuthors?.includes('Hana Oh'));

  return (
    <section id="publications" data-analytics-section="home_publications">
      <h2 className="sec-heading">Publications</h2>
      <ul className="pub-brief">
        {publications.map((pub) => {
          const paper = pub.links?.find((l) => !l.download && /paper|pdf/i.test(l.label));
          const doi = pub.links?.find((l) => l.label === 'DOI');
          return (
            <li key={pub.slug} className="pub-brief__item">
              <Link className="pub-brief__thumb" to={`/publications/${pub.slug}`} tabIndex={-1} aria-hidden="true">
                {pub.image && <img src={pub.image} alt="" loading="lazy" />}
              </Link>
              <div className="pub-brief__text">
                <Link
                  className="pub-brief__title"
                  to={`/publications/${pub.slug}`}
                  data-analytics-event="publication_click"
                  data-analytics-label={pub.title}
                  data-analytics-placement="home_publications"
                >
                  {pub.title}
                </Link>
                <AuthorList className="pub-brief__authors" authors={pub.authors} coFirst={pub.coFirstAuthors} />
                <span className="pub-brief__venue">
                  <em>{pub.venue}</em>
                  {pub.bestPaper && <span className="news-item__award"> · Best Paper Award</span>}
                  {paper && (
                    <>
                      {' · '}
                      <a className="text-link" href={paper.url} target="_blank" rel="noopener noreferrer">PDF</a>
                    </>
                  )}
                  {doi && (
                    <>
                      {' · '}
                      <a className="text-link" href={doi.url} target="_blank" rel="noopener noreferrer">DOI</a>
                    </>
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {hasCoFirst && <p className="pub-brief__note"><sup>*</sup> Equal contribution</p>}
    </section>
  );
};

export default SelectedPublicationsSection;
