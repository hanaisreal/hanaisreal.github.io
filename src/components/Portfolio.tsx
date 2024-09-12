import React from 'react';
import './Portfolio.css';
import { projects } from './data/projectData'
import { researchExperiences } from './data/researchData';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';

const Portfolio: React.FC = () => {
  return (
    <div className="portfolio-container">
      <header className="center-align">
        <h1>Hana Oh</h1>
        <p>Undergraduate Student</p>
        <p>Seoul National University</p>
        <p className="email">ohhanathefirst@gmail.com</p>
        
        <div className="social-links">
          <a href="/path-to-your-cv.pdf" target="_blank" rel="noopener noreferrer">
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

      <section className="education">
        <h2>Education</h2>
        <ul>
          <li>
            <h3>Bachelor's Degree in Computer Science and Business Administration</h3>
            <p>Seoul National University, Sep 2019 - Feb 2025 (Graduating soon)</p>
          </li>
        </ul>
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
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            {project.image && <img src={project.image} alt={project.title} className="project-image" />}
            <p>{project.description}</p>
            <p><strong>Skills:</strong> {project.skills.join(', ')}</p>
            <p><strong>Role:</strong> {project.role}</p>
            <div className="tags">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Portfolio;