export interface Project {
    title: string;
    description: string;
    tags: string[];
    skills: string[];
    role: string;
    image?: string;
    duration?: string;
    github?: string;
    video?: string;
  }
  
  export const projects: Project[] = [
    {
      title: "Sustainable Tourism Service for Underutilized Destinations",
      description: "This project addresses the issue of overtourism by developing a service that connects underutilized tourist destinations with local communities. Utilizing data from national statistics portals and the Korea Tourism Data Lab, the team identified less-visited areas and categorized attractions using machine learning techniques based on travel themes.",
      tags: ["Tourism", "Big Data", "Machine Learning"],
      skills: ["Web Crawling", "Data Visualization", "Market Trend Analysis"],
      role: "Identifying the necessary data for data analysis and Crawling reviews and blog from Naver blogs to extract keywords of tourist spots.",
      image: "pictures/소셜빅데이터챌린지.png"
    },
    {
      title: "Development of DICOM Viewer for Segmentation of Medical Image",
      description: "A semester project with Infinite Healthcare as a team of 3, integrated the MedSAM model for 3D image segmentation with an open-source DICOM viewer.",
      tags: ["MedSAM", "DICOM Viewer", "UX", "Segmentation"],
      skills: ["Pyqt5", "Pytorch", "CthreeD"],
      role: "Fine-tuned the MedSAM model using TCIA and BTCV datasets, which contain CT scans of major organs.",
      image: "pictures/infinitt healthcare.png",
      github: "https://github.com/sggithi/DICOM-Viewer-MedSAM"
    },
    {
      title: "Task Management Web Application",
      description: "Developed a responsive task management web application, featuring Todo/In-progress/Done functionality and customizable timer notifications",
      tags: ["Web Development", "Task Management", "Responsive Design"],
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "DaisyUI"],
      role: "Full-stack developer, implementing both frontend and backend functionality",
      video:"videos/NotifyMe.mp4",
      github:"https://github.com/hanaisreal/notifyMe"
    },
    {
      title: "Voice-Driven Interface for Senior Adult Autobiography",
      description: "Designed and developed a voice-driven interface using GPT-4 API and speech to text API to create autobiographies through natural speech interaction. Won 2nd award from Daejeon city.",
      tags: ["Voice Interface", "AI", "Accessibility", "Senior Technology"],
      skills: ["React", "TypeScript", "PWA", "GPT-4 API", "Speech-to-Text API"],
      role: "Lead developer, focusing on voice interface implementation and AI integration",
      video: "videos/LivRecord.mp4",
      duration: "Feb 2024 - June 2024"
    },
    {
      title: "SNU x Upstage LLM Hackathon: AI Relationship Coaching Service",
      description: "Developed an AI-powered relationship advisory platform that analyzes KakaoTalk conversations and provides personalized guidance through multi-agent AI consultation.",
      tags: ["AI", "Relationship Coaching", "Chat Analysis", "Hackathon"],
      skills: ["Streamlit", "React", "LLM", "Multi-agent AI"],
      role: "Developer, focusing on conversation analysis and AI consultation implementation",
      duration: "May 2024"
    },
    {
      title: "LetmeCU - Rate and Connect your taste with CU",
      description: "Developed a review website for CU convenience store that connects company and customers. Features include specialized product review systems, customized recommendations based on user preferences, and comprehensive product browsing with sorting capabilities. Implemented user authentication, real-time review updates, and search functionality with categories and tags. Successfully resolved technical challenges including UI flickering issues and improved sorting system based on user ratings.",
      tags: ["Web Development", "Full Stack", "Review Platform", "Recommendation System", "E-commerce"],
      skills: ["React", "Node.js", "WSGI", "Django", "MySQL", "UI/UX Design"],
      role: "Full-stack developer in a 4-person team, focusing on user authentication implementation, review system development, and UI/UX improvements. Led the resolution of critical UI issues and enhancement of the sorting system.",
      image: "pictures/LetmeCU.png",
      duration: "2023"
  },
  {
    title: "A Comparative Network Analysis of Lyrical Evolution in K-pop and Western Pop Music (1991-2020)",
    description: "This project employs semantic network analysis to examine and compare the lyrical structures of K-pop and Western pop songs from 1991 to 2020. By analyzing top chart hits in five-year intervals, the study explores the evolution of lyrical themes, linguistic patterns, and centrality of key terms.",
    tags: ["Network Analysis", "Music", "Linguistics"],
    skills: ["Gephi", "Excel"],
    role: "Data preprocessing using Excel to extract meaningful terms in the lyrics. Network visualization using Gephi.",
    image: "pictures/gephi.png"
  },
  {
    title: "Health Data Analysis and Visualization System",
    description: "This project developed a health data analysis and visualization system that diagnoses users' health based on metrics like BMI and blood pressure, using 2019 health examination data. The system also provides visual insights into the correlations between lifestyle factors and health risks, emphasizing the significant impact of smoking and drinking on hypertension and obesity.",
    tags: ["Data Analysis", "Health", "Visualization"],
    skills: ["Data Analysis", "Visualization"],
    role: "Developer",
    image: "pictures/건강검진/건강검진1.png"
  },

  ];