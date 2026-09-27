import React from 'react';
import rough from 'roughjs';
import type { Drawable, Options } from 'roughjs/bin/core';
import type { CanvasTone } from '../../components/data/researchCanvasData';

// Hand-drawn strokes, Excalidraw style. Shapes are generated once per
// size/tone and rendered as plain SVG paths so React owns the markup.

const gen = rough.generator();

export const TONES: Record<CanvasTone, { stroke: string; fill: string; ink: string }> = {
  neutral: { stroke: '#8f8f8f', fill: '#f6f6f4', ink: '#555555' },
  novice: { stroke: '#0288d1', fill: '#e1f5fe', ink: '#01579b' },
  expert: { stroke: '#7b1fa2', fill: '#f3e5f5', ink: '#4a148c' },
  paper: { stroke: '#d81b60', fill: '#fff0f5', ink: '#880e4f' },
  memory: { stroke: '#388e3c', fill: '#e8f5e9', ink: '#1b5e20' },
};

export const seedOf = (id: string) => {
  let h = 7;
  for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 2147483647;
  return h || 1;
};

type RoughPath = { d: string; kind: 'stroke' | 'fill' };

function toRoughPaths(drawable: Drawable): RoughPath[] {
  return drawable.sets.map((set) => ({
    d: gen.opsToPath(set, 2),
    kind: set.type === 'fillSketch' ? 'fill' : 'stroke',
  }));
}

const PAD = 6;

interface RectProps {
  w: number;
  h: number;
  tone: CanvasTone;
  seed: number;
  variant?: 'node' | 'frame' | 'dashed';
  strokeWidth?: number;
}

export const RoughRect: React.FC<RectProps> = React.memo(({ w, h, tone, seed, variant = 'node', strokeWidth = 1.6 }) => {
  const c = TONES[tone];
  const paths = React.useMemo(() => {
    const options: Options = {
      seed,
      stroke: c.stroke,
      strokeWidth,
      roughness: variant === 'frame' ? 0.6 : 1.1,
      bowing: variant === 'frame' ? 0.4 : 1,
      preserveVertices: false,
    };
    if (variant === 'node') {
      Object.assign(options, {
        fill: c.stroke,
        fillStyle: 'hachure',
        hachureGap: 7,
        hachureAngle: -41,
        fillWeight: 0.5,
      });
    }
    return toRoughPaths(gen.rectangle(PAD, PAD, w, h, options));
  }, [c.stroke, h, seed, strokeWidth, variant, w]);

  return (
    <svg
      className="rough"
      width={w + PAD * 2}
      height={h + PAD * 2}
      style={{ left: -PAD, top: -PAD }}
      aria-hidden="true"
    >
      <rect x={PAD} y={PAD} width={w} height={h} fill={c.fill} />
      {paths.map((p, i) =>
        p.kind === 'fill' ? (
          <path key={i} d={p.d} fill="none" stroke={c.stroke} strokeWidth={0.5} opacity={0.16} />
        ) : (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={c.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={variant === 'dashed' ? '7 6' : undefined}
          />
        ),
      )}
    </svg>
  );
});

type Point = [number, number];

export function roughArrow(points: Point[], seed: number, dashed = false) {
  const base: Options = {
    seed,
    roughness: 0.9,
    bowing: 1.2,
    stroke: '#2b2b2b',
    strokeWidth: 1.4,
  };
  const line = toRoughPaths(gen.linearPath(points, base)).map((p) => p.d);

  const [x1, y1] = points[points.length - 2];
  const [x2, y2] = points[points.length - 1];
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = [0.5, -0.5].map((spread) => {
    const a = angle + Math.PI - spread;
    const tip: Point = [x2 + Math.cos(a) * 11, y2 + Math.sin(a) * 11];
    return toRoughPaths(gen.line(x2, y2, tip[0], tip[1], { ...base, roughness: 0.6 }))[0].d;
  });

  return { line, head, dashed };
}

// Loose strokes for free-form drawings (the spectrum graph).
export function roughPolyline(points: Point[], seed: number, options: Options = {}) {
  return toRoughPaths(gen.linearPath(points, { seed, roughness: 1, bowing: 1, ...options })).map((p) => p.d);
}

export function roughPolygon(points: Point[], seed: number, options: Options = {}) {
  return toRoughPaths(gen.polygon(points, { seed, roughness: 0.8, ...options }));
}

export function roughEllipse(cx: number, cy: number, w: number, h: number, seed: number, options: Options = {}) {
  return toRoughPaths(gen.ellipse(cx, cy, w, h, { seed, roughness: 1.2, ...options })).map((p) => p.d);
}
