import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  authors: string;
  coFirst?: string[];
  links?: Record<string, string>;
  className?: string;
}

const SELF = 'Hana Oh';

// Comma-separated authors with the site owner bolded and co-first authors starred.
const AuthorList: React.FC<Props> = ({ authors, coFirst = [], links = {}, className }) => {
  const names = authors.split(',').map((a) => a.trim());
  return (
    <span className={className}>
      {names.map((name, i) => (
        <React.Fragment key={name}>
          {name === SELF ? <Link to="/" className="author-self"><strong>{name}</strong></Link> : links[name] ? (
            <a href={links[name]} target="_blank" rel="noopener noreferrer">{name}</a>
          ) : name}
          {coFirst.includes(name) && <sup>*</sup>}
          {i < names.length - 1 && ', '}
        </React.Fragment>
      ))}
    </span>
  );
};

export default AuthorList;
