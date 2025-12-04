import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StickyHeader from '../newui/StickyHeader';
import '../newui/newPortfolio.css';
import './Wordbank.css';

interface WordEntry {
  word: string;
  hanja?: string; // Chinese characters
  meaning: string;
  feeling: string;
  category: string;
  dateAdded: string;
  color: string;
  type: 'word' | 'phrase'; // Distinguish between words and philosophical phrases
  philosopher?: string; // For philosophical phrases
  originalLanguage?: string; // Language of origin
}

// Template data - you can replace this with your own words
const templateWords: WordEntry[] = [
  {
    word: "Serendipity",
    meaning: "The occurrence of pleasant surprises",
    feeling: "This word captures those beautiful unexpected moments that change everything. It reminds me that life's best gifts often come when we least expect them.",
    category: "Emotion",
    dateAdded: "2024-12-01",
    color: "#e8f4fd",
    type: "word"
  },
  {
    word: "知己知彼",
    hanja: "知己知彼",
    meaning: "Know yourself, know your enemy (and you will not be imperiled in a hundred battles)",
    feeling: "This phrase from Sun Tzu resonates deeply with my research approach. Understanding both the human perspective and AI capabilities is crucial for meaningful HCI work.",
    category: "Philosophy",
    dateAdded: "2024-11-30",
    color: "#fef3e2",
    type: "phrase",
    philosopher: "Sun Tzu",
    originalLanguage: "Classical Chinese"
  },
  {
    word: "温故知新",
    hanja: "溫故知新",
    meaning: "By reviewing the old, one learns the new",
    feeling: "Confucius' wisdom about learning resonates with how I approach research - building on existing knowledge to discover new insights. It's the foundation of good scholarship.",
    category: "Learning",
    dateAdded: "2024-11-28",
    color: "#f0fdf4",
    type: "phrase",
    philosopher: "Confucius",
    originalLanguage: "Classical Chinese"
  },
  {
    word: "Ephemeral",
    hanja: "一期一會",
    meaning: "Lasting for a very short time; one time, one meeting",
    feeling: "There's something bittersweet about temporary beauty. Like cherry blossoms or the golden hour - precious because they don't last. The Japanese concept of ichigo ichie captures this perfectly.",
    category: "Time",
    dateAdded: "2024-11-25",
    color: "#f5f3ff",
    type: "word",
    originalLanguage: "English/Japanese"
  },
  {
    word: "The unexamined life is not worth living",
    meaning: "A life without reflection and self-knowledge lacks meaning",
    feeling: "Socrates' famous declaration challenges me to constantly reflect on my research, my motivations, and my impact. It's what drives me to ask deeper questions about human-AI interaction.",
    category: "Philosophy",
    dateAdded: "2024-11-20",
    color: "#e8f4fd",
    type: "phrase",
    philosopher: "Socrates",
    originalLanguage: "Ancient Greek"
  },
  {
    word: "Luminescence",
    hanja: "光明",
    meaning: "Light produced by chemical or biological processes",
    feeling: "This word feels like discovery itself - the gentle glow of understanding, the soft light of knowledge emerging from darkness. 光明 (guangming) adds the sense of brightness and clarity I seek in research.",
    category: "Science",
    dateAdded: "2024-11-15",
    color: "#fef3e2",
    type: "word",
    originalLanguage: "English"
  }
];

const categories = ["All", "Emotion", "Time", "Science", "Flow", "Research", "Art", "Philosophy", "Learning"];

const Wordbank: React.FC = () => {
  const [words] = useState<WordEntry[]>(templateWords);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWord, setSelectedWord] = useState<WordEntry | null>(null);

  const filteredWords = words.filter(word => {
    const matchesCategory = selectedCategory === "All" || word.category === selectedCategory;
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="wordbank-page">
      <StickyHeader />

      <main className="wordbank-main">
        <div className="wordbank-container">
          {/* Header */}
          <motion.header
            className="wordbank-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="wordbank-back-link">
              ← Back to Portfolio
            </Link>
            <h1 className="wordbank-title">My Wordbank</h1>
            <p className="wordbank-subtitle">
              A collection of words that resonate with me, their meanings, and the feelings they evoke.
              Each word is a small window into how language shapes our understanding of the world.
            </p>
          </motion.header>

          {/* Search and Filter */}
          <motion.div
            className="wordbank-controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="wordbank-search">
              <input
                type="text"
                placeholder="Search words..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="wordbank-search-input"
              />
            </div>

            <div className="wordbank-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`wordbank-category-btn ${
                    selectedCategory === category ? 'active' : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Word Count */}
          <motion.div
            className="wordbank-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filteredWords.length} word{filteredWords.length !== 1 ? 's' : ''} found
          </motion.div>

          {/* Words Grid */}
          <motion.div
            className="wordbank-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredWords.map((word, index) => (
              <motion.div
                key={word.word}
                className="word-card"
                style={{ backgroundColor: word.color }}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedWord(word)}
              >
                <div className="word-card-header">
                  <div className="word-title-section">
                    <h3 className="word-title">{word.word}</h3>
                    {word.hanja && (
                      <span className="word-hanja">{word.hanja}</span>
                    )}
                  </div>
                  <div className="word-badges">
                    <span className="word-category">{word.category}</span>
                    {word.type === 'phrase' && (
                      <span className="word-type">Quote</span>
                    )}
                  </div>
                </div>

                {word.philosopher && (
                  <div className="word-philosopher">
                    — {word.philosopher}
                  </div>
                )}

                <p className="word-meaning">{word.meaning}</p>

                <div className="word-card-footer">
                  <div className="word-meta">
                    <span className="word-date">Added {word.dateAdded}</span>
                    {word.originalLanguage && (
                      <span className="word-language">{word.originalLanguage}</span>
                    )}
                  </div>
                  <button className="word-read-more">Read feeling →</button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredWords.length === 0 && (
            <motion.div
              className="wordbank-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>No words found</h3>
              <p>Try adjusting your search or selecting a different category.</p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Word Detail Modal */}
      {selectedWord && (
        <motion.div
          className="word-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedWord(null)}
        >
          <motion.div
            className="word-modal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="word-modal-close"
              onClick={() => setSelectedWord(null)}
            >
              ×
            </button>

            <div className="word-modal-content">
              <div className="word-modal-header">
                <div className="word-modal-title-section">
                  <h2 className="word-modal-title">{selectedWord.word}</h2>
                  {selectedWord.hanja && (
                    <span className="word-modal-hanja">{selectedWord.hanja}</span>
                  )}
                </div>
                <div className="word-modal-badges">
                  <span className="word-modal-category">{selectedWord.category}</span>
                  {selectedWord.type === 'phrase' && (
                    <span className="word-modal-type">Quote</span>
                  )}
                </div>
              </div>

              {selectedWord.philosopher && (
                <div className="word-modal-philosopher">
                  <h3>Attributed to</h3>
                  <p>{selectedWord.philosopher}</p>
                  {selectedWord.originalLanguage && (
                    <span className="word-modal-language">({selectedWord.originalLanguage})</span>
                  )}
                </div>
              )}

              <div className="word-modal-meaning">
                <h3>Meaning</h3>
                <p>{selectedWord.meaning}</p>
              </div>

              <div className="word-modal-feeling">
                <h3>My Feeling</h3>
                <p>{selectedWord.feeling}</p>
              </div>

              <div className="word-modal-meta">
                <span>Added on {selectedWord.dateAdded}</span>
                {selectedWord.originalLanguage && !selectedWord.philosopher && (
                  <span> • {selectedWord.originalLanguage}</span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Wordbank;