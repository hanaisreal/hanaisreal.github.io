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
    lab: "Research Collaboration with Prof. Hajin Lim",
    advisor: "Prof. Hajin Lim",
    institution: "Seoul National University",
    overallDuration: "Mar 2025 – Present",
    role: "Researcher",
    projects: [
      {
        projectTitle: "DeepAware: Experiential Deepfake Simulations for Older Adults",
        description: "Led end-to-end design and mixed-methods evaluation of an experiential deepfake-simulation system that builds cybersecurity intuition in older adults through personalized scam scenarios. Paper accepted to CHI 2026.",
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
    role: "Undergraduate Research Intern",
    projects: [
      {
        projectTitle: "When Scaffolding Breaks: Student Interaction with LLM Writing Support",
        description: "Co-led qualitative analysis of 14,000+ K-12 EFL student–AI dialogues from real classrooms to surface scaffolding failure modes in LLM-based writing support; co-developed the study's coding framework. Paper accepted to CHI 2026 with Best Paper Award.",
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
        description: "Fine-tuned Polyglot-Ko with LoRA into a personalized academic counseling agent tailored to Korean high-school students.",
        duration: "Dec 2023 – Feb 2024",
        keyTechnologies: ["PyTorch", "HuggingFace", "LoRA", "Prompt engineering"]
      }
    ]
  }
];
