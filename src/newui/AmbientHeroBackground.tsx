import React, { useEffect, useRef } from 'react';

const ambientItems = [
  { label: 'human experience', className: 'ambient-word ambient-word--one' },
  { label: 'expression', className: 'ambient-word ambient-word--two' },
  { label: 'awareness', className: 'ambient-word ambient-word--three' },
  { label: 'adaptation', className: 'ambient-word ambient-word--four' },
  { label: 'interaction', className: 'ambient-word ambient-word--five' },
  { label: 'context', className: 'ambient-word ambient-word--six' },
  { label: 'interpretation', className: 'ambient-word ambient-word--seven' },
];

const AmbientHeroBackground: React.FC = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const rect = layer.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        layer.style.setProperty('--ambient-x', `${x * 18}px`);
        layer.style.setProperty('--ambient-y', `${y * 11}px`);
        frame = 0;
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={layerRef} className="ambient-hero" aria-hidden="true">
      <div className="ambient-hero__particles">
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index} className={`ambient-dot ambient-dot--${index + 1}`} />
        ))}
      </div>
      {ambientItems.map((item) => (
        <span key={item.label} className={item.className}>
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default AmbientHeroBackground;
