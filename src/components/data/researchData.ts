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
  projects: ResearchProject[];
}

export const researchExperiences: ResearchExperience[] = [
  {
      lab: "Human Computer Interaction + Design Lab",
      advisor: "Prof. Hajin Lim",
      institution: "Seoul National University",
      overallDuration: "Mar 2024 – ongoing",
      projects: [
        {
          projectTitle: "DeepAware: Cybersecurity Education for Older Adults",
          description: "Led the design of a personalized simulation system to foster cybersecurity awareness in older adults using experiential deepfake simulations. Conducted end-to-end system building and mixed-method studies. Paper accepted at CHI 2026.",
          duration: "Mar 2024 – ongoing",
          keyTechnologies: ["Mixed-method study", "System building", "Thematic analysis"]
        }
      ]
  },
  {
      lab: "Human Computer Computing Lab",
      advisor: "Prof. Bongwon Suh",
      institution: "Seoul National University",
      overallDuration: "Dec 2023 – ongoing",
      projects: [
        {
          projectTitle: "AI-Assisted History Education (HistoriaCraft)",
          description: "Conducted an in-the-wild study of AI-assisted history education, analyzing 11,000+ utterances from real classroom interactions. Focused on understanding how AI can support active learning in educational settings.",
          duration: "Aug 2023 – ongoing",
          keyTechnologies: ["Conversational log coding", "Classroom observation", "Thematic analysis"]
        },
        {
          projectTitle: "Personalized Academic Counseling with Polyglot-Ko",
          description: "Fine-tuned Polyglot-Ko models using LoRA for personalized high school academic counseling. Explored prompt engineering and hyperparameter tuning to create more contextually aware educational AI systems.",
          duration: "Dec 2023 – Feb 2024",
          keyTechnologies: ["PyTorch", "HuggingFace", "LoRA", "Prompt Engineering"]
        }
      ]
  },
  {
      lab: "KIXLAB",
      advisor: "Prof. Juho Kim",
      institution: "KAIST",
      overallDuration: "Jan 2024 – Jun 2024",
      projects: [
        {
          projectTitle: "Student-AI Writing Scaffolding Analysis",
          description: "Analyzed 14,000+ student-AI dialogue logs to identify scaffolding failures in AI-assisted writing systems used in K-12 EFL classrooms. Developed novel codebooks for qualitative analysis of large-scale interaction data.",
          duration: "Jan 2024 – Jun 2024",
          keyTechnologies: ["Large-scale log analysis", "Qualitative coding", "Educational AI"]
        }
      ]
  }
];
