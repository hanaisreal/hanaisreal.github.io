import React, { MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean; // For pages that navigate away from current page
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Publications', href: '#publications' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Wordbank', href: '/wordbank', isExternal: true },
  { label: 'Contact', href: '#contact' },
];

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = useCallback((href: string, isExternal?: boolean) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (isExternal) {
      // Handle React Router navigation
      navigate(href);
      return;
    }

    // Handle internal section scrolling
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [navigate]);

  return (
    <nav className="navigation" aria-label="Primary">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`navigation__pill ${item.isExternal ? 'navigation__pill--external' : ''}`}
          onClick={handleNavigation(item.href, item.isExternal)}
          {...(item.isExternal && { rel: 'noopener' })}
        >
          {item.label}
          {item.isExternal && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ marginLeft: '0.25rem', opacity: 0.6 }}
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          )}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
