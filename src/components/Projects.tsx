import React from 'react';

const Projects: React.FC = () => {
  return (
    <div className="projects">
      <section className="projects">
        <h2>Featured Projects</h2>
        <ul>
          <li>
            <h3>Infinite Healthcare Project: 3D Segmentation DICOM Viewer</h3>
            <p>Developed a DICOM Viewer with MedSAM-based segmentation and 3D visualization capabilities.</p>
          </li>
          <li>
            <h3>AI-based Autobiography Coordinator for Seniors</h3>
            <p>Created a service to help seniors reflect on their lives and create autobiographies using AI technology.</p>
          </li>
          <li>
            <h3>Personalized Essay Curation Service</h3>
            <p>Developed a service to integrate users' bookmarked pages into essay writing using Google APIs and web crawling.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Projects;