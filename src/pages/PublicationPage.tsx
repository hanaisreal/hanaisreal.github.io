import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Masthead from '../newui/Masthead';
import { getPublicationBySlug, publications } from '../components/data/publicationsData';
import '../newui/newPortfolio.css';

function formatAuthors(authors: string, coFirst?: string[]) {
  return authors.split(', ').map((name, i, arr) => {
    const isMe = name === 'Hana Oh';
    const isCo = coFirst?.includes(name);
    return (
      <span key={i}>
        <span className={isMe ? 'pub__me' : undefined}>
          {name}{isCo ? <sup>*</sup> : null}
        </span>
        {i < arr.length - 1 ? ', ' : ''}
      </span>
    );
  });
}

const PublicationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const pub = getPublicationBySlug(slug || '');

  React.useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!pub) {
    navigate('/research');
    return null;
  }

  const others = publications.filter(p => p.slug !== pub.slug).slice(0, 2);

  return (
    <div>
      <Masthead />
      <div className="page">
        <Link
          to="/research"
          className="essay-post__back"
          data-analytics-event="nav_click"
          data-analytics-label="Back to research"
          data-analytics-placement="publication_detail"
        >
          ← Research
        </Link>

        <header className="pub-page__header" data-analytics-section="publication_header">
          <div className="pub-page__meta">
            <span className="essay-tag">{pub.venue}</span>
            {pub.bestPaper && <span className="pub__best-paper">★ Best Paper</span>}
            {pub.status === 'Under Review' && (
              <span className="pub__status">{pub.status}</span>
            )}
          </div>
          <h1 className="pub-page__title">{pub.title}</h1>
          <p className="pub-page__authors">
            {formatAuthors(pub.authors, pub.coFirstAuthors)}
          </p>
          {pub.coFirstAuthors && (
            <p className="pub-page__cofirst">* equal contribution</p>
          )}
          {pub.links && pub.links.length > 0 && (
            <div className="pub-page__links">
              {pub.links.map(l => (
                <a
                  key={l.label}
                  href={l.url}
                  className="pub-page__ext-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="external_link_click"
                  data-analytics-label={l.label}
                  data-analytics-destination={l.url}
                  data-analytics-item-id={pub.slug}
                  data-analytics-item-name={pub.title}
                  data-analytics-placement="publication_detail"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </header>

        <hr className="sec-rule" />

        {pub.insight && (
          <p className="pub-page__insight">{pub.insight}</p>
        )}

        <div className="pub-page__narrative" data-analytics-section="publication_narrative">
          {pub.narrative.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {pub.contributions.length > 0 && (
          <section className="pub-page__contributions" data-analytics-section="publication_contributions">
            <h2 className="sec-heading">Contributions</h2>
            <ul className="pub-page__contrib-list">
              {pub.contributions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>
        )}

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
                    <p className="pub__authors">{formatAuthors(p.authors, p.coFirstAuthors)}</p>
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
            to="/research"
            className="essay-post__back"
            data-analytics-event="nav_click"
            data-analytics-label="Back to research footer"
            data-analytics-placement="publication_detail_footer"
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

export default PublicationPage;
