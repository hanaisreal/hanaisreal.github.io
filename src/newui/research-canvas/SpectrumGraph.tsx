import React from 'react';
import { Point, useSize } from './sketchKit';
import { roughEllipse, roughPolygon, roughPolyline, seedOf } from './rough';

// The functional ↔ experience spectrum from the hand-drawn sketch. A diagonal
// splits the box into two triangles: at any point along the axis, the height
// above the diagonal is the functional share and the height below it is the
// experiential share. Two draggable bars mark the range we work in today.
// Hovering a triangle or a bar changes the note on the right.

type Focus = 'a' | 'b' | 'range';

const INK = '#262626'; // pen
const MIN_GAP = 0.08;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const NOTES: Record<Exclude<Focus, 'range'>, { eyebrow: string; title: string; body: string }> = {
  a: {
    eyebrow: 'A · functional',
    title: 'Automating repetitive tasks',
    body: 'Functional, procedural automation.',
  },
  b: {
    eyebrow: 'B · experience',
    title: 'Personal, expert tasks',
    body: 'Personal, value-centric work from professional expertise.',
  },
};

const Strokes: React.FC<{ paths: string[]; width?: number; dashed?: boolean }> = ({ paths, width = 1.6, dashed }) => (
  <>
    {paths.map((d, i) => (
      <path key={i} d={d} fill="none" stroke={INK} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? '5 6' : undefined} />
    ))}
  </>
);

