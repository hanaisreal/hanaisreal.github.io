import React, { useState } from 'react';
import './Portfolio.css';
import { projects, Project } from './data/projectData';
import { researchExperiences } from './data/researchData';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFading, setIsFading] = useState(false);

  // Open the modal by setting the selected project
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsFading(false);
  };

  // Close the modal with fade-out effect
  const closeModal = () => {
    setIsFading(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsFading(false);
    }, 300); // Wait for the fade-out animation to complete
  };

  return (
    <div className="portfolio-container">
      <header className="center-align">
        <img src={`${process.env.PUBLIC_URL}/pictures/profile.jpeg`} alt="Hana Oh" className="profile-picture" />
        <h1>Hana Oh</h1>
        <p className="university">Seoul National University</p>
        <p className="email">ohhanathefirst at gmail dot com</p>
        
        <div className="social-links">
          <a href={`${process.env.PUBLIC_URL}/path-to-your-cv.pdf`} target="_blank" rel="noopener noreferrer">
            <HiDocument className="icon" />
          </a>
          <a href="https://github.com/hanaisreal" target="_blank" rel="noopener noreferrer">
            <FaGithub className="icon" />
          </a>
          <a href="https://linkedin.com/in/hana-oh-921945290/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="icon" />
          </a>
        </div>
      </header>

      <hr className="divider" />

      <section className="about-me">
        <h2>Hey there, I'm Hana Oh! 👋</h2>
        <p>📚 Undergraduate student pursuing Computer Science and Business Administration at Seoul National University, with a diverse international background in China and Indonesia.</p>
        <p>I am passionate about Human-Computer Interaction (HCI) and exploring how technology can seamlessly integrate into people's lives. My academic background in both CS and Business equips me with the ability to approach problems from both a technical and user-centric perspective. I'm particularly excited about designing intuitive systems that make meaningful impacts on people's daily interactions with technology.</p>
        <p>My current research focuses on two key areas within HCI:</p>
        <ol>
          <li>🤖 Human-AI Interaction: My work focuses on designing AI-driven tools that prioritize seamless communication, accessibility, and adaptability across diverse applications. Whether developing a 🗣️ voice-driven interface for seniors to record personal stories, creating 💬 relationship coaching tools that interpret nuanced conversational data, or building intuitive 🏥 platforms for medical professionals, I aim to make AI a responsive partner in everyday tasks. Each project reflects my commitment to understanding unique user needs and delivering AI solutions that enhance both user engagement and practical utility.</li>
          <li>Enhancing Learning Experiences: Developing interactive tools and personalized AI-driven platforms that support student engagement and provide meaningful feedback, empowering both students and educators in diverse educational settings.</li>
        </ol>
      </section>


      <section className="experience">
        <h2>Research Experience</h2>
        {researchExperiences.map((experience, index) => (
          <div key={index} className="experience-card">
            <h3>{experience.title}</h3>
            <p>{experience.description}</p>
            <p>Advisor: {experience.advisor}</p>
          </div>
        ))}
      </section>

      <section className="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              onClick={() => openModal(project)} // Open modal when clicking anywhere on the card
            >
              <h3>{project.title}</h3>
              
              {project.image && (
                <img src={project.image} alt={project.title} className="project-image" />
              )}
              {project.video && (
                <video controls className="project-video">
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              <p>
                {project.description.slice(0, 100)}...{' '}
              </p>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <div
          className={`modal-overlay ${isFading ? 'fade-out' : ''}`}
          onClick={closeModal} // Close the modal when clicking outside of modal content
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent click inside the modal content from closing it
          >
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h3>{selectedProject.title}</h3>
            {selectedProject.image && (
              <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
            )}
            {selectedProject.video && (
              <video controls className="modal-video">
                <source src={selectedProject.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <p>{selectedProject.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
