import React, { useCallback } from 'react';

const navItems = [
  { label: 'News',         href: '#news' },
  { label: 'About',        href: '#about' },
  { label: 'Research',     href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Projects',     href: '#projects' },
  { label: 'CV ↓',         href: `${process.env.PUBLIC_URL}/HanaOh_CV_260519.pdf`, isExternal: true },
];

const Masthead: React.FC = () => {
  const handleClick = useCallback(
    (href: string, isExternal?: boolean) =>
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isExternal) return;
        e.preventDefault();
        const id = href.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },
    []
  );

  return (
    <nav className="site-nav">
      <div className="site-nav__inner">
        <span className="site-nav__brand">Hana Oh</span>
        <div className="site-nav__links">
          {navItems.map(({ label, href, isExternal }) => (
            <a
              key={label}
              href={href}
              className="site-nav__link"
              onClick={handleClick(href, isExternal)}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Masthead;
