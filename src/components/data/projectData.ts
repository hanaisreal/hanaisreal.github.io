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
      title: "Medical Image Segmentation Viewer",
      description: "Developed a custom DICOM viewer integrating MedSAM for semi-automatic 3D CT segmentation. Improved segmentation robustness by 5% via LoRA fine-tuning and prompting strategies.",
      tags: ["Computer Vision", "Medical AI", "Deep Learning", "Segmentation"],
      skills: ["PyQt5", "PyTorch", "MedSAM", "LoRA", "DICOM"],
      role: "Fine-tuned the MedSAM model using TCIA and BTCV datasets, which contain CT scans of major organs.",
      image: `${process.env.PUBLIC_URL}/pictures/infinitt healthcare.png`,
      github: "https://github.com/sggithi/DICOM-Viewer-MedSAM",
      duration: "Mar 2024 – Jun 2024"
    },
    {
      title: "Personalized AI Consultation System",
      description: "Developed a full-stack RAG system using Solar LLMs for adaptive user consulting; deployed for live testing. Top 10 finalist in Upstage AI Innovation Challenge.",
      tags: ["NLP", "RAG", "LLM", "Multi-Agent AI"],
      skills: ["Streamlit", "React", "Solar LLM", "Vector DB", "FastAPI"],
      role: "Developer, focusing on conversation analysis and AI consultation implementation",
      image: `${process.env.PUBLIC_URL}/pictures/upstage2.png`,
      duration: "Apr 2024 – Jun 2024"
    },
    {
      title: "Reflective Autobiographical System",
      description: "Developed a speech-driven AI pipeline (STT/TTS) assisting older adults in constructing life stories. Won Grand Prize at KAIST Social Impact Challenge.",
      tags: ["NLP", "Speech Processing", "Social Good", "HCI"],
      skills: ["React", "TypeScript", "GPT-4 API", "Speech-to-Text", "PWA"],
      role: "Lead developer, focusing on voice interface implementation and AI integration",
      video: `${process.env.PUBLIC_URL}/videos/LivRecord.mp4`,
      duration: "Feb 2024 – Jun 2024"
    },
    {
      title: "Sustainable Tourism Data Analysis",
      description: "Addressed overtourism by developing a service connecting underutilized destinations with communities. Used ML to categorize attractions based on travel themes from tourism data.",
      tags: ["Data Science", "Machine Learning", "NLP", "Web Scraping"],
      skills: ["Python", "Web Crawling", "Data Visualization", "Clustering"],
      role: "Data analysis and web crawling from Naver blogs to extract keywords of tourist spots.",
      image: `${process.env.PUBLIC_URL}/pictures/소셜빅데이터챌린지.png`,
      duration: "2024"
    },
    {
      title: "Lyrical Evolution Network Analysis",
      description: "Employed semantic network analysis to compare lyrical structures of K-pop and Western pop songs (1991-2020), exploring evolution of themes and linguistic patterns.",
      tags: ["Network Analysis", "NLP", "Data Visualization", "Linguistics"],
      skills: ["Gephi", "Python", "Text Mining", "Graph Analytics"],
      role: "Data preprocessing and network visualization to analyze lyrical theme evolution.",
      image: `${process.env.PUBLIC_URL}/pictures/gephi.png`,
      duration: "2023"
    },
    {
      title: "Task Management Web Application",
      description: "Developed a responsive task management application with Todo/In-progress/Done functionality and customizable timer notifications for productivity optimization.",
      tags: ["Full-Stack", "Web Development", "UI/UX"],
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      role: "Full-stack developer, implementing both frontend and backend functionality",
      video: `${process.env.PUBLIC_URL}/videos/NotifyMe.mp4`,
      github: "https://github.com/hanaisreal/notifyMe",
      duration: "2024"
    },
    {
      title: "CU Store Review Platform",
      description: "Developed a review platform for CU convenience stores with specialized product review systems, personalized recommendations, and comprehensive browsing capabilities.",
      tags: ["Full-Stack", "Recommendation System", "Database"],
      skills: ["React", "Node.js", "Django", "MySQL", "UI/UX"],
      role: "Full-stack developer focusing on user authentication and recommendation algorithms.",
      image: `${process.env.PUBLIC_URL}/pictures/LetmeCU.png`,
      duration: "2023"
    }
  ];