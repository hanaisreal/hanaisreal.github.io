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
        <p className="essays-intro">
          나는 더 편한 인터페이스보다, 사람이 자기 경험을 놓치지 않게 하는 인터페이스가 궁금하다.
        </p>
        <ul className="essay-list">
          {essays.map(essay => (
            <li key={essay.id} className="essay-item">
              <span className="essay-tag">{essay.category}</span>
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
