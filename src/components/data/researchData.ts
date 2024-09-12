// researchData.ts

export interface ResearchExperience {
    title: string;
    description: string;
    advisor: string;
  }
  
  export const researchExperiences: ResearchExperience[] = [
    {
      title: "Undergraduate Research, Infinite Healthcare",
      description: "Development and Optimization of a 3D Segmentation DICOM Viewer Utilizing MedSAM for Enhanced Medical Image Analysis",
      advisor: "Hyeonsang Eom"
    },
    {
      title: "Undergraduate Intern, SNU HCI Lab",
      description: "Efficient Fine-tuning of Large Language Models for Korean High School Academic Counseling: A LORA-based Approach",
      advisor: "Bongwon Seo"
    }
  ];