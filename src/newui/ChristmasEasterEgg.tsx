import React from 'react';
import { motion } from 'framer-motion';

const ChristmasEasterEgg: React.FC = () => {
  // Generate snowflakes with different sizes and speeds
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4, // 2-6px
    left: Math.random() * 100, // 0-100%
    duration: 8 + Math.random() * 12, // 8-20s fall duration
    delay: Math.random() * 20, // 0-20s initial delay
    opacity: 0.3 + Math.random() * 0.4, // 0.3-0.7 opacity
  }));

  return (
    <div className="christmas-snowfall">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="modern-snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
          }}
          initial={{ y: -10, rotate: 0 }}
          animate={{
            y: '100vh',
            rotate: 360,
            x: [0, 15, -15, 0], // Gentle drift
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: 3 + Math.random() * 2, // 3-5s drift cycle
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
        />
      ))}
    </div>
  );
};

export default ChristmasEasterEgg;