import React from 'react';
import { Arrow, Point, useSize } from './sketchKit';
import { roughEllipse, roughPolygon, roughPolyline, seedOf } from './rough';

// The functional ↔ personal spectrum from the hand-drawn sketch. A diagonal
// splits the box into two triangles: at any point along the axis, the height
// above the diagonal is the functional share and the height below it is the
// personal share. Vertical lines mark where familiar tools sit, so the
// spectrum reads through examples. Hovering a triangle or a line changes the
// note beside the graph.

type Focus = 'a' | 'b' | string | null;

const INK = '#262626'; // pen
const PENCIL = '#6b6b6b';
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type Note = { eyebrow: string; title: string; body: string };

const NOTES: Record<'a' | 'b' | 'default', Note> = {
  a: {
    eyebrow: 'A · functional',
    title: 'Procedural Automation',
    body: 'Automating routine, structured tasks through explicit rules.',
  },
  b: {
    eyebrow: 'B · personal',
    title: 'Personal, Expert Work',
    body: 'Augmenting complex, judgment-driven tasks rooted in individual domain expertise.',
  },
  default: {
    eyebrow: 'My direction',
    title: 'Toward the personal end',
    body: 'Agents that adapt to each person’s intent and expertise, not one model for everyone.',
  },
};

// Position along the axis (0 = A, 1 = B) and the note shown on hover.
const MARKERS: { id: string; t: number; label: string; note: Note }[] = [
  {
    id: 'automation',
    t: 0.12,
    label: 'Zapier, UiPath',
    note: {
      eyebrow: 'Example · functional',
      title: 'Zapier, UiPath',
      body: 'Rule-based workflows that run the same way for everyone.',
    },
  },
  {
    id: 'assistants',
    t: 0.46,
    label: 'ChatGPT, Copilot',
    note: {
      eyebrow: 'Example · in between',
      title: 'ChatGPT, Copilot',
      body: 'General-purpose assistants: capable, but largely the same model for everyone.',
    },
  },
  {
    id: 'personal-agents',
    t: 0.82,
    label: 'Hermes Agent, OpenClaw',
    note: {
      eyebrow: 'Example · personal',
      title: 'Hermes Agent, OpenClaw',
      body: 'Personal agents that keep memory and build skills around one user.',
    },
  },
];

const Strokes: React.FC<{ paths: string[]; width?: number; color?: string; dashed?: boolean }> = ({ paths, width = 1.6, color = INK, dashed }) => (
  <>
    {paths.map((d, i) => (
      <path key={i} d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? '5 6' : undefined} />
    ))}
  </>
);

