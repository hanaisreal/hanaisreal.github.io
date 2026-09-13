import React from 'react';

/**
 * Pastel particle field behind the home sheet. Particles drift slowly on
 * their own and are pulled toward the cursor; the pull is strong enough to
 * read as a response, then eases back. Static under prefers-reduced-motion.
 */

const COLORS = ['#f4b8c4', '#a9c4f5', '#a8dfc0', '#f7d98a', '#d3bff2'];
const COUNT = 110;
const PULL_RADIUS = 260;
const PULL_STRENGTH = 0.9;

type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; a: number };

const HomeBackdrop: React.FC = () => {
  const ref = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    let particles: P[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) {
        particles = Array.from({ length: COUNT }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 2 + Math.random() * 4,
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
          a: 0.55 + Math.random() * 0.35,
        }));
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (!reduce) {
          if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d < PULL_RADIUS && d > 0.001) {
              const f = ((PULL_RADIUS - d) / PULL_RADIUS) * PULL_STRENGTH;
              p.vx += (dx / d) * f * 0.12;
              p.vy += (dy / d) * f * 0.12;
            }
          }
          p.vx *= 0.96;
          p.vy *= 0.96;
          // keep a little drift alive
          p.vx += (Math.random() - 0.5) * 0.03;
          p.vy += (Math.random() - 0.5) * 0.03;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
        }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        g.addColorStop(0, p.c);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.globalAlpha = p.a;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = window.requestAnimationFrame(step);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    step();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas className="c-backdrop" ref={ref} aria-hidden="true" />;
};

export default HomeBackdrop;
