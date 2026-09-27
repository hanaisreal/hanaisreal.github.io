// researchCanvasData.ts
//
// The /research page: a vertical flow of four sections. Hovering a section
// opens its paragraphs and hand-drawn sketch to the right. Section 0 is an
// interactive spectrum, sections 1–2 are rows of sketched boxes, section 3
// is a closed loop.
// Paper boxes point at publications by slug so titles, venues, and links
// live in publicationsData only.

export type BoxKind = 'state' | 'strategy' | 'paper' | 'insight';

// Colour families, echoing the hand-drawn sketches.
export type CanvasTone =
  | 'neutral' | 'novice' | 'expert' | 'paper' | 'memory'
  | 'vision' | 'understanding' | 'interfaces';

export interface MapBox {
  id: string;
  kind: BoxKind;
  tone: CanvasTone;
  eyebrow?: string;
  title: string;
  body?: string;
  pubSlug?: string;        // links to publicationsData
  badge?: string;          // e.g. "Best Paper"
  pending?: boolean;       // drawn dashed: an interest, not finished work
  range?: { left: string; right: string }; // a gradient bar with two ends
}

export interface MapTrack {
  id: string;
  rows: MapBox[][];
}

export type EssaySketch =
  | { kind: 'spectrum' }
  | { kind: 'track'; track: MapTrack; note?: string }
  | { kind: 'loop'; steps: MapBox[]; centre: string };

export interface EssaySection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tone: CanvasTone;
  future?: boolean;        // drawn dashed: where I'm heading, not done yet
  paragraphs: string[];
  sketch: EssaySketch;
}

export const essaySections: EssaySection[] = [
  {
    id: 'vision',
    number: '00',
    title: 'The Vision of Personalized Agents',
    subtitle: 'Functional automation ↔ personal, expert tasks',
    tone: 'vision',
    paragraphs: [
      'People use AI across a spectrum, from automating repetitive tasks to navigating personal, expert work. One model cannot serve both ends.',
    ],
    sketch: { kind: 'spectrum' },
  },
  {
    id: 'understanding',
    number: '01',
    title: 'Understanding Diverse User Intents',
    subtitle: 'Exploratory studies across users',
    tone: 'understanding',
    paragraphs: [
      'To see how intent differs across people, I explored two settings: older adults learning about deepfakes, and K-12 students writing with AI. Engagement shifted with proficiency, so AI cannot stay static.',
    ],
    sketch: {
      kind: 'track',
      track: {
        id: 'understanding',
        rows: [
          [
            { id: 'u-deepaware', kind: 'paper', tone: 'paper', pubSlug: 'deepaware', eyebrow: 'CHI ’26', title: 'DeepAware', body: 'Older adults' },
            { id: 'u-scaffold', kind: 'paper', tone: 'paper', pubSlug: 'when-scaffolding-breaks', eyebrow: 'CHI ’26', badge: 'Best Paper', title: 'When Scaffolding Breaks', body: 'K-12 classrooms' },
          ],
          [
            {
              id: 'u-observed', kind: 'insight', tone: 'neutral', eyebrow: 'What I observed',
              title: 'Engagement shifts with proficiency',
              range: { left: 'delegated without a specific intent', right: 'clear mental model, selective use' },
            },
          ],
          [
            { id: 'u-adapt', kind: 'strategy', tone: 'expert', eyebrow: 'Implication', title: 'Adapt to where each user is', body: 'exploratory scaffolding ↔ interpretable control' },
          ],
        ],
      },
    },
  },
  {
    id: 'interfaces',
    number: '02',
    title: 'Designing Interpretable Interfaces',
    subtitle: 'Making tacit judgment visible',
    tone: 'interfaces',
    paragraphs: [
      'Expert judgment is often tacit. ToneCanvas makes a writer’s sense of character tone visible and editable, but once the task ends, that judgment is gone.',
    ],
    sketch: {
      kind: 'track',
      note: 'but it resets when the task ends',
      track: {
        id: 'interfaces',
        rows: [
          [{ id: 'i-tacit', kind: 'state', tone: 'novice', eyebrow: 'Tacit judgment', title: '“This character sounds wrong”' }],
          [{ id: 'i-tonecanvas', kind: 'paper', tone: 'paper', pubSlug: 'tonecanvas', eyebrow: 'UIST ’26 Poster', title: 'ToneCanvas', body: 'Tone as a visual object' }],
          [{ id: 'i-visible', kind: 'strategy', tone: 'expert', eyebrow: 'Interpretable', title: 'Judgment made visible' }],
        ],
      },
    },
  },
  {
    id: 'memory',
    number: '03',
    title: 'Next: Memory and Workflow Extraction',
    subtitle: 'Where I’m heading',
    tone: 'memory',
    future: true,
    paragraphs: [
      'Intent builds up over weeks and months. Next, I want memory that keeps people’s own words and turns them into skills that improve with feedback.',
    ],
    sketch: {
      kind: 'loop',
      centre: 'continuously',
      steps: [
        { id: 'm-raw', kind: 'state', tone: 'memory', pending: true, eyebrow: 'Record', title: 'People’s own words' },
        { id: 'm-skills', kind: 'strategy', tone: 'memory', pending: true, eyebrow: 'Extract', title: 'Reusable workflows & skills' },
        { id: 'm-execute', kind: 'strategy', tone: 'memory', pending: true, eyebrow: 'Execute', title: 'With user feedback' },
        { id: 'm-update', kind: 'strategy', tone: 'memory', pending: true, eyebrow: 'Update', title: 'Skills keep evolving' },
      ],
    },
  },
];

// Spring 2026 courses; write-ups to come from the user's course materials.
export const courseProjects = [
  { id: 'social-philosophy', course: 'Seminar in Social Philosophy', term: 'Spring 2026' },
  { id: 'user-experience', course: 'User Experience', term: 'Spring 2026' },
];
