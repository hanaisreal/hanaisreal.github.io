import React from 'react';
import home from '../content/home.json';
import PlainField from './PlainField';
import RichField from './RichField';

const LINKS = [
  { label: 'Email', href: 'mailto:hana2001@snu.ac.kr', event: 'contact_click', external: false },
  { label: 'CV', href: `${process.env.PUBLIC_URL}/HanaOh_CV.pdf`, event: 'cv_download', external: true },
  { label: 'GitHub', href: 'https://github.com/hanaisreal', event: 'social_click', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hana-oh-921945290/', event: 'social_click', external: true },
];

// Left column on the homepage: name, portrait, contact, and outbound links.
export const ProfileCard: React.FC = () => (
  <div className="profile-card" data-analytics-section="home_hero">
    <PlainField as="h1" className="profile-card__name" file="home" id="profile" field="name" value={home.name} />
    <RichField
      store="home"
      storeKey="affiliation"
      html={home.affiliation}
      uploadDir="home"
      className="profile-card__affil"
      placement="hero"
    />
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

// Bio text lives in src/content/home.json; under `npm start` it is editable in place.
export const Bio: React.FC = () => (
  <section id="home" data-analytics-section="home_bio">
    <RichField store="home" storeKey="bio" html={home.bio} uploadDir="home" className="bio" placement="hero" />
  </section>
);
