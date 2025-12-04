// publicationsData.ts

export interface Publication {
  year: string;
  title: string;
  authors: string;
  venue: string;
  status: string;
  type: 'conference' | 'journal' | 'workshop';
}

export const publications: Publication[] = [
  {
    year: "2026",
    title: "DeepAware: Using Experiential Deepfake Simulations to Enhance Cybersecurity Awareness in Older Adults",
    authors: "Hana Oh, Eunbi Lee, Seungju Shin, Keyeun Lee, Miran Pyun, Hajin Lim",
    venue: "CHI 2026",
    status: "Under Review: Revise & Resubmit",
    type: "conference"
  },
  {
    year: "2026",
    title: "When Scaffolding Breaks: Investigating Student Interaction with LLM-Based Writing Support in Real-Time K-12 EFL Classrooms",
    authors: "Junho Myung, Hyunseung Lim, Hana Oh, Hyoungwook Jin, Nayeon Kang, So-Yeon Ahn, Hwajung Hong, Alice Oh, Juho Kim",
    venue: "CHI 2026",
    status: "Under Review: Revise & Resubmit",
    type: "conference"
  },
  {
    year: "2025",
    title: "Supporting Young Historians: Real-World Lessons from AI-Enabled Active Learning in Classrooms",
    authors: "Hyungwoo Song, Kieun Park, Hana Oh, Hoyeol Yang, Yeonjoon Kim, Jung Lee, Dongseok Heo, Jaehoon Choi, Minchae Kim, Jueon Lee, Bongwon Suh",
    venue: "Computer & Education Journal",
    status: "In Preparation",
    type: "journal"
  }
];