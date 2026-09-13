// researchData.ts

export interface ResearchProject {
  projectTitle: string;
  description: string;
  duration: string;
  keyTechnologies: string[];
}

export interface ResearchExperience {
  lab: string;
  advisor: string;
  institution: string;
  overallDuration: string;
  role: string;
  projects: ResearchProject[];
}

export const researchExperiences: ResearchExperience[] = [
  {
    lab: "Human-Centered Computing Lab (HCCLab)",
    advisor: "Prof. Bongwon Suh",
    institution: "Seoul National University",
    overallDuration: "Sep 2025 – Present",
    role: "Graduate Research Assistant",
    projects: [
      {
        projectTitle: "ToneCanvas: Visually Painting Character Tone",
        description: "Built a visual interface that lets writers paint tone attributes onto characters and see stylistic drift surface in the draft; formative study with fiction writers. UIST 2026 poster.",
        duration: "Sep 2025 – Present",
        keyTechnologies: ["Creativity support tools", "Visualization", "LLM"]
      },
      {
        projectTitle: "Shared Agendas from Separate AI Conversations",
        description: "Designing a team interface that turns members' separate AI conversations into a shared agenda of issues and options, leaving decisions to people. Ongoing.",
        duration: "2026 – Present",
        keyTechnologies: ["Collaborative sensemaking", "Human-AI collaboration"]
      },
      {
        projectTitle: "LLM Privacy-Leakage Benchmark",
        description: "Designing evaluation metrics that separate memorization from hallucination. Ongoing.",
        duration: "2026 – Present",
        keyTechnologies: ["LLM evaluation", "Privacy"]
      }
    ]
  },
  {
    lab: "Research Collaboration with Prof. Hajin Lim",
    advisor: "Prof. Hajin Lim",
    institution: "Seoul National University",
    overallDuration: "Mar 2025 – Present",
    role: "Researcher",
    projects: [
      {
        projectTitle: "DeepAware: Experiential Deepfake Simulations for Older Adults",
        description: "Led DeepAware: built a web platform that embeds learners' own face and voice into deepfake scam simulations, grounded in interviews with five digital educators of older adults; evaluated with 21 older adults. CHI 2026.",
        duration: "Mar 2025 – Present",
        keyTechnologies: ["Mixed-methods evaluation", "System design", "Cybersecurity education"]
      }
    ]
  },
  {
    lab: "KAIST Interaction Lab (KIXLAB)",
    advisor: "Prof. Juho Kim",
    institution: "KAIST",
    overallDuration: "Jan 2025 – Sep 2025",
    role: "Research Intern",
    projects: [
      {
        projectTitle: "When Scaffolding Breaks: Student Interaction with LLM Writing Support",
        description: "Six-week classroom deployment of LLM writing support with 157 eighth-grade students; analyzed 14,863 student–AI messages through qualitative coding and log analysis, showing how reliance patterns diverged by proficiency, and co-wrote the paper. CHI 2026, Best Paper Award.",
        duration: "Jan 2025 – Sep 2025",
        keyTechnologies: ["Large-scale log analysis", "Qualitative coding", "Educational AI"]
      }
    ]
  },
  {
    lab: "Human-Centered Computing Lab (HCCLab)",
    advisor: "Prof. Bongwon Suh",
    institution: "Seoul National University",
    overallDuration: "Dec 2023 – Feb 2024",
    role: "Undergraduate Research Intern",
    projects: [
      {
        projectTitle: "Personalized Academic Counseling with Polyglot-Ko",
        description: "Fine-tuned Polyglot-Ko (LoRA) into a prototype academic-counseling agent for Korean high-school students.",
        duration: "Dec 2023 – Feb 2024",
        keyTechnologies: ["PyTorch", "HuggingFace", "LoRA", "Prompt engineering"]
      }
    ]
  }
];
