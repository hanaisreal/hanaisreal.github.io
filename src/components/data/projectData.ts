export interface Project {
    title: string;
    description: string;
    tags: string[];
    skills: string[];
    role: string;
    image?: string;
  }
  
  export const projects: Project[] = [
    {
      title: "Categorization of Words Based on Functional and Compositional Attributes",
      description: "This research project investigates the cognitive processes of word categorization, focusing on how individuals classify ambiguous items like vegetables and fruits. Through a reaction time experiment using image stimuli, the study aims to determine whether people rely more on compositional features or functional attributes when categorizing words with unclear usage.",
      tags: ["Language", "Cognition", "Experiment"],
      skills: ["Psychopy", "Python"],
      role: "Solo project",
      image: "https://prod-files-secure.s3.us-west-2.amazonaws.com/33e26bf2-ab28-4389-9eb6-312bdc562552/35bccecd-18fc-4b3c-87be-de85012dc750/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.06.21.png"
    },
    {
      title: "A Comparative Network Analysis of Lyrical Evolution in K-pop and Western Pop Music (1991-2020)",
      description: "This project employs semantic network analysis to examine and compare the lyrical structures of K-pop and Western pop songs from 1991 to 2020. By analyzing top chart hits in five-year intervals, the study explores the evolution of lyrical themes, linguistic patterns, and centrality of key terms.",
      tags: ["Network Analysis", "Music", "Linguistics"],
      skills: ["Gephi", "Excel"],
      role: "Data preprocessing using Excel to extract meaningful terms in the lyrics. Network visualization using Gephi.",
      image: "https://prod-files-secure.s3.us-west-2.amazonaws.com/33e26bf2-ab28-4389-9eb6-312bdc562552/dde239e4-4858-4b60-b2ba-b0785ec6c8b9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.42.31.png"
    },
    {
      title: "Health Data Analysis and Visualization System",
      description: "This project developed a health data analysis and visualization system that diagnoses users' health based on metrics like BMI and blood pressure, using 2019 health examination data. The system also provides visual insights into the correlations between lifestyle factors and health risks, emphasizing the significant impact of smoking and drinking on hypertension and obesity.",
      tags: ["Data Analysis", "Health", "Visualization"],
      skills: ["Data Analysis", "Visualization"],
      role: "Developer",
      image: "https://prod-files-secure.s3.us-west-2.amazonaws.com/33e26bf2-ab28-4389-9eb6-312bdc562552/2069c027-51cb-4927-8248-66e91bd1b199/output2.png"
    },
    {
      title: "Sustainable Tourism Service for Underutilized Destinations",
      description: "This project addresses the issue of overtourism by developing a service that connects underutilized tourist destinations with local communities. Utilizing data from national statistics portals and the Korea Tourism Data Lab, the team identified less-visited areas and categorized attractions using machine learning techniques based on travel themes.",
      tags: ["Tourism", "Big Data", "Machine Learning"],
      skills: ["Web Crawling", "Data Visualization", "Market Trend Analysis"],
      role: "Identifying the necessary data for data analysis and Crawling reviews and blog from Naver blogs to extract keywords of tourist spots.",
      image: "https://prod-files-secure.s3.us-west-2.amazonaws.com/33e26bf2-ab28-4389-9eb6-312bdc562552/3f24e54a-c221-4772-9e32-ac923572bd5c/%E1%84%89%E1%85%A9%E1%84%89%E1%85%A7%E1%86%AF%E1%84%87%E1%85%B5%E1%86%A8%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%E1%84%8E%E1%85%A2%E1%86%AF%E1%84%85%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%B5.png"
    }
  ];