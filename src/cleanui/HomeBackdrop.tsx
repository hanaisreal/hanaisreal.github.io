import React from 'react';

/**
 * Soft pastel blobs behind the home sheet. They drift on their own and
 * lean gently toward the cursor. Disabled under prefers-reduced-motion.
 */
const HomeBackdrop: React.FC = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = 0.5;
    let targetY = 0.4;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
    };
    const tick = () => {
      x += (targetX - x) * 0.04;
      y += (targetY - y) * 0.04;
      el.style.setProperty('--mx', x.toFixed(4));
      el.style.setProperty('--my', y.toFixed(4));
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="c-backdrop" ref={ref} aria-hidden="true">
      <span className="c-blob c-blob--1" />
      <span className="c-blob c-blob--2" />
      <span className="c-blob c-blob--3" />
      <span className="c-blob c-blob--4" />
    </div>
  );
};

export default HomeBackdrop;
