import React from 'react';
import { Link } from 'react-router-dom';
import { publications } from '../components/data/publicationsData';

interface PublicationsSectionProps {
  onOpen?: (path: string, rect: DOMRect) => void;
}

function getSummary(pub: typeof publications[number]) {
  return pub.tldr;
}

function getShortVenue(venue: string) {
  return venue.replace(/\b(19|20)(\d{2})\b/g, "'$2");
}

function getRibbonLabel(pub: typeof publications[number]) {
  const venue = getShortVenue(pub.venue);
  const base = pub.status === 'Accepted'
    ? pub.type === 'workshop'
      ? `${venue} · Workshop Accepted`
      : `${venue} · Published`
    : pub.status === 'Under Review'
      ? `${venue} · Under Review`
      : `${venue} · ${pub.status}`;

  return pub.bestPaper ? `${base} · Best Paper` : base;
}

function getCardImage(pub: typeof publications[number]) {
  if (pub.image) {
    return { src: pub.image, alt: `${pub.title} preview`, caption: undefined };
  }

  if (pub.storyBlocks) {
    const figureBlock = pub.storyBlocks.find((block) => block.type === 'figure');
    if (figureBlock && figureBlock.type === 'figure') return figureBlock.figure;
  }

  return null;
}

function renderCardAuthors(pub: typeof publications[number]) {
  return pub.authors.split(', ').map((name, index, arr) => {
    const isMe = name === 'Hana Oh';
    const isCo = pub.coFirstAuthors?.includes(name);

    return (
      <span key={`${pub.slug}-${name}`}>
        <span className={isMe ? 'pub__me' : undefined}>
          {name}{isCo ? <sup>*</sup> : null}
        </span>
        {index < arr.length - 1 ? ', ' : ''}
      </span>
    );
  });
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ onOpen }) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (!onOpen) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onOpen(path, event.currentTarget.getBoundingClientRect());
  };

  return (
    <section
      id="publications"
      className="publications-section"
      data-analytics-section="research_publications"
    >
      <h2 className="sec-heading">Publications</h2>
      <div className="publication-notes">
        {publications.map((pub) => {
          const image = getCardImage(pub);
          return (
            <Link
              key={pub.slug}
              to={`/publications/${pub.slug}`}
              className="publication-note"
              onClick={(event) => handleClick(event, `/publications/${pub.slug}`)}
              data-analytics-event="publication_open"
              data-analytics-item-id={pub.slug}
              data-analytics-item-name={pub.title}
              data-analytics-placement="publications_list"
            >
              <div className="publication-note__ribbon" aria-label={getRibbonLabel(pub)}>
                <span className="publication-note__ribbon-text">{getRibbonLabel(pub)}</span>
              </div>
              <div className="publication-note__body">
                <h3 className="publication-note__title">{pub.title}</h3>
                <p className="publication-note__authors">{renderCardAuthors(pub)}</p>
                <p className="publication-note__summary">{getSummary(pub)}</p>
                {image && (
                  <figure className="publication-note__figure">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="publication-note__image"
                      loading="lazy"
                    />
                  </figure>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      {publications.some(p => p.coFirstAuthors) && (
        <p className="pub__cofirst-note">* equal contribution</p>
      )}
    </section>
  );
};

export default PublicationsSection;
