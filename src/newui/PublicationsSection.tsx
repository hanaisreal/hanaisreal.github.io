import React from 'react';
import { publications } from '../components/data/publicationsData';

function formatAuthors(authors: string, coFirst?: string[]) {
  const names = authors.split(', ');
  const parts: React.ReactNode[] = [];

  names.forEach((name, i) => {
    const isMe = name === 'Hana Oh';
    const isCo = coFirst?.includes(name);
    const separator = i < names.length - 1 ? ', ' : '';

    parts.push(
      <span key={i}>
        <span className={isMe ? 'pub__me' : undefined}>
          {name}{isCo ? <sup>*</sup> : null}
        </span>
        {separator}
      </span>
    );
  });

  return <>{parts}</>;
}

const PublicationsSection: React.FC = () => {
  const hasCoFirst = publications.some((p) => p.coFirstAuthors);

  return (
    <section id="publications">
      <h2 className="sec-heading">Publications</h2>
      <ul className="pub-list">
        {publications.map((pub, i) => (
          <li key={i} className="pub">
            <span className="pub__num">[{publications.length - i}]</span>
            <div className="pub__body">
              <p className="pub__title">{pub.title}</p>
              <p className="pub__authors">
                {formatAuthors(pub.authors, pub.coFirstAuthors)}
              </p>
              <div className="pub__meta">
                <span className="pub__venue">{pub.venue}</span>
                <span className="pub__year">{pub.year}</span>
                {pub.bestPaper && (
                  <span className="pub__best-paper">★ Best Paper</span>
                )}
                <span className={`pub__status${pub.status === 'Accepted' ? ' pub__status--accepted' : ''}`}>
                  {pub.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {hasCoFirst && (
        <p className="pub__cofirst-note">* equal contribution</p>
      )}
    </section>
  );
};

export default PublicationsSection;
