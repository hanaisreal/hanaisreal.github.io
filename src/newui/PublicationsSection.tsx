import React from 'react';
import { Link } from 'react-router-dom';
import { publications } from '../components/data/publicationsData';
import { HandDrawnBorder } from './research-canvas/sketchKit';

interface PublicationsSectionProps {
  onOpen?: (path: string, rect: DOMRect) => void;
}

function getSummary(pub: typeof publications[number]) {
  return pub.tldr;
}

function getShortVenue(venue: string) {
  return venue.replace(/\b(19|20)(\d{2})\b/g, "'$2");
}

function getVenueLabel(pub: typeof publications[number]) {
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
            // The title link stretches over the whole card (see CSS), so the
            // card stays clickable while the PDF/DOI links remain real links.
            <article key={pub.slug} className="publication-note">
              <HandDrawnBorder id={`pub-${pub.slug}`} />
              <div className="publication-note__body">
                <h3 className="publication-note__title">
                  <Link
                    to={`/publications/${pub.slug}`}
                    className="publication-note__title-link"
                    onClick={(event) => handleClick(event, `/publications/${pub.slug}`)}
                    data-analytics-event="publication_open"
                    data-analytics-item-id={pub.slug}
                    data-analytics-item-name={pub.title}
                    data-analytics-placement="publications_list"
                  >
                    {pub.title}
                  </Link>
                </h3>
                <p className="publication-note__label">{getVenueLabel(pub)}</p>
                <p className="publication-note__authors">{renderCardAuthors(pub)}</p>
                {pub.links && pub.links.length > 0 && (
                  <p className="publication-note__links">
                    {pub.links.map((l, i) => (
                      <React.Fragment key={l.label}>
                        {i > 0 && ' · '}
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-analytics-event="external_link_click"
                          data-analytics-label={l.label}
                          data-analytics-destination={l.url}
                          data-analytics-item-id={pub.slug}
                          data-analytics-placement="publications_list"
                        >
                          {l.label} ↗
                        </a>
                      </React.Fragment>
                    ))}
                  </p>
                )}
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
            </article>
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
