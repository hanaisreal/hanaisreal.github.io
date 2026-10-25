import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaDatabase, FaGlobe, FaLink, FaRegFilePdf, FaTrophy } from 'react-icons/fa';
import { SiArxiv } from 'react-icons/si';
import type { Publication } from '../components/data/publicationsData';

// The top of a paper page, laid out like a paper's project page: venue line,
// title and subtitle, authors with affiliation numbers, award, and link
// buttons. Also the BibTeX block that closes the page.

const SELF = 'Hana Oh';

const BUTTON_ICONS: Record<string, React.ReactNode> = {
  PDF: <FaRegFilePdf />,
  DOI: <FaBookOpen />,
  arXiv: <SiArxiv />,
  Dataset: <FaDatabase />,
  'Project page': <FaGlobe />,
};

// "ToneCanvas: Visually Painting …" -> ["ToneCanvas", "Visually Painting …"]
const splitTitle = (title: string): [string, string | null] => {
  const at = title.indexOf(': ');
  return at === -1 ? [title, null] : [title.slice(0, at), title.slice(at + 2)];
};

export const PaperHero: React.FC<{ pub: Publication; related?: { id: string; title: string } }> = ({ pub, related }) => {
  const [title, subtitle] = splitTitle(pub.title);
  const affiliations = pub.affiliations ?? [];
  const numbered = affiliations.length > 1;
  const names = pub.authors.split(',').map(n => n.trim());
  const notes = [
    pub.coFirstAuthors?.length ? '* Equal contribution' : null,
    pub.correspondingAuthors?.length ? '† Corresponding author' : null,
  ].filter(Boolean);

  return (
    <header className="paper-hero" data-analytics-section="publication_header">
      <p className="paper-hero__venue">{[pub.venue, pub.location].filter(Boolean).join(' · ')}</p>
      <h1 className="paper-hero__title">{title}</h1>
      {subtitle && <p className="paper-hero__subtitle">{subtitle}</p>}

      <p className="paper-hero__authors">
        {names.map(name => {
          const marks = [
            ...(numbered ? pub.authorAffiliations?.[name] ?? [] : []),
            ...(pub.coFirstAuthors?.includes(name) ? ['*'] : []),
            ...(pub.correspondingAuthors?.includes(name) ? ['†'] : []),
          ].join('');
          const href = pub.authorLinks?.[name];
          return (
            <span key={name} className="paper-hero__author">
              {name === SELF ? (
                <Link
                  to="/"
                  className="author-self"
                  data-analytics-event="internal_link_click"
                  data-analytics-label={name}
                  data-analytics-placement="publication_detail"
                >
                  <strong>{name}</strong>
                </Link>
              ) : href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="external_link_click"
                  data-analytics-label={name}
                  data-analytics-destination={href}
                  data-analytics-placement="publication_detail"
                >
                  {name}
                </a>
              ) : name}
              {marks && <sup>{marks}</sup>}
            </span>
          );
        })}
      </p>

      {affiliations.length > 0 && (
        <p className="paper-hero__affiliations">
          {affiliations.map((a, i) => (
            <span key={a}>{numbered && <sup>{i + 1}</sup>}{a}</span>
          ))}
        </p>
      )}
      {notes.length > 0 && <p className="paper-hero__notes">{notes.join('   ')}</p>}

      {pub.bestPaper && (
        <p className="paper-hero__award"><FaTrophy aria-hidden="true" /> Best Paper Award</p>
      )}

      {pub.links && pub.links.length > 0 && (
        <div className="paper-hero__buttons">
          {pub.links.map(l => (
            <a
              key={l.label}
              href={l.url}
              className="paper-button"
              target={l.download ? undefined : '_blank'}
              rel={l.download ? undefined : 'noopener noreferrer'}
              download={l.download}
              data-analytics-event="external_link_click"
              data-analytics-label={l.label}
              data-analytics-destination={l.url}
              data-analytics-item-id={pub.slug}
              data-analytics-item-name={pub.title}
              data-analytics-placement="publication_detail"
            >
              {BUTTON_ICONS[l.label] ?? <FaLink />}
              {l.label}
            </a>
          ))}
        </div>
      )}

      {related && (
        <p className="paper-hero__related">
          Behind the paper:{' '}
          <Link
            to={`/blog/${related.id}`}
            data-analytics-event="blog_open"
            data-analytics-item-id={related.id}
            data-analytics-placement="publication_detail"
          >
            {related.title}
          </Link>
        </p>
      )}
    </header>
  );
};

export const BibtexBlock: React.FC<{ bibtex: string }> = ({ bibtex }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <section className="paper-section" data-analytics-section="publication_bibtex">
      <div className="paper-bibtex__head">
        <h2 className="paper-section__title">BibTeX</h2>
        <button type="button" className="paper-bibtex__copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre className="paper-bibtex">{bibtex}</pre>
    </section>
  );
};
