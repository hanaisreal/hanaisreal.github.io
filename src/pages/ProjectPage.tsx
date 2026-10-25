import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Masthead from '../newui/Masthead';
import { mediaFirst } from '../newui/storyOrder';
import PlainField from '../newui/PlainField';
import RichField from '../newui/RichField';
import { narrativeToHtml, storyToHtml } from '../newui/markdown';
import projectHtml from '../content/projects.json';
import {
  getProjectBySlug,
  projects,
  type ProjectStoryBlock,
} from '../components/data/projectData';
import '../newui/newPortfolio.css';

const IS_DEV = process.env.NODE_ENV === 'development';
const savedHtml = projectHtml as Record<string, string>;


function renderStoryBlock(block: ProjectStoryBlock, index: number) {
  if (block.type === 'heading') {
    return <h2 key={index} style={{ order: index }} className="proj-section-title">{block.text}</h2>;
  }

  if (block.type === 'paragraph') {
    return <p key={index} style={{ order: index }}>{block.text}</p>;
  }

  if (block.type === 'video') {
    return (
      <figure key={index} style={{ order: index }} className="pub-page__figure">
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
        key={index} style={{ order: index }}
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
    <div key={index} style={{ order: index }} className="pub-page__figure-row">
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
      <div className="page page--publication page--project page--paper">
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
          <PlainField as="h1" className="proj-hero__title" file="projects" id={project.slug} field="title" value={project.title} />
          {/* Timeline and links on one line so the story starts sooner. */}
          <p className="proj-hero__meta">
            {project.duration && (
              <PlainField file="projects" id={project.slug} field="duration" value={project.duration} />
            )}
            {project.links?.map((l) => (
              <React.Fragment key={l.label}>
                {project.duration ? ' · ' : ''}
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
          <PlainField as="p" className="proj-hero__lede" file="projects" id={project.slug} field="tldr" value={project.tldr} />
        </header>

        {/* Once saved from the editor (src/content/projects.json) the story is rich
            HTML; until then the built site keeps the block layout below. */}
        {savedHtml[project.slug] || IS_DEV ? (
          <RichField
            store="projects"
            storeKey={project.slug}
            html={savedHtml[project.slug] ?? (project.storyBlocks
              ? storyToHtml(project.storyBlocks)
              : narrativeToHtml(project.narrative, project.image, project.title))}
            uploadDir={`projects/${project.slug}`}
            className="essay-post__rich pub-page__rich"
            placement="project_detail"
          />
        ) : project.storyBlocks ? (
          <div className="pub-page__story proj-story" data-analytics-section="project_narrative">
            {mediaFirst(project.storyBlocks).map(({ block, index }) => renderStoryBlock(block, index))}
          </div>
        ) : (
          <div className="pub-page__narrative proj-story" data-analytics-section="project_narrative">
            {/* Story pages carry their own figures (often the same image), so the
                cover only shows for projects without a story: first in the right
                column, after the first paragraph on narrow screens. */}
            {project.image && (
              <figure className="pub-page__figure proj-cover" style={{ order: 1 }}>
                <img src={project.image} alt={project.title} className="proj-cover__img" />
              </figure>
            )}
            {project.narrative.split('\n\n').map((para, i) => (
              <p key={i} style={{ order: i * 2 }}>{para}</p>
            ))}
          </div>
        )}

        {project.contributions.length > 0 && (
          <section className="proj-built" data-analytics-section="project_contributions">
            <h2 className="proj-section-title">My contributions</h2>
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
                    {(p.thumb ?? p.image) && (
                      <span className="proj-card__media">
                        <img src={p.thumb ?? p.image} alt="" loading="lazy" />
                      </span>
                    )}
                    <span className="proj-card__body">
                      <span className="proj-card__title">{p.title}</span>
                      <span className="proj-card__tldr">{p.tldr}</span>
                      <span className="proj-card__meta">{p.duration}</span>
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
