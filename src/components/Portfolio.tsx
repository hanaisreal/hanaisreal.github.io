import React from 'react';
import './Portfolio.css';
import { projects } from './data/projectData'
import { researchExperiences } from './data/researchData';

const Portfolio: React.FC = () => {
  return (
    <div className="portfolio-container">
      <header>
        <h1>Hana Oh</h1>
        <p>Undergraduate Student</p>
        <p>Seoul National University</p>
      </header>

      <section className="about">
        <img src="/profile-photo.jpg" alt="Hana Oh" className="profile-photo" />
      </section>

      <section className="contact">
        <ul>
          <li>Phone: (+82) 01.2357.9772</li>
          <li>Email: hana2001@snu.ac.kr</li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/hana-oh-921945290/">linkedin.com/in/hana-oh-921945290/</a></li>
        </ul>
      </section>

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