import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Masthead from '../newui/Masthead';
import { getPostById } from '../components/data/blogData';
import { BibtexBlock, PaperHero } from '../newui/PaperHero';
import AuthorList from '../newui/AuthorList';
import RichField from '../newui/RichField';
import { narrativeToHtml, storyToHtml } from '../newui/markdown';
import publicationHtml from '../content/publications.json';
import { mediaFirst } from '../newui/storyOrder';
import {
  getPublicationBySlug,
  publications,
  type PublicationStoryBlock,
} from '../components/data/publicationsData';
import '../newui/newPortfolio.css';

const IS_DEV = process.env.NODE_ENV === 'development';
const savedHtml = publicationHtml as Record<string, string>;


function renderStoryBlock(block: PublicationStoryBlock, index: number) {
  if (block.type === 'paragraph') {
    return <p key={index} style={{ order: index }}>{block.text}</p>;
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

const PublicationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const pub = getPublicationBySlug(slug || '');

  // Before paint, so the page never shows at the previous scroll position.
  React.useLayoutEffect(() => {
    // Jump, don't animate: html has scroll-behavior: smooth.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!pub) {
    navigate('/');
    return null;
  }

  const others = publications.filter(p => p.slug !== pub.slug).slice(0, 2);
  const relatedPost = pub.relatedPost ? getPostById(pub.relatedPost) : undefined;
  const related = relatedPost?.published ? relatedPost : undefined;

  return (
    <div>
      <Masthead />
      <div className="page page--publication page--paper">
        <Link
          to="/"
          className="essay-post__back"
          data-analytics-event="nav_click"
          data-analytics-label="Back to home"
          data-analytics-placement="publication_detail"
        >
          ← Home
        </Link>

        <PaperHero pub={pub} related={related} />

        <section className="paper-section" data-analytics-section="publication_abstract">
          <h2 className="paper-section__title">Abstract</h2>
          <p className="paper-abstract">{pub.abstract}</p>
        </section>

        {/* Once saved from the editor (src/content/publications.json) the story is
            rich HTML; until then the built site keeps the block layout below. */}
        {savedHtml[pub.slug] || IS_DEV ? (
          <RichField
            store="publications"
            storeKey={pub.slug}
            html={savedHtml[pub.slug] ?? (pub.storyBlocks ? storyToHtml(pub.storyBlocks, { inline: true }) : narrativeToHtml(pub.narrative))}
            uploadDir={`publications/${pub.slug}`}
            className="essay-post__rich pub-page__rich"
            placement="publication_detail"
          />
        ) : pub.storyBlocks ? (
          <div className="pub-page__story" data-analytics-section="publication_narrative">
            {mediaFirst(pub.storyBlocks).map(({ block, index }) => renderStoryBlock(block, index))}
          </div>
        ) : (
          <div className="pub-page__narrative" data-analytics-section="publication_narrative">
            {pub.narrative.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        {pub.contributions.length > 0 && (
          <section className="paper-section" data-analytics-section="publication_contributions">
            <h2 className="paper-section__title">Contributions</h2>
            <ul className="pub-page__contrib-list">
              {pub.contributions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>
        )}

        <BibtexBlock bibtex={pub.bibtex} />

        {others.length > 0 && (
          <section className="pub-page__other" data-analytics-section="publication_related">
            <h2 className="sec-heading">Other Publications</h2>
            <ul className="pub-list">
              {others.map((p, i) => (
                <li key={p.slug} className="pub">
                  <span className="pub__num">[{publications.length - publications.indexOf(p)}]</span>
                  <div className="pub__body">
                    <p className="pub__title">
                      <Link
                        to={`/publications/${p.slug}`}
                        className="pub-page__title-link"
                        data-analytics-event="publication_open"
                        data-analytics-item-id={p.slug}
                        data-analytics-item-name={p.title}
                        data-analytics-placement="publication_related"
                      >
                        {p.title}
                      </Link>
                    </p>
                    <p className="pub__authors"><AuthorList authors={p.authors} coFirst={p.coFirstAuthors} links={p.authorLinks} /></p>
                    <div className="pub__meta">
                      <span className="pub__venue">{p.venue}</span>
                      {p.bestPaper && <span className="pub__best-paper">★ Best Paper</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="essay-post__footer">
          <Link
            to="/"
            className="essay-post__back"
            data-analytics-event="nav_click"
            data-analytics-label="Back to home footer"
            data-analytics-placement="publication_detail_footer"
          >
            ← Back to Home
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

export default PublicationPage;
