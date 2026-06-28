import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

const HeroSection: React.FC = () => (
  <section id="home" className="hero-shell" data-analytics-section="home_hero">
    <div className="profile">
      <div className="profile__left">
        <img
          className="profile__img"
          src={`${process.env.PUBLIC_URL}/pictures/profile.jpeg`}
          alt="Hana Oh"
          onLoad={e => (e.currentTarget as HTMLImageElement).classList.add('is-loaded')}
        />
        <div className="profile__icons">
          <a
            className="profile__icon-link"
            href="mailto:hana2001@snu.ac.kr"
            title="Email"
            data-analytics-event="contact_click"
            data-analytics-label="Email icon"
            data-analytics-destination="mailto:hana2001@snu.ac.kr"
            data-analytics-placement="hero"
          >
            <MdEmail />
          </a>
          <a
            className="profile__icon-link"
            href="https://github.com/hanaisreal"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            data-analytics-event="social_click"
            data-analytics-label="GitHub icon"
            data-analytics-destination="https://github.com/hanaisreal"
            data-analytics-placement="hero"
          >
            <FaGithub />
          </a>
          <a
            className="profile__icon-link"
            href="https://linkedin.com/in/hana-oh-921945290/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            data-analytics-event="social_click"
            data-analytics-label="LinkedIn icon"
            data-analytics-destination="https://linkedin.com/in/hana-oh-921945290/"
            data-analytics-placement="hero"
          >
            <FaLinkedin />
          </a>
          <a
            className="profile__icon-link"
            href={`${process.env.PUBLIC_URL}/HanaOh_CV_260519.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            title="CV"
            data-analytics-event="cv_download"
            data-analytics-label="CV icon"
            data-analytics-destination={`${process.env.PUBLIC_URL}/HanaOh_CV_260519.pdf`}
            data-analytics-placement="hero"
          >
            <HiDocumentText />
          </a>
        </div>
        <a
          className="profile__email-text"
          href="mailto:hana2001@snu.ac.kr"
          data-analytics-event="contact_click"
          data-analytics-label="Email text"
          data-analytics-destination="mailto:hana2001@snu.ac.kr"
          data-analytics-placement="hero"
        >
          hana2001@snu.ac.kr
        </a>
      </div>

      <div className="profile__right">
        <div className="bio">
          <p>
            I am an HCI researcher and M.S. student at Seoul National University, advised by{' '}
            <a
              className="text-link"
              href="https://scholar.google.com/citations?user=-nlhtEkAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="external_link_click"
              data-analytics-label="Google Scholar"
              data-analytics-destination="https://scholar.google.com/citations?user=-nlhtEkAAAAJ&hl=en"
              data-analytics-placement="hero"
            >
              Prof. Bongwon Suh
            </a>
            . I work at the intersection of <strong>HCI and AI</strong>, studying how AI systems
            can support continuity in human experience.
          </p>
          <p>
            I am increasingly interested in the{' '}
            <strong>computational methods</strong> that enable AI to adapt meaningfully to
            individual users at scale.
          </p>
        </div>

        <div className="ongoing-copy" style={{ marginTop: '1.1rem' }}>
          <p>
            My recent work examines how AI can support <strong>human expression</strong> and{' '}
            <strong>awareness</strong> in real-world contexts, from AI-mediated narrative writing
            to experiential simulations that build intuition in everyday users.
          </p>
          <p>As a next step, I am exploring:</p>
          <ul className="ongoing-list">
            <li>
              how to design <strong>AI-mediated interventions</strong> that shift how people
              understand themselves and their context, and
            </li>
            <li>
              how to build <strong>interactive systems</strong> that make AI's interpretation of
              human experience visible and actionable to users.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
