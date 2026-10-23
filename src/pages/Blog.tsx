import React from 'react';
import { Link } from 'react-router-dom';
import Masthead from '../newui/Masthead';
import PlainField from '../newui/PlainField';
import { blogPosts, formatPostDate } from '../components/data/blogData';
import '../newui/newPortfolio.css';

const Blog: React.FC = () => {
  const posts = blogPosts.filter(p => p.published);

  return (
    <div>
      <Masthead />
      <main className="page page--publication page--research-sheet page--blog">
        <header className="page-intro">
          <h1 className="page-intro__title">Blog</h1>
        </header>
        <ul className="essay-list">
          {posts.map(post => (
            <li key={post.id} className={`essay-item${post.thumb ? ' essay-item--thumb' : ''}`}>
              {post.thumb && (
                <Link className="essay-item__thumb" to={`/blog/${post.id}`} tabIndex={-1} aria-hidden="true">
                  <img src={`${process.env.PUBLIC_URL}${post.thumb}`} alt="" loading="lazy" />
                </Link>
              )}
              <div className="essay-item__body">
                <div className="essay-item__meta">
                  <span className="essay-item__date">{formatPostDate(post.date)}</span>
                </div>
                <h2 className="essay-title">
                  <Link
                    to={`/blog/${post.id}`}
                    data-analytics-event="blog_open"
                    data-analytics-item-id={post.id}
                    data-analytics-item-name={post.title}
                    data-analytics-placement="blog_list"
                  >
                    {post.title}
                  </Link>
                </h2>
                <PlainField as="p" className="essay-opening" file="blog" id={post.id} field="excerpt" value={post.excerpt} />
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default Blog;
