import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ChristmasToggleProps {
  onToggle: (isChristmas: boolean) => void;
}

const ChristmasToggle: React.FC<ChristmasToggleProps> = ({ onToggle }) => {
  const [isChristmas, setIsChristmas] = useState(false);

  const handleToggle = () => {
    const newState = !isChristmas;
    setIsChristmas(newState);
    onToggle(newState);
  };

  return (
    <motion.div
      className="christmas-toggle"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <motion.button
        onClick={handleToggle}
        className={`christmas-toggle__btn ${isChristmas ? 'christmas-toggle__btn--active' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isChristmas ? 'Switch to Normal Theme' : 'Switch to Christmas Theme'}
      >
        <motion.span
          className="christmas-toggle__icon"
          animate={{ rotate: isChristmas ? 360 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {isChristmas ? '🎄' : '❄️'}
        </motion.span>
        <span className="christmas-toggle__label">
          {isChristmas ? 'Ho Ho Ho!' : 'Christmas?'}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default ChristmasToggle;