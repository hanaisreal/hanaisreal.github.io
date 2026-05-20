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
  group?: 'selected' | 'side';
}

export const projects: Project[] = [
  {
    title: "Reflective Autobiographical System",
    description: "Built a voice-first AI pipeline with STT/TTS that scaffolds older adults through autobiographical storytelling.",
    tags: ["HCI", "Speech Interaction", "Older Adults", "Social Good"],
    skills: ["React", "TypeScript", "GPT-4 API", "Speech-to-Text", "Text-to-Speech"],
    role: "Lead developer, focusing on voice interaction and AI pipeline implementation.",
    video: `${process.env.PUBLIC_URL}/videos/LivRecord.mp4`,
    duration: "Feb 2024 – Jun 2024",
    group: "selected"
  },
  {
    title: "Personalized AI Consultation System",
    description: "Built and deployed a full-stack RAG application using Solar LLMs for adaptive, personalized user consulting.",
    tags: ["LLM", "RAG", "Personalization", "Full-Stack"],
    skills: ["Streamlit", "React", "Solar LLM", "Vector DB", "FastAPI"],
    role: "Developer, focusing on conversation analysis and AI consultation implementation.",
    image: `${process.env.PUBLIC_URL}/pictures/upstage2.png`,
    duration: "Apr 2024 – Jun 2024",
    group: "selected"
  },
  {
    title: "Medical Image Segmentation Viewer",
    description: "Built a custom DICOM viewer integrating MedSAM for semi-automatic 3D CT segmentation; improved segmentation robustness via LoRA fine-tuning and prompt design.",
    tags: ["Computer Vision", "Medical AI", "Segmentation", "Industry Research"],
    skills: ["PyQt5", "PyTorch", "MedSAM", "LoRA", "DICOM"],
    role: "Fine-tuned MedSAM and implemented viewer-side interactions for CT segmentation workflows.",
    image: `${process.env.PUBLIC_URL}/pictures/infinitt healthcare.png`,
    github: "https://github.com/sggithi/DICOM-Viewer-MedSAM",
    duration: "Mar 2024 – Jun 2024",
    group: "selected"
  },
  {
    title: "Sustainable Tourism Data Analysis",
    description: "Addressed overtourism by connecting underutilized destinations with communities; used tourism data and ML to categorize attractions by travel themes.",
    tags: ["Data Science", "Machine Learning", "NLP", "Web Scraping"],
    skills: ["Python", "Web Crawling", "Data Visualization", "Clustering"],
    role: "Data analysis and web crawling from Naver blogs to extract keywords of tourist spots.",
    image: `${process.env.PUBLIC_URL}/pictures/소셜빅데이터챌린지.png`,
    duration: "2024",
    group: "side"
  },
  {
    title: "Lyrical Evolution Network Analysis",
    description: "Used semantic network analysis to compare K-pop and Western pop lyrics from 1991–2020, exploring shifts in themes and linguistic patterns.",
    tags: ["Network Analysis", "NLP", "Data Visualization", "Linguistics"],
    skills: ["Gephi", "Python", "Text Mining", "Graph Analytics"],
    role: "Data preprocessing and network visualization to analyze lyrical theme evolution.",
    image: `${process.env.PUBLIC_URL}/pictures/gephi.png`,
    duration: "2023",
    group: "side"
  },
  {
    title: "Task Management Web Application",
    description: "Developed a responsive task management application with Todo/In-progress/Done workflows and customizable timer notifications.",
    tags: ["Full-Stack", "Web Development", "UI/UX"],
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    role: "Full-stack developer, implementing both frontend and backend functionality.",
    video: `${process.env.PUBLIC_URL}/videos/NotifyMe.mp4`,
    github: "https://github.com/hanaisreal/notifyMe",
    duration: "2024",
    group: "side"
  },
  {
    title: "CU Store Review Platform",
    description: "Developed a review platform for CU convenience stores with product reviews, personalized recommendations, and browsing features.",
    tags: ["Full-Stack", "Recommendation System", "Database"],
    skills: ["React", "Node.js", "Django", "MySQL", "UI/UX"],
    role: "Full-stack developer focusing on user authentication and recommendation algorithms.",
    image: `${process.env.PUBLIC_URL}/pictures/LetmeCU.png`,
    duration: "2023",
    group: "side"
  }
];
