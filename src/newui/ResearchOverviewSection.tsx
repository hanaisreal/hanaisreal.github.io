import React from 'react';
import { Link } from 'react-router-dom';
import { researchPhases } from '../components/data/researchCanvasData';

const ResearchOverviewSection: React.FC = () => (
  <section id="research-overview" data-analytics-section="home_research">
    <h2 className="sec-heading">Research</h2>
    <ol className="phase-strip">
      {researchPhases.map((phase) => (
        <li key={phase.id} className={`phase-strip__item phase-strip__item--${phase.id}`}>
          <span className="phase-strip__num">{phase.number}</span>
          <span className="phase-strip__title">{phase.title}</span>
          <span className="phase-strip__sub">{phase.subtitle}</span>
        </li>
      ))}
    </ol>
    <Link
      className="text-link phase-strip__more"
      to="/research"
      data-analytics-event="nav_click"
      data-analytics-label="Explore research map"
      data-analytics-placement="home_research"
    >
      Explore the research map →
    </Link>
  </section>
);

export default ResearchOverviewSection;
