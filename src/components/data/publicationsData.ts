const BASE = process.env.PUBLIC_URL;

export interface PublicationLink {
  label: string;
  url: string;
  download?: string;
}

export interface PublicationFigure {
  src: string;
  alt: string;
  caption?: string;
  variant?: 'full' | 'narrow';
}

export type PublicationStoryBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'figure'; figure: PublicationFigure }
  | { type: 'figure-row'; figures: PublicationFigure[] };

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
  cardSummary?: string;
  narrative: string;
  contributions: string[];
  links?: PublicationLink[];
  image?: string;
  storyBlocks?: PublicationStoryBlock[];
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
    cardSummary: "DeepAware turns deepfake education into a self-relevant learning experience by placing older adults inside personalized scam and fake-news simulations using their own synthesized face and voice.",
    narrative: `Older adults are the most targeted demographic for deepfake-based scams. They're also the group least served by existing cybersecurity education, which tends to be abstract, text-heavy, and designed with a younger mental model in mind.

DeepAware started from a simple premise: a warning tells you something is dangerous, but an experience makes you feel it. We built a simulation system that places participants inside a realistic deepfake encounter — a video call from a synthetic "family member" asking for urgent financial help — in a controlled, debrief-ready setting. The scenario is personalized: participants see a face they recognize, hear a voice that sounds familiar, and face social pressure that mirrors what real scams exploit.

The study measured whether this experiential exposure changed how participants recognized and responded to deepfake cues compared to conventional informational training. It did. But more interesting were the qualitative findings: what people reported feeling during the simulation, and how that feeling changed their understanding of their own vulnerability.

This work sits at the intersection of cybersecurity education and the ethics of simulation. Building something distressing on purpose, for someone's benefit, requires care about consent, debrief, and the line between informative and traumatic.`,
    contributions: [
      "Experiential simulation system for deepfake awareness, personalizable to individual participants",
      "Mixed-methods evaluation comparing experiential vs. informational cybersecurity training",
      "Design guidelines for protective simulation with vulnerable populations",
    ],
    image: `${BASE}/pictures/publications/deepaware/deepaware-flow.png`,
    storyBlocks: [
      {
        type: 'paragraph',
        text: `AI-generated faces and voices are increasingly used in social engineering scams, yet current cybersecurity education often introduces deepfakes through definitions, warning signs, and examples involving strangers. Learners may understand that such scams exist without feeling that they or people close to them could actually become targets. DeepAware began from this gap: how can personalized deepfake simulations make scam risks personally meaningful to older adults without causing unnecessary anxiety or disengagement?`,
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/pictures/publications/deepaware/deepaware-class-observation.jpg`,
          alt: 'A smartphone education class for older adults during a lesson about a telecommunications data leak.',
          caption: 'Field observation during the formative research phase, when a smartphone education class for older adults discussed responses to a recent telecommunications data leak.',
          variant: 'narrow',
        },
      },
      {
        type: 'paragraph',
        text: `To understand how deepfake risks are currently taught, we interviewed five digital educators with more than five years of experience teaching older adults and observed a smartphone education class during the formative research phase. Educators described cybersecurity as a small add-on within broader smartphone classes, where limited time is already spent on account management, messaging, and basic device use. They also noted that older adults respond more strongly when examples involve family, acquaintances, or their own identities, while highly realistic material can backfire if introduced too abruptly.`,
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/pictures/publications/deepaware/deepaware-flow.png`,
          alt: 'A five-step learning flow that moves from concept introduction and real-world examples to self-relevant simulation, coping strategies, and review quizzes.',
          caption: 'DeepAware guides learners from concept introduction and real-world examples to self-relevant simulation, coping strategies, and review quizzes.',
          variant: 'full',
        },
      },
      {
        type: 'paragraph',
        text: `Based on these findings, we built DeepAware, a web-based learning platform that embeds a learner's own face and voice into simulated identity theft and fake news scenarios. The experience moves from concept introduction and real-world examples to personalized simulation, coping strategies, and short review quizzes. Rather than asking learners to watch how someone else might be deceived, the system positions them as the direct target of a carefully staged threat and then immediately connects that experience to concrete actions such as verifying suspicious requests through another channel or asking questions only the real person would know.`,
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/pictures/publications/deepaware/deepaware-simulation-generator.png`,
          alt: 'A diagram showing how DeepAware combines a learner image, voice ID, and scenario script to generate a personalized deepfake simulation.',
          caption: 'The simulation generator combines a learner image, voice ID, and scenario script to produce self-relevant deepfake content for guided practice.',
          variant: 'full',
        },
      },
      {
        type: 'paragraph',
        text: `We evaluated DeepAware with 21 older adults in South Korea. After completing the program, participants reported gains in deepfake knowledge, perceived vulnerability and severity, self-efficacy, and response efficacy. Many said that seeing or hearing themselves made the threat feel more immediate than ordinary educational examples, while others warned that highly realistic scenarios could overwhelm less experienced learners. The study suggests that personalized security education is most effective when it adapts emotional intensity, supports rehearsal of real responses, and helps learners leave with practical confidence rather than fear.`,
      },
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
    links: [
      {
        label: "Read Paper",
        url: `${BASE}/papers/when-scaffolding-breaks.pdf`,
      },
      {
        label: "Download PDF",
        url: `${BASE}/papers/when-scaffolding-breaks.pdf`,
        download: "when-scaffolding-breaks.pdf",
      },
      {
        label: "DOI",
        url: "https://doi.org/10.1145/3772318.3791517",
      },
    ],
    image: `${BASE}/pictures/publications/when-scaffolding-breaks/writeaid-system.png`,
    storyBlocks: [
      {
        type: 'paragraph',
        text: `LLM writing tools are often evaluated as if every learner has unlimited time and can work independently. Real classrooms are different: a teacher is supporting many students at once, proficiency levels vary widely, and every writing activity must fit within a short lesson. We studied what AI scaffolding looks like under those constraints by deploying WriteAid with 157 eighth-grade students in a South Korean middle school over six weeks.`,
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/pictures/publications/when-scaffolding-breaks/writeaid-system.png`,
          alt: 'The WriteAid classroom interface, divided into learning objectives, an essay-writing area, and an AI support area with task-specific tabs.',
          caption: 'WriteAid shows lesson objectives (A), the student essay workspace (B), and task-specific AI writing support (C) in one classroom interface.',
          variant: 'full',
        },
      },
      {
        type: 'paragraph',
        text: `WriteAid was co-designed with a middle school English teacher. Instead of presenting students with one open-ended chatbot, the interface separates support into familiar, task-specific tabs: a sample essay, collaborative sentence construction, vocabulary and grammar explanations, and grammar checking. This structure lowered the barrier for students with little prior experience using conversational AI while keeping their writing and the lesson requirements visible.`,
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/pictures/publications/when-scaffolding-breaks/scaffolding-strategies.png`,
          alt: 'A stacked bar chart comparing the proportions of scaffolding strategies used for grammar revision, sentence construction, and vocabulary or grammar questions.',
          caption: 'The mix of scaffolding strategies varied by task. Instructing and questioning were common across features, while sentence construction used more feedback and grammar explanations relied more heavily on explaining.',
          variant: 'full',
        },
      },
      {
        type: 'paragraph',
        text: `Across the deployment, students exchanged 14,863 messages with the system. Sentence construction accounted for most use, but engagement differed by proficiency. High-performing students tended to resolve questions in fewer turns and moved into grammar revision earlier. Middle- and lower-performing students made more iterative revision requests and were more likely to follow the system's step-by-step guidance without independently evaluating it.`,
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/pictures/publications/when-scaffolding-breaks/student-interaction-patterns.png`,
          alt: 'Example WriteAid conversations from high-, middle-, and low-performing students showing different responses to AI writing support.',
          caption: 'Examples from classroom interaction logs show how proficiency shaped the dialogue: efficient clarification, uncritical acceptance of feedback, and frustration with step-by-step support.',
          variant: 'full',
        },
      },
      {
        type: 'paragraph',
        text: `The same scaffold could therefore function as a learning aid for one student and a source of dependency or frustration for another. WriteAid helped more students complete their assignments, but it also made some struggles less visible to the teacher and changed how attention was distributed in the room. These findings point toward adaptive scaffolding that considers proficiency, monitors over-reliance, and keeps teachers aware of when students need human support.`,
      },
    ],
  },
];

export const getPublicationBySlug = (slug: string): Publication | undefined =>
  publications.find(p => p.slug === slug);

export const getPublicationStatusLine = (pub: Publication): string => {
  if (pub.status === 'Under Review') {
    return `${pub.venue} · Under Review`;
  }

  if (pub.status === 'Accepted') {
    return `Accepted at ${pub.venue}`;
  }

  return `${pub.status} · ${pub.venue}`;
};
