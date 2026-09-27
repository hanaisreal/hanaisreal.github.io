import React from 'react';
import {
  EssaySection,
  MapBox,
  courseProjects,
  essaySections,
} from '../../components/data/researchCanvasData';
import SpectrumGraph from './SpectrumGraph';
import { Arrow, Box, Track, useSize } from './sketchKit';

// The research page as a short essay: each section pairs a few paragraphs
// with its hand-drawn sketch.

const LOOP_GAP = 56;

// Four steps drawn as a 2×2 cycle: top-left → top-right → bottom-right →
// bottom-left → back to the start.
const LoopSketch: React.FC<{ steps: MapBox[]; centre: string }> = ({ steps, centre }) => {
  const [ref, { w, h }] = useSize<HTMLDivElement>();
  const cw = (w - LOOP_GAP) / 2;
  const ch = (h - LOOP_GAP) / 2;
  const arrows: [number, number][][] = w > 0 ? [
    [[cw + 6, ch / 2], [cw + LOOP_GAP - 8, ch / 2]],
    [[cw + LOOP_GAP + cw / 2, ch + 6], [cw + LOOP_GAP + cw / 2, ch + LOOP_GAP - 8]],
    [[cw + LOOP_GAP - 6, ch + LOOP_GAP + ch / 2], [cw + 8, ch + LOOP_GAP + ch / 2]],
    [[cw / 2, ch + LOOP_GAP - 6], [cw / 2, ch + 8]],
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

const SectionSketch: React.FC<{ section: EssaySection }> = ({ section }) => {
  const { sketch } = section;
  if (sketch.kind === 'spectrum') return <SpectrumGraph />;
  if (sketch.kind === 'loop') return <LoopSketch steps={sketch.steps} centre={sketch.centre} />;
  return (
    <div className="ressay__track">
      <Track track={sketch.track} />
      {sketch.note && <p className="ressay__note">↓ {sketch.note}</p>}
    </div>
  );
};

const ResearchEssay: React.FC = () => (
  <div className="ressay">
    {essaySections.map((section) => (
      <section
        key={section.id}
        id={section.id}
        className={`ressay__section ressay__section--${section.sketch.kind}`}
      >
        <header className="ressay__head">
          <span className="ressay__num">{section.number}</span>
          <h2 className="ressay__title">{section.title}</h2>
        </header>
        <div className="ressay__prose">
          {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="ressay__sketch">
          <SectionSketch section={section} />
        </div>
      </section>
    ))}

    <section id="courses" className="ressay__section ressay__section--courses">
      <header className="ressay__head">
        <span className="ressay__num">✎</span>
        <h2 className="ressay__title">Course Projects</h2>
      </header>
      <ul className="ressay__courses">
        {courseProjects.map((c) => (
          <li key={c.id}>
            <span className="ressay__course">{c.course}</span>
            <span className="ressay__course-term">{c.term} · write-up coming soon</span>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default ResearchEssay;
