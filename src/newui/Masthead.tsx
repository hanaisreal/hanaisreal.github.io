import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/research', label: 'Research', end: false },
  { to: '/collections', label: 'Worldbuilding', end: false },
];

const Masthead: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`site-nav${scrolled ? ' is-scrolled' : ''}`} ref={menuRef}>
      <div className="site-nav__inner">
        <NavLink
          to="/"
          className="site-nav__brand"
          onClick={closeMenu}
          data-analytics-event="nav_click"
          data-analytics-label="Brand"
          data-analytics-placement="header"
        >
          Hana Oh
        </NavLink>

        {/* Desktop links */}
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
          {/* Essays tab hidden until content is ready */}
          <a
            href={`${process.env.PUBLIC_URL}/HanaOh_CV_260519.pdf`}
            className="site-nav__link"
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="cv_download"
            data-analytics-label="Header CV"
            data-analytics-destination={`${process.env.PUBLIC_URL}/HanaOh_CV_260519.pdf`}
            data-analytics-placement="header"
          >
            CV ↓
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          className={`site-nav__hamburger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          data-analytics-event="menu_toggle"
          data-analytics-label="Mobile navigation"
          data-analytics-placement="header"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`site-nav__mobile-menu${menuOpen ? ' is-open' : ''}`}>
        {NAV_LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `site-nav__mobile-link${isActive ? ' is-active' : ''}`}
            onClick={closeMenu}
            data-analytics-event="nav_click"
            data-analytics-label={label}
            data-analytics-placement="mobile_menu"
          >
            {label}
          </NavLink>
        ))}
        {/* Essays tab hidden until content is ready */}
        <a
          href={`${process.env.PUBLIC_URL}/HanaOh_CV_260519.pdf`}
          className="site-nav__mobile-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          data-analytics-event="cv_download"
          data-analytics-label="Mobile menu CV"
          data-analytics-destination={`${process.env.PUBLIC_URL}/HanaOh_CV_260519.pdf`}
          data-analytics-placement="mobile_menu"
        >
          CV ↓
        </a>
      </div>
    </nav>
  );
};

export default Masthead;
