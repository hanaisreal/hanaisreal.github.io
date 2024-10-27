// researchData.ts

export interface ResearchExperience {
    title: string;
    description: string;
    advisor: string;
  }
  
  export const researchExperiences: ResearchExperience[] = [
    {
      title: "Undergraduate Research Project, HCI Theory and Practice",
      description: "Understanding Post-retirement Identity Crisis Through Digital Interventions: A Qualitative Investigation of Recently Retired Adults’ Psychosocial Needs",
      advisor: "Hajin Lim"
    },
    {
      title: "Undergraduate Intern, SNU HCI Lab",
      description: "Efficient Fine-tuning of Large Language Models for Korean High School Academic Counseling: A LORA-based Approach",
      advisor: "Bongwon Seo"
    }
  ];