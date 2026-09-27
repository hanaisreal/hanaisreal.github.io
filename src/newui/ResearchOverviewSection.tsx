import React from 'react';
import { Link } from 'react-router-dom';

const interests = [
  {
    title: 'Understanding intent across expertise.',
    text: 'How people engage with AI shifts with their expertise: some delegate without a specific intent and converge too early, while others hold a clear mental model and use AI selectively. I study how personalized agents can adapt to where each user is.',
  },
  {
    title: 'Long-term memory for personalized agents.',
    text: 'User intent accumulates over days, weeks, and months. I am interested in memory that records context without prematurely judging its importance, keeping the user’s own phrasing rather than lossy summaries.',
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
