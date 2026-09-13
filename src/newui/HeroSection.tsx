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
            Hi, I&apos;m Hana. I am an M.S. student in Intelligence and Information at Seoul National
            University, advised by{' '}
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
            . My research is at the intersection of human-computer interaction (HCI) and artificial
            intelligence. My current work builds <strong>personal AI agents</strong> with long-term memory
            and <strong>collaborative AI systems</strong> that turn a group&apos;s separate AI conversations
            into shared understanding, and examines how scaffolding from AI shapes what people can
            still do on their own. I enjoy building systems and deploying them with real users,
            including classrooms, older adults, and writers, and I am beginning to extend this work
            into AR/VR and embodied interaction.
          </p>
          <p>
            Prior to my master&apos;s, I graduated from Seoul National University with a B.S. in Computer
            Science and Engineering and a double major in Business Administration, where I had the
            chance to work with Juho Kim, Hajin Lim, and Bongwon Suh.
          </p>
          <p>My research is supported by the BK21 FOUR Program.</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
