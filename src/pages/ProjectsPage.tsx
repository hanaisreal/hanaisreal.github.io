import React from 'react';
import Masthead from '../newui/Masthead';
import { ProjectList } from '../newui/WorkList';
import '../newui/newPortfolio.css';

const ProjectsPage: React.FC = () => (
  <div>
    <Masthead />
    <main className="page page--publication page--research-sheet page--projects">
      <header className="page-intro">
        <h1 className="page-intro__title">Projects</h1>
      </header>
      <ProjectList heading={null} />
    </main>
    <footer className="site-footer">
      <span>Hana Oh</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  </div>
);

export default ProjectsPage;
