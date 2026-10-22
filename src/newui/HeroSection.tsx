import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { label: 'Email', href: 'mailto:hana2001@snu.ac.kr', event: 'contact_click', external: false },
  { label: 'CV', href: `${process.env.PUBLIC_URL}/HanaOh_CV.pdf`, event: 'cv_download', external: true },
  { label: 'GitHub', href: 'https://github.com/hanaisreal', event: 'social_click', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hana-oh-921945290/', event: 'social_click', external: true },
];

// Left column on the homepage: name, portrait, contact, and outbound links.
export const ProfileCard: React.FC = () => (
  <div className="profile-card" data-analytics-section="home_hero">
    <h1 className="profile-card__name">Hana Oh</h1>
    <p className="profile-card__affil">
      M.S. Student, Intelligence and Information
      <br />
      Seoul National University
    </p>
    <span className="profile-card__email">hana2001 [at] snu [dot] ac [dot] kr</span>
    <img
      className="profile-card__img"
      src={`${process.env.PUBLIC_URL}/pictures/profile-portrait.jpg`}
      alt="Hana Oh"
      onLoad={e => (e.currentTarget as HTMLImageElement).classList.add('is-loaded')}
    />
    <ul className="profile-card__links">
      {LINKS.map(l => (
        <li key={l.label}>
          <a
            href={l.href}
            {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            data-analytics-event={l.event}
            data-analytics-label={l.label}
            data-analytics-destination={l.href}
            data-analytics-placement="hero"
          >
            {l.label} →
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const Bio: React.FC = () => (
  <section id="home" data-analytics-section="home_bio">
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
  </section>
);
