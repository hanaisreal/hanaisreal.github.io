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
      'While AI has evolved into a powerful generalized tool, it fails to adapt to the deeply unique nature of human workflows. User interaction with AI exists on a highly variable spectrum: some leverage AI for functional, procedural automation, while others depend on it to navigate deeply personal, value-centric tasks derived from professional expertise.',
      'Because a one-size-fits-all model cannot serve both extremes, my goal is to bridge this gap by building truly personalized AI agents.',
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
      'To understand how different demographics and expertise levels shape user intent when interacting with AI, I took an exploratory approach.',
      'With Prof. Hajin Lim, I designed DeepAware, a system that embeds users’ own faces and voices into simulated scam scenarios to make deepfake threats personally relevant. A study with 21 older adults showed improvements in knowledge, perceived vulnerability, and coping efficacy.',
      'At Prof. Juho Kim’s KIXLAB, our team deployed WriteAid, an AI writing assistant, in K-12 classrooms and collected over 14,000 conversation logs. I contributed to developing a coding framework to analyze engagement patterns.',
      'Across these studies, engagement shifted with proficiency. Lower-proficiency students often delegated creative tasks without expressing a specific intent, which led to premature convergence, while higher-proficiency students held a clearer mental model and used AI selectively. AI systems cannot remain static; they need to adapt to where each user is.',
    ],
    sketch: {
      kind: 'track',
      track: {
        id: 'understanding',
        rows: [
          [
            { id: 'u-deepaware', kind: 'paper', tone: 'paper', pubSlug: 'deepaware', eyebrow: 'CHI ’26', title: 'DeepAware', body: 'Personal relevance in learning, with older adults' },
            { id: 'u-scaffold', kind: 'paper', tone: 'paper', pubSlug: 'when-scaffolding-breaks', eyebrow: 'CHI ’26', badge: 'Best Paper', title: 'When Scaffolding Breaks', body: '14,000+ logs from K-12 classrooms' },
          ],
          [
            {
              id: 'u-observed', kind: 'insight', tone: 'neutral', eyebrow: 'What I observed',
              title: 'Engagement shifted with proficiency',
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
      'To build interpretable systems for value-centric workflows, AI must first externalize tacit human judgment that is otherwise difficult to articulate.',
      'In ToneCanvas, writers revising a long novel can tell when a character sounds wrong, but that judgment remains tacit and scattered across hundreds of pages. We built an LLM-based editing interface that extracts character tone from a manuscript and represents it as an inspectable visual object. In a study with 16 writers, structuring tone visually helped participants pinpoint cross-chapter inconsistencies and make more precise revisions.',
      'Yet the judgment made visible did not outlive the task: a writer opening a new manuscript starts with an empty tone map.',
    ],
    sketch: {
      kind: 'track',
      note: 'but it resets when the task ends',
      track: {
        id: 'interfaces',
        rows: [
          [{ id: 'i-tacit', kind: 'state', tone: 'novice', eyebrow: 'Tacit judgment', title: '“This character sounds wrong”', body: 'Scattered across hundreds of pages' }],
          [{ id: 'i-tonecanvas', kind: 'paper', tone: 'paper', pubSlug: 'tonecanvas', eyebrow: 'UIST ’26 Poster', title: 'ToneCanvas', body: 'Character tone as an inspectable visual object' }],
          [{ id: 'i-visible', kind: 'strategy', tone: 'expert', eyebrow: 'Interpretable', title: 'Judgment made visible', body: 'Pinpointing cross-chapter inconsistencies' }],
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
      'User intent accumulates over days, weeks, and months. This is where I want to go next: memory that records context without prematurely judging its importance, and keeps the user’s own phrasing instead of lossy summaries.',
      'Combined with interpretable tools, I envision a closed loop: extracting insights from raw memory, turning them into reusable workflows and skills, executing them with user feedback, and continuously updating them.',
    ],
    sketch: {
      kind: 'loop',
      centre: 'continuously',
      steps: [
        { id: 'm-raw', kind: 'state', tone: 'memory', pending: true, eyebrow: 'Record', title: 'Raw memory', body: 'Without judging importance' },
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
