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
        <p className="profile__affil">
          M.S. Student in Intelligence and Information
          <br />
          Seoul National University
        </p>
        <div className="bio">
          <p>
            Hi, I&apos;m Hana. I am an M.S. student in Intelligence and Information at Seoul National
            University, advised by Prof.{' '}
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
            . My research lies at the intersection of human-computer interaction, social
            science, and LLMs.
          </p>
          <p>
            While human experience is inherently unique, AI outputs are often uniform and impersonal.
            I am interested in contributing to the evolution of AI from a generalized tool into a{' '}
            <strong>truly collaborative, personalized agent</strong>: one that elicits intent accurately
            and remembers it faithfully.
          </p>
          <p>
            Prior to my master&apos;s, I graduated from Seoul National University with a B.S. in Computer
            Science and Engineering and a double major in Business Administration. As an undergraduate,
            a class project in Prof.{' '}
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
            &apos;s course grew into a{' '}
            <Link
              className="text-link"
              to="/publications/deepaware"
              data-analytics-event="publication_click"
              data-analytics-label="DeepAware"
              data-analytics-placement="hero"
            >
              CHI &apos;26 paper on deepfake awareness among older adults
            </Link>
            . I also worked with Prof.{' '}
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
            {' '}at KAIST during a summer internship.
          </p>
          <p>My research is supported by the BK21 FOUR Program.</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
