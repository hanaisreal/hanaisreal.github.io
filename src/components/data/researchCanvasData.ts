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
  tone: CanvasTone;
  future?: boolean;        // drawn dashed: where I'm heading, not done yet
  paragraphs: string[];
  sketch: EssaySketch;
  current?: CurrentWork;   // live work under the sketch, with external links
}

export interface CurrentWork {
  eyebrow: string;
  title: string;
  body: string;
  links: { label: string; url: string }[];
}

export const essaySections: EssaySection[] = [
  {
    id: 'vision',
    number: '00',
    title: 'The Vision of Personalized Agents',
    tone: 'vision',
    paragraphs: [
      'Human-AI interaction spans a broad spectrum, ranging from routine task automation to value-centric expert workflows. Because human needs vary dramatically across these domains, a single generic model inevitably fails at both extremes.',
    ],
    sketch: { kind: 'spectrum' },
  },
  {
    id: 'understanding',
    number: '01',
    title: 'Understanding Diverse User Intents',
    tone: 'understanding',
    paragraphs: [
      'User intent is deeply shaped by domain background and proficiency. Through empirical studies with older adults evaluating deepfakes and K-12 students writing with AI, I observed that user agency shifts significantly as expertise increases. AI systems cannot remain static; they must dynamically adapt to each user’s unique context.',
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
              title: 'Interaction styles shift with user proficiency',
              range: { left: 'full delegation (unarticulated intent)', right: 'selective use (clear structural vision)' },
            },
          ],
          [
            { id: 'u-adapt', kind: 'strategy', tone: 'expert', eyebrow: 'Implication', title: 'Adaptive Scaffolding', body: 'exploratory scaffolding vs. interpretable control' },
          ],
        ],
      },
    },
  },
  {
    id: 'interfaces',
    number: '02',
    title: 'Designing Interpretable Interfaces',
    tone: 'interfaces',
    paragraphs: [
      'Domain expertise relies heavily on tacit judgment that is notoriously hard to articulate. ToneCanvas externalizes a writer’s subtle perception of character tone into inspectable visual assets, rendering implicit choices tangible and editable. Yet, once the task ends, this externalized judgment resets, exposing the limit of single-session tools.',
    ],
    sketch: {
      kind: 'track',
      note: 'resets when the session ends (lacks persistent memory)',
      track: {
        id: 'interfaces',
        rows: [
          [{ id: 'i-tacit', kind: 'state', tone: 'novice', eyebrow: 'Tacit judgment', title: '“This character sounds wrong”' }],
          [{ id: 'i-tonecanvas', kind: 'paper', tone: 'paper', pubSlug: 'tonecanvas', eyebrow: 'UIST ’26 Poster', title: 'ToneCanvas', body: 'Tone as a visual asset' }],
          [{ id: 'i-visible', kind: 'strategy', tone: 'expert', eyebrow: 'Interpretable', title: 'Tacit judgment made visible and editable' }],
        ],
      },
    },
  },
  {
    id: 'memory',
    number: '03',
    title: 'Next: Memory and Workflow Extraction',
    tone: 'memory',
    future: true,
    paragraphs: [
      'True personalization cannot be achieved in a single session. It requires persistent context accumulated over weeks and months. My next step focuses on building a memory architecture that preserves raw user expressions to continuously extract, execute, and refine reusable skills.',
    ],
    sketch: {
      kind: 'loop',
      centre: 'continuous learning',
      steps: [
        { id: 'm-raw', kind: 'state', tone: 'memory', pending: true, eyebrow: 'Record', title: 'User context' },
        { id: 'm-skills', kind: 'strategy', tone: 'memory', pending: true, eyebrow: 'Extract', title: 'Reusable workflows and skills' },
        { id: 'm-execute', kind: 'strategy', tone: 'memory', pending: true, eyebrow: 'Execute', title: 'Actionable tool execution' },
        { id: 'm-update', kind: 'strategy', tone: 'memory', pending: true, eyebrow: 'Update', title: 'Iterative skill refinement' },
      ],
    },
    current: {
      eyebrow: 'Currently working on',
      title: 'Agent Memory Atlas',
      body: 'A browsable database of LLM-agent memory systems that keeps every benchmark score with the setting it was measured under.',
      links: [
        { label: 'Open the atlas', url: 'https://hanaisreal.github.io/agent-memory-atlas/' },
        { label: 'GitHub', url: 'https://github.com/hanaisreal/agent-memory-atlas' },
      ],
    },
  },
];
