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
      title: "Human-Computer Interaction Research, Identity in Life Transitions",
      description: "An ongoing qualitative HCI study focused on the identity crisis experienced by individuals in pre- and post-retirement phases. The project involves conducting in-depth interviews and affinity diagramming to understand the psychological and social challenges faced by retirees, such as sustaining social roles, maintaining self-worth, and managing emotional uncertainties. Currently exploring design solutions to support smoother identity transitions in retirement.",
      advisor: "Hajin Lim",
      duration: "Ongoing",
      keyTechnologies: ["Affinity Diagramming", "Interview Analysis", "Qualitative Data Analysis"]
  },
  {
      title: "Personal Project, Large Language Model Development",
      description: "Fine-tuning of the Polyglot-Ko model to develop a specialized LLM agent for Korean high school academic counseling, using interview data from the Korea Artificial Intelligence Hub. This project involved leveraging LoRA to optimize model training, enhancing understanding of LLMs in personalization. The findings indicated that the model required refinement to reduce subjective responses, highlighting areas for future improvement.",
      advisor: "BongWon Seo",
      duration: "2 months",
      keyTechnologies: ["Polyglot-Ko", "LoRA", "Personalization"]
  }
];
