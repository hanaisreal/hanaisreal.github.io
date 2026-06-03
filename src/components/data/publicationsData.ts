export interface PublicationLink {
  label: string;
  url: string;
}

export interface Publication {
  slug: string;
  year: string;
  title: string;
  authors: string;
  venue: string;
  status: string;
  type: 'conference' | 'journal' | 'workshop';
  bestPaper?: boolean;
  insight?: string;
  coFirstAuthors?: string[];
  tldr: string;
  narrative: string;
  contributions: string[];
  links?: PublicationLink[];
  image?: string;
}

export const publications: Publication[] = [
  {
    slug: "tonecanvas",
    year: "2026",
    title: "ToneCanvas: Visually Painting Character Tone for Narrative Consistency",
    authors: "JungHwan Kim, Hana Oh, Bongwon Suh",
    coFirstAuthors: ["JungHwan Kim", "Hana Oh"],
    venue: "UIST 2026",
    status: "Under Review",
    type: "conference",
    insight: "How can visual interaction help writers keep a character's tone consistent across a narrative?",
    tldr: "A visual interface that lets writers paint tone attributes onto characters, helping them catch stylistic drift before it becomes a structural problem.",
    narrative: `Characters don't stay consistent. A villain who's menacing in chapter two sounds apologetic in chapter seven — not because the writer intended it, but because sustaining tone across thousands of words is genuinely hard. Writers hold a lot in their heads, and subtle shifts accumulate.

ToneCanvas approaches this as a visibility problem. Tone is something writers feel but rarely see. We built an interface where you can assign tone attributes — assertiveness, warmth, formality, emotional register — to individual characters and then watch how those attributes manifest across the draft in real time. Sections where a character's language drifts from their defined tone surface as visual anomalies, not as abstract warnings.

The interaction model is deliberately spatial. Writers paint tone onto characters the way a director gives notes to an actor: not by editing the text directly, but by shaping the intention behind it. The goal was to give writers a handle on something they already sense but can't easily act on.`,
    contributions: [
      "A visual metaphor for character tone that makes stylistic drift visible during drafting",
      "An interaction design that separates intention-setting from text editing",
      "Formative study with fiction writers on how tone inconsistency is currently noticed and repaired",
    ],
  },
  {
    slug: "deepaware",
    year: "2026",
    title: "DeepAware: Using Experiential Deepfake Simulations to Enhance Cybersecurity Awareness in Older Adults",
    authors: "Hana Oh, Eunbi Lee, Seungju Shin, Keyeun Lee, Miran Pyun, Hajin Lim",
    venue: "CHI 2026",
    status: "Accepted",
    type: "conference",
    insight: "What if older adults could experience a deepfake before encountering one in the wild?",
    tldr: "Letting older adults safely experience a personalized deepfake scam scenario builds intuition that text-based warnings never could.",
    narrative: `Older adults are the most targeted demographic for deepfake-based scams. They're also the group least served by existing cybersecurity education, which tends to be abstract, text-heavy, and designed with a younger mental model in mind.

DeepAware started from a simple premise: a warning tells you something is dangerous, but an experience makes you feel it. We built a simulation system that places participants inside a realistic deepfake encounter — a video call from a synthetic "family member" asking for urgent financial help — in a controlled, debrief-ready setting. The scenario is personalized: participants see a face they recognize, hear a voice that sounds familiar, and face social pressure that mirrors what real scams exploit.

The study measured whether this experiential exposure changed how participants recognized and responded to deepfake cues compared to conventional informational training. It did. But more interesting were the qualitative findings: what people reported feeling during the simulation, and how that feeling changed their understanding of their own vulnerability.

This work sits at the intersection of cybersecurity education and the ethics of simulation. Building something distressing on purpose, for someone's benefit, requires care about consent, debrief, and the line between informative and traumatic.`,
    contributions: [
      "Experiential simulation system for deepfake awareness, personalizable to individual participants",
      "Mixed-methods evaluation comparing experiential vs. informational cybersecurity training",
      "Design guidelines for protective simulation with vulnerable populations",
    ],
  },
  {
    slug: "when-scaffolding-breaks",
    year: "2026",
    title: "When Scaffolding Breaks: Investigating Student Interaction with LLM-Based Writing Support in Real-Time K-12 EFL Classrooms",
    authors: "Junho Myung, Hyunseung Lim, Hana Oh, Hyoungwook Jin, Nayeon Kang, So-Yeon Ahn, Hwajung Hong, Alice Oh, Juho Kim",
    coFirstAuthors: ["Hyunseung Lim", "Hana Oh"],
    venue: "CHI 2026",
    status: "Accepted",
    type: "conference",
    bestPaper: true,
    insight: "When the AI scaffold fails mid-lesson, what do students actually do?",
    tldr: "Deploying LLM writing support in real K-12 classrooms revealed that the most revealing moments were when the AI failed — exposing how students had been relying on it all along.",
    narrative: `AI writing scaffolds behave well in lab conditions. Real classrooms are messier. Connectivity drops, students go off-task, and the AI occasionally outputs something confusing at exactly the wrong moment in a lesson.

We deployed an LLM-based writing support system in live K-12 EFL (English as a Foreign Language) classrooms and observed what happened over multiple sessions — including what happened when things went wrong. The disruptions turned out to be the most informative part of the data.

When the scaffold failed, students revealed the strategies they'd been using behind it. Some had been outsourcing judgment entirely — using the AI's feedback as a proxy for their own evaluation. Others had developed genuinely adaptive relationships with the tool, treating its breakdowns as problems to work around rather than reasons to stop. The gap between these groups was not predicted by language proficiency.

The findings have implications beyond EFL classrooms: they speak to how dependency forms in any context where AI assistance is persistent and the cost of disengaging feels high. Scaffolding that works smoothly may be obscuring the degree to which students have stopped scaffolding themselves.`,
    contributions: [
      "Longitudinal classroom deployment study of LLM writing support across real K-12 EFL lessons",
      "Taxonomy of student responses to AI scaffold failure",
      "Analysis of how reliance patterns differ from what surface-level engagement metrics suggest",
    ],
  },
];

export const getPublicationBySlug = (slug: string): Publication | undefined =>
  publications.find(p => p.slug === slug);
