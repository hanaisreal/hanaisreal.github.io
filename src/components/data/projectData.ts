const BASE = process.env.PUBLIC_URL;

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectFigure {
  src: string;
  alt: string;
  caption?: string;
  variant?: 'full' | 'narrow';
}

export interface ProjectVideo {
  src: string;
  poster?: string;
  caption?: string;
}

export type ProjectStoryBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'figure'; figure: ProjectFigure }
  | { type: 'figure-row'; figures: ProjectFigure[] }
  | { type: 'video'; video: ProjectVideo };

export interface Project {
  slug: string;
  title: string;
  tldr: string;
  description: string;
  narrative: string;
  contributions: string[];
  tags: string[];
  duration?: string;
  image?: string;
  links?: ProjectLink[];
  storyBlocks?: ProjectStoryBlock[];
}

export const projects: Project[] = [
  {
    slug: "paranmanjang",
    title: "Paranmanjang: Bookmark-Grounded Writing Recommender",
    tldr: "A bookmark-grounded writing tool that vectorized saved links and surfaced relevant summaries while I was drafting.",
    description: "Writing companion that turned bookmarked links into a retrievable knowledge base for contextual recommendations.",
    narrative: `Before personal AI writing tools made this pattern familiar, I worked on Paranmanjang, a writing companion that treated bookmarked links as a living reference library instead of a pile of tabs. The goal was simple: when I was writing, the system should bring back the most relevant things I had already saved instead of making me search for them again.

When a link was saved, the backend crawled the page body, generated a short summary, stored metadata in MySQL, and pushed embeddings into Pinecone. During writing, the system extracted keywords from the current text, embedded that context, and retrieved related bookmarks so the editor could recommend useful material beside the draft.

What interested me most was workflow fit. Retrieval only helps if it arrives at the right moment, with just enough context to nudge the writer forward without interrupting the act of writing itself. Paranmanjang explored that balance through a bookmark browser, a recommendation sidebar, and a Google Docs-connected writing flow.`,
    contributions: [
      "Built the writing editor flow and recommendation surfaces that placed retrieved bookmark summaries beside the active draft",
      "Developed bookmark browsing interfaces that turned saved links into readable cards with summaries and source metadata",
      "Integrated the frontend with bookmark ingestion and recommendation endpoints across the FastAPI, Pinecone, and MySQL pipeline",
    ],
    tags: ["Side Project", "RAG", "Writing Tools"],
    duration: "2023",
    image: `${BASE}/pictures/projects/paranmanjang/paranmanjang-backlogic.png`,
    links: [
      { label: "GitHub", url: "https://github.com/Paranmanjang/Frontend" },
    ],
    storyBlocks: [
      {
        type: 'paragraph',
        text: `Paranmanjang was a 2023 writing-side project built around a question that still matters to me: how can saved references become useful at the exact moment someone is writing? Instead of treating bookmarks as an archive to revisit later, the system reframed them as a personal knowledge base that could actively support drafting.`,
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/pictures/projects/paranmanjang/paranmanjang-backlogic.png`,
          alt: 'Diagram of the bookmark ingestion and recommendation logic behind Paranmanjang.',
          caption: 'A saved link was crawled, summarized, embedded, and stored so the writing interface could retrieve related bookmarks from the user\'s own library.',
        },
      },
      {
        type: 'paragraph',
        text: `The backend pipeline took a bookmarked URL, extracted the article body, summarized it, and stored both the structured bookmark data and its vector representation. When the user wrote inside the editor, the system derived keywords from the current draft, embedded that live context, and returned the most relevant saved links as recommendations. The result felt closer to a personal research assistant than a generic autocomplete tool.`,
      },
      {
        type: 'figure-row',
        figures: [
          {
            src: `${BASE}/pictures/projects/paranmanjang/paranmanjang-back.png`,
            alt: 'Overall backend architecture diagram for Paranmanjang.',
            caption: 'The service architecture connected FastAPI, MySQL, and Pinecone on Naver Cloud infrastructure.',
          },
          {
            src: `${BASE}/pictures/projects/paranmanjang/paranmanjang-cicd.png`,
            alt: 'CI/CD deployment architecture diagram for Paranmanjang.',
            caption: 'A GitHub Actions pipeline built and shipped container images to Naver Cloud for deployment.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: `Looking back, what feels most prescient about the project is that it anticipated a now-common RAG pattern: ground assistance in a user's own collected material rather than generating from nowhere. What I cared about then, and still care about now, was making retrieval feel genuinely situated inside a person's workflow.`,
      },
    ],
  },
  {
    slug: "livrecord",
    title: "Reflective Autobiographical System",
    tldr: "A voice-first AI system that helps older adults turn spoken memories into a personal narrative.",
    description: "Voice-first AI pipeline with STT/TTS that scaffolds older adults through autobiographical storytelling.",
    narrative: `Older adults carry stories that often go untold — not from unwillingness, but from the friction of writing. LivRecord removes that friction. Using voice as the primary input, the system walks users through autobiographical prompts, transcribes their responses, and gradually assembles a narrative they can revisit and share.

The design challenge was making the prompts feel like conversation, not interview. Each question follows naturally from the previous response; the system listens for cues about themes the user wants to return to and surfaces them later. The result feels less like filling in a form and more like talking with someone who remembers everything you said.

Built over four months with a small team, the system won the Grand Prize at the KAIST Social Impact Challenge.`,
    contributions: [
      "Voice interaction pipeline using STT/TTS with GPT-4 for adaptive prompt generation",
      "Prompt design framework that maintains narrative coherence across multiple sessions",
      "User study with older adults, iterated on prompt phrasing and response pacing",
    ],
    tags: ["HCI", "Voice Interaction", "Older Adults"],
    duration: "Feb 2024 – Jun 2024",
    image: `${BASE}/pictures/SPARCS.png`,
    links: [
      { label: "Demo", url: `${BASE}/videos/LivRecord.mp4` },
    ],
    storyBlocks: [
      {
        type: 'paragraph',
        text: `Older adults carry stories that often go untold, not from unwillingness, but from the friction of writing. LivRecord removes that friction by making voice the primary input: users respond to autobiographical prompts out loud, the system transcribes those memories, and a narrative gradually takes shape that they can revisit and share.`,
      },
      {
        type: 'video',
        video: {
          src: `${BASE}/videos/LivRecord.mp4`,
          poster: `${BASE}/pictures/SPARCS.png`,
          caption: 'Demo of the Reflective Autobiographical System, showing how spoken memories are scaffolded into a reflective narrative flow.',
        },
      },
      {
        type: 'paragraph',
        text: `The core design challenge was making the prompts feel like conversation rather than interview. Each question follows naturally from the previous response, and the system listens for themes the user may want to return to later. The interaction is meant to feel less like filling in a form and more like talking with someone who remembers everything you said.`,
      },
      {
        type: 'paragraph',
        text: `Built over four months with a small team, the system won the Grand Prize at the KAIST Social Impact Challenge. What mattered most in the project was not just speech recognition or synthesis, but the pacing of reflection itself: how to help someone stay in their own memory long enough for a story to emerge.`,
      },
    ],
  },
  {
    slug: "upstage-consultation",
    title: "Personalized AI Consultation System",
    tldr: "A RAG-based system that grounds AI responses in a user's own documents, making advice feel personal rather than generic.",
    description: "Full-stack RAG application using Solar LLMs for adaptive, personalized user consulting.",
    narrative: `Generic AI responses feel generic. This system uses retrieval-augmented generation to ground every response in a specific user's context — drawing from documents they've uploaded — so that advice reflects their actual situation rather than a statistical average.

The core insight was that personalization isn't about tone; it's about relevance. When the model cites a clause from a user's own contract or references a figure from their own report, the response earns a different kind of trust. The interface was designed to make that grounding visible: sources are shown inline, not buried.

Built for the Upstage AI Challenge, the system placed in the Top 10.`,
    contributions: [
      "RAG pipeline with Solar LLM and vector database for document-grounded responses",
      "Source attribution UI that surfaces retrieved passages inline with the response",
      "Conversation analysis module that adapts question depth based on user engagement",
    ],
    tags: ["LLM", "RAG", "Personalization"],
    duration: "Apr 2024 – Jun 2024",
    image: `${BASE}/pictures/upstage2.png`,
    links: [],
  },
  {
    slug: "medsam-viewer",
    title: "Medical Image Segmentation Viewer",
    tldr: "A custom DICOM viewer that lets radiologists prompt MedSAM with a click and get 3D CT segmentations propagated through slices.",
    description: "Custom DICOM viewer integrating MedSAM for semi-automatic 3D CT segmentation with LoRA fine-tuning.",
    narrative: `Radiologists working with 3D CT scans still spend significant time manually marking anatomical structures — a process that is both tedious and prone to inter-annotator variation. This project embedded MedSAM into a custom PyQt5 DICOM viewer so that a single click-prompt propagates a segmentation through an entire scan volume.

The viewer was built around the radiologist's existing workflow: you look at a slice, click the structure you want, and the model fills in the rest. The LoRA fine-tuning phase addressed the gap between MedSAM's training distribution and the specific organ types in the clinic's dataset, improving robustness on the edge cases that mattered most in practice.`,
    contributions: [
      "Custom DICOM viewer with integrated MedSAM for click-prompted 3D segmentation",
      "LoRA fine-tuning on clinical CT dataset to improve robustness on target organ types",
      "Prompt design for semi-automatic propagation across axial slices",
    ],
    tags: ["Computer Vision", "Medical AI", "Segmentation"],
    duration: "Mar 2024 – Jun 2024",
    image: `${BASE}/pictures/infinitt healthcare.png`,
    links: [
      { label: "GitHub", url: "https://github.com/sggithi/DICOM-Viewer-MedSAM" },
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find(p => p.slug === slug);
