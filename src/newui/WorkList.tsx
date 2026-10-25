import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark, FaQuoteRight, FaLink, FaRegFilePdf, FaRegNewspaper, FaAward } from 'react-icons/fa';
import { publications, type Publication } from '../components/data/publicationsData';
import { projects } from '../components/data/projectData';
import AuthorList from './AuthorList';
import PlainField from './PlainField';

// Publications and projects in one academic list format: a representative
// thumbnail on the left; title, authors or timeline, venue, and links on the
// right. Publications are listed on the homepage, projects on the projects page.

interface EntryProps {
  id: string;
  to: string;
  thumb?: string;
  title: string;
  kind: 'publication' | 'project';
  children: React.ReactNode;
}

const Entry: React.FC<EntryProps> = ({ id, to, thumb, title, kind, children }) => (
  <li className="work">
    <Link className="work__thumb" to={to} tabIndex={-1} aria-hidden="true">
      {thumb && <img src={thumb} alt="" loading="lazy" />}
    </Link>
    <div className="work__text">
      <Link
        className="work__title"
        to={to}
        data-analytics-event={`${kind}_open`}
        data-analytics-item-id={id}
        data-analytics-item-name={title}
        data-analytics-placement={`${kind}_list`}
      >
        {title}
      </Link>
      {children}
    </div>
  </li>
);

const LinkRow: React.FC<{ links?: { label: string; url: string }[]; itemId: string }> = ({ links, itemId }) => {
  if (!links || links.length === 0) return null;
  return (
    <span className="work__links">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="external_link_click"
          data-analytics-label={l.label}
          data-analytics-destination={l.url}
          data-analytics-item-id={itemId}
        >
          {l.label}
        </a>
      ))}
    </span>
  );
};

// abs and bib open inline below the entry; details goes to the paper's page.
const PublicationEntry: React.FC<{ pub: Publication }> = ({ pub }) => {
  const [open, setOpen] = useState<'abs' | 'bib' | null>(null);
  const toggle = (panel: 'abs' | 'bib') => setOpen((cur) => (cur === panel ? null : panel));
  const to = `/publications/${pub.slug}`;
  const pdf = pub.links?.find((l) => l.label === 'PDF');
  const doi = pub.links?.find((l) => l.label === 'DOI');
  const outbound = (l: { label: string; url: string }, icon: React.ReactNode) => (
    <a
      href={l.url}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-event="external_link_click"
      data-analytics-label={l.label}
      data-analytics-destination={l.url}
      data-analytics-item-id={pub.slug}
    >
      {icon} {l.label.toLowerCase()}
    </a>
  );

  return (
    <li className="work work--pub">
      <Link className="work__thumb-block" to={to} tabIndex={-1} aria-hidden="true">
        <span className="work__short">{pub.shortName}</span>
        {pub.thumb && <span className="work__thumb"><img src={pub.thumb} alt="" loading="lazy" /></span>}
      </Link>
      <div className="work__text">
        <Link
          className="work__title"
          to={to}
          data-analytics-event="publication_open"
          data-analytics-item-id={pub.slug}
          data-analytics-item-name={pub.title}
          data-analytics-placement="publication_list"
        >
          {pub.title}
        </Link>
        <AuthorList className="work__authors" authors={pub.authors} coFirst={pub.coFirstAuthors} links={pub.authorLinks} />
        <span className="work__venue">
          {pub.venue}
          {pub.bestPaper && <span className="work__badge"><FaAward /> Best Paper</span>}
        </span>
        <PlainField as="p" className="work__tldr" file="publications" id={pub.slug} field="tldr" value={pub.tldr} />
        <span className="work__actions">
          <button type="button" aria-expanded={open === 'abs'} onClick={() => toggle('abs')}>
            <FaBookmark /> abs
          </button>
          <button type="button" aria-expanded={open === 'bib'} onClick={() => toggle('bib')}>
            <FaQuoteRight /> bib
          </button>
          {doi && outbound(doi, <FaLink />)}
          {pdf && outbound(pdf, <FaRegFilePdf />)}
          <Link
            to={to}
            data-analytics-event="publication_open"
            data-analytics-item-id={pub.slug}
            data-analytics-placement="publication_list_details"
          >
            <FaRegNewspaper /> details
          </Link>
        </span>
        {open === 'abs' && <p className="work__panel">{pub.abstract}</p>}
        {open === 'bib' && <pre className="work__panel work__panel--bib">{pub.bibtex}</pre>}
      </div>
    </li>
  );
};

export const PublicationList: React.FC<{ heading?: string }> = ({ heading = 'Publications' }) => (
  <section id="publications" className="work-section" data-analytics-section="publications">
    <h2 className="sec-heading">{heading}</h2>
    <ul className="work-list">
      {publications.map((pub) => <PublicationEntry key={pub.slug} pub={pub} />)}
    </ul>
    {publications.some((p) => p.coFirstAuthors?.length) && (
      <p className="work-note"><sup>*</sup> Equal contribution</p>
    )}
  </section>
);

export const ProjectList: React.FC<{ heading?: string | null }> = ({ heading = 'Projects' }) => (
  <section id="projects" className="work-section" data-analytics-section="projects">
    {heading && <h2 className="sec-heading">{heading}</h2>}
    <ul className="work-list">
      {projects.map((project) => (
        <Entry key={project.slug} id={project.slug} to={`/projects/${project.slug}`} thumb={project.thumb ?? project.image} title={project.title} kind="project">
          <PlainField className="work__summary" file="projects" id={project.slug} field="tldr" value={project.tldr} />
          {project.duration && <span className="work__venue"><em>{project.duration}</em></span>}
          <LinkRow links={project.links} itemId={project.slug} />
        </Entry>
      ))}
    </ul>
  </section>
);
