// researchCanvasData.ts
//
// The research map on /research. The macro flow runs top to bottom:
// START → Phase 1 → Phase 2 → LOOP. Hovering (or focusing) a phase
// opens its detail to the right.
//
// A phase's detail is one or more tracks; each track is a list of rows, and
// each row holds one or more boxes. Arrows connect every box in a row to
// every box in the next row. Paper boxes point at publications by slug so
// titles, venues, and links live in publicationsData only.

export type PhaseId = 'p1' | 'p2';

export type BoxKind = 'state' | 'strategy' | 'paper';

// Colour families, echoing the hand-drawn sketches.
export type CanvasTone =
  | 'neutral' | 'p1' | 'p2'
  | 'novice' | 'expert' | 'paper' | 'memory'
  | 'frame-novice' | 'frame-expert';

export interface MapBox {
  id: string;
  kind: BoxKind;
  tone: CanvasTone;
  eyebrow?: string;
  title: string;
  body?: string;
  pubSlug?: string;        // links to publicationsData
  badge?: string;          // e.g. "Best Paper", "Ongoing"
  pending?: boolean;       // work not yet public
}

export interface MapTrack {
  id: string;
  frame?: { tone: CanvasTone; eyebrow: string; title: string };
  rows: MapBox[][];
}

export interface ResearchPhase {
  id: PhaseId;
  number: string;
  label: string;
  title: string;
  subtitle: string;
  summary: string;
  tracks: MapTrack[];
}

export const MAP_START = { eyebrow: 'Start', title: 'User Goal & Context' };
export const MAP_LOOP = { eyebrow: 'Loop', title: 'Continuous Action Loop', label: 'refines intent' };

export const researchPhases: ResearchPhase[] = [
  {
    id: 'p1',
    number: '01',
    label: 'Phase 1',
    title: 'Understanding Intent Across Expertise',
    subtitle: 'Structural execution vs. co-exploration',
    summary:
      'Deciphering intent varies across a spectrum of user expertise. Experts often hold a clear mental model of the final output, so a top-down interaction works well. Novices adopt an exploratory approach and, without a strong reference point, can be prone to premature convergence.',
    tracks: [
      {
        id: 'p1-a',
        frame: { tone: 'frame-novice', eyebrow: 'Track A', title: 'Novice exploration' },
        rows: [
          [{ id: 'p1-a-state', kind: 'state', tone: 'novice', eyebrow: 'Novice', title: 'Exploratory approach', body: 'Prone to premature convergence' }],
          [
            { id: 'p1-a-scaffold', kind: 'paper', tone: 'paper', pubSlug: 'when-scaffolding-breaks', eyebrow: 'CHI ’26', badge: 'Best Paper', title: 'When Scaffolding Breaks', body: 'K-12 AI writing scaffolding' },
            { id: 'p1-a-deepaware', kind: 'paper', tone: 'paper', pubSlug: 'deepaware', eyebrow: 'CHI ’26', title: 'DeepAware', body: 'Deepfake awareness among older adults' },
          ],
          [{ id: 'p1-a-strategy', kind: 'strategy', tone: 'novice', eyebrow: 'Agent strategy', title: 'Fostering co-exploration' }],
        ],
      },
      {
        id: 'p1-b',
        frame: { tone: 'frame-expert', eyebrow: 'Track B', title: 'Expert delegation' },
        rows: [
          [{ id: 'p1-b-state', kind: 'state', tone: 'expert', eyebrow: 'Expert', title: 'Clear mental model of the output' }],
          [{ id: 'p1-b-tonecanvas', kind: 'paper', tone: 'paper', pubSlug: 'tonecanvas', eyebrow: 'UIST ’26 Poster', title: 'ToneCanvas', body: 'Stylistic tone as reusable assets' }],
          [{ id: 'p1-b-strategy', kind: 'strategy', tone: 'expert', eyebrow: 'Agent strategy', title: 'Top-down delegation', body: 'User communicates the structure' }],
        ],
      },
    ],
  },
  {
    id: 'p2',
    number: '02',
    label: 'Phase 2',
    title: 'Long-Term Memory for Personalized Agents',
    subtitle: 'Proactive questions & verbatim memory',
    summary:
      'User intent accumulates over days, weeks, and months. While an agent should ask proactive questions to elicit goals, its memory should record raw facts without judging their importance prematurely, leaving higher-level insights for when more context emerges.',
    tracks: [
      {
        id: 'p2-main',
        rows: [
          [{ id: 'p2-elicit', kind: 'state', tone: 'memory', eyebrow: 'Active elicitation', title: 'Ask proactive questions', body: 'One level above, for a comprehensive view' }],
          [{ id: 'p2-recall', kind: 'paper', tone: 'paper', pending: true, eyebrow: 'In preparation', badge: 'Coming soon', title: 'Verbatim phrasing as recall cues', body: 'Details will be updated soon.' }],
          [{ id: 'p2-episodic', kind: 'strategy', tone: 'memory', eyebrow: 'Episodic memory', title: 'Raw logs of interaction' }],
          [{ id: 'p2-meta', kind: 'strategy', tone: 'memory', eyebrow: 'User profile', title: 'A third-person metacognitive view', body: 'Extending to skills.md & LLM wikis' }],
        ],
      },
    ],
  },
];
