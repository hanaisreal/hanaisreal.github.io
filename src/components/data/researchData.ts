// researchData.ts

export interface ResearchExperience {
  title: string;
  description: string;
  advisor: string;
  duration: string;  // Added to specify duration of each project
  keyTechnologies: string[]; // Added to store key technologies or methods used
}

export const researchExperiences: ResearchExperience[] = [
  {
      title: "DeepAware: Cybersecurity Education for Older Adults",
      description: "Led the design of a personalized simulation system to foster cybersecurity awareness in older adults using experiential deepfake simulations. Conducted end-to-end system building and mixed-method studies. Paper under review at CHI 2026 (Revise & Resubmit).",
      advisor: "Hajin Lim",
      duration: "Mar 2025 – ongoing",
      keyTechnologies: ["Mixed-method study", "System building", "Thematic analysis"]
  },
  {
      title: "AI-Assisted History Education (HistoriaCraft)",
      description: "Conducted an in-the-wild study of AI-assisted history education, analyzing 11,000+ utterances from real classroom interactions. Focused on understanding how AI can support active learning in educational settings.",
      advisor: "Bongwon Suh",
      duration: "Aug 2025 – ongoing",
      keyTechnologies: ["Conversational log coding", "Classroom observation", "Thematic analysis"]
  },
  {
      title: "Student-AI Writing Scaffolding Analysis",
      description: "Analyzed 14,000+ student-AI dialogue logs to identify scaffolding failures in AI-assisted writing systems used in K-12 EFL classrooms. Developed novel codebooks for qualitative analysis of large-scale interaction data.",
      advisor: "Juho Kim",
      duration: "Jan 2025 – Jun 2025",
      keyTechnologies: ["Large-scale log analysis", "Qualitative coding", "Educational AI"]
  },
  {
      title: "Personalized Academic Counseling with Polyglot-Ko",
      description: "Fine-tuned Polyglot-Ko models using LoRA for personalized high school academic counseling. Explored prompt engineering and hyperparameter tuning to create more contextually aware educational AI systems.",
      advisor: "Bongwon Suh",
      duration: "Dec 2023 – Feb 2024",
      keyTechnologies: ["PyTorch", "HuggingFace", "LoRA", "Prompt Engineering"]
  }
];
