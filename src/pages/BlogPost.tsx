import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Masthead from '../newui/Masthead';
import PlainField from '../newui/PlainField';
import RichField from '../newui/RichField';
import { markdownToHtml } from '../newui/markdown';
import postHtml from '../content/posts.json';
import { getPostById, blogPosts, formatPostDate } from '../components/data/blogData';
import '../newui/newPortfolio.css';

const savedHtml = postHtml as Record<string, string>;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  // Unpublished drafts stay unreachable by URL too.
  const post = useMemo(() => {
    const found = getPostById(slug || '');
    return found?.published ? found : undefined;
  }, [slug]);

  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);

  if (!post) return null;

  const html = savedHtml[post.id] ?? markdownToHtml(post.content);


  const related = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id && p.published)
    .slice(0, 2);

  return (
    <div>
      <Masthead />
      <div className="page page--publication page--post">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/blog" className="essay-post__back">← Blog</Link>

          {/* Under `npm start` the title, date, body, and tags are editable in place. */}
          <header className="essay-post__header">
            <PlainField as="h1" className="essay-post__title" file="blog" id={post.id} field="title" value={post.title} />
            {post.subtitle && (
              <PlainField as="p" className="essay-post__subtitle" file="blog" id={post.id} field="subtitle" value={post.subtitle} />
            )}
            <p className="essay-post__meta">
              <PlainField file="blog" id={post.id} field="date" value={post.date} display={formatPostDate(post.date)} />
            </p>
          </header>

          {/* A body saved from the editor (src/content/posts.json) wins over the markdown content. */}
          <article className="essay-post__body">
            <RichField store="posts" storeKey={post.id} html={html} uploadDir={`blog/${post.id}`} placement="blog_post" />
          </article>

          {post.tags.length > 0 && (
            <PlainField
              as="p"
              className="essay-post__tags"
              file="blog"
              id={post.id}
              field="tags"
              value={post.tags.map(t => `#${t}`).join(' ')}
            />
          )}

          {related.length > 0 && (
            <section className="essay-post__related">
              <h3 className="sec-heading">More Posts</h3>
              <ul className="essay-list">
                {related.map(r => (
                  <li key={r.id} className="essay-item">
                    <h2 className="essay-title">
                      <Link to={`/blog/${r.id}`}>{r.title}</Link>
                    </h2>
                    <p className="essay-opening">{r.excerpt}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="essay-post__footer">
            <Link to="/blog" className="essay-post__back">← Back to Blog</Link>
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

export default BlogPost;
