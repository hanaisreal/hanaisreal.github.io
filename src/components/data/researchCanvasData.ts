// researchCanvasData.ts
//
// The research map on /research. The macro flow runs top to bottom:
// START → Phase 1 → Phase 2 → Phase 3 → LOOP. Hovering (or focusing) a phase
// opens its detail to the right.
//
// A phase's detail is one or more tracks; each track is a list of rows, and
// each row holds one or more boxes. Arrows connect every box in a row to
// every box in the next row. Paper boxes point at publications by slug so
// titles, venues, and links live in publicationsData only.

export type PhaseId = 'p1' | 'p2' | 'p3';

export type BoxKind = 'state' | 'strategy' | 'paper';

// Colour families, echoing the hand-drawn sketches.
export type CanvasTone =
  | 'neutral' | 'p1' | 'p2' | 'p3'
  | 'novice' | 'expert' | 'paper' | 'memory' | 'ui'
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
    title: 'Expertise & Domain Spectrum',
    subtitle: 'Novice exploration vs. expert execution',
    summary:
      'The same AI support lands differently depending on how much a person already knows. Novices risk converging too early and need an agent that explores with them; experts arrive with a clear structure and need an agent that takes delegation without churning the interface.',
    tracks: [
      {
        id: 'p1-a',
        frame: { tone: 'frame-novice', eyebrow: 'Track A', title: 'Novice exploration' },
        rows: [
          [{ id: 'p1-a-state', kind: 'state', tone: 'novice', eyebrow: 'Novice mindset', title: 'No baseline reference', body: 'Risk of premature convergence' }],
          [
            { id: 'p1-a-scaffold', kind: 'paper', tone: 'paper', pubSlug: 'when-scaffolding-breaks', eyebrow: 'CHI ’26', badge: 'Best Paper', title: 'When Scaffolding Breaks', body: 'K-12 AI writing scaffolding' },
            { id: 'p1-a-deepaware', kind: 'paper', tone: 'paper', pubSlug: 'deepaware', eyebrow: 'CHI ’26', title: 'DeepAware', body: 'Deepfake simulations with older adults' },
          ],
          [{ id: 'p1-a-strategy', kind: 'strategy', tone: 'novice', eyebrow: 'Agent strategy', title: 'Co-exploration', body: 'Active scaffolding & reflective prompts' }],
        ],
      },
      {
        id: 'p1-b',
        frame: { tone: 'frame-expert', eyebrow: 'Track B', title: 'Expert delegation' },
        rows: [
          [{ id: 'p1-b-state', kind: 'state', tone: 'expert', eyebrow: 'Expert mindset', title: 'Clear structural vision', body: 'High-efficiency focus' }],
          [{ id: 'p1-b-tonecanvas', kind: 'paper', tone: 'paper', pubSlug: 'tonecanvas', eyebrow: 'UIST ’26 Poster', title: 'ToneCanvas', body: 'Reusable style assets' }],
          [{ id: 'p1-b-strategy', kind: 'strategy', tone: 'expert', eyebrow: 'Agent strategy', title: 'Top-down delegation', body: 'Predictable, low UI churn' }],
        ],
      },
    ],
  },
  {
    id: 'p2',
    number: '02',
    label: 'Phase 2',
    title: 'Persistent Intent Engine',
    subtitle: 'Active probing & verbatim memory',
    summary:
      'An agent that works with someone over time has to remember what they actually said. It asks proactive questions at task boundaries, keeps the user’s own phrasing instead of lossy summaries, and refines a metacognitive layer on top.',
    tracks: [
      {
        id: 'p2-main',
        rows: [
          [{ id: 'p2-elicit', kind: 'state', tone: 'memory', eyebrow: 'Active intent elicitation', title: 'Proactive questions at task boundaries' }],
          [{ id: 'p2-recall', kind: 'paper', tone: 'paper', pending: true, eyebrow: 'In preparation', badge: 'Coming soon', title: 'Long-conversation verbatim recall', body: 'Details will be updated soon.' }],
          [{ id: 'p2-episodic', kind: 'strategy', tone: 'memory', eyebrow: 'Raw episodic memory', title: 'Verbatim cues, no lossy summaries' }],
          [{ id: 'p2-meta', kind: 'strategy', tone: 'memory', eyebrow: 'Metacognitive layer', title: 'User profiles, skills.md & LLM wikis' }],
        ],
      },
    ],
  },
  {
    id: 'p3',
    number: '03',
    label: 'Phase 3',
    title: 'Adaptive Interface & Control',
    subtitle: 'Malleable UI & user accountability',
    summary:
      'Interfaces can be assembled on the fly around what the agent has learned, but the final choice stays with the person: the system organizes, people decide.',
    tracks: [
      {
        id: 'p3-main',
        rows: [
          [{ id: 'p3-render', kind: 'state', tone: 'ui', eyebrow: 'Dynamic UI rendering', title: 'Malleable components built on the fly' }],
          [{ id: 'p3-agendas', kind: 'paper', tone: 'paper', eyebrow: 'Ongoing project', badge: 'Ongoing', title: 'Shared Agendas from Separate AI Conversations', body: 'Turns a team’s separate AI chats into shared issues and options.' }],
          [{ id: 'p3-execute', kind: 'strategy', tone: 'ui', eyebrow: 'Human action execution', title: 'The user keeps the final choice' }],
        ],
      },
    ],
  },
];
