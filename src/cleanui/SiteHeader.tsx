import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/research', label: 'Research', end: false },
  { to: '/collections', label: 'Worldbuilding', end: false },
];

const SiteHeader: React.FC = () => (
  <header className="c-header">
    <Link to="/" className="c-header__brand" data-analytics-event="nav_click" data-analytics-label="Brand">
      <span className="c-header__name">Hana Oh</span>
      <span className="c-header__tag">HCI · AI · Seoul National University</span>
    </Link>
    <nav className="c-nav" aria-label="Primary">
      {NAV.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `c-nav__link${isActive ? ' is-active' : ''}`}
          data-analytics-event="nav_click"
          data-analytics-label={label}
          data-analytics-placement="header"
        >
          {label}
        </NavLink>
      ))}
      <a
        className="c-nav__link"
        href={`${process.env.PUBLIC_URL}/HanaOh_CV.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-event="cv_download"
        data-analytics-label="CV nav"
        data-analytics-placement="header"
      >
        CV
      </a>
    </nav>
  </header>
);

export const SiteFooter: React.FC = () => (
  <footer className="c-footer">
    <span>Hana Oh</span>
    <span>{new Date().getFullYear()}</span>
  </footer>
);

export default SiteHeader;
