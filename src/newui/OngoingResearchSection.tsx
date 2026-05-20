import React from 'react';

const OngoingResearchSection: React.FC = () => (
  <section id="research">
    <h2 className="sec-heading">Ongoing Research</h2>
    <div className="ongoing-copy">
      <p>
        My recent work examines how AI can support <strong>human expression</strong> and <strong>awareness</strong> in
        real-world contexts, from AI-mediated narrative writing to experiential simulations that build intuition in
        everyday users.
      </p>
      <p>As a next step, I am exploring:</p>
      <ul className="ongoing-list">
        <li>
          how to design <strong>AI-mediated interventions</strong> that shift how people understand themselves and their
          context, and
        </li>
        <li>
          how to build <strong>interactive systems</strong> that make AI&apos;s interpretation of human experience visible and
          actionable to users.
        </li>
      </ul>
    </div>
  </section>
);

export default OngoingResearchSection;