const SpectrumGraph: React.FC = () => {
  const [wrapRef, { w }] = useSize<HTMLDivElement>();
  const [focus, setFocus] = React.useState<Focus>(null);

  const x0 = 64;
  const x1 = Math.max(x0 + 200, w - 76);
  const rectW = x1 - x0;
  const y0 = 40;
  const y1 = y0 + clamp(rectW * 0.3, 110, 160);
  const height = y1 + 66;
  const xAt = (t: number) => x0 + t * rectW;

  const frame = React.useMemo(() => ({
    box: roughPolyline([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]], seedOf('spectrum-box'), { strokeWidth: 1.6 }),
    diagonal: [
      ...roughPolyline([[x0, y1], [x1, y0]], seedOf('diag-1'), { bowing: 2 }),
      ...roughPolyline([[x0 + 2, y1 + 3], [x1, y0 + 4]], seedOf('diag-2'), { bowing: 2 }),
    ],
    circleA: roughEllipse(x0 - 32, y0 + 8, 44, 42, seedOf('circle-a')),
    circleB: roughEllipse(x1 + 40, y1 - 18, 44, 42, seedOf('circle-b')),
    markers: MARKERS.map((m) => roughPolyline([[xAt(m.t), y0 - 6], [xAt(m.t), y1 + 6]], seedOf(`marker-${m.id}`), { roughness: 0.7 })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [x0, x1, y0, y1]);

  const triangleA: Point[] = [[x0, y0], [x1, y0], [x0, y1]];
  const triangleB: Point[] = [[x0, y1], [x1, y0], [x1, y1]];
  const highlight = React.useMemo(() => {
    if (focus !== 'a' && focus !== 'b') return [];
    const pts = focus === 'a' ? triangleA : triangleB;
    return roughPolygon(pts, seedOf(`fill-${focus}`), {
      fill: INK, fillStyle: 'hachure', hachureGap: 9, hachureAngle: focus === 'a' ? -41 : 41, fillWeight: 0.8, stroke: 'none',
    }).filter((p) => p.kind === 'fill').map((p) => p.d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, x0, x1, y0, y1]);

  const marker = MARKERS.find((m) => m.id === focus);
  const note = marker ? marker.note : focus === 'a' || focus === 'b' ? NOTES[focus] : NOTES.default;

  return (
    <div className="spectrum">
      <div className="spectrum__graph" ref={wrapRef}>
        {w > 0 && (
          <svg
            width={w}
            height={height}
            role="img"
            aria-label="Spectrum from procedural automation (A) to personal, expert work (B), with example tools placed along it"
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
            <text className="spectrum__label" x={x1 - 12} y={y1 - 14} textAnchor="end">personal</text>
            <text className="spectrum__label spectrum__label--sm" x={x0 - 34} y={y1 + 30}>automating</text>
            <text className="spectrum__label spectrum__label--sm" x={x0 - 34} y={y1 + 50}>repetitive tasks</text>
            <text className="spectrum__label spectrum__label--sm" x={x1 + 60} y={y1 + 30} textAnchor="end">personal &amp;</text>
            <text className="spectrum__label spectrum__label--sm" x={x1 + 60} y={y1 + 50} textAnchor="end">expert workflows</text>

            {/* Where my research is heading: toward B */}
            <g className="spectrum__direction">
              <Arrow points={[[xAt(0.3), y1 + 22], [xAt(0.74), y1 + 22]]} seed="direction" />
            </g>
            <text className="spectrum__label" x={xAt(0.52)} y={y1 + 50} textAnchor="middle">my direction</text>

            {/* Hover targets for the two triangles */}
            <polygon
              points={triangleA.map((p) => p.join(',')).join(' ')}
              fill="#fff" fillOpacity={0} pointerEvents="all"
              onMouseEnter={() => setFocus('a')} onMouseLeave={() => setFocus(null)}
            />
            <polygon
              points={triangleB.map((p) => p.join(',')).join(' ')}
              fill="#fff" fillOpacity={0} pointerEvents="all"
              onMouseEnter={() => setFocus('b')} onMouseLeave={() => setFocus(null)}
            />

            {/* Example tools, drawn on top so their lines win the hover */}
            {MARKERS.map((m, i) => {
              const x = xAt(m.t);
              const active = focus === m.id;
              return (
                <g
                  key={m.id}
                  className={`spectrum__marker${active ? ' is-active' : ''}`}
                  tabIndex={0}
                  aria-label={`${m.note.title}: ${m.note.body}`}
                  onMouseEnter={() => setFocus(m.id)}
                  onMouseLeave={() => setFocus(null)}
                  onFocus={() => setFocus(m.id)}
                  onBlur={() => setFocus(null)}
                >
                  <Strokes paths={frame.markers[i]} width={active ? 2 : 1.4} color={active ? INK : PENCIL} dashed={!active} />
                  <text className="spectrum__example" x={x} y={y0 - 12} textAnchor="middle">{m.label}</text>
                  <rect x={x - 12} y={y0 - 30} width={24} height={y1 - y0 + 36} fill="#fff" fillOpacity={0} />
                </g>
              );
            })}
          </svg>
        )}
      </div>
      <aside className="spectrum__note" aria-live="polite">
        <span className="spectrum__note-eyebrow">{note.eyebrow}</span>
        <span className="spectrum__note-title">{note.title}</span>
        <p className="spectrum__note-body">{note.body}</p>
      </aside>
    </div>
  );
};

export default SpectrumGraph;
