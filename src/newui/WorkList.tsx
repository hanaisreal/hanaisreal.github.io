import React from 'react';
import { Link } from 'react-router-dom';
import { publications } from '../components/data/publicationsData';
import { projects } from '../components/data/projectData';
import AuthorList from './AuthorList';

// Publications and projects in one academic list format: a representative
// thumbnail on the left; title, authors or timeline, venue, and links on the
// right. Used on both the homepage and the research page.

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

export const PublicationList: React.FC<{ heading?: string }> = ({ heading = 'Publications' }) => (
  <section id="publications" className="work-section" data-analytics-section="publications">
    <h2 className="sec-heading">{heading}</h2>
    <ul className="work-list">
      {publications.map((pub) => (
        <Entry key={pub.slug} id={pub.slug} to={`/publications/${pub.slug}`} thumb={pub.thumb} title={pub.title} kind="publication">
          <AuthorList className="work__authors" authors={pub.authors} coFirst={pub.coFirstAuthors} />
          <span className="work__venue">
            <em>{pub.venue}</em>
            {pub.bestPaper && <span className="work__award">Best Paper Award</span>}
          </span>
          <LinkRow links={pub.links} itemId={pub.slug} />
        </Entry>
      ))}
    </ul>
    {publications.some((p) => p.coFirstAuthors?.length) && (
      <p className="work-note"><sup>*</sup> Equal contribution</p>
    )}
  </section>
);

export const ProjectList: React.FC<{ heading?: string }> = ({ heading = 'Projects' }) => (
  <section id="projects" className="work-section" data-analytics-section="projects">
    <h2 className="sec-heading">{heading}</h2>
    <ul className="work-list">
      {projects.map((project) => (
        <Entry key={project.slug} id={project.slug} to={`/projects/${project.slug}`} thumb={project.thumb ?? project.image} title={project.title} kind="project">
          <span className="work__summary">{project.tldr}</span>
          {project.duration && <span className="work__venue"><em>{project.duration}</em></span>}
          <LinkRow links={project.links} itemId={project.slug} />
        </Entry>
      ))}
    </ul>
  </section>
);
