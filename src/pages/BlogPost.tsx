import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import StickyHeader from '../newui/StickyHeader';
import { getPostById, blogPosts } from '../components/data/blogData';
import '../newui/newPortfolio.css';
import './BlogPost.css';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post] = useState(getPostById(id || ''));

  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);

  if (!post) {
    return (
      <div className="blog-post-page">
        <StickyHeader />
        <main className="blog-post-main">
          <div className="blog-post-container">
            <div className="post-not-found">
              <h1>Post not found</h1>
              <Link to="/blog" className="back-to-blog">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContentWithMarkdown = (content: string) => {
    // Simple markdown-like formatting for blog content
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        const trimmed = paragraph.trim();

        if (!trimmed) return null;

        // Handle bold text
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          const boldText = trimmed.slice(2, -2);
          return (
            <h3 key={index} className="blog-section-heading">
              {boldText}
            </h3>
          );
        }

        // Handle regular paragraphs
        const formattedText = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        return (
          <p
            key={index}
            className="blog-paragraph"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      })
      .filter(Boolean);
  };

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id && p.published)
    .slice(0, 2);

  return (
    <div className="blog-post-page">
      <StickyHeader />

      <main className="blog-post-main">
        <div className="blog-post-container">
          {/* Navigation */}
          <motion.div
            className="blog-post-nav"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/blog" className="back-to-blog">
              ← Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            className="blog-post-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="post-meta-full">
              <span className="post-category-full">{post.category}</span>
              <span className="post-date-full">{formatDate(post.date)}</span>
              <span className="post-read-time-full">{post.readTime}</span>
              {post.featured && (
                <span className="featured-badge-full">★ Featured</span>
              )}
            </div>

            <h1 className="blog-post-title">{post.title}</h1>

            {post.subtitle && (
              <h2 className="blog-post-subtitle">{post.subtitle}</h2>
            )}

            <div className="post-tags-full">
              {post.tags.map(tag => (
                <span key={tag} className="post-tag-full">#{tag}</span>
              ))}
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            className="blog-post-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="blog-content-formatted">
              {formatContentWithMarkdown(post.content)}
            </div>
          </motion.article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              className="related-posts"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3>Related Posts</h3>
              <div className="related-posts-grid">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="related-post-card"
                  >
                    <div className="related-post-category">{relatedPost.category}</div>
                    <h4 className="related-post-title">{relatedPost.title}</h4>
                    <p className="related-post-excerpt">{relatedPost.excerpt}</p>
                    <span className="related-post-date">{formatDate(relatedPost.date)}</span>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Back to Blog Footer */}
          <motion.footer
            className="blog-post-footer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/blog" className="back-to-blog-footer">
              ← Back to All Posts
            </Link>
          </motion.footer>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;