import React, { useEffect, useRef } from 'react';

type KeywordNode = {
  label: string;
  homeX: number;
  homeY: number;
  size?: 'sm' | 'md';
};

type DotNode = {
  homeX: number;
  homeY: number;
  size?: 'sm' | 'md';
  opacity?: number;
};

const keywordNodes: KeywordNode[] = [
  { label: 'human experience', homeX: 0.42, homeY: 0.23 },
  { label: 'expression', homeX: 0.68, homeY: 0.28 },
  { label: 'awareness', homeX: 0.56, homeY: 0.67 },
  { label: 'adaptation', homeX: 0.84, homeY: 0.72 },
  { label: 'interaction', homeX: 0.33, homeY: 0.58, size: 'sm' },
  { label: 'context', homeX: 0.73, homeY: 0.55, size: 'sm' },
  { label: 'interpretation', homeX: 0.49, homeY: 0.82, size: 'sm' },
];

const dotNodes: DotNode[] = [
  { homeX: 0.78, homeY: 0.18 },
  { homeX: 0.66, homeY: 0.2, size: 'sm' },
  { homeX: 0.54, homeY: 0.31 },
  { homeX: 0.81, homeY: 0.48, size: 'sm' },
  { homeX: 0.61, homeY: 0.74 },
  { homeX: 0.44, homeY: 0.76, size: 'sm' },
  { homeX: 0.88, homeY: 0.6 },
  { homeX: 0.7, homeY: 0.86, size: 'sm' },
  { homeX: 0.52, homeY: 0.63 },
  { homeX: 0.39, homeY: 0.29, size: 'sm' },
  { homeX: 0.34, homeY: 0.42 },
  { homeX: 0.29, homeY: 0.77, size: 'sm' },
  { homeX: 0.23, homeY: 0.59, opacity: 0.13 },
  { homeX: 0.19, homeY: 0.36, size: 'sm', opacity: 0.12 },
  { homeX: 0.15, homeY: 0.7, opacity: 0.12 },
  { homeX: 0.11, homeY: 0.82, size: 'sm', opacity: 0.11 },
  { homeX: 0.77, homeY: 0.83, opacity: 0.12 },
  { homeX: 0.55, homeY: 0.9, size: 'sm', opacity: 0.13 },
  { homeX: 0.36, homeY: 0.14, opacity: 0.12 },
  { homeX: 0.2, homeY: 0.21, size: 'sm', opacity: 0.1 },
  { homeX: 0.87, homeY: 0.83, size: 'sm', opacity: 0.11 },
  { homeX: 0.07, homeY: 0.54, opacity: 0.1 },
  { homeX: 0.25, homeY: 0.1, size: 'sm', opacity: 0.12 },
  { homeX: 0.47, homeY: 0.88, opacity: 0.13 },
];