const SpectrumGraph: React.FC = () => {
  const [wrapRef, { w }] = useSize<HTMLDivElement>();
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [bars, setBars] = React.useState<[number, number]>([0.32, 0.62]);
  const [focus, setFocus] = React.useState<Focus>('range');
  const dragging = React.useRef<0 | 1 | null>(null);

  const x0 = 64;
  const x1 = Math.max(x0 + 200, w - 76);
  const rectW = x1 - x0;
  const y0 = 36;
  const y1 = y0 + clamp(rectW * 0.3, 110, 160);
  const height = y1 + 80;
  const xAt = (t: number) => x0 + t * rectW;

  const frame = React.useMemo(() => ({
    box: roughPolyline([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]], seedOf('spectrum-box'), { strokeWidth: 1.6 }),
    diagonal: [
      ...roughPolyline([[x0, y1], [x1, y0]], seedOf('diag-1'), { bowing: 2 }),
      ...roughPolyline([[x0 + 2, y1 + 3], [x1, y0 + 4]], seedOf('diag-2'), { bowing: 2 }),
    ],
    circleA: roughEllipse(x0 - 32, y0 + 8, 44, 42, seedOf('circle-a')),
    circleB: roughEllipse(x1 + 40, y1 - 18, 44, 42, seedOf('circle-b')),
  }), [x0, x1, y0, y1]);

  const triangleA: Point[] = [[x0, y0], [x1, y0], [x0, y1]];
  const triangleB: Point[] = [[x0, y1], [x1, y0], [x1, y1]];
  const highlight = React.useMemo(() => {
    if (focus === 'range') return [];
    const pts = focus === 'a' ? triangleA : triangleB;
    return roughPolygon(pts, seedOf(`fill-${focus}`), {
      fill: INK, fillStyle: 'hachure', hachureGap: 9, hachureAngle: focus === 'a' ? -41 : 41, fillWeight: 0.8, stroke: 'none',
    }).filter((p) => p.kind === 'fill').map((p) => p.d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, x0, x1, y0, y1]);

  const [ta, tb] = bars;
  const xa = xAt(ta);
  const xb = xAt(tb);
  const xm = (xa + xb) / 2;
  const barPaths = [
    roughPolyline([[xa, y0 - 16], [xa, y1 + 14]], seedOf('bar-a'), { roughness: 0.7 }),
    roughPolyline([[xb, y0 - 16], [xb, y1 + 14]], seedOf('bar-b'), { roughness: 0.7 }),
  ];
  const brace = roughPolyline(
    [[xa + 4, y1 + 20], [xa + 10, y1 + 30], [xm - 9, y1 + 30], [xm, y1 + 42], [xm + 9, y1 + 30], [xb - 10, y1 + 30], [xb - 4, y1 + 20]],
    seedOf('brace'),
    { roughness: 0.6, bowing: 0.5 },
  );

  const moveBar = (i: 0 | 1, t: number) => {
    setBars(([a, b]) => (i === 0
      ? [clamp(t, 0.02, b - MIN_GAP), b]
      : [a, clamp(t, a + MIN_GAP, 0.98)]));
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (dragging.current === null || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    moveBar(dragging.current, (e.clientX - rect.left - x0) / rectW);
  };

  const startDrag = (i: 0 | 1) => (e: React.PointerEvent) => {
    dragging.current = i;
    setFocus('range');
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const onKey = (i: 0 | 1) => (e: React.KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 0.02 : e.key === 'ArrowLeft' ? -0.02 : 0;
    if (!step) return;
    e.preventDefault();
    moveBar(i, bars[i] + step);
  };

  const pct = (v: number) => Math.round(v * 100);
  const note = focus === 'range'
    ? {
        eyebrow: 'We are at this range',
        title: 'Using AI, harnessing AI toward the extreme',
        body: `${pct(1 - tb)}–${pct(1 - ta)}% functional · ${pct(ta)}–${pct(tb)}% experience`,
      }
    : NOTES[focus];

  return (
    <div className="spectrum">
      <div className="spectrum__graph" ref={wrapRef}>
        {w > 0 && (
          <svg
            ref={svgRef}
            width={w}
            height={height}
            onPointerMove={onPointerMove}
            onPointerUp={() => { dragging.current = null; }}
            onPointerCancel={() => { dragging.current = null; }}
            role="img"
            aria-label="Spectrum from functional automation (A) to personal, expert tasks (B)"
          >
            {highlight.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#6a6a6a" strokeWidth={0.8} opacity={0.4} />
            ))}
            <Strokes paths={frame.box} />
            <Strokes paths={frame.diagonal} width={1.3} />
            <Strokes paths={frame.circleA} width={1.4} />
            <Strokes paths={frame.circleB} width={1.4} />
            <text className="spectrum__letter" x={x0 - 32} y={y0 + 17} textAnchor="middle">A</text>
            <text className="spectrum__letter" x={x1 + 40} y={y1 - 9} textAnchor="middle">B</text>
            <text className="spectrum__label" x={x0 + 12} y={y0 + 30}>functional</text>
            <text className="spectrum__label" x={x1 - 12} y={y1 - 14} textAnchor="end">experience</text>
            <text className="spectrum__label spectrum__label--sm" x={x0 - 34} y={y1 + 30}>automating</text>
            <text className="spectrum__label spectrum__label--sm" x={x0 - 34} y={y1 + 50}>repetitive task</text>
            <text className="spectrum__label spectrum__label--sm" x={x1 + 60} y={y1 + 30} textAnchor="end">more personal,</text>
            <text className="spectrum__label spectrum__label--sm" x={x1 + 60} y={y1 + 50} textAnchor="end">specific expert task</text>

            {/* Hover targets for the two triangles */}
            <polygon
              points={triangleA.map((p) => p.join(',')).join(' ')}
              fill="#fff" fillOpacity={0} pointerEvents="all"
              onMouseEnter={() => setFocus('a')} onMouseLeave={() => setFocus('range')}
            />
            <polygon
              points={triangleB.map((p) => p.join(',')).join(' ')}
              fill="#fff" fillOpacity={0} pointerEvents="all"
              onMouseEnter={() => setFocus('b')} onMouseLeave={() => setFocus('range')}
            />

            <Strokes paths={brace} width={1.3} />
            <text className="spectrum__label" x={xm} y={y1 + 66} textAnchor="middle">we are at this range</text>

            {([xa, xb] as const).map((x, i) => (
              <g
                key={i}
                className="spectrum__bar"
                tabIndex={0}
                role="slider"
                aria-label={i === 0 ? 'Range start' : 'Range end'}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct(bars[i])}
                onPointerDown={startDrag(i as 0 | 1)}
                onMouseEnter={() => setFocus('range')}
                onFocus={() => setFocus('range')}
                onKeyDown={onKey(i as 0 | 1)}
              >
                <Strokes paths={barPaths[i]} width={1.8} />
                <circle cx={x} cy={y1 + 14} r={5} fill="#fff" stroke={INK} strokeWidth={1.6} />
                <rect x={x - 12} y={y0 - 18} width={24} height={y1 - y0 + 40} fill="#fff" fillOpacity={0} />
              </g>
            ))}
          </svg>
        )}
      </div>
      <aside className="spectrum__note" aria-live="polite">
        <span className="spectrum__note-eyebrow">{note.eyebrow}</span>
        <span className="spectrum__note-title">{note.title}</span>
        <p className="spectrum__note-body">{note.body}</p>
        <span className="spectrum__note-hint">drag the bars · hover A or B</span>
      </aside>
    </div>
  );
};

export default SpectrumGraph;
