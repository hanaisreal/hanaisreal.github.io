import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StickyHeader from '../newui/StickyHeader';
import { blogPosts, getAllCategories, getAllTags, getPostsByCategory, getPostsByTag } from '../components/data/blogData';
import '../newui/newPortfolio.css';
import './Blog.css';

const Blog: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'category' | 'tag'>('all');
  const [selectedValue, setSelectedValue] = useState<string>('');

  const categories = getAllCategories();
  const tags = getAllTags();

  const getFilteredPosts = () => {
    if (selectedFilter === 'category' && selectedValue) {
      return getPostsByCategory(selectedValue);
    }
    if (selectedFilter === 'tag' && selectedValue) {
      return getPostsByTag(selectedValue);
    }
    return blogPosts.filter(post => post.published);
  };

  const filteredPosts = getFilteredPosts();

  const resetFilter = () => {
    setSelectedFilter('all');
    setSelectedValue('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-page">
      <StickyHeader />

      <main className="blog-main">
        <div className="blog-container">
          {/* Header */}
          <motion.header
            className="blog-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="blog-back-link">
              ← Back to Portfolio
            </Link>
            <h1 className="blog-title">Thoughts & Research</h1>
            <p className="blog-subtitle">
              Exploring the intersection of technology, human agency, and the future of interaction design.
            </p>
          </motion.header>

          {/* Filters */}
          <motion.div
            className="blog-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="filter-section">
              <h3>Filter by Category</h3>
              <div className="filter-buttons">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedFilter('category');
                      setSelectedValue(category);
                    }}
                    className={`filter-btn ${
                      selectedFilter === 'category' && selectedValue === category ? 'active' : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Filter by Tag</h3>
              <div className="filter-buttons">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedFilter('tag');
                      setSelectedValue(tag);
                    }}
                    className={`filter-btn filter-btn--tag ${
                      selectedFilter === 'tag' && selectedValue === tag ? 'active' : ''
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {selectedFilter !== 'all' && (
              <button onClick={resetFilter} className="reset-filter-btn">
                Clear filters ×
              </button>
            )}
          </motion.div>

          {/* Post Count */}
          <motion.div
            className="blog-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
            {selectedFilter !== 'all' && (
              <span className="filter-indicator">
                • Filtered by {selectedFilter}: {selectedValue}
              </span>
            )}
          </motion.div>

          {/* Posts List */}
          <div className="blog-posts">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className={`blog-post-card ${post.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <Link to={`/blog/${post.id}`} className="post-link">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className="post-date">{formatDate(post.date)}</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>

                  <div className="post-content">
                    <h2 className="post-title">{post.title}</h2>
                    {post.subtitle && (
                      <h3 className="post-subtitle">{post.subtitle}</h3>
                    )}
                    <p className="post-excerpt">{post.excerpt}</p>
                  </div>

                  <div className="post-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="post-tag">#{tag}</span>
                    ))}
                  </div>

                  <div className="post-footer">
                    <span className="read-more">Read full post →</span>
                    {post.featured && (
                      <span className="featured-badge">★ Featured</span>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="blog-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>No posts found</h3>
              <p>Try adjusting your filters or check back later for new content.</p>
              <button onClick={resetFilter} className="reset-filter-btn">
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;