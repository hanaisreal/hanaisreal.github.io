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
  shortName: string;       // label above the list thumbnail
  abstract: string;
  bibtex: string;
  insight?: string;
  coFirstAuthors?: string[];
  tldr: string;
  cardSummary?: string;
  narrative: string;
  contributions: string[];
  links?: PublicationLink[];
  image?: string;
  thumb?: string;          // 16:10 list thumbnail
  storyBlocks?: PublicationStoryBlock[];
}

export const publications: Publication[] = [
  {
    slug: "tonecanvas",
    year: "2026",
    title: "ToneCanvas: Visually Painting Character Tone for Narrative Consistency",
    authors: "JungHwan Kim, Hana Oh, Bongwon Suh",
    coFirstAuthors: ["JungHwan Kim", "Hana Oh"],
    venue: "UIST 2026 Poster",
    status: "Accepted",
    type: "conference",
    shortName: 'ToneCanvas',
    abstract: `Revising long-form fiction requires writers to maintain each character's voice across dialogue that is often dispersed throughout a manuscript. Detecting gradual changes in how a character speaks therefore depends heavily on rereading, memory, and external notes. We present ToneCanvas, an interactive writing interface that uses persistent watercolor gradients to support character-centered tone comparison and revision within and across passages. A formative study with five professionals involved in fiction revision and translation identified four recurring workflow breakdowns, which informed the design of character-focused dialogue views, adjustable tone dimensions, and integrated character references. This work contributes an empirical account of character-tone revision, corresponding design opportunities, and an interactive prototype that instantiates them.`,
    bibtex: `@inproceedings{kim2026tonecanvas,
  title     = {ToneCanvas: Visually Painting Character Tone for Narrative Consistency},
  author    = {Kim, Junghwan and Oh, Hana and Suh, Bongwon},
  booktitle = {Adjunct Proceedings of the 39th Annual ACM Symposium on User Interface Software and Technology},
  series    = {UIST Adjunct '26},
  year      = {2026},
  address   = {Detroit, MI, USA},
  publisher = {ACM}
}`,
    insight: "How can visual interaction help writers keep a character's tone consistent across a narrative?",
    tldr: "A visual interface that lets writers paint tone attributes onto characters, helping them catch stylistic drift before it becomes a structural problem.",
    narrative: `Maintaining character tone consistency across long-form narrative text poses a recurring challenge in creative writing. As drafts expand across chapters, subtle linguistic drift occurs silently, causing character voices to diverge from their intended profiles without the writer noticing.

In this project, we framed narrative tone management as a visual analytics and spatial interaction problem rather than a standard text editing task. We developed ToneCanvas, an interactive system that decouples narrative prose into structured canvas and character layers, turning abstract stylistic attributes into explicit visual parameters.

Writers define multidimensional tone baselines for individual characters, specifying dimensions such as assertiveness, warmth, formality, and emotional register. The system analyzes the text against these profiles, surfacing tonal mismatches directly within the draft as visual anomalies rather than generic system warnings.

The core interaction model relies on a spatial metaphor: writers manipulate visual tone controls to shape intent, which the underlying system uses to construct structured prompts for context-aware generative rewriting. This human-in-the-loop workflow keeps the writer in full control of the narrative direction while reducing the cognitive load of tracking character voices across complex, multi-chapter texts.`,
    contributions: [
      "A visual metaphor for character tone that makes stylistic drift visible during drafting",
      "An interaction design that separates intention-setting from text editing",
      "Formative study with fiction writers on how tone inconsistency is currently noticed and repaired",
    ],
    links: [
      {
        label: "PDF",
        url: `${BASE}/papers/tonecanvas.pdf`,
      },
    ],
    thumb: `${BASE}/pictures/publications/tonecanvas/tonecanvas-teaser.png`,
    image: `${BASE}/pictures/publications/tonecanvas/tonecanvas-teaser.png`,
    storyBlocks: [
      {
        type: 'paragraph',
        text: `Maintaining character tone consistency across long-form narrative text poses a recurring challenge in creative writing. As drafts expand across chapters, subtle linguistic drift occurs silently, causing character voices to diverge from their intended profiles without the writer noticing.`,
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/pictures/publications/tonecanvas/tonecanvas-teaser.png`,
          alt: 'ToneCanvas poster showing the canvas, tone palette, character layer, and interaction tools for rewriting narrative text.',
          caption: 'ToneCanvas lets writers paint, inspect, and revise character tone directly in a narrative canvas.',
          variant: 'full',
        },
      },
      {
        type: 'paragraph',
        text: `In this project, we framed narrative tone management as a visual analytics and spatial interaction problem rather than a standard text editing task. We developed ToneCanvas, an interactive system that decouples narrative prose into structured canvas and character layers, turning abstract stylistic attributes into explicit visual parameters.`,
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/pictures/publications/tonecanvas/tonecanvas-backend.png`,
          alt: 'ToneCanvas system workflow from narrative text preprocessing through canvas and character layers, interaction tools, prompt composition, and writer review.',
          caption: 'ToneCanvas processes narrative text into canvas and character layers, then supports iterative tone-guided rewriting with writer review.',
          variant: 'full',
        },
      },
      {
        type: 'paragraph',
        text: `Writers define multidimensional tone baselines for individual characters, specifying dimensions such as assertiveness, warmth, formality, and emotional register. The system analyzes the text against these profiles, surfacing tonal mismatches directly within the draft as visual anomalies rather than generic system warnings.`,
      },
      {
        type: 'paragraph',
        text: `The core interaction model relies on a spatial metaphor: writers manipulate visual tone controls to shape intent, which the underlying system uses to construct structured prompts for context-aware generative rewriting. This human-in-the-loop workflow keeps the writer in full control of the narrative direction while reducing the cognitive load of tracking character voices across complex, multi-chapter texts.`,
      },
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
    shortName: 'DeepAware',
    abstract: `Deepfake scams, which use AI-generated audio or video to impersonate individuals, pose an increasing cybersecurity threat to older adults. Existing educational approaches present threats through generic examples, leaving learners to perceive scams as something that happens to others rather than to themselves. To address this gap, we conducted a formative study with five digital educators to identify design requirements, then developed DeepAware, a self-referential simulation platform that embeds participants' own faces and voices into deepfake scam scenarios. By making learners the target of simulated threats rather than passive observers, DeepAware aims to collapse the psychological distance between abstract warnings and personal vulnerability. A mixed-methods evaluation with 21 older adults found improvements in deepfake knowledge, threat perception, and coping confidence, though responses varied by prior familiarity. This work demonstrates the potential of self-referential simulation for cybersecurity education and offers design implications for future cybersecurity interventions.`,
    bibtex: `@inproceedings{oh2026deepaware,
  title     = {DeepAware: Using Experiential Deepfake Simulations to Enhance Cybersecurity Awareness in Older Adults},
  author    = {Oh, Hana and Lee, Eunbi and Shin, Seungju and Lee, Keyeun and Pyun, Miran and Lim, Hajin},
  booktitle = {Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems},
  series    = {CHI '26},
  year      = {2026},
  address   = {Barcelona, Spain},
  publisher = {ACM},
  doi       = {10.1145/3772318.3791492}
}`,
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
    links: [
      {
        label: "PDF",
        url: `${BASE}/papers/deepaware.pdf`,
      },
      {
        label: "DOI",
        url: "https://doi.org/10.1145/3772318.3791492",
      },
    ],
    thumb: `${BASE}/pictures/publications/deepaware/deepaware-flow.png`,
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
    shortName: 'When Scaffolding Breaks',
    abstract: `Large language models (LLMs) are promising tools for scaffolding students' English writing skills, but their effectiveness in real-time K-12 classrooms remains underexplored. Addressing this gap, our study examines the benefits and limitations of using LLMs as real-time learning support, considering how classroom constraints, such as diverse proficiency levels and limited time, affect their effectiveness. We conducted a deployment study with 157 eighth-grade students in a South Korean middle school English class over six weeks. Our findings reveal that while scaffolding improved students' ability to compose grammatically correct sentences, this step-by-step approach demotivated lower-proficiency students and increased their system reliance. We also observed challenges to classroom dynamics, where extroverted students often dominated the teacher's attention, and the system's assistance made it difficult for teachers to identify struggling students. Based on these findings, we discuss design guidelines for integrating LLMs into real-time writing classes as inclusive educational tools.`,
    bibtex: `@inproceedings{myung2026scaffolding,
  title     = {When Scaffolding Breaks: Investigating Student Interaction with LLM-Based Writing Support in Real-Time K-12 EFL Classrooms},
  author    = {Myung, Junho and Lim, Hyunseung and Oh, Hana and Jin, Hyoungwook and Kang, Nayeon and Ahn, So-Yeon and Hong, Hwajung and Oh, Alice and Kim, Juho},
  booktitle = {Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems},
  series    = {CHI '26},
  year      = {2026},
  address   = {Barcelona, Spain},
  publisher = {ACM},
  doi       = {10.1145/3772318.3791517}
}`,
    insight: "When the AI scaffold fails mid-lesson, what do students actually do?",
    tldr: "A six-week deployment with 157 eighth graders found that step-by-step LLM writing support helped students write grammatically correct sentences, but demotivated lower-proficiency students, deepened their reliance on the system, and made it harder for teachers to spot who was struggling.",
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
        label: "PDF",
        url: `${BASE}/papers/when-scaffolding-breaks.pdf`,
      },
      {
        label: "DOI",
        url: "https://doi.org/10.1145/3772318.3791517",
      },
    ],
    thumb: `${BASE}/pictures/publications/when-scaffolding-breaks/writeaid-system.png`,
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
