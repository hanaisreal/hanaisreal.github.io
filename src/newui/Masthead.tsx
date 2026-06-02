import React from 'react';
import { NavLink } from 'react-router-dom';

const Masthead: React.FC = () => (
  <nav className="site-nav">
    <div className="site-nav__inner">
      <NavLink to="/" className="site-nav__brand">Hana Oh</NavLink>
      <div className="site-nav__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/research"
          className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
        >
          Research
        </NavLink>
        <NavLink
          to="/essays"
          className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
        >
          Essays
        </NavLink>
        <NavLink
          to="/photos"
          className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
        >
          Photos
        </NavLink>
        <a
          href={`${process.env.PUBLIC_URL}/HanaOh_CV_260519.pdf`}
          className="site-nav__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          CV ↓
        </a>
      </div>
    </div>
  </nav>
);

export default Masthead;
