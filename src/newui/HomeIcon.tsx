import React from 'react';

// Small watercolor icons in public/pictures/icons, named by file (e.g. "award").
const HomeIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'home-icon' }) => (
  <img className={className} src={`${process.env.PUBLIC_URL}/pictures/icons/${name}.png`} alt="" aria-hidden="true" />
);

export default HomeIcon;
