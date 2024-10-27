import React from 'react';
import './Portfolio.css';
import { projects } from './data/projectData'
import { researchExperiences } from './data/researchData';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';

const Portfolio: React.FC = () => {
  return (
    <div className="portfolio-container">
      <header className="center-align">
      <img src="pictures/profile.jpeg" alt="Hana Oh" className="profile-picture" />
        <h1>Hana Oh</h1>
        <p className="university">Seoul National University</p>
        <p className="email">ohhanathefirst at gmail dot com</p>
        
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

      <hr className="divider" />
    
      <section className="about-me">
        <h2>Hey there, I'm Hana Oh! 👋</h2>
        <p>📚 Undergraduate student pursuing Computer Science and Business Administration at Seoul National University, with a diverse international background in China and Indonesia.</p>
        <p>I am passionate about Human-Computer Interaction (HCI) and exploring how technology can seamlessly integrate into people's lives. My academic background in both CS and Business equips me with the ability to approach problems from both a technical and user-centric perspective. I'm particularly excited about designing intuitive systems that make meaningful impacts on people's daily interactions with technology.</p>
        <p>My current research focuses on two key areas within HCI:</p>
        <ol>
          <li>Human-AI Interaction: Developing solutions that enhance medical imaging analysis through AI-driven technologies, ensuring that these systems are user-friendly for both professionals and patients.</li>
          <li>Improving Educational Tools: Creating innovative solutions to improve online learning environments, enhancing both student learning and teacher engagement in asynchronous educational settings.</li>
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