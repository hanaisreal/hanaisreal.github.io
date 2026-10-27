import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaRegFileAlt } from 'react-icons/fa';
import home from '../content/home.json';
import PlainField from './PlainField';
import RichField from './RichField';

const LINKS = [
  { label: 'hana2001@snu.ac.kr', href: 'mailto:hana2001@snu.ac.kr', icon: <FaEnvelope />, event: 'contact_click', external: false },
  { label: 'CV', href: `${process.env.PUBLIC_URL}/HanaOh_CV.pdf`, icon: <FaRegFileAlt />, event: 'cv_download', external: true },
  { label: 'GitHub', href: 'https://github.com/hanaisreal', icon: <FaGithub />, event: 'social_click', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hana-oh-921945290/', icon: <FaLinkedin />, event: 'social_click', external: true },
];

// Top of the homepage: name, affiliation, bio, and links beside the portrait.
// Bio text lives in src/content/home.json; under `npm start` it is editable in place.
export const HomeHero: React.FC = () => (
  <section id="home" className="home-hero" data-analytics-section="home_hero">
    <img
      className="home-hero__img"
      src={`${process.env.PUBLIC_URL}/pictures/profile-portrait.jpg`}
      alt="Hana Oh"
      onLoad={e => (e.currentTarget as HTMLImageElement).classList.add('is-loaded')}
    />
    <div className="home-hero__text">
      <PlainField as="h1" className="home-hero__name" file="home" id="profile" field="name" value={home.name} />
      <RichField
        store="home"
        storeKey="affiliation"
        html={home.affiliation}
        uploadDir="home"
        className="home-hero__affil"
        placement="hero"
      />
      <RichField store="home" storeKey="bio" html={home.bio} uploadDir="home" className="bio" placement="hero" />
      <ul className="home-hero__links">
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
              {l.icon} {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
