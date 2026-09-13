import React from 'react';
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import SiteHeader, { SiteFooter } from './SiteHeader';
import HomeBackdrop from './HomeBackdrop';
import './clean.css';

const NEWS = [
  {
    date: 'Sep 2026',
    text: (
      <>
        <strong>ToneCanvas</strong> accepted as a poster at UIST 2026 (Detroit).
      </>
    ),
  },
  {
    date: 'Jan 2026',
    text: (
      <>
        Two papers accepted to CHI 2026: <strong>DeepAware</strong> and{' '}
        <strong>When Scaffolding Breaks</strong>, which received a Best Paper Award.
      </>
    ),
  },
];

const HomePage: React.FC = () => (
  <div>
    <HomeBackdrop />
    <SiteHeader />
    <div className="c-sheet">
    <main className="c-main">
      <section className="c-profile" data-analytics-section="home_hero">
        <img className="c-profile__photo" src={`${process.env.PUBLIC_URL}/pictures/profile-beach.jpg`} alt="Hana Oh" />
        <div>
          <h1 className="c-profile__name">Hana Oh</h1>
          <p className="c-profile__line">M.S. Student, Intelligence and Information (2025–Present)</p>
          <p className="c-profile__line c-profile__line--muted">Seoul National University</p>
          <p className="c-profile__email">hana2001 [at] snu [dot] ac [dot] kr</p>
          <div className="c-profile__icons">
            <a className="c-profile__icon" href="mailto:hana2001@snu.ac.kr" title="Email" data-analytics-event="contact_click" data-analytics-label="Email icon" data-analytics-placement="hero">
              <MdEmail />
            </a>
            <a className="c-profile__icon" href="https://github.com/hanaisreal" target="_blank" rel="noopener noreferrer" title="GitHub" data-analytics-event="social_click" data-analytics-label="GitHub icon" data-analytics-placement="hero">
              <FaGithub />
            </a>
            <a className="c-profile__icon" href="https://linkedin.com/in/hana-oh-921945290/" target="_blank" rel="noopener noreferrer" title="LinkedIn" data-analytics-event="social_click" data-analytics-label="LinkedIn icon" data-analytics-placement="hero">
              <FaLinkedin />
            </a>
            <a className="c-profile__icon" href={`${process.env.PUBLIC_URL}/HanaOh_CV.pdf`} target="_blank" rel="noopener noreferrer" title="CV" data-analytics-event="cv_download" data-analytics-label="CV icon" data-analytics-placement="hero">
              <HiDocumentText />
            </a>
          </div>
        </div>
      </section>

      <section className="c-section" data-analytics-section="home_currently">
        <h2 className="c-section__title">Currently</h2>
        <p>
          I am an M.S. student in Intelligence and Information at Seoul National University, advised by{' '}
          <a href="https://scholar.google.com/citations?user=-nlhtEkAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
            Bongwon Suh
          </a>
          , and supported by the BK21 FOUR Program.
        </p>
        <p>
          My research is at the intersection of human-computer interaction (HCI) and artificial intelligence.
          My current work builds personal AI agents with long-term memory and collaborative AI systems that
          turn a group&apos;s separate AI conversations into shared understanding, and examines how scaffolding
          from AI shapes what people can still do on their own.
        </p>
        <p>
          I enjoy building systems and deploying them with real users, including classrooms, older adults,
          and writers, and I am beginning to extend this work into AR/VR and embodied interaction.
        </p>
      </section>

      <section className="c-section" data-analytics-section="home_previously">
        <h2 className="c-section__title">Previously</h2>
        <p>
          I completed my B.S. in Computer Science and Engineering with a double major in Business
          Administration at Seoul National University. During that time I worked with{' '}
          <a href="https://juhokim.com/" target="_blank" rel="noopener noreferrer">Juho Kim</a> at KAIST,{' '}
          Hajin Lim, and Bongwon Suh.
        </p>
      </section>

      <section className="c-section" data-analytics-section="home_news">
        <h2 className="c-section__title">News</h2>
        <ul className="c-news">
          {NEWS.map((item) => (
            <li key={item.date} className="c-news__item">
              <span className="c-news__date">{item.date}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="c-section" data-analytics-section="home_outside">
        <h2 className="c-section__title">Outside of work</h2>
        <p>
          I keep a small <Link to="/collections">worldbuilding</Link> archive of words, images, and references
          that shape how I think. I also play tennis and draw, mostly watercolor and small doodles.
        </p>
      </section>
    </main>
    </div>
    <SiteFooter />
  </div>
);

export default HomePage;
