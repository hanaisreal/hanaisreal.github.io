import React from 'react';
import { Link } from 'react-router-dom';
import Masthead from '../newui/Masthead';
import { blogPosts } from '../components/data/blogData';
import '../newui/newPortfolio.css';

const Essays: React.FC = () => {
  const essays = blogPosts.filter(p => p.published);

  return (
    <div>
      <Masthead />
      <div className="page">
        <ul className="essay-list">
          {essays.map(essay => (
            <li key={essay.id} className="essay-item">
              <div className="essay-item__meta">
                <span className="essay-tag">{essay.category}</span>
                <span className="essay-item__date">{essay.date} · {essay.readTime}</span>
              </div>
              <h2 className="essay-title">
                <Link to={`/essays/${essay.id}`}>{essay.title}</Link>
              </h2>
              <p className="essay-opening">{essay.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default Essays;
