import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Masthead from '../newui/Masthead';
import { getProjectBySlug, projects } from '../components/data/projectData';
import '../newui/newPortfolio.css';

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug || '');

  React.useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) {
    navigate('/research');
    return null;
  }

  const others = projects.filter(p => p.slug !== project.slug);

  return (
    <div>
      <Masthead />
      <div className="page">
        <Link
          to="/research"
          className="essay-post__back"
          data-analytics-event="nav_click"
          data-analytics-label="Back to research"
          data-analytics-placement="project_detail"
        >
          ← Research
        </Link>

        <header className="pub-page__header" data-analytics-section="project_header">
          <div className="pub-page__meta">
            {project.tags.map(t => (
              <span key={t} className="essay-tag">{t}</span>
            ))}
            {project.duration && (
              <span className="pub__year">{project.duration}</span>
            )}
          </div>
          <h1 className="pub-page__title">{project.title}</h1>
          <p className="pub-page__insight" style={{ fontStyle: 'normal', color: 'var(--text)' }}>
            {project.tldr}
          </p>
          {project.links && project.links.length > 0 && (
            <div className="pub-page__links">
              {project.links.map(l => (
                <a
                  key={l.label}
                  href={l.url}
                  className="pub-page__ext-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="external_link_click"
                  data-analytics-label={l.label}
                  data-analytics-destination={l.url}
                  data-analytics-item-id={project.slug}
                  data-analytics-item-name={project.title}
                  data-analytics-placement="project_detail"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </header>

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="proj-page__hero-img"
          />
        )}

        <hr className="sec-rule" />

        <div className="pub-page__narrative" data-analytics-section="project_narrative">
          {project.narrative.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {project.contributions.length > 0 && (
          <section className="pub-page__contributions" data-analytics-section="project_contributions">
            <h2 className="sec-heading">What I built</h2>
            <ul className="pub-page__contrib-list">
              {project.contributions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>
        )}

        {others.length > 0 && (
          <section className="pub-page__other" data-analytics-section="project_related">
            <h2 className="sec-heading">Other Projects</h2>
            <div className="research-cards">
              {others.map(p => (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="research-card"
                  data-analytics-event="project_open"
                  data-analytics-item-id={p.slug}
                  data-analytics-item-name={p.title}
                  data-analytics-placement="project_related"
                >
                  <div
                    className="research-card__img"
                    style={p.image ? { backgroundImage: `url(${p.image})` } : undefined}
                  />
                  <div className="research-card__body">
                    <p className="research-card__title">{p.title}</p>
                    <p className="research-card__desc">{p.tldr}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="essay-post__footer">
          <Link
            to="/research"
            className="essay-post__back"
            data-analytics-event="nav_click"
            data-analytics-label="Back to research footer"
            data-analytics-placement="project_detail_footer"
          >
            ← Back to Research
          </Link>
        </div>
      </div>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default ProjectPage;
