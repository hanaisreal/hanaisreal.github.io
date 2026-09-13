import React from 'react';

const OngoingResearchSection: React.FC = () => (
  <section id="research">
    <h2 className="sec-heading">Ongoing Research</h2>
    <div className="ongoing-copy">
      <p>
        My work has been deployed where it is hardest to get right: an LLM writing scaffold used by 157 students over six
        weeks of real classes, and a deepfake-scam simulation built around older adults&apos; own faces and voices.
      </p>
      <p>Current focus:</p>
      <ul className="ongoing-list">
        <li>
          <strong>Memory for personal agents:</strong> long-term memory, personalization, and scaffolding that
          supports thinking instead of replacing it.
        </li>
        <li>
          <strong>Interfaces for collaborative AI:</strong> collaborative sensemaking, co-creation, and creativity
          support, extended into AR/VR and embodied interaction.
        </li>
      </ul>
    </div>
  </section>
);

export default OngoingResearchSection;
