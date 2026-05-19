export interface Publication {
  year: string;
  title: string;
  authors: string;
  venue: string;
  status: string;
  type: 'conference' | 'journal' | 'workshop';
  bestPaper?: boolean;
  insight?: string;
  coFirstAuthors?: string[];  // names that share first authorship
}

export const publications: Publication[] = [
  {
    year: "2026",
    title: "DeepAware: Using Experiential Deepfake Simulations to Enhance Cybersecurity Awareness in Older Adults",
    authors: "Hana Oh, Eunbi Lee, Seungju Shin, Keyeun Lee, Miran Pyun, Hajin Lim",
    venue: "CHI 2026",
    status: "Accepted",
    type: "conference",
    insight: "What if older adults could experience a deepfake before encountering one in the wild?"
  },
  {
    year: "2026",
    title: "When Scaffolding Breaks: Investigating Student Interaction with LLM-Based Writing Support in Real-Time K-12 EFL Classrooms",
    authors: "Junho Myung, Hyunseung Lim, Hana Oh, Hyoungwook Jin, Nayeon Kang, So-Yeon Ahn, Hwajung Hong, Alice Oh, Juho Kim",
    coFirstAuthors: ["Hyunseung Lim", "Hana Oh"],
    venue: "CHI 2026",
    status: "Accepted",
    type: "conference",
    bestPaper: true,
    insight: "When the AI scaffold fails mid-lesson, what do students actually do?"
  },
  {
    year: "2025",
    title: "Supporting Young Historians: Real-World Lessons from AI-Enabled Active Learning in Classrooms",
    authors: "Hyungwoo Song, Kieun Park, Hana Oh, Hoyeol Yang",
    venue: "Computers & Education",
    status: "Under Review",
    type: "journal",
    insight: "AI as a thinking partner, not a shortcut, for history education."
  }
];
