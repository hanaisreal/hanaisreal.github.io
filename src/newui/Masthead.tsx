import React, { useCallback } from 'react';

const navItems = [
  { label: 'News',         href: '#news' },
  { label: 'Publications', href: '#publications' },
  { label: 'Research',     href: '#research' },
  { label: 'Projects',     href: '#projects' },
  { label: 'CV ↓',         href: `${process.env.PUBLIC_URL}/cv.pdf`, isExternal: true },
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
    <header className="ed-masthead">
      <div className="ed-masthead__inner">
        <a
          href="#home"
          className="ed-masthead__brand"
          onClick={handleClick('#home')}
        >
          Hana Oh
        </a>

        <span className="ed-masthead__meta">
          Seoul National University · HCI Researcher
        </span>

        <nav className="ed-masthead__nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleClick(item.href, item.isExternal)}
              {...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Masthead;
