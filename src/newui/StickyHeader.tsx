import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';

const StickyHeader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky header after scrolling past the hero section (about 800px)
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.header
      className="sticky-header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="sticky-header__inner">
        <div className="sticky-header__brand">
          <h1 className="sticky-header__name">Hana Oh</h1>
          <span className="sticky-header__title">HCI Researcher</span>
        </div>

        <nav className="sticky-header__nav">
          <Navigation />
        </nav>
      </div>
    </motion.header>
  );
};

export default StickyHeader;