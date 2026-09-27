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
  links?: ProjectLink[];
  storyBlocks?: ProjectStoryBlock[];
}

export const projects: Project[] = [
  {
    slug: "ai-journaling",
    title: "Rethinking AI Journaling through Phenomenological Design",
    tldr: "A phenomenological AI journaling interface that captures the raw atmosphere of experience through typing rhythm and generative canvases, moving beyond rigid emotion tags.",
    description: "A phenomenological AI journaling interface that captures the raw atmosphere of experience through typing rhythm and generative canvases, moving beyond rigid emotion tags.",
    narrative: `Drawing from John Dewey’s philosophy, every human experience is profoundly unique, carrying its own distinct atmosphere and sensory weight. In my personal journaling practice, I have always tried to capture not just the facts of what happened, but the full nuance of those moments in words. This project stems from a central question: How can we convey our lived experiences to technology in a way that feels natural, raw, and therapeutic?

Modern journaling apps flatten this rich human experience into discrete database parameters. They force users to translate complex days into rigid inputs like selecting an emoji, choosing a standardized mood tag (such as "stressed" or "depressed"), or toggling weather icons.

By demanding that users categorize their internal state before they even begin writing, existing interfaces strip away the phenomenological atmosphere of the moment. Instead of letting technology adapt to the complex tangle of human emotion, we are forced to fit our living experiences into pre-built app schemas. My goal was to redesign the Algorithmic Experience (AX) to preserve the raw, atmospheric texture of thought without forcing users into artificial taxonomy.`,
    contributions: [],
    tags: ["User Experience course", "AI journaling", "Phenomenological design"],
    duration: "Spring 2026",
    storyBlocks: [
      { type: 'paragraph', text: `Drawing from John Dewey’s philosophy, every human experience is profoundly unique, carrying its own distinct atmosphere and sensory weight. In my personal journaling practice, I have always tried to capture not just the facts of what happened, but the full nuance of those moments in words. This project stems from a central question: How can we convey our lived experiences to technology in a way that feels natural, raw, and therapeutic?` },
      { type: 'heading', text: 'Problem: The Reduction of Lived Experience' },
      { type: 'paragraph', text: `Modern journaling apps flatten this rich human experience into discrete database parameters. They force users to translate complex days into rigid inputs like selecting an emoji, choosing a standardized mood tag (such as "stressed" or "depressed"), or toggling weather icons.` },
      { type: 'paragraph', text: `By demanding that users categorize their internal state before they even begin writing, existing interfaces strip away the phenomenological atmosphere of the moment. Instead of letting technology adapt to the complex tangle of human emotion, we are forced to fit our living experiences into pre-built app schemas. My goal was to redesign the Algorithmic Experience (AX) to preserve the raw, atmospheric texture of thought without forcing users into artificial taxonomy.` },
    ],
  },
  {
    slug: "paranmanjang",
    title: "Bookmark-Grounded Writing Recommender (Paranmanjang)",
    tldr: "A bookmark-grounded writing tool that vectorized saved links and surfaced relevant summaries while I was drafting.",
    description: "Writing companion that turned bookmarked links into a retrievable knowledge base for contextual recommendations.",
    narrative: `Why do saved bookmarks always end up in a digital graveyard? I had hundreds of articles saved, but when I actually sat down to write, I never remembered to search through them. I wanted to build a system that brought those forgotten references back to life, transforming a passive bookmark archive into an active context engine that surfaces relevant notes right when you need them.

Making that vision work took a lot of trial and error on the backend pipeline. On paper, the flow was simple: take a bookmarked URL, extract the body, summarize it, and generate embeddings for Pinecone alongside structured metadata in MySQL. In practice, parsing wildly inconsistent web pages, filtering out junk text, and getting clean summaries without blowing through processing time took heavy tweaking.

The trickiest part was designing the real-time context retrieval for the editor. As someone typed, the FastAPI backend had to analyze the live draft, derive the current context, and query Pinecone without introducing lag into the writing experience. It was a constant balancing act between retrieval frequency, latency, and relevancy. I did not want a generic text generator; I wanted the system to feel like a sharp research partner quietly handing you the exact article you saved six months ago.

To glue everything together, I deployed the services on Naver Cloud infrastructure using Docker containers and built an automated GitHub Actions CI/CD pipeline. On the interface side, I focused heavily on the writing flow, building card components that displayed bookmark summaries and source metadata directly alongside the active draft so referencing felt frictionless.

Looking back, Paranmanjang was essentially a personal Retrieval-Augmented Generation (RAG) system built right before RAG became a standard industry term. The most rewarding part of this project was not just getting the cloud infrastructure and vector database running smoothly, but proving to myself that AI tools are at their best when they are grounded in our own curated knowledge and built directly into how we actually work.`,
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
        text: `Why do saved bookmarks always end up in a digital graveyard? I had hundreds of articles saved, but when I actually sat down to write, I never remembered to search through them. I wanted to build a system that brought those forgotten references back to life, transforming a passive bookmark archive into an active context engine that surfaces relevant notes right when you need them.`,
      },
      {
        type: 'paragraph',
        text: `Making that vision work took a lot of trial and error on the backend pipeline. On paper, the flow was simple: take a bookmarked URL, extract the body, summarize it, and generate embeddings for Pinecone alongside structured metadata in MySQL. In practice, parsing wildly inconsistent web pages, filtering out junk text, and getting clean summaries without blowing through processing time took heavy tweaking.`,
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
        text: `The trickiest part was designing the real-time context retrieval for the editor. As someone typed, the FastAPI backend had to analyze the live draft, derive the current context, and query Pinecone without introducing lag into the writing experience. It was a constant balancing act between retrieval frequency, latency, and relevancy. I did not want a generic text generator; I wanted the system to feel like a sharp research partner quietly handing you the exact article you saved six months ago.`,
      },
      {
        type: 'paragraph',
        text: `To glue everything together, I deployed the services on Naver Cloud infrastructure using Docker containers and built an automated GitHub Actions CI/CD pipeline. On the interface side, I focused heavily on the writing flow, building card components that displayed bookmark summaries and source metadata directly alongside the active draft so referencing felt frictionless.`,
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
        text: `Looking back, Paranmanjang was essentially a personal Retrieval-Augmented Generation (RAG) system built right before RAG became a standard industry term. The most rewarding part of this project was not just getting the cloud infrastructure and vector database running smoothly, but proving to myself that AI tools are at their best when they are grounded in our own curated knowledge and built directly into how we actually work.`,
      },
    ],
  },
  {
    slug: "livrecord",
    title: "Voice-Based Autobiographical Storytelling System (LivRecord)",
    tldr: "A voice-first AI system that helps older adults turn spoken memories into a personal narrative.",
    description: "Voice-first AI pipeline with STT/TTS that scaffolds older adults through autobiographical storytelling.",
    narrative: `I have always been moved by the fact that older adults carry incredible stories that so often remain untold, not because they don't want to share them, but simply because the friction of writing gets in the way. That realization was what made starting LivRecord so deeply inspiring for me. We wanted to eliminate that barrier completely by making voice the primary spark: users simply respond to autobiographical prompts out loud, while our system transcribes and weaves those spoken memories into a meaningful narrative they can revisit and share.

Looking at the demo now, what thrilled me most during the build was tackling our core design challenge: making the prompts feel like a warm, natural conversation rather than an interrogation. We designed each question to flow organically from the user's previous answer, with the system actively listening for subtle themes to return to later. I really wanted the interaction to feel less like filling out a cold form and more like sitting down with a thoughtful companion who remembers every detail you have shared.

Building this during a fast-paced hackathon with a small, dedicated team and ultimately winning the Grand Prize at the KAIST Social Impact Challenge was an unforgettable milestone. Looking back, what resonated with me was learning how to design the pacing of reflection itself, creating a quiet and supportive space that allows someone to linger in their own memories long enough for a real story to emerge.`,
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
        text: `I have always been moved by the fact that older adults carry incredible stories that so often remain untold, not because they don't want to share them, but simply because the friction of writing gets in the way. That realization was what made starting LivRecord so deeply inspiring for me. We wanted to eliminate that barrier completely by making voice the primary spark: users simply respond to autobiographical prompts out loud, while our system transcribes and weaves those spoken memories into a meaningful narrative they can revisit and share.`,
      },
      {
        type: 'video',
        video: {
          src: `${BASE}/videos/LivRecord.mp4`,
          poster: `${BASE}/pictures/SPARCS.png`,
          caption: 'Demo of LivRecord, showing how spoken memories are scaffolded into a reflective narrative flow.',
        },
      },
      {
        type: 'paragraph',
        text: `Looking at the demo now, what thrilled me most during the build was tackling our core design challenge: making the prompts feel like a warm, natural conversation rather than an interrogation. We designed each question to flow organically from the user's previous answer, with the system actively listening for subtle themes to return to later. I really wanted the interaction to feel less like filling out a cold form and more like sitting down with a thoughtful companion who remembers every detail you have shared.`,
      },
      {
        type: 'paragraph',
        text: `Building this during a fast-paced hackathon with a small, dedicated team and ultimately winning the Grand Prize at the KAIST Social Impact Challenge was an unforgettable milestone. Looking back, what resonated with me was learning how to design the pacing of reflection itself, creating a quiet and supportive space that allows someone to linger in their own memories long enough for a real story to emerge.`,
      },
    ],
  },
  {
    slug: "upstage-consultation",
    title: "AI Communication Mediator",
    tldr: "A RAG-based mediator that grounds its responses in shared documents and chat histories, helping people talk through sensitive topics from common facts.",
    description: "Document-grounded RAG mediator that helps people resolve misunderstandings from shared facts.",
    narrative: `Misunderstandings between people often happen because both sides are operating on different assumptions or incomplete details. I wanted to build an AI mediator that could bridge those gaps. Instead of offering boilerplate advice, the system grounded its responses in uploaded documents and chat histories, acting as a neutral anchor to help people talk through sensitive or complex topics.

Getting RAG to work reliably for interpersonal mediation was tough. Naive context retrieval frequently introduced subtle hallucinations or lost crucial nuances, which instantly destroys trust. Standard character chunking kept slicing up key details, so I overhauled the pipeline: moving to semantic chunking, combining dense vector search with sparse keyword matching, and adding a reranking layer to keep retrieved sources pinpoint accurate.

I also designed the chat UI so every recommendation linked directly to inline source excerpts. Seeing the actual document text removed emotional friction and helped users focus on shared facts rather than argument.

Placing in the Top 10 at the Upstage AI Challenge was a great payoff for all the late-night pipeline tuning. More than the award, it showed me that when RAG is built for precision, AI can do something genuinely meaningful: help people understand each other better.`,
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
    title: "Interactive 3D CT Segmentation Tool for Radiologists (MedSAM)",
    tldr: "A custom DICOM viewer that lets radiologists prompt MedSAM with a click and get 3D CT segmentations propagated through slices.",
    description: "Custom DICOM viewer integrating MedSAM for semi-automatic 3D CT segmentation with LoRA fine-tuning.",
    narrative: `For a class project, our team of three set out to tackle a major bottleneck in medical imaging: the tedious process of manually tracing 3D CT scans slice by slice. We wanted to build a custom tool that allowed users to segment entire volumes using simple click prompts with MedSAM.

My main focus was integrating MedSAM into our PyQt5 DICOM viewer and fine-tuning the model for our dataset. On the application side, I decoupled the PyTorch inference engine from the rendering thread so the interface stayed smooth while propagating 2D click prompts across 3D axial slices. On the ML side, base MedSAM struggled with specific organ boundaries, so I fine-tuned it using LoRA to sharpen segmentation accuracy on our target organ types.

Working together to tie the interactive UI with the fine-tuned model pipeline took plenty of iteration and testing within our team. Turning a slow tracing process into a responsive tool was a great experience in making complex vision models practical for real workflows.`,
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
