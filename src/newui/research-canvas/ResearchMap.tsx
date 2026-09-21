import React from 'react';
import { Link } from 'react-router-dom';
import {
  MAP_LOOP,
  MAP_START,
  MapBox,
  MapTrack,
  PhaseId,
  ResearchPhase,
  researchPhases,
} from '../../components/data/researchCanvasData';
import { RoughRect, TONES, roughArrow, seedOf } from './rough';

// Hand-drawn research map. The macro flow is a vertical column; hovering or
// focusing a phase shows its detail beside it. Nothing pans or zooms: every
// panel is laid out up front and only its visibility changes, so the page
// never shifts.

const NARROW_QUERY = '(max-width: 820px)';
const GAP = 56;

type Size = { w: number; h: number };
type PhaseGeo = Partial<Record<PhaseId, { top: number; mid: number; panelH: number }>>;

function useSize<T extends HTMLElement>(): [React.RefObject<T>, Size] {
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

function useIsNarrow() {
  const [narrow, setNarrow] = React.useState(() => window.matchMedia(NARROW_QUERY).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY);
    const onChange = () => setNarrow(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return narrow;
}

type Point = [number, number];

const Arrow: React.FC<{ points: Point[]; seed: string; dashed?: boolean }> = ({ points, seed, dashed }) => {
  const { line, head } = React.useMemo(() => roughArrow(points, seedOf(seed)), [points, seed]);
  return (
    <g className={`rarrow${dashed ? ' rarrow--dashed' : ''}`}>
      {line.map((d, i) => <path key={i} d={d} strokeDasharray={dashed ? '6 6' : undefined} />)}
      {head.map((d, i) => <path key={`h${i}`} d={d} />)}
    </g>
  );
};

// A box with a sketched outline sized to whatever the content needs.
const Sketch: React.FC<{
  tone: keyof typeof TONES;
  id: string;
  variant?: 'node' | 'frame' | 'dashed';
  strokeWidth?: number;
  className?: string;
  as?: 'div' | 'button';
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>> = ({ tone, id, variant = 'node', strokeWidth, className, as = 'div', children, ...rest }) => {
  const [ref, size] = useSize<HTMLElement>();
  const style = { '--ink': TONES[tone].ink, '--accent': TONES[tone].stroke } as React.CSSProperties;
  const Tag = as as any;
  return (
    <Tag ref={ref} className={`sketch ${className ?? ''}`} style={style} {...rest}>
      {size.w > 0 && (
        <RoughRect w={size.w} h={size.h} tone={tone} seed={seedOf(id)} variant={variant} strokeWidth={strokeWidth} />
      )}
      {children}
    </Tag>
  );
};

// Arrows between two rows of evenly sized boxes.
const Connector: React.FC<{ from: number; to: number; id: string; height?: number }> = ({ from, to, id, height = 30 }) => {
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
  </>
);

const Box: React.FC<{ box: MapBox }> = ({ box }) => {
  const className = `sketch--box sketch--${box.kind}${box.pending ? ' is-pending' : ''}`;
  const variant = box.pending ? 'dashed' : 'node';
  if (box.pubSlug) {
    return (
      <Link
        to={`/publications/${box.pubSlug}`}
        className="sketch-link"
        data-analytics-event="research_map_paper"
        data-analytics-label={box.title}
        data-analytics-placement="research_map"
      >
        <Sketch tone={box.tone} id={box.id} variant={variant} className={className}>
          <BoxContent box={box} />
        </Sketch>
      </Link>
    );
  }
  return (
    <Sketch tone={box.tone} id={box.id} variant={variant} className={className}>
      <BoxContent box={box} />
    </Sketch>
  );
};

const Track: React.FC<{ track: MapTrack }> = ({ track }) => {
  const body = track.rows.map((row, i) => (
    <React.Fragment key={i}>
      {i > 0 && <Connector from={track.rows[i - 1].length} to={row.length} id={`${track.id}-${i}`} />}
      <div className="rrow">
        {row.map((box) => <Box key={box.id} box={box} />)}
      </div>
    </React.Fragment>
  ));
  if (!track.frame) return <div className="rtrack">{body}</div>;
  return (
    <Sketch tone={track.frame.tone} id={track.id} variant="frame" strokeWidth={1.2} className="rtrack rtrack--framed">
      <span className="rtrack__label">
        <span className="sketch__eyebrow">{track.frame.eyebrow}</span> {track.frame.title}
      </span>
      {body}
    </Sketch>
  );
};

const PhaseDetail: React.FC<{ phase: ResearchPhase }> = ({ phase }) => (
  <div className="rdetail">
    <p className="rdetail__summary">{phase.summary}</p>
    <div className="rdetail__tracks" style={{ gridTemplateColumns: `repeat(${phase.tracks.length}, minmax(0, 1fr))` }}>
      {phase.tracks.map((t) => <Track key={t.id} track={t} />)}
    </div>
  </div>
);

const ResearchMap: React.FC = () => {
  const narrow = useIsNarrow();
  const [active, setActive] = React.useState<PhaseId | null>(null);
  const flowRef = React.useRef<HTMLDivElement>(null);
  const phaseRefs = React.useRef<Partial<Record<PhaseId | 'start' | 'loop', HTMLElement | null>>>({});
  const panelRefs = React.useRef<Partial<Record<PhaseId, HTMLDivElement | null>>>({});
  const [geo, setGeo] = React.useState<{
    flowH: number;
    startMid: number;
    loopMid: number;
    phases: PhaseGeo;
  }>({ flowH: 0, startMid: 0, loopMid: 0, phases: {} });

  const measure = React.useCallback(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const mid = (el?: HTMLElement | null) => (el ? el.offsetTop + el.offsetHeight / 2 : 0);
    const phases: PhaseGeo = {};
    researchPhases.forEach((p) => {
      const el = phaseRefs.current[p.id];
      if (!el) return;
      phases[p.id] = { top: el.offsetTop, mid: mid(el), panelH: panelRefs.current[p.id]?.offsetHeight ?? 0 };
    });
    setGeo({
      flowH: flow.offsetHeight,
      startMid: mid(phaseRefs.current.start),
      loopMid: mid(phaseRefs.current.loop),
      phases,
    });
  }, []);

  React.useLayoutEffect(() => {
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    if (flowRef.current) ro.observe(flowRef.current);
    Object.values(panelRefs.current).forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [measure, narrow]);

  // Each panel starts level with its phase, pulled up only if it would run
  // past the bottom of the flow.
  const panelTop = (id: PhaseId) => {
    const g = geo.phases[id];
    if (!g) return 0;
    return Math.max(0, Math.min(g.top, geo.flowH - g.panelH));
  };
  const detailHeight = Math.max(
    geo.flowH,
    ...researchPhases.map((p) => panelTop(p.id) + (geo.phases[p.id]?.panelH ?? 0)),
  );

  const phaseBlock = (phase: ResearchPhase) => {
    const isActive = active === phase.id;
    return (
      <Sketch
        as="button"
        key={phase.id}
        tone={phase.id}
        id={phase.id}
        strokeWidth={2.2}
        className={`sketch--phase${isActive ? ' is-active' : ''}`}
        aria-expanded={isActive}
        // Narrow screens toggle on tap only; hover/focus would fight the toggle.
        onMouseEnter={narrow ? undefined : () => setActive(phase.id)}
        onFocus={narrow ? undefined : () => setActive(phase.id)}
        onClick={() => setActive(narrow && isActive ? null : phase.id)}
        data-analytics-event="research_phase_open"
        data-analytics-label={phase.title}
        data-analytics-placement="research_map"
      >
        <span className="sketch__eyebrow">{phase.label}</span>
        <span className="sketch__title">{phase.title}</span>
        <span className="sketch__body">{phase.subtitle}</span>
        <span className="sketch__hint" aria-hidden="true">{narrow ? (isActive ? '−' : '+') : '→'}</span>
      </Sketch>
    );
  };

  const flow = (
    <div className="rflow" ref={flowRef}>
      {geo.loopMid > geo.startMid && (
        <svg className="rflow__loop" style={{ top: geo.startMid, height: geo.loopMid - geo.startMid + 2 }} aria-hidden="true">
          <Arrow
            dashed
            seed="loop"
            points={[[36, geo.loopMid - geo.startMid], [10, geo.loopMid - geo.startMid], [10, 1], [36, 1]]}
          />
        </svg>
      )}
      {geo.loopMid > geo.startMid && (
        <span className="rflow__loop-label" style={{ top: (geo.startMid + geo.loopMid) / 2 }}>{MAP_LOOP.label}</span>
      )}
      <div ref={(el) => { phaseRefs.current.start = el; }}>
        <Sketch tone="neutral" id="start" variant="dashed" className="sketch--anchor">
          <span className="sketch__eyebrow">{MAP_START.eyebrow}</span>
          <span className="sketch__title">{MAP_START.title}</span>
        </Sketch>
      </div>
      {researchPhases.map((phase) => (
        <React.Fragment key={phase.id}>
          <Connector from={1} to={1} id={`into-${phase.id}`} height={36} />
          <div ref={(el) => { phaseRefs.current[phase.id] = el; }}>{phaseBlock(phase)}</div>
          {narrow && active === phase.id && (
            <div className="rdetail-inline"><PhaseDetail phase={phase} /></div>
          )}
        </React.Fragment>
      ))}
      <Connector from={1} to={1} id="into-loop" height={36} />
      <div ref={(el) => { phaseRefs.current.loop = el; }}>
        <Sketch tone="neutral" id="loop" variant="dashed" className="sketch--anchor">
          <span className="sketch__eyebrow">{MAP_LOOP.eyebrow}</span>
          <span className="sketch__title">{MAP_LOOP.title}</span>
        </Sketch>
      </div>
    </div>
  );

  if (narrow) return <div className="rmap rmap--narrow">{flow}</div>;

  return (
    <div className="rmap">
      {flow}
      <div className="rpanels" style={{ height: detailHeight }}>
        {!active && (
          <p className="rpanels__hint">← hover a phase to see the work inside it</p>
        )}
        {researchPhases.map((phase) => {
          const top = panelTop(phase.id);
          const g = geo.phases[phase.id];
          const arrowY = g ? g.mid - top : 0;
          return (
            <div
              key={phase.id}
              ref={(el) => { panelRefs.current[phase.id] = el; }}
              className={`rpanel${active === phase.id ? ' is-active' : ''}`}
              style={{ top }}
              aria-hidden={active !== phase.id}
              onMouseEnter={() => setActive(phase.id)}
            >
              <svg className="rpanel__arrow" style={{ top: arrowY - 10, left: -GAP }} width={GAP} height={20} aria-hidden="true">
                <Arrow points={[[4, 10], [GAP - 8, 10]]} seed={`to-${phase.id}`} />
              </svg>
              <PhaseDetail phase={phase} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResearchMap;
