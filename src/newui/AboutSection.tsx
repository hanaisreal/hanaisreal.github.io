import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => (
  <section id="outside-of-work">
    <h2 className="sec-heading">Outside of Work</h2>
    <div className="bio">
      <p className="bio__prelude">
        Alongside that work, I have been building a small{' '}
        <Link
          className="text-link text-link--highlight"
          to="/collections"
          data-analytics-event="nav_click"
          data-analytics-label="About world building prelude"
          data-analytics-placement="about_section"
        >
          world building
        </Link>{' '}
        project: one place to keep the words, images, sites, people, and traces that matter to me beyond research.
      </p>
      <p>
        I use it to collect things that do not fit neatly into academic categories, but still shape how I think and
        what I want to keep learning from.
      </p>
      <p>
        Right now it includes a small Daemari translation archive, SHANUM community work, and references I am learning
        from, including{' '}
        <a className="text-link" href="https://www.dougengelbart.org/" target="_blank" rel="noopener noreferrer">
          Douglas Engelbart
        </a>
        ,{' '}
        <a
          className="text-link"
          href="https://augmentingcognition.com/assets/Kay1977.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alan Kay
        </a>
        , and{' '}
        <a className="text-link" href="https://worrydream.com/" target="_blank" rel="noopener noreferrer">
          Bret Victor
        </a>
        , alongside my interest in <strong>speculative thought</strong> and speculative ways of thinking.
      </p>
      <p>
        I also like playing <span className="bio__tennis">tennis</span> and{' '}
        <span className="bio__drawing">drawing</span>, especially watercolor and small doodles, and I keep a drawing
        journal when I travel or visit new places.
      </p>
    </div>
  </section>
);

export default AboutSection;
