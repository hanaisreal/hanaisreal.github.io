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
  relatedPost?: string;    // id of a blog post about this paper
  location?: string;       // where the venue took place, e.g. "Barcelona, Spain"
  affiliations?: string[]; // numbered 1, 2, … in this order on the paper page
  authorAffiliations?: Record<string, number[]>; // author -> affiliation numbers; omit when all share one
  authorLinks?: Record<string, string>;          // author -> homepage
  correspondingAuthors?: string[];
  tldr: string;
  keywords?: string[];     // short tags on the homepage card
  cardSummary?: string;
  narrative: string;
  contributions: string[];
  links?: PublicationLink[];
  image?: string;
  thumb?: string;          // 16:10 list thumbnail
  cardVideo?: string;      // muted looping clip shown in place of the card and list thumbnail
  cardPoster?: string;     // still shown before a video plays
  video?: string;          // full video with sound, shown at the top of the paper page
  storyBlocks?: PublicationStoryBlock[];
}

export const publications: Publication[] = [
  {
    slug: "tonecanvas",
    location: "Detroit, MI, USA",
    affiliations: ["Seoul National University"],
    authorLinks: {
      "JungHwan Kim": "https://jhbale11.github.io/",
      "Bongwon Suh": "https://scholar.google.com/citations?user=-nlhtEkAAAAJ&hl=en"
    },
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
    tldr: "ToneCanvas uses watercolor overlays to help writers compare and revise a character's tone across a manuscript.",
    keywords: ["Creative Writing", "Visualization", "Narrative Consistency"],
    narrative: "Writers need to distinguish intentional changes in a character's voice from accidental inconsistency. Here, tone means how a character speaks, including warmth, directness, and formality. It can evolve with the story without losing a recognizable voice.\n\nFive professionals in fiction revision and translation described four recurring challenges: comparing scattered dialogue, naming what feels inconsistent, consulting external character notes, and tracking names or terminology. These interviews shaped the prototype.\n\nWatercolor overlays keep tone visible on the manuscript. Focus Mode gathers one character's dialogue; the Tone Palette adjusts individual dimensions with a live preview. Writers can sample a passage's tone, save it as a preset, and review suggested rewrites before accepting them.\n\nCharacter Layers keep voice notes and references beside the draft. A terminology tool groups aliases and recurring terms for review. Evaluating the prototype on writers' own manuscripts is future work.",
    contributions: [
      "An empirical account of character-tone revision in long-form fiction",
      "Four design opportunities derived from recurring workflow breakdowns",
      "An interactive prototype that realizes these opportunities through persistent tone visualization, parameterized control, and integrated character references"
    ],
    links: [
      {
        label: "PDF",
        url: `${BASE}/papers/tonecanvas.pdf`,
      },
    ],
    thumb: `${BASE}/pictures/publications/tonecanvas/tonecanvas-teaser.png`,
    cardVideo: `${BASE}/videos/tonecanvas-preview.mp4`,
    video: `${BASE}/videos/tonecanvas.mp4`,
    cardPoster: `${BASE}/pictures/publications/tonecanvas/tonecanvas-video-poster.jpg`,
    image: `${BASE}/pictures/publications/tonecanvas/tonecanvas-teaser.png`,
    storyBlocks: [
      {
        type: 'paragraph',
        text: "Writers need to distinguish intentional changes in a character's voice from accidental inconsistency. Here, tone means how a character speaks, including warmth, directness, and formality. It can evolve with the story without losing a recognizable voice.",
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
        text: "Five professionals in fiction revision and translation described four recurring challenges: comparing scattered dialogue, naming what feels inconsistent, consulting external character notes, and tracking names or terminology. These interviews shaped the prototype.",
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
        text: "Watercolor overlays keep tone visible on the manuscript. Focus Mode gathers one character's dialogue; the Tone Palette adjusts individual dimensions with a live preview. Writers can sample a passage's tone, save it as a preset, and review suggested rewrites before accepting them.",
      },
      {
        type: 'paragraph',
        text: "Character Layers keep voice notes and references beside the draft. A terminology tool groups aliases and recurring terms for review. Evaluating the prototype on writers' own manuscripts is future work.",
      },
    ],
  },
  {
    slug: "deepaware",
    location: "Barcelona, Spain",
    affiliations: ["Seoul National University"],
    correspondingAuthors: ["Hajin Lim"],
    authorLinks: {
      "Keyeun Lee": "https://www.keyeun.com/",
      "Miran Pyun": "https://scholar.google.com/citations?user=AgQ16g8AAAAJ&hl=ko",
      "Hajin Lim": "https://www.hajinlim.com/"
    },
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
    tldr: "After using personalized deepfake simulations, 21 older adults reported greater deepfake knowledge, perceived risk, and confidence in responding.",
    keywords: ["Older Adults", "Deepfakes", "Cybersecurity"],
    cardSummary: "Personalized deepfake simulations help older adults explore scam risks using their own faces and voices.",
    narrative: "We interviewed five digital educators and observed a smartphone class for older adults. Educators described limited time for security lessons and warned that realistic, personalized scenarios could overwhelm learners if introduced abruptly.\n\nDeepAware uses a learner's photo and voice recording to create identity-theft and fake-news scenarios. Each module moves from an explanation and real examples to personalized simulation, coping strategies, and a review quiz. Audio guidance supports learners at each step.\n\nIn an exploratory study, 21 older adults completed surveys before and after using DeepAware and took part in interviews. Reported deepfake knowledge rose from 3.10 to 4.10 on a five-point scale; perceived threat and coping efficacy also increased. The single-group design does not establish an advantage over conventional training or lasting protection against scams.\n\nParticipants found their own faces and voices engaging, but reactions ranged from recognizing obvious flaws to feeling overwhelmed. The findings suggest adapting scenario intensity to prior experience and adding opportunities to rehearse responses. Participants could pause or exit, received a debriefing, and had their uploaded photos and voice recordings deleted after the session.",
    contributions: [
      "Identifying design requirements for deepfake scam education tailored to older adults through a formative study with five digital educators.",
      "Designing and implementing DeepAware, a personalized deepfake simulation system to investigate how embedding users’ own faces and voices into simulated scenarios can support deepfake scam education for older adults.",
      "Demonstrating through evaluating with 21 older adults that personalized simulations strengthen perceived threat, coping efficacy, and engagement, with design implications for experiential deepfake education."
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
    cardVideo: `${BASE}/videos/deepaware-preview.mp4`,
    video: `${BASE}/videos/deepaware.mp4`,
    cardPoster: `${BASE}/pictures/publications/deepaware/deepaware-video-poster.jpg`,
    image: `${BASE}/pictures/publications/deepaware/deepaware-flow.png`,
    storyBlocks: [
      {
        type: 'paragraph',
        text: "We interviewed five digital educators and observed a smartphone class for older adults. Educators described limited time for security lessons and warned that realistic, personalized scenarios could overwhelm learners if introduced abruptly.",
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
        text: "DeepAware uses a learner's photo and voice recording to create identity-theft and fake-news scenarios. Each module moves from an explanation and real examples to personalized simulation, coping strategies, and a review quiz. Audio guidance supports learners at each step.",
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
        text: "In an exploratory study, 21 older adults completed surveys before and after using DeepAware and took part in interviews. Reported deepfake knowledge rose from 3.10 to 4.10 on a five-point scale; perceived threat and coping efficacy also increased. The single-group design does not establish an advantage over conventional training or lasting protection against scams.",
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
        text: "Participants found their own faces and voices engaging, but reactions ranged from recognizing obvious flaws to feeling overwhelmed. The findings suggest adapting scenario intensity to prior experience and adding opportunities to rehearse responses. Participants could pause or exit, received a debriefing, and had their uploaded photos and voice recordings deleted after the session.",
      },
    ],
  },
  {
    slug: "when-scaffolding-breaks",
    location: "Barcelona, Spain",
    affiliations: ["KAIST", "Seoul National University", "University of Michigan", "Gyeonggido Office of Education"],
    authorAffiliations: {
      "Junho Myung": [1],
      "Hyunseung Lim": [1],
      "Hana Oh": [2],
      "Hyoungwook Jin": [3],
      "Nayeon Kang": [4],
      "So-Yeon Ahn": [1],
      "Hwajung Hong": [1],
      "Alice Oh": [1],
      "Juho Kim": [1],
    },
    authorLinks: {
      "Junho Myung": "https://junhomyung.github.io/",
      "Hyunseung Lim": "https://hyunseunglim.com/",
      "Hyoungwook Jin": "https://jhw123.github.io/",
      "So-Yeon Ahn": "https://sites.google.com/view/soyeonahn/about",
      "Hwajung Hong": "https://galaxytourist.notion.site/galaxytourist/Hwajung-Hong-cc10b0291bbe4ca38dbf4882cd687423",
      "Alice Oh": "https://aliceoh9.github.io/",
      "Juho Kim": "https://juhokim.com/",
    },
    relatedPost: "kixlab-internship-reflection",
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
    tldr: "A six-week classroom study found that AI writing support helped sentence accuracy but left lower-proficiency students frustrated and reliant on assistance.",
    keywords: ["AI in Education", "K-12 EFL", "LLM Writing Support"],
    narrative: "We co-designed WriteAid with a middle school English teacher. Four tabs provide a sample essay, sentence construction, vocabulary and grammar explanations, and grammar checking. The AI gives step-by-step guidance in Korean rather than immediately supplying answers.\n\n157 eighth graders used WriteAid across six weeks of English classes in South Korea. Analysis drew on consented data from 133 students: 14,863 query-response pairs, classroom observations, a teacher interview, and unaided writing assessments 2–3 weeks later.\n\nHigher-performing students used the AI for vocabulary and checking; lower-performing students more often requested sentence generation and expressed frustration with repeated guidance. In the later unaided assessment, high-performing students correctly reused 65.8% of AI-assisted sentences, compared with 14.0% for the low-performing group.\n\nThe teacher reported that more students completed their work, but questions moving to the AI made shared difficulties harder to notice. Support should adapt to proficiency and time pressure, clarify when to involve the teacher, and keep signs of over-reliance visible.",
    contributions: [
      "We provide a large-scale dataset (14,863 utterances) from a real-time K-12 classroom, and reveals a divergence in how students use the LLM: higher-proficiency students delegate lower-order tasks (e.g., vocabulary translation), while lower-proficiency students outsource core higher-order writing tasks (e.g., sentence generation).",
      "We identify limitations in LLM scaffolding, revealing that for lower-proficiency students in time-constrained classrooms, it can be counterproductive by fostering dependency and demotivation.",
      "Through a naturalistic observation study, we uncover new challenges related to the use of LLMs in educational contexts, particularly concerning issues of fairness and the impact on student-teacher dynamics."
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
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2512.05506",
      },
      {
        label: "Dataset",
        url: "https://github.com/JunhoMyung/WriteAid-Data",
      },
      {
        label: "Project page",
        url: "https://scaffoldingbreaks.kixlab.org/",
      },
    ],
    thumb: `${BASE}/pictures/publications/when-scaffolding-breaks/writeaid-system.png`,
    image: `${BASE}/pictures/publications/when-scaffolding-breaks/writeaid-system.png`,
    storyBlocks: [
      {
        type: 'paragraph',
        text: "We co-designed WriteAid with a middle school English teacher. Four tabs provide a sample essay, sentence construction, vocabulary and grammar explanations, and grammar checking. The AI gives step-by-step guidance in Korean rather than immediately supplying answers.",
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
        text: "157 eighth graders used WriteAid across six weeks of English classes in South Korea. Analysis drew on consented data from 133 students: 14,863 query-response pairs, classroom observations, a teacher interview, and unaided writing assessments 2–3 weeks later.",
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
        text: "Higher-performing students used the AI for vocabulary and checking; lower-performing students more often requested sentence generation and expressed frustration with repeated guidance. In the later unaided assessment, high-performing students correctly reused 65.8% of AI-assisted sentences, compared with 14.0% for the low-performing group.",
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
        text: "The teacher reported that more students completed their work, but questions moving to the AI made shared difficulties harder to notice. Support should adapt to proficiency and time pressure, clarify when to involve the teacher, and keep signs of over-reliance visible.",
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
