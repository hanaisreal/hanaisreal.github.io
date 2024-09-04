// src/components/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="home">
      <header>
        <h1>Hana Oh</h1>
        <p> Undergraduate Student </p>
        <p> Seoul National University</p>
      </header>

      <section className="profile">
        <img src="/profile-photo.jpg" alt="Hana Oh" className="profile-photo" />
        <div className="bio">
          <h2>About Me</h2>
          <p>
            Hello! I'm a passionate Computer Science and Business Administration student at Seoul National University, 
            set to graduate in February 2025. With a diverse background of living in China and Indonesia, I pride myself 
            on being a fast adapter culturally and a great communicator socially. My interests lie in AI, web development, 
            and creating innovative solutions to real-world problems.
          </p>
        </div>
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

      <section className="skills">
        <h2>Skills</h2>
        <ul>
          <li>Web Development: React, TypeScript, Next.js, Tailwind CSS, DaisyUI</li>
          <li>AI/ML: PyTorch, Fine-tuning Language Models, MedSAM</li>
          <li>Other: DICOM Viewer, 3D Segmentation, MPR, Streamlit, Vite</li>
          <li>Languages: Proficient in multiple languages due to international background</li>
        </ul>
      </section>


      <section className="contact">
        <h2>Get in Touch</h2>
        <ul>
          <li>Phone: (+82) 01.2357.9772</li>
          <li>Email: hana2001@snu.ac.kr</li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/hana-oh-921945290/">linkedin.com/in/hana-oh-921945290/</a></li>
        </ul>
      </section>
    </div>
  );
};

export default About;