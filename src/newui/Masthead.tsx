import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/research', label: 'Research', end: false },
  { to: '/blog', label: 'Blog', end: false },
  { to: '/collections', label: 'Worldbuilding', end: false },
];

const Masthead: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-nav__inner">
        {/* The same links on every screen size, so phones can tap them directly. */}
        <div className="site-nav__links">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
              data-analytics-event="nav_click"
              data-analytics-label={label}
              data-analytics-placement="header"
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Masthead;
