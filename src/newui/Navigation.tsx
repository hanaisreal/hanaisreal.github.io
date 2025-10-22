import React, { MouseEvent, useCallback } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navigation: React.FC = () => {
  const handleNavigation = useCallback((href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav className="navigation" aria-label="Primary">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="navigation__pill"
          onClick={handleNavigation(item.href)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
