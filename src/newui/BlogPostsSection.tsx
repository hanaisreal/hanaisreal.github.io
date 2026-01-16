import React from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../components/data/blogPostsData';
import { FaExternalLinkAlt } from 'react-icons/fa';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const BlogPostsSection: React.FC = () => (
  <motion.section
    id="reading"
    className="hana-section hana-section--light blog-posts"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="section-inner">
      <motion.div className="blog-posts__intro" variants={sectionVariants}>
        <span className="section-eyebrow text-themePurple">
          Reading List
        </span>
        <h2>Articles & Papers I Find Inspiring</h2>
        <p>
          A curated collection of writings that have shaped my thinking about AI, HCI, and technology's role in society.
        </p>
      </motion.div>

      <div className="blog-posts__list">
        {blogPosts.map((post, index) => (
          <motion.article
            key={`${post.title}-${index}`}
            className="blog-post-item"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="blog-post-item__content">
              <div className="blog-post-item__header">
                <span className="blog-post-item__category">{post.category}</span>
                <span className="blog-post-item__date">{post.date}</span>
              </div>

              <h3 className="blog-post-item__title">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-post-item__link"
                >
                  {post.title}
                  <FaExternalLinkAlt className="blog-post-item__icon" />
                </a>
              </h3>

              <p className="blog-post-item__author">by {post.author}</p>

              {post.myThoughts && (
                <p className="blog-post-item__thoughts">
                  "{post.myThoughts}"
                </p>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </motion.section>
);

export default BlogPostsSection;