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
  description: string;
  connections?: string[];
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
    gradient: 'radial-gradient(ellipse 180px 100px at center, rgba(46, 93, 138, 0.15), transparent)',
    description: 'Exploring how humans and AI systems collaborate, focusing on trust, agency, and seamless interaction patterns.',
    connections: ['Conversational AI', 'Perspective-Taking', 'Interface Design']
  },
  {
    text: 'Digital Resilience',
    size: 32,
    x: -140,
    y: 60,
    color: '#b38b59',
    category: 'primary',
    gradient: 'radial-gradient(ellipse 160px 90px at center, rgba(179, 139, 89, 0.15), transparent)',
    description: 'Building systems and interventions that help users develop healthy, sustainable relationships with technology.',
    connections: ['Social Good', 'User Behavior', 'System Building']
  },
  {
    text: 'Ethical AI',
    size: 30,
    x: 120,
    y: 50,
    color: '#7a6e64',
    category: 'primary',
    gradient: 'radial-gradient(ellipse 140px 85px at center, rgba(122, 110, 100, 0.15), transparent)',
    description: 'Ensuring AI systems are designed with fairness, transparency, and human values at their core.',
    connections: ['Deepfake Detection', 'Epistemic Agency', 'Social Good']
  },

  // Secondary interests (medium)
  {
    text: 'Conversational AI',
    size: 24,
    x: -80,
    y: -80,
    color: '#1a3b58',
    category: 'secondary',
    gradient: 'radial-gradient(ellipse 140px 80px at center, rgba(26, 59, 88, 0.12), transparent)',
    description: 'Designing natural, context-aware dialogue systems that support human goals and preserve conversational agency.'
  },
  {
    text: 'Social Good',
    size: 22,
    x: 150,
    y: -40,
    color: '#c6b8a4',
    category: 'secondary',
    gradient: 'radial-gradient(ellipse 120px 75px at center, rgba(198, 184, 164, 0.12), transparent)',
    description: 'Leveraging technology and research to address societal challenges and promote inclusive, equitable outcomes.'
  },
  {
    text: 'Deepfake Detection',
    size: 22,
    x: 80,
    y: 120,
    color: '#16110a',
    category: 'secondary',
    gradient: 'radial-gradient(ellipse 140px 75px at center, rgba(22, 17, 10, 0.12), transparent)',
    description: 'Developing systems to identify and combat synthetic media, protecting information integrity and trust.'
  },
  {
    text: 'Large-scale Analysis',
    size: 20,
    x: -160,
    y: 0,
    color: '#2e5d8a',
    category: 'secondary',
    gradient: 'radial-gradient(ellipse 150px 70px at center, rgba(46, 93, 138, 0.12), transparent)',
    description: 'Analyzing large datasets to uncover patterns in human-AI interaction and user behavior.'
  },
  {
    text: 'Perspective-Taking',
    size: 20,
    x: 40,
    y: -120,
    color: '#b38b59',
    category: 'secondary',
    gradient: 'radial-gradient(ellipse 140px 70px at center, rgba(179, 139, 89, 0.12), transparent)',
    description: 'Understanding how AI systems can support users in considering multiple viewpoints and developing empathy.'
  },

  // Tertiary interests (smaller)
  {
    text: 'Epistemic Agency',
    size: 16,
    x: -60,
    y: 140,
    color: '#7a6e64',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 120px 60px at center, rgba(122, 110, 100, 0.1), transparent)',
    description: 'Preserving human control over knowledge formation and decision-making in AI-assisted environments.'
  },
  {
    text: 'User Behavior',
    size: 16,
    x: 180,
    y: 20,
    color: '#1a3b58',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 110px 60px at center, rgba(26, 59, 88, 0.1), transparent)',
    description: 'Studying how people interact with technology and understanding behavioral patterns in digital environments.'
  },
  {
    text: 'Mixed Methods',
    size: 15,
    x: -190,
    y: -60,
    color: '#c6b8a4',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 110px 55px at center, rgba(198, 184, 164, 0.1), transparent)',
    description: 'Combining quantitative and qualitative approaches for comprehensive research insights.'
  },
  {
    text: 'Interface Design',
    size: 14,
    x: -120,
    y: -120,
    color: '#16110a',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 120px 55px at center, rgba(22, 17, 10, 0.1), transparent)',
    description: 'Creating intuitive, human-centered interfaces that enhance user experience and accessibility.'
  },
  {
    text: 'System Building',
    size: 14,
    x: -100,
    y: 120,
    color: '#2e5d8a',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 110px 55px at center, rgba(46, 93, 138, 0.1), transparent)',
    description: 'Developing robust, scalable systems that support research goals and user needs.'
  },
  {
    text: 'Qualitative Coding',
    size: 13,
    x: 140,
    y: -100,
    color: '#b38b59',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 120px 50px at center, rgba(179, 139, 89, 0.1), transparent)',
    description: 'Systematic analysis of qualitative data to extract meaningful insights and patterns.'
  },
  {
    text: 'Log Analysis',
    size: 13,
    x: 20,
    y: 160,
    color: '#7a6e64',
    category: 'tertiary',
    gradient: 'radial-gradient(ellipse 100px 50px at center, rgba(122, 110, 100, 0.1), transparent)',
    description: 'Mining system logs and user interaction data to understand usage patterns and system performance.'
  },
];

