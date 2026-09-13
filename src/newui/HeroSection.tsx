import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

const HeroSection: React.FC = () => (
  <section id="home" className="hero-shell" data-analytics-section="home_hero">
    <div className="profile">
      <div className="profile__left">
        <img
          className="profile__img profile__img--beach"
          src={`${process.env.PUBLIC_URL}/pictures/profile-beach.jpg`}
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
            href={`${process.env.PUBLIC_URL}/HanaOh_CV.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            title="CV"
            data-analytics-event="cv_download"
            data-analytics-label="CV icon"
            data-analytics-destination={`${process.env.PUBLIC_URL}/HanaOh_CV.pdf`}
            data-analytics-placement="hero"
          >
            <HiDocumentText />
          </a>
        </div>
        <span className="profile__email-text">
          hana2001 [at] snu [dot] ac [dot] kr
        </span>
      </div>

      <div className="profile__right">
        <h1 className="profile__name">Hana Oh</h1>
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
            . I build the interface and memory layer that lets people work with AI over time:{' '}
            <strong>personal AI agents</strong> that remember, and{' '}
            <strong>collaborative AI systems</strong> that turn a group&apos;s separate AI
            conversations into shared understanding.
          </p>
        </div>

        <div className="ongoing-copy" style={{ marginTop: '1.1rem' }}>
          <p>
            I have deployed two of these systems with real users: an LLM writing scaffold used by
            157 students over six weeks of classes, and a deepfake-scam simulation that 21 older
            adults experienced with their own face and voice. Both taught me to look past whether
            support works in the moment and ask what people keep after it is gone.
          </p>
          <p>Current focus:</p>
          <ul className="ongoing-list">
            <li>
              <strong>Memory for personal agents:</strong> long-term memory, personalization, and
              scaffolding that supports thinking instead of replacing it.
            </li>
            <li>
              <strong>Interfaces for collaborative AI:</strong> collaborative sensemaking, co-creation,
              and creativity support, extended into AR/VR and embodied interaction.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