const AmbientHeroBackground: React.FC = () => {
  const layerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const linkRefs = useRef<Array<SVGLineElement | null>>([]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bounds = { width: 1, height: 1 };

    const nodes = keywordNodes.map((node) => ({
      ...node,
      homePx: { x: 0, y: 0 },
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: node.size === 'sm' ? 56 : 74,
    }));

    const dots = dotNodes.map((dot) => ({
      ...dot,
      homePx: { x: 0, y: 0 },
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    }));

    let pointer = { x: 0, y: 0, active: false };
    let draggedIndex: number | null = null;
    let animationFrame = 0;

    const syncHomes = () => {
      const rect = layer.getBoundingClientRect();
      bounds.width = rect.width || 1;
      bounds.height = rect.height || 1;

      nodes.forEach((node) => {
        const homeX = node.homeX * bounds.width;
        const homeY = node.homeY * bounds.height;
        node.homePx = { x: homeX, y: homeY };
        if (!node.x && !node.y) {
          node.x = homeX;
          node.y = homeY;
        }
      });

      dots.forEach((dot) => {
        const homeX = dot.homeX * bounds.width;
        const homeY = dot.homeY * bounds.height;
        dot.homePx = { x: homeX, y: homeY };
        if (!dot.x && !dot.y) {
          dot.x = homeX;
          dot.y = homeY;
        }
      });
    };

    const setPointer = (event: PointerEvent) => {
      const rect = layer.getBoundingClientRect();
      pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };

    const renderStatic = () => {
      wordRefs.current.forEach((element, index) => {
        const node = nodes[index];
        if (!element || !node) return;
        element.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) translate(-50%, -50%)`;
      });
      dotRefs.current.forEach((element, index) => {
        const dot = dots[index];
        if (!element || !dot) return;
        element.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      });
    };

    const tick = () => {
      if (!reduceMotion) {
        nodes.forEach((node, index) => {
          const isDraggingThis = draggedIndex === index;

          if (isDraggingThis) {
            const dx = pointer.x - node.x;
            const dy = pointer.y - node.y;
            node.vx += dx * 0.24;
            node.vy += dy * 0.24;
          } else {
            node.vx += (node.homePx.x - node.x) * 0.018;
            node.vy += (node.homePx.y - node.y) * 0.018;
          }

          if (draggedIndex !== null) {
            const draggedNode = nodes[draggedIndex];
            if (draggedNode && !isDraggingThis) {
              const dx = node.x - draggedNode.x;
              const dy = node.y - draggedNode.y;
              const distanceSq = dx * dx + dy * dy || 1;
              if (distanceSq < 118 * 118) {
                const distance = Math.sqrt(distanceSq);
                const force = (118 - distance) * 0.00045;
                node.vx += (dx / distance) * force * 42;
                node.vy += (dy / distance) * force * 42;
              }
            }
          }

          node.vx *= isDraggingThis ? 0.42 : 0.74;
          node.vy *= isDraggingThis ? 0.42 : 0.74;
          node.x += node.vx;
          node.y += node.vy;
        });

        dots.forEach((dot) => {
          dot.vx += (dot.homePx.x - dot.x) * 0.026;
          dot.vy += (dot.homePx.y - dot.y) * 0.026;

          const repelSource = draggedIndex == null ? null : nodes[draggedIndex];
          if (repelSource) {
            const dx = dot.x - repelSource.x;
            const dy = dot.y - repelSource.y;
            const distanceSq = dx * dx + dy * dy || 1;
            if (distanceSq < 108 * 108) {
              const distance = Math.sqrt(distanceSq);
              const force = (108 - distance) * 0.0012;
              dot.vx += (dx / distance) * force * 34;
              dot.vy += (dy / distance) * force * 34;
            }
          }

          dot.vx *= 0.72;
          dot.vy *= 0.72;
          dot.x += dot.vx;
          dot.y += dot.vy;
        });
      }

      wordRefs.current.forEach((element, index) => {
        const node = nodes[index];
        if (!element || !node) return;
        element.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) translate(-50%, -50%)`;
        element.classList.toggle('is-dragged', draggedIndex === index);
      });

      dotRefs.current.forEach((element, index) => {
        const dot = dots[index];
        if (!element || !dot) return;
        element.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      });

      linkRefs.current.forEach((line, index) => {
        if (!line) return;
        const source = nodes[index % nodes.length];
        const target = nodes[(index + 2) % nodes.length];
        line.setAttribute('x1', String(source.x));
        line.setAttribute('y1', String(source.y));
        line.setAttribute('x2', String(target.x));
        line.setAttribute('y2', String(target.y));
        line.style.opacity = draggedIndex === null ? '0' : index < 3 ? '0.1' : '0.04';
      });

      animationFrame = window.requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => setPointer(event);
    const handlePointerLeave = () => {
      pointer.active = false;
    };
    const handlePointerUp = () => {
      draggedIndex = null;
      layer.classList.remove('is-dragging');
    };

    syncHomes();
    renderStatic();
    animationFrame = window.requestAnimationFrame(tick);

    window.addEventListener('resize', syncHomes);
    layer.addEventListener('pointermove', handlePointerMove, { passive: true });
    layer.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerup', handlePointerUp);

    const wordElements = [...wordRefs.current];
    const cleanups = wordElements.map((element, index) => {
      if (!element) return () => undefined;
      const handlePointerDown = (event: PointerEvent) => {
        event.preventDefault();
        setPointer(event);
        draggedIndex = index;
        layer.classList.add('is-dragging');
        element.setPointerCapture?.(event.pointerId);
      };
      element.addEventListener('pointerdown', handlePointerDown);
      return () => element.removeEventListener('pointerdown', handlePointerDown);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', syncHomes);
      layer.removeEventListener('pointermove', handlePointerMove);
      layer.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerup', handlePointerUp);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div ref={layerRef} className="ambient-hero" aria-hidden="true">
      <svg className="ambient-hero__links" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <line key={index} ref={(element) => { linkRefs.current[index] = element; }} />
        ))}
      </svg>
      <div className="ambient-hero__particles">
        {dotNodes.map((dot, index) => (
          <span
            key={index}
            ref={(element) => { dotRefs.current[index] = element; }}
            className={`ambient-dot${dot.size === 'sm' ? ' ambient-dot--sm' : ''}`}
            style={dot.opacity ? { opacity: dot.opacity } : undefined}
          />
        ))}
      </div>
      {keywordNodes.map((item, index) => (
        <span
          key={item.label}
          ref={(element) => { wordRefs.current[index] = element; }}
          className={`ambient-word${item.size === 'sm' ? ' ambient-word--sm' : ''}`}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default AmbientHeroBackground;
