import React from 'react';
import { Link } from 'react-router-dom';

const interests = [
  {
    title: 'Understanding intent across expertise.',
    text: 'Experts often hold a clear mental model of the final output, while novices explore and can be prone to premature convergence. I study how personalized agents should adapt: structural execution for experts, co-exploration for novices.',
  },
  {
    title: 'Long-term memory for personalized agents.',
    text: 'User intent accumulates over days, weeks, and months. I build memory that records users’ verbatim expressions rather than lossy summaries, so previously minor details can gain relevance later.',
  },
];

const ResearchOverviewSection: React.FC = () => (
  <section id="research-interests" data-analytics-section="home_research">
    <h2 className="sec-heading">Research Interests</h2>
    <ul className="interest-list">
      {interests.map((item) => (
        <li key={item.title}>
          <strong>{item.title}</strong> {item.text}
        </li>
      ))}
    </ul>
    <Link
      className="text-link interest-list__more"
      to="/research"
      data-analytics-event="nav_click"
      data-analytics-label="Explore research map"
      data-analytics-placement="home_research"
    >
      See the research map →
    </Link>
  </section>
);

export default ResearchOverviewSection;
