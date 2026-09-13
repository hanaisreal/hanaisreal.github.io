import React from 'react';

const OngoingResearchSection: React.FC = () => (
  <section id="research">
    <h2 className="sec-heading">Ongoing Research</h2>
    <div className="ongoing-copy">
      <p>
        My work has been deployed where it is hardest to get right: an LLM writing scaffold used by 157 students over six
        weeks of real classes, and a deepfake-scam simulation built around older adults&apos; own faces and voices.
      </p>
      <p>Right now I am working on:</p>
      <ul className="ongoing-list">
        <li>
          <strong>Personal AI agents</strong> &mdash; long-term memory, personalization, and how scaffolding shapes what
          people hand over to an assistant.
        </li>
        <li>
          <strong>Collaborative AI systems</strong> &mdash; collaborative sensemaking, co-creation, and creativity support,
          and carrying these into AR/VR and embodied interfaces.
        </li>
      </ul>
    </div>
  </section>
);

export default OngoingResearchSection;
