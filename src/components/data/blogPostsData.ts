// blogPostsData.ts

export interface BlogPost {
  title: string;
  author: string;
  url: string;
  date: string;
  category: string;
  myThoughts?: string; // Optional: Your brief commentary
}

export const blogPosts: BlogPost[] = [
  {
    title: "The Age of AI has begun",
    author: "Bill Gates",
    url: "https://www.gatesnotes.com/The-Age-of-AI-Has-Begun",
    date: "March 2023",
    category: "AI",
    myThoughts: "Thoughtful perspective on AI's potential in education and healthcare"
  },
  {
    title: "Attention is All You Need",
    author: "Vaswani et al.",
    url: "https://arxiv.org/abs/1706.03762",
    date: "2017",
    category: "AI/NLP",
    myThoughts: "The transformer paper that changed everything in NLP"
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    url: "https://www.nngroup.com/books/design-everyday-things-revised/",
    date: "Classic",
    category: "Design/HCI",
    myThoughts: "Essential reading for understanding human-centered design"
  }
];