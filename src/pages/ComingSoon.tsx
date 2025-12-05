import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StickyHeader from '../newui/StickyHeader';
import '../newui/newPortfolio.css';
import './ComingSoon.css';

const ComingSoon: React.FC = () => {
  return (
    <div className="coming-soon-page">
      <StickyHeader />

      <main className="coming-soon-main">
        <div className="coming-soon-container">
          <motion.div
            className="coming-soon-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Back Link */}
            <Link to="/" className="coming-soon-back">
              ← Back to Portfolio
            </Link>

            {/* Main Content */}
            <motion.div
              className="coming-soon-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Animated Icon */}
              <motion.div
                className="coming-soon-icon"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>

              <h1 className="coming-soon-title">
                Something Beautiful
                <br />
                is Coming Soon
              </h1>

              <p className="coming-soon-description">
                Crafting....in progress...
              </p>

              <motion.div
                className="coming-soon-features"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="feature-item">
                  <span className="feature-icon">🫧</span>
                  <span>Physics-based bubbles</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🌈</span>
                  <span>Iridescent effects</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <span>Interactive word exploration</span>
                </div>
              </motion.div>

              <motion.p
                className="coming-soon-eta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Expected launch: Soon™
              </motion.p>
            </motion.div>

            {/* Floating particles */}
            <div className="particles-container">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="particle"
                  animate={{
                    y: [-20, -100, -20],
                    x: [0, Math.sin(i) * 30, 0],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.8,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ComingSoon;