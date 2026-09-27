import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Masthead from '../newui/Masthead';
import {
  getProjectBySlug,
  projects,
  type ProjectStoryBlock,
} from '../components/data/projectData';
import '../newui/newPortfolio.css';


function renderStoryBlock(block: ProjectStoryBlock, index: number) {
  if (block.type === 'heading') {
    return <h2 key={index} className="proj-section-title">{block.text}</h2>;
  }

  if (block.type === 'paragraph') {
    return <p key={index}>{block.text}</p>;
  }

  if (block.type === 'video') {
    return (
      <figure key={index} className="pub-page__figure">
        <video
          className="pub-page__story-video"
          controls
          playsInline
          preload="metadata"
          poster={block.video.poster}
        >
          <source src={block.video.src} type="video/mp4" />
        </video>
        {block.video.caption && (
          <figcaption className="pub-page__figcaption">{block.video.caption}</figcaption>
        )}
      </figure>
    );
  }

  if (block.type === 'figure') {
    return (
      <figure
        key={index}
        className={`pub-page__figure${block.figure.variant === 'narrow' ? ' pub-page__figure--narrow' : ''}`}
      >
        <img
          src={block.figure.src}
          alt={block.figure.alt}
          className="pub-page__story-img"
          loading="lazy"
        />
        {block.figure.caption && (
          <figcaption className="pub-page__figcaption">{block.figure.caption}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <div key={index} className="pub-page__figure-row">
      {block.figures.map((figure, figureIndex) => (
        <figure
          key={`${index}-${figureIndex}`}
          className={`pub-page__figure${figure.variant === 'narrow' ? ' pub-page__figure--narrow' : ''}`}
        >
          <img
            src={figure.src}
            alt={figure.alt}
            className="pub-page__story-img"
            loading="lazy"
          />
          {figure.caption && (
            <figcaption className="pub-page__figcaption">{figure.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug || '');

  // Before paint, so the page never shows at the previous scroll position.
  React.useLayoutEffect(() => {
    // Jump, don't animate: html has scroll-behavior: smooth.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  React.useEffect(() => {
    if (!project) navigate('/research');
  }, [project, navigate]);

  if (!project) return null;

  const others = projects.filter(p => p.slug !== project.slug);

  return (
    <div>
      <Masthead />
      <div className="page page--publication page--project">
        <Link
          to="/research"
          className="essay-post__back"
          data-analytics-event="nav_click"
          data-analytics-label="Back to research"
          data-analytics-placement="project_detail"
        >
          &larr; Research
        </Link>

        <header className="proj-hero" data-analytics-section="project_header">
          <h1 className="proj-hero__title">{project.title}</h1>
          {/* Timeline, focus, and links on one line so the story starts sooner. */}
          <p className="proj-hero__meta">
            {[project.duration, ...project.tags].filter(Boolean).join(' · ')}
            {project.links?.map((l) => (
              <React.Fragment key={l.label}>
                {' · '}
                <a
                  href={l.url}
                  className="proj-hero__link"
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
              </React.Fragment>
            ))}
          </p>
          <p className="proj-hero__lede">{project.tldr}</p>
        </header>

        {/* Story pages carry their own figures (often the same image), so the
            cover only shows for projects without a story. */}
        {project.image && !project.storyBlocks && (
          <figure className="proj-cover">
            <img src={project.image} alt={project.title} className="proj-cover__img" />
          </figure>
        )}

        {project.storyBlocks ? (
          <div className="pub-page__story proj-story" data-analytics-section="project_narrative">
            {project.storyBlocks.map((block, index) => renderStoryBlock(block, index))}
          </div>
        ) : (
          <div className="pub-page__narrative proj-story" data-analytics-section="project_narrative">
            {project.narrative.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        {project.contributions.length > 0 && (
          <section className="proj-built" data-analytics-section="project_contributions">
            <h2 className="proj-section-title">What I built</h2>
            <ol className="proj-built__grid">
              {project.contributions.map((c, i) => (
                <li key={i} className="proj-built__item">
                  <span className="proj-built__num">{String(i + 1).padStart(2, '0')}</span>
                  <p>{c}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {others.length > 0 && (
          <section className="proj-others" data-analytics-section="project_related">
            <h2 className="proj-section-title">More projects</h2>
            <ul className="proj-cards">
              {others.map(p => (
                <li key={p.slug} className="proj-card">
                  <Link
                    to={`/projects/${p.slug}`}
                    className="proj-card__link"
                    data-analytics-event="project_open"
                    data-analytics-item-id={p.slug}
                    data-analytics-item-name={p.title}
                    data-analytics-placement="project_related"
                  >
                    {p.image && (
                      <span className="proj-card__media">
                        <img src={p.image} alt="" loading="lazy" />
                      </span>
                    )}
                    <span className="proj-card__body">
                      <span className="proj-card__title">{p.title}</span>
                      <span className="proj-card__tldr">{p.tldr}</span>
                      <span className="proj-card__meta">{[p.duration, p.tags[0]].filter(Boolean).join(' · ')}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
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
            &larr; Back to Research
          </Link>
        </div>
      </div>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default ProjectPage;
