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
  | { type: 'heading'; text: string }
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
  thumb?: string;          // 16:10 list thumbnail
  links?: ProjectLink[];
  storyBlocks?: ProjectStoryBlock[];
}

export const projects: Project[] = [
  {
    slug: "medsam-viewer",
    title: "Interactive 3D CT Segmentation with MedSAM",
    tldr: "A CT viewer where one prompt segments a target across scan slices, so radiologists don't have to trace each slice by hand.",
    description: "A CT viewer integrating MedSAM for click-prompted segmentation across slices.",
    narrative: "Our three-person team built a course-project prototype for outlining structures in CT scans. A user supplies a click prompt, and MedSAM propagates the segmentation through axial slices.\n\nI integrated model inference into a PyQt5 DICOM viewer and kept it separate from rendering so the interface could remain responsive during processing. I also used LoRA, a parameter-efficient fine-tuning method, to adapt the model to the target CT data.\n\nThe result connects interactive prompts, volume viewing, and segmentation in one tool. It is a course prototype rather than a clinically validated system.",
    contributions: [
      "Integrated MedSAM into a PyQt5 DICOM viewer",
      "Fine-tuned the model with LoRA for the target CT data",
      "Implemented prompt propagation across axial slices"
    ],
    tags: ["Computer Vision", "Medical AI", "Segmentation"],
    thumb: `${BASE}/pictures/thumbs/medsam-viewer.jpg`,
    duration: "Mar 2024 – Jun 2024",
    image: `${BASE}/pictures/infinitt healthcare.png`,
    links: [
      { label: "GitHub", url: "https://github.com/sggithi/DICOM-Viewer-MedSAM" },
    ],
  },
  {
    slug: "livrecord",
    title: "LivRecord: Voice-Based Life Stories",
    tldr: "A voice-based storytelling tool that helps older adults turn spoken memories into a personal narrative.",
    description: "A voice-based tool for collecting memories and shaping autobiographical stories.",
    narrative: "LivRecord lets older adults tell their stories aloud. The system transcribes their responses and helps organize the memories into a narrative they can revisit and share.\n\nThe main interaction challenge was asking follow-up questions that build on the previous answer. We focused on conversational pacing and continuity so users could reflect without feeling they were completing a form.\n\nI worked on the speech pipeline and adaptive prompts. The prototype won the Grand Prize at the KAIST Social Impact Challenge; the demo shows the storytelling flow.",
    contributions: [
      "Connected speech recognition, voice output, and GPT-4 prompts",
      "Designed follow-up prompts to maintain narrative continuity",
      "Iterated on question wording and response pacing with older adults"
    ],
    tags: ["HCI", "Voice Interaction", "Older Adults"],
    thumb: `${BASE}/pictures/thumbs/livrecord.jpg`,
    duration: "Feb 2024 – Jun 2024",
    image: `${BASE}/pictures/SPARCS-enhanced.png`,
    links: [
      { label: "Demo", url: `${BASE}/videos/LivRecord.mp4` },
    ],
    storyBlocks: [
      {
        type: 'paragraph',
        text: "LivRecord lets older adults tell their stories aloud. The system transcribes their responses and helps organize the memories into a narrative they can revisit and share.",
      },
      {
        type: 'video',
        video: {
          src: `${BASE}/videos/LivRecord.mp4`,
          poster: `${BASE}/pictures/SPARCS-enhanced.png`,
          caption: 'Demo of LivRecord, showing how spoken memories are scaffolded into a reflective narrative flow.',
        },
      },
      {
        type: 'paragraph',
        text: "The main interaction challenge was asking follow-up questions that build on the previous answer. We focused on conversational pacing and continuity so users could reflect without feeling they were completing a form.",
      },
      {
        type: 'paragraph',
        text: "I worked on the speech pipeline and adaptive prompts. The prototype won the Grand Prize at the KAIST Social Impact Challenge; the demo shows the storytelling flow.",
      },
    ],
  },
  {
    slug: "paranmanjang",
    title: "Writing with Saved References",
    tldr: "A writing tool that brings relevant saved articles beside the draft, so bookmarks can become useful references.",
    description: "A writing editor that retrieves relevant summaries from a personal bookmark library.",
    narrative: "Paranmanjang brings a writer's saved reading into the drafting process. Instead of searching a separate bookmark archive, writers see related articles and summaries alongside their text.\n\nThe pipeline extracts and summarizes bookmarked pages, stores their embeddings in Pinecone, and keeps source metadata in MySQL. A FastAPI service retrieves relevant bookmarks from the draft's context.\n\nMy work focused on the editor, bookmark cards, and frontend integration. The interface keeps source information beside each summary so writers can return to the original article.\n\nThe service architecture used Docker on Naver Cloud, with GitHub Actions for deployment. The diagrams show the ingestion, retrieval, and deployment flows.",
    contributions: [
      "Built the editor and recommendation cards beside the draft",
      "Designed bookmark browsing with summaries and source metadata",
      "Connected the frontend to bookmark ingestion and retrieval endpoints"
    ],
    tags: ["Side Project", "RAG", "Writing Tools"],
    thumb: `${BASE}/pictures/thumbs/paranmanjang.jpg`,
    duration: "2023",
    image: `${BASE}/pictures/projects/paranmanjang/paranmanjang-backlogic.png`,
    links: [
      { label: "GitHub", url: "https://github.com/Paranmanjang/Frontend" },
    ],
    storyBlocks: [
      {
        type: 'paragraph',
        text: "Paranmanjang brings a writer's saved reading into the drafting process. Instead of searching a separate bookmark archive, writers see related articles and summaries alongside their text.",
      },
      {
        type: 'paragraph',
        text: "The pipeline extracts and summarizes bookmarked pages, stores their embeddings in Pinecone, and keeps source metadata in MySQL. A FastAPI service retrieves relevant bookmarks from the draft's context.",
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
        text: "My work focused on the editor, bookmark cards, and frontend integration. The interface keeps source information beside each summary so writers can return to the original article.",
      },
      {
        type: 'paragraph',
        text: "The service architecture used Docker on Naver Cloud, with GitHub Actions for deployment. The diagrams show the ingestion, retrieval, and deployment flows.",
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
    ],
  },
  {
    slug: "upstage-consultation",
    title: "AI Communication Mediator",
    tldr: "An AI mediator that uses shared documents and chat histories to give people a common reference during difficult conversations.",
    description: "An AI mediator that connects responses to source passages in shared documents and chat histories.",
    narrative: "The mediator uses uploaded documents and chat histories to address gaps in shared information. Each response points back to relevant passages so users can inspect the basis for a suggestion.\n\nTo preserve context during retrieval, I used semantic chunking to keep related ideas together, combined meaning-based and keyword search, and reranked the retrieved passages before generating a response.\n\nI built the retrieval pipeline and source attribution interface. The prototype placed in the Top 10 at the Upstage AI Challenge; it explores how shared evidence can support mediation.",
    contributions: [
      "Built document retrieval with Solar LLM and a vector database",
      "Designed inline source excerpts for checking responses",
      "Adapted follow-up question depth to user engagement"
    ],
    tags: ["LLM", "RAG", "Personalization"],
    thumb: `${BASE}/pictures/thumbs/upstage-consultation.jpg`,
    duration: "Apr 2024 – Jun 2024",
    image: `${BASE}/pictures/upstage2.png`,
    links: [],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find(p => p.slug === slug);
