import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader, { SiteFooter } from './SiteHeader';
import { publications } from '../components/data/publicationsData';
import { projects } from '../components/data/projectData';
import './clean.css';

function renderAuthors(pub: typeof publications[number]) {
  return pub.authors.split(', ').map((name, index, arr) => {
    const isMe = name === 'Hana Oh';
    const isCo = pub.coFirstAuthors?.includes(name);
    return (
      <span key={`${pub.slug}-${name}`}>
        <span className={isMe ? 'c-pub__me' : undefined}>
          {name}
          {isCo ? '*' : ''}
        </span>
        {index < arr.length - 1 ? ', ' : ''}
      </span>
    );
  });
}

function venueLine(pub: typeof publications[number]) {
  const status = pub.status === 'Accepted' ? '' : ` (${pub.status})`;
  return `${pub.venue}${status}`;
}

const ResearchPage: React.FC = () => {
  const hasCoFirst = publications.some((p) => p.coFirstAuthors && p.coFirstAuthors.length > 0);

  return (
    <div>
      <SiteHeader />
      <main className="c-main">
        <section className="c-section" style={{ marginTop: 0 }} data-analytics-section="research_publications">
          <h2 className="c-section__title">Publications</h2>
          <ul className="c-pubs">
            {publications.map((pub) => (
              <li key={pub.slug} className="c-pub">
                <p className="c-pub__title">
                  <Link
                    to={`/publications/${pub.slug}`}
                    data-analytics-event="publication_open"
                    data-analytics-item-id={pub.slug}
                    data-analytics-item-name={pub.title}
                    data-analytics-placement="publications_list"
                  >
                    {pub.title}
                  </Link>
                </p>
                <p className="c-pub__authors">{renderAuthors(pub)}</p>
                <p className="c-pub__venue">
                  {venueLine(pub)}
                  {pub.bestPaper && <span className="c-pub__award"> · Best Paper Award</span>}
                </p>
                <div className="c-pub__links">
                  <Link to={`/publications/${pub.slug}`}>[page]</Link>
                  {pub.links?.map((l) => (
                    <a
                      key={l.label}
                      href={l.url}
                      target={l.download ? undefined : '_blank'}
                      rel={l.download ? undefined : 'noopener noreferrer'}
                      download={l.download}
                      data-analytics-event="external_link_click"
                      data-analytics-label={l.label}
                      data-analytics-destination={l.url}
                      data-analytics-item-id={pub.slug}
                      data-analytics-placement="publications_list"
                    >
                      [{l.label.toLowerCase()}]
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          {hasCoFirst && (
            <p style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--c-muted)' }}>* equal contribution</p>
          )}
        </section>

        <section className="c-section" data-analytics-section="research_projects">
          <h2 className="c-section__title">Projects</h2>
          <ul className="c-grid">
            {projects.map((project) => (
              <li key={project.slug} className="c-tile">
                <Link
                  to={`/projects/${project.slug}`}
                  className="c-tile__link"
                  data-analytics-event="project_open"
                  data-analytics-item-id={project.slug}
                  data-analytics-item-name={project.title}
                  data-analytics-placement="projects_grid"
                >
                  <span className="c-tile__media">
                    {project.image && <img src={project.image} alt="" loading="lazy" />}
                  </span>
                  <span className="c-tile__title">{project.title}</span>
                  <span className="c-tile__meta">
                    {[project.duration, project.tags[0]].filter(Boolean).join(' · ')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ResearchPage;
