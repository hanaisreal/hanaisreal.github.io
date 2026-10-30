import React from 'react';
import home from '../content/home.json';
import PlainField from './PlainField';
import RichField from './RichField';
import HomeIcon from './HomeIcon';

const LINKS = [
  { label: 'hana2001@snu.ac.kr', href: 'mailto:hana2001@snu.ac.kr', icon: 'email', event: 'contact_click', external: false },
  { label: 'CV', href: `${process.env.PUBLIC_URL}/HanaOh_CV.pdf`, icon: 'cv', event: 'cv_download', external: true },
  { label: 'GitHub', href: 'https://github.com/hanaisreal', icon: 'github', event: 'social_click', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hana-oh-921945290/', icon: 'linkedin', event: 'social_click', external: true },
];

// Top of the homepage: name, affiliation, and bio with its three points on the
// left; the portrait with contact links under it on the right. On phones the
// portrait sits next to the name and the links run in one row.
// Bio text lives in src/content/home.json; under `npm start` it is editable in place.
export const HomeHero: React.FC = () => (
  <section id="home" className="home-hero" data-analytics-section="home_hero">
    <div className="home-hero__id">
      <PlainField as="h1" className="home-hero__name" file="home" id="profile" field="name" value={home.name} />
      <RichField
        store="home"
        storeKey="affiliation"
        html={home.affiliation}
        uploadDir="home"
        className="home-hero__affil"
        placement="hero"
      />
    </div>
    <div className="home-hero__bio">
      <RichField store="home" storeKey="bio" html={home.bio} uploadDir="home" className="bio" placement="hero" />
      <RichField store="home" storeKey="themes" html={home.themes} uploadDir="home" className="bio home-hero__themes" placement="hero" />
    </div>
    <div className="home-hero__side">
      <img
        className="home-hero__img"
        src={`${process.env.PUBLIC_URL}/pictures/profile-portrait.jpg`}
        alt="Hana Oh"
        onLoad={e => (e.currentTarget as HTMLImageElement).classList.add('is-loaded')}
      />
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
              <HomeIcon name={l.icon} /> {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
