import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Masthead from '../newui/Masthead';
import {
  getProjectBySlug,
  projects,
  type Project,
  type ProjectStoryBlock,
} from '../components/data/projectData';
import '../newui/newPortfolio.css';

const RETURN_HOLD_MS = 700;
const RETURN_TRANSITION_MS = 620;

function getProjectStatusLine(project: Project) {
  const pieces = [project.duration, ...project.tags].filter(Boolean);
  return pieces.join(' · ');
}

function renderStoryBlock(block: ProjectStoryBlock, index: number) {
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
  const reduceMotion = useReducedMotion();
  const project = getProjectBySlug(slug || '');
  const returnSentinelRef = React.useRef<HTMLDivElement | null>(null);
  const [returning, setReturning] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setReturning(false);
  }, [slug]);

  React.useEffect(() => {
    const sentinel = returnSentinelRef.current;
    if (!sentinel) return;

    let holdTimer: number | undefined;
    let navigateTimer: number | undefined;
    let hasStarted = false;

    const observer = new IntersectionObserver(([entry]) => {
      if (hasStarted) return;

      if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
        holdTimer = window.setTimeout(() => {
          hasStarted = true;
          setReturning(true);
          navigateTimer = window.setTimeout(
            () => navigate('/research'),
            reduceMotion ? 0 : RETURN_TRANSITION_MS
          );
        }, RETURN_HOLD_MS);
      } else if (holdTimer) {
        window.clearTimeout(holdTimer);
        holdTimer = undefined;
      }
    }, { threshold: [0.95, 1] });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (holdTimer) window.clearTimeout(holdTimer);
      if (navigateTimer) window.clearTimeout(navigateTimer);
    };
  }, [navigate, reduceMotion, slug]);

  if (!project) {
    navigate('/research');
    return null;
  }

  const others = projects.filter(p => p.slug !== project.slug);

  return (
    <div>
      <Masthead />
      <div className="page page--publication">
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
          <h1 className="pub-page__title">{project.title}</h1>
          <p className="pub-page__status-line">{getProjectStatusLine(project)}</p>
          <p className="pub-page__insight">{project.tldr}</p>
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

        <hr className="sec-rule" />

        {project.storyBlocks ? (
          <div className="pub-page__story" data-analytics-section="project_narrative">
            {project.storyBlocks.map((block, index) => renderStoryBlock(block, index))}
          </div>
        ) : (
          <div className="pub-page__narrative" data-analytics-section="project_narrative">
            {project.narrative.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

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
            <ul className="pub-list">
              {others.map(p => (
                <li key={p.slug} className="pub">
                  <span className="pub__num">[{others.length - others.indexOf(p)}]</span>
                  <div className="pub__body">
                    <p className="pub__title">
                      <Link
                        to={`/projects/${p.slug}`}
                        className="pub-page__title-link"
                        data-analytics-event="project_open"
                        data-analytics-item-id={p.slug}
                        data-analytics-item-name={p.title}
                        data-analytics-placement="project_related"
                      >
                        {p.title}
                      </Link>
                    </p>
                    <p className="pub__authors">{p.tldr}</p>
                    <div className="pub__meta">
                      {p.duration && <span className="pub__venue">{p.duration}</span>}
                      <span className="pub__venue">{p.tags.join(' · ')}</span>
                    </div>
                  </div>
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
            ← Back to Research
          </Link>
        </div>

        <div
          ref={returnSentinelRef}
          className="pub-page__return-sentinel"
          aria-live="polite"
        >
          <span>End of project</span>
          <strong>{returning ? 'Returning to Research…' : 'Back to Research'}</strong>
        </div>
      </div>
      <AnimatePresence>
        {returning && (
          <motion.div
            className="publication-return-transition"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="publication-return-transition__label"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Returning to</span>
              <strong>Research</strong>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default ProjectPage;
