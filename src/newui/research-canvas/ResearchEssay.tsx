import React from 'react';
import {
  EssaySection,
  MapBox,
  courseProjects,
  essaySections,
} from '../../components/data/researchCanvasData';
import SpectrumGraph from './SpectrumGraph';
import { Arrow, Box, Connector, Sketch, Track, useSize } from './sketchKit';

// The research page: a vertical flow of sections on the left. Hovering (or
// focusing) a section shows its paragraphs and sketch beside it. Every panel
// is laid out up front and only its visibility changes, so the page never
// shifts. Narrow screens open the detail inline under the tapped section.

const NARROW_QUERY = '(max-width: 860px)';
const GAP = 56;
const FLOW_W = 250; // matches the first .rmap column
const LOOP_GAP = 56;     // matches .rloop column gap
const LOOP_ROW_GAP = 44; // matches .rloop row gap

type SectionGeo = Record<string, { top: number; mid: number; panelH: number }>;

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

// Four steps drawn as a 2×2 cycle: top-left → top-right → bottom-right →
// bottom-left → back to the start.
const LoopSketch: React.FC<{ steps: MapBox[]; centre: string }> = ({ steps, centre }) => {
  const [ref, { w, h }] = useSize<HTMLDivElement>();
  const cw = (w - LOOP_GAP) / 2;
  const ch = (h - LOOP_ROW_GAP) / 2;
  const arrows: [number, number][][] = w > 0 ? [
    [[cw + 6, ch / 2], [cw + LOOP_GAP - 8, ch / 2]],
    [[cw + LOOP_GAP + cw / 2, ch + 6], [cw + LOOP_GAP + cw / 2, ch + LOOP_ROW_GAP - 8]],
    [[cw + LOOP_GAP - 6, ch + LOOP_ROW_GAP + ch / 2], [cw + 8, ch + LOOP_ROW_GAP + ch / 2]],
    [[cw / 2, ch + LOOP_ROW_GAP - 6], [cw / 2, ch + 8]],
  ] : [];
  // Reading order around the cycle, laid into grid cells.
  const cells = [steps[0], steps[1], steps[3], steps[2]];
  return (
    <div className="rloop" ref={ref}>
      {w > 0 && (
        <svg className="rloop__arrows" width={w} height={h} aria-hidden="true">
          {arrows.map((p, i) => <Arrow key={i} points={p} seed={`loop-${i}`} dashed />)}
        </svg>
      )}
      {cells.map((box) => <Box key={box.id} box={box} />)}
      <span className="rloop__centre" aria-hidden="true">↻ {centre}</span>
    </div>
  );
};