const ResearchInterestsViz: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number; visible: boolean }>({ text: '', x: 0, y: 0, visible: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.max(0.5, Math.min(2.5, prev * delta)));
    };

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.research-viz__node')) return; // Don't drag when clicking nodes
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
          {/* Render connection lines when a node is hovered */}
          {hoveredNode && (
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              {researchInterests
                .find(node => node.text === hoveredNode)
                ?.connections?.map((connectionText) => {
                  const fromNode = researchInterests.find(n => n.text === hoveredNode);
                  const toNode = researchInterests.find(n => n.text === connectionText);
                  if (!fromNode || !toNode) return null;

                  const fromX = 50 + (fromNode.x / 10);
                  const fromY = 50 + (fromNode.y / 10);
                  const toX = 50 + (toNode.x / 10);
                  const toY = 50 + (toNode.y / 10);

                  return (
                    <motion.line
                      key={`connection-${fromNode.text}-${toNode.text}`}
                      x1={`${fromX}%`}
                      y1={`${fromY}%`}
                      x2={`${toX}%`}
                      y2={`${toY}%`}
                      stroke="rgba(46, 93, 138, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  );
                })}
            </svg>
          )}

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
              animate={{
                opacity: 1,
                scale: hoveredNode === interest.text ? 1.2 : 1
              }}
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
                cursor: 'default',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                scale: hoveredNode === interest.text ? 1.1 : 1,
                color: hoveredNode === interest.text ? '#2e5d8a' : interest.color,
                opacity: 1,
              }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              onMouseEnter={(e) => {
                setHoveredNode(interest.text);
                const rect = e.currentTarget.getBoundingClientRect();
                const containerRect = containerRef.current?.getBoundingClientRect();
                if (containerRect) {
                  setTooltip({
                    text: interest.description,
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top - 10,
                    visible: true
                  });
                }
              }}
              onMouseLeave={() => {
                setHoveredNode(null);
                setTooltip(prev => ({ ...prev, visible: false }));
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              {interest.text}
            </motion.div>
          ))}
        </div>

        {/* Tooltip */}
        {tooltip.visible && (
          <motion.div
            className="research-viz__tooltip"
            style={{
              position: 'absolute',
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translateX(-50%) translateY(-100%)',
              background: 'var(--bg-contrast)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              maxWidth: '200px',
              fontSize: '0.85rem',
              color: 'var(--text)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              pointerEvents: 'none'
            }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            {tooltip.text}
          </motion.div>
        )}
      </div>

      <p className="research-viz__hint">
        Scroll to zoom • Drag to explore • Hover for details
      </p>
    </div>
  );
};

export default ResearchInterestsViz;