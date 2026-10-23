import React from 'react';
import Masthead from '../newui/Masthead';
import { ProjectList, PublicationList } from '../newui/WorkList';
import '../newui/newPortfolio.css';

// Publications first, then projects, on one sheet.
const ResearchPage: React.FC = () => (
  <div>
    <Masthead />
    <main className="page page--publication page--research-sheet page--projects">
      <header className="page-intro">
        <h1 className="page-intro__title">Research</h1>
      </header>
      <PublicationList />
      <hr className="sec-rule" />
      <ProjectList />
    </main>
    <footer className="site-footer">
      <span>Hana Oh</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  </div>
);

export default ResearchPage;
