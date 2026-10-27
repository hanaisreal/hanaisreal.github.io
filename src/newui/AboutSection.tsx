import React from 'react';
import home from '../content/home.json';
import RichField from './RichField';

// "Outside of Work" text lives in src/content/home.json; under `npm start` it is editable in place.
const AboutSection: React.FC = () => (
  <section id="outside-of-work" className="home-sec">
    <h2 className="home-sec__heading">Outside of Work</h2>
    <RichField store="home" storeKey="outside" html={home.outside} uploadDir="home" className="bio" placement="about_section" />
  </section>
);

export default AboutSection;
