import React from 'react';
import { Link } from 'react-router-dom';
import { MapBox, MapTrack } from '../../components/data/researchCanvasData';
import { RoughRect, TONES, roughArrow, seedOf } from './rough';

// Shared pieces for the hand-drawn research page: sketched boxes, arrows
// between rows of boxes, and tracks of rows.

type Size = { w: number; h: number };
export type Point = [number, number];

export function useSize<T extends HTMLElement>(): [React.RefObject<T>, Size] {
  const ref = React.useRef<T>(null);
  const [size, setSize] = React.useState<Size>({ w: 0, h: 0 });
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setSize({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) });
    read();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

export const Arrow: React.FC<{ points: Point[]; seed: string; dashed?: boolean }> = ({ points, seed, dashed }) => {
  const { line, head } = React.useMemo(() => roughArrow(points, seedOf(seed)), [points, seed]);
  return (
    <g className={`rarrow${dashed ? ' rarrow--dashed' : ''}`}>
      {line.map((d, i) => <path key={i} d={d} strokeDasharray={dashed ? '6 6' : undefined} />)}
      {head.map((d, i) => <path key={`h${i}`} d={d} />)}
    </g>
  );
};

// A box with a sketched outline sized to whatever the content needs.
export const Sketch: React.FC<{
  tone: keyof typeof TONES;
  id: string;
  variant?: 'node' | 'frame' | 'dashed';
  strokeWidth?: number;
  className?: string;
  children: React.ReactNode;
}> = ({ tone, id, variant = 'node', strokeWidth, className, children }) => {
  const [ref, size] = useSize<HTMLDivElement>();
  const style = { '--ink': TONES[tone].ink, '--accent': TONES[tone].stroke } as React.CSSProperties;
  return (
    <div ref={ref} className={`sketch ${className ?? ''}`} style={style}>
      {size.w > 0 && (
        <RoughRect w={size.w} h={size.h} tone={tone} seed={seedOf(id)} variant={variant} strokeWidth={strokeWidth} />
      )}
      {children}
    </div>
  );
};

// Arrows between two rows of evenly sized boxes.
export const Connector: React.FC<{ from: number; to: number; id: string; height?: number }> = ({ from, to, id, height = 30 }) => {
  const [ref, { w }] = useSize<HTMLDivElement>();
  const centres = (n: number) => {
    const gap = 12;
    const bw = (w - gap * (n - 1)) / n;
    return Array.from({ length: n }, (_, i) => i * (bw + gap) + bw / 2);
  };
  const paths: Point[][] = [];
  if (w > 0) {
    const a = centres(from);
    const b = centres(to);
    const mid = Math.round(height / 2);
    a.forEach((ax, i) => b.forEach((bx, j) => {
      // Offset shared endpoints slightly so fan-in/fan-out arrows stay distinct.
      const sx = from === 1 && to > 1 ? ax + (j - (to - 1) / 2) * 16 : ax;
      const ex = to === 1 && from > 1 ? bx + (i - (from - 1) / 2) * 16 : bx;
      paths.push(Math.abs(sx - ex) < 1 ? [[sx, 1], [ex, height - 1]] : [[sx, 1], [sx, mid], [ex, mid], [ex, height - 1]]);
    }));
  }
  return (
    <div ref={ref} className="rconnector" style={{ height }} aria-hidden="true">
      <svg width={w} height={height}>
        {paths.map((p, i) => <Arrow key={i} points={p} seed={`${id}-${i}`} />)}
      </svg>
    </div>
  );
};

const BoxContent: React.FC<{ box: MapBox }> = ({ box }) => (
  <>
    <span className="sketch__meta">
      {box.eyebrow && <span className="sketch__eyebrow">{box.eyebrow}</span>}
      {box.badge && <span className="sketch__badge">{box.badge}</span>}
    </span>
    <span className="sketch__title">{box.title}</span>
    {box.body && <span className="sketch__body">{box.body}</span>}
    {box.range && (
      <span className="sketch__range">
        <span className="sketch__range-bar" aria-hidden="true" />
        <span className="sketch__range-ends">
          <span>{box.range.left}</span>
          <span>{box.range.right}</span>
        </span>
      </span>
    )}
  </>
);

export const Box: React.FC<{ box: MapBox }> = ({ box }) => {
  const className = `sketch--box sketch--${box.kind}${box.pending ? ' is-pending' : ''}`;
  const variant = box.pending ? 'dashed' : 'node';
  const sketch = (
    <Sketch tone={box.tone} id={box.id} variant={variant} className={className}>
      <BoxContent box={box} />
    </Sketch>
  );
  if (!box.pubSlug) return sketch;
  return (
    <Link
      to={`/publications/${box.pubSlug}`}
      className="sketch-link"
      data-analytics-event="research_map_paper"
      data-analytics-label={box.title}
      data-analytics-placement="research_map"
    >
      {sketch}
    </Link>
  );
};

export const Track: React.FC<{ track: MapTrack }> = ({ track }) => (
  <div className="rtrack">
    {track.rows.map((row, i) => (
      <React.Fragment key={i}>
        {i > 0 && <Connector from={track.rows[i - 1].length} to={row.length} id={`${track.id}-${i}`} />}
        <div className="rrow">
          {row.map((box) => <Box key={box.id} box={box} />)}
        </div>
      </React.Fragment>
    ))}
  </div>
);