const SectionDetail: React.FC<{ section: EssaySection }> = ({ section }) => {
  const { sketch } = section;
  return (
    <div className="rdetail">
      <div className="rdetail__prose">
        {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="rdetail__sketch">
        {sketch.kind === 'spectrum' && <SpectrumGraph />}
        {sketch.kind === 'loop' && <LoopSketch steps={sketch.steps} centre={sketch.centre} />}
        {sketch.kind === 'track' && (
          <>
            <Track track={sketch.track} />
            {sketch.note && <p className="rdetail__note">↓ {sketch.note}</p>}
          </>
        )}
      </div>
    </div>
  );
};

const ResearchEssay: React.FC = () => {
  const narrow = useIsNarrow();
  // Nothing is open until a section is hovered; the flow then sits centred.
  const [active, setActive] = React.useState<string | null>(null);
  const [mapRef, { w: mapW }] = useSize<HTMLDivElement>();
  const flowRef = React.useRef<HTMLDivElement>(null);
  const blockRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const panelRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const [geo, setGeo] = React.useState<{ flowH: number; sections: SectionGeo }>({ flowH: 0, sections: {} });

  const measure = React.useCallback(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const sections: SectionGeo = {};
    essaySections.forEach((s) => {
      const el = blockRefs.current[s.id];
      if (!el) return;
      sections[s.id] = {
        top: el.offsetTop,
        mid: el.offsetTop + el.offsetHeight / 2,
        panelH: panelRefs.current[s.id]?.offsetHeight ?? 0,
      };
    });
    setGeo({ flowH: flow.offsetHeight, sections });
  }, []);

  React.useLayoutEffect(() => {
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    let frame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    if (flowRef.current) ro.observe(flowRef.current);
    Object.values(panelRefs.current).forEach((el) => el && ro.observe(el));
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [measure, narrow]);

  // Each panel starts level with its section, pulled up only if it would
  // run past the bottom of the flow.
  const panelTop = (id: string) => {
    const g = geo.sections[id];
    if (!g) return 0;
    return Math.max(0, Math.min(g.top, geo.flowH - g.panelH));
  };
  const detailHeight = Math.max(
    geo.flowH,
    ...essaySections.map((s) => panelTop(s.id) + (geo.sections[s.id]?.panelH ?? 0)),
  );

  const block = (section: EssaySection) => {
    const isActive = active === section.id;
    return (
      <Sketch
        as="button"
        tone={section.tone}
        id={`block-${section.id}`}
        variant={section.future ? 'dashed' : 'node'}
        strokeWidth={2.2}
        className={`sketch--phase${isActive ? ' is-active' : ''}`}
        aria-expanded={isActive}
        // Narrow screens toggle on tap only; hover/focus would fight the toggle.
        onMouseEnter={narrow ? undefined : () => setActive(section.id)}
        onFocus={narrow ? undefined : () => setActive(section.id)}
        onClick={() => setActive(narrow && isActive ? null : section.id)}
        data-analytics-event="research_section_open"
        data-analytics-label={section.title}
        data-analytics-placement="research_map"
      >
        <span className="sketch__eyebrow">{section.number}</span>
        <span className="sketch__title">{section.title}</span>
        <span className="sketch__hint" aria-hidden="true">{narrow ? (isActive ? '−' : '+') : '→'}</span>
      </Sketch>
    );
  };

  const flow = (
    <div
      className="rflow"
      ref={flowRef}
      style={!narrow && !active && mapW > 0
        ? { transform: `translateX(${(mapW - FLOW_W) / 2}px)` }
        : undefined}
    >
      {essaySections.map((section, i) => (
        <React.Fragment key={section.id}>
          {i > 0 && <Connector from={1} to={1} id={`into-${section.id}`} height={26} />}
          <div ref={(el) => { blockRefs.current[section.id] = el; }}>{block(section)}</div>
          {narrow && active === section.id && (
            <div className="rdetail-inline"><SectionDetail section={section} /></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const courses = (
    <section id="courses" className="rcourses">
      <h2 className="rcourses__title">Course Projects</h2>
      <ul className="rcourses__list">
        {courseProjects.map((c) => (
          <li key={c.id}>
            <span className="rcourses__course">{c.course}</span>
            <span className="rcourses__term">{c.term} · write-up coming soon</span>
          </li>
        ))}
      </ul>
    </section>
  );

  if (narrow) {
    return (
      <>
        <div className="rmap rmap--narrow">{flow}</div>
        {courses}
      </>
    );
  }

  return (
    <>
      <div className={`rmap${active ? '' : ' is-idle'}`} ref={mapRef} onMouseLeave={() => setActive(null)}>
        {flow}
        <div className="rpanels" style={{ height: detailHeight }}>
          {essaySections.map((section) => {
            const top = panelTop(section.id);
            const g = geo.sections[section.id];
            const arrowY = g ? g.mid - top : 0;
            const isActive = active === section.id;
            return (
              <div
                key={section.id}
                ref={(el) => { panelRefs.current[section.id] = el; }}
                className={`rpanel${isActive ? ' is-active' : ''}`}
                style={{ top }}
                aria-hidden={!isActive}
                onMouseEnter={() => setActive(section.id)}
              >
                <svg className="rpanel__arrow" style={{ top: arrowY - 10, left: -GAP }} width={GAP} height={20} aria-hidden="true">
                  <Arrow points={[[4, 10], [GAP - 8, 10]]} seed={`to-${section.id}`} />
                </svg>
                <SectionDetail section={section} />
              </div>
            );
          })}
        </div>
      </div>
      {courses}
    </>
  );
};

export default ResearchEssay;
