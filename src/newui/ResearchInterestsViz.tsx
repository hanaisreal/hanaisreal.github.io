import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface InterestNode {
  text: string;
  size: number;
  x: number;
  y: number;
  color: string;
  category: 'primary' | 'secondary' | 'tertiary';
  gradient: string;
}

const researchInterests: InterestNode[] = [
  // Primary interests (largest)
  {
    text: 'Human-AI Interaction',
    size: 36,
    x: 0,
    y: -40,
    color: '#2e5d8a',
    category: 'primary',
    gradient: 'radial-gradient(ellipse 180px 100px at center, rgba(46, 93, 138, 0.15), transparent)'
  },
  {
    text: 'Digital Resilience',
    size: 32,
    x: -140,
    y: 60,
    color: '#b38b59',
    category: 'primary',
    gradient: 'radial-gradient(ellipse 160px 90px at center, rgba(179, 139, 89, 0.15), transparent)'
  },
  {
    text: 'Ethical AI',
    size: 30,
    x: 120,
    y: 50,
    color: '#7a6e64',
    category: 'primary',
    gradient: 'radial-gradient(ellipse 140px 85px at center, rgba(122, 110, 100, 0.15), transparent)'
  },

  // Secondary interests (medium)
  {
    text: 'Conversational AI',
    size: 24,
    x: -80,
    y: -80,
    color: '#1a3b58',
    category: 'secondary',
    gradient: 'radial-gradient(ellipse 140px 80px at center, rgba(26, 59, 88, 0.12), transparent)'
  },
  {
    text: 'Social Good',
    size: 22,
    x: 150,
    y: -40,
    color: '#c6b8a4',
    category: 'secondary',
    gradient: 'radial-gradient(ellipse 120px 75px at center, rgba(198, 184, 164, 0.12), transparent)'
  },
  {
    text: 'Deepfake Detection',
    size: 22,
    x: 80,
    y: 120,
    color: '#16110a',
    category: 'secondary',
    gradient: 'radial-gradient(ellipse 140px 75px at center, rgba(22, 17, 10, 0.12), transparent)'
  },
  {
    text: 'Large-scale Analysis',
    size: 20,
    x: -160,
    y: 0,
    color: '#2e5d8a',
    category: 'secondary',
    gradient: 'radial-gradient(ellipse 150px 70px at center, rgba(46, 93, 138, 0.12), transparent)'
  },
  {
    text: 'Perspective-Taking',
    size: 20,
    x: 40,
    y: -120,
    color: '#b38b59',
    category: 'secondary',
    gradient: 'radial-gradient(ellipse 140px 70px at center, rgba(179, 139, 89, 0.12), transparent)'
  },

  // Tertiary interests (smaller)
  {
    text: 'Epistemic Agency',
    size: 16,
    x: -60,
    y: 140,
    color: '#7a6e64',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 120px 60px at center, rgba(122, 110, 100, 0.1), transparent)'
  },
  {
    text: 'User Behavior',
    size: 16,
    x: 180,
    y: 20,
    color: '#1a3b58',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 110px 60px at center, rgba(26, 59, 88, 0.1), transparent)'
  },
  {
    text: 'Mixed Methods',
    size: 15,
    x: -190,
    y: -60,
    color: '#c6b8a4',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 110px 55px at center, rgba(198, 184, 164, 0.1), transparent)'
  },
  {
    text: 'Interface Design',
    size: 14,
    x: -120,
    y: -120,
    color: '#16110a',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 120px 55px at center, rgba(22, 17, 10, 0.1), transparent)'
  },
  {
    text: 'System Building',
    size: 14,
    x: -100,
    y: 120,
    color: '#2e5d8a',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 110px 55px at center, rgba(46, 93, 138, 0.1), transparent)'
  },
  {
    text: 'Qualitative Coding',
    size: 13,
    x: 140,
    y: -100,
    color: '#b38b59',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 120px 50px at center, rgba(179, 139, 89, 0.1), transparent)'
  },
  {
    text: 'Log Analysis',
    size: 13,
    x: 20,
    y: 160,
    color: '#7a6e64',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 100px 50px at center, rgba(122, 110, 100, 0.1), transparent)'
  },
];

const ResearchInterestsViz: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.max(0.5, Math.min(2.5, prev * delta)));
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    container.addEventListener('wheel', handleWheel);
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, offset]);

  return (
    <div className="research-viz">
      <h3>Research interests</h3>
      <div
        ref={containerRef}
        className="research-viz__container"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          className="research-viz__canvas"
          style={{
            transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
          }}
        >
          {/* Render gradient clouds first (behind text) */}
          {researchInterests.map((interest, index) => (
            <motion.div
              key={`cloud-${interest.text}`}
              className="research-viz__cloud"
              style={{
                left: `calc(50% + ${interest.x}px)`,
                top: `calc(50% + ${interest.y}px)`,
                background: interest.gradient,
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
            />
          ))}

          {/* Render text nodes on top */}
          {researchInterests.map((interest, index) => (
            <motion.div
              key={interest.text}
              className={`research-viz__node research-viz__node--${interest.category}`}
              style={{
                left: `calc(50% + ${interest.x}px)`,
                top: `calc(50% + ${interest.y}px)`,
                fontSize: `${interest.size}px`,
                color: interest.color,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{
                scale: 1.1,
                color: '#2e5d8a',
                transition: { duration: 0.2 }
              }}
            >
              {interest.text}
            </motion.div>
          ))}
        </div>
      </div>
      <p className="research-viz__hint">
        Scroll to zoom • Drag to explore • Hover to highlight
      </p>
    </div>
  );
};

export default ResearchInterestsViz;