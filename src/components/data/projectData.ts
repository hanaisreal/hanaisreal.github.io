const BASE = process.env.PUBLIC_URL;

export interface ProjectLink {
  label: string;
  url: string;
}

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
}

export const projects: Project[] = [
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
    image: undefined,
    links: [
      { label: "Demo", url: `${BASE}/videos/LivRecord.mp4` },
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
