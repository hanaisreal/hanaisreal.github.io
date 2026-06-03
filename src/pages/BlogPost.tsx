import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Masthead from '../newui/Masthead';
import { getPostById, blogPosts } from '../components/data/blogData';
import '../newui/newPortfolio.css';

const EssayPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post] = useState(getPostById(slug || ''));

  useEffect(() => {
    if (!post) {
      navigate('/essays');
    }
  }, [post, navigate]);

  if (!post) return null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const inlineHtml = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

  const formatContent = (content: string) =>
    content
      .split('\n\n')
      .map((para, i) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('## ')) {
          return <h2 key={i} className="essay-post__heading">{trimmed.slice(3)}</h2>;
        }

        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return <h3 key={i} className="essay-post__heading">{trimmed.slice(2, -2)}</h3>;
        }

        const lines = trimmed.split('\n');

        if (lines.every(l => l.startsWith('> '))) {
          return (
            <blockquote key={i} className="essay-post__blockquote">
              {lines.map(l => l.slice(2)).join(' ')}
            </blockquote>
          );
        }

        if (lines.every(l => l.startsWith('- '))) {
          return (
            <ul key={i} className="essay-post__list">
              {lines.map((l, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: inlineHtml(l.slice(2)) }} />
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="essay-post__para"
            dangerouslySetInnerHTML={{ __html: inlineHtml(trimmed) }} />
        );
      })
      .filter(Boolean);

  const related = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id && p.published)
    .slice(0, 2);

  return (
    <div>
      <Masthead />
      <div className="page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/essays" className="essay-post__back">← Essays</Link>

          <header className="essay-post__header">
            <span className="essay-tag">{post.category}</span>
            <h1 className="essay-post__title">{post.title}</h1>
            {post.subtitle && (
              <p className="essay-post__subtitle">{post.subtitle}</p>
            )}
            <p className="essay-post__meta">
              {formatDate(post.date)} · {post.readTime}
            </p>
          </header>

          <article className="essay-post__body">
            {formatContent(post.content)}
          </article>

          {related.length > 0 && (
            <section className="essay-post__related">
              <h3 className="sec-heading">More Essays</h3>
              <ul className="essay-list">
                {related.map(r => (
                  <li key={r.id} className="essay-item">
                    <span className="essay-tag">{r.category}</span>
                    <h2 className="essay-title">
                      <Link to={`/essays/${r.id}`}>{r.title}</Link>
                    </h2>
                    <p className="essay-opening">{r.excerpt}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="essay-post__footer">
            <Link to="/essays" className="essay-post__back">← Back to Essays</Link>
          </div>
        </motion.div>
      </div>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default EssayPost;
