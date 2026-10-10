import React from 'react';
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

const HeroSection: React.FC = () => (
  <section id="home" className="hero-shell" data-analytics-section="home_hero">
    <div className="profile">
      <div className="profile__left">
        <img
          className="profile__img"
          src={`${process.env.PUBLIC_URL}/pictures/profile-portrait.jpg`}
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
        <p className="profile__affil">
          M.S. Student in Intelligence and Information
          <br />
          Seoul National University
        </p>
        <div className="bio">
          <p>
            Hi, I&apos;m Hana, an M.S. student in Intelligence and Information at Seoul National
            University, advised by Professor{' '}
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
              Bongwon Suh
            </a>
            . My research focuses on the intersection of human-AI interaction and artificial
            intelligence.
          </p>
          <p>
            Human experiences are incredibly diverse, requiring a range of approaches to understand
            them. While many AI systems capture experience through multimodal inputs such as images
            and audio, I believe we also need complementary ways to understand individual intent and
            values. My work explores a more person-centered direction—starting from what people
            explicitly express, including their thoughts, everyday conversations, and journal entries.
          </p>
          <p>
            As these personal archives accumulate, a key challenge is how AI agents can organize and
            decompose them, preserve their original context, and derive meaningful abstractions. I
            study memory representations and computational methods for managing this process while
            keeping abstractions grounded in the source material and a person&apos;s perspective. My
            work combines technical development of these methods with interactive systems and
            user-centered evaluation. Ultimately, I aim to contribute to the evolution of AI from
            general-purpose tools into truly collaborative, personalized agents.
          </p>
          <p>
            Before my master&apos;s, I earned a B.S. in Computer Science and Engineering with a double
            major in Business Administration from Seoul National University. As an undergraduate, I
            researched deepfake awareness among older adults and published a{' '}
            <Link
              className="text-link"
              to="/publications/deepaware"
              data-analytics-event="publication_click"
              data-analytics-label="CHI '26 DeepAware paper"
              data-analytics-placement="hero"
            >
              CHI &apos;26 paper
            </Link>{' '}
            under the mentorship of Professor{' '}
            <a
              className="text-link"
              href="https://www.hajinlim.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="external_link_click"
              data-analytics-label="Hajin Lim"
              data-analytics-destination="https://www.hajinlim.com/"
              data-analytics-placement="hero"
            >
              Hajin Lim
            </a>
            . I also expanded my research experience during a summer internship at KAIST, guided by
            Professor{' '}
            <a
              className="text-link"
              href="https://juhokim.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="external_link_click"
              data-analytics-label="Juho Kim"
              data-analytics-destination="https://juhokim.com/"
              data-analytics-placement="hero"
            >
              Juho Kim
            </a>
            .
          </p>
          <p>My research is supported by the BK21 FOUR Program.</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
