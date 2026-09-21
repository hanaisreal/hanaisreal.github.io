import React from 'react';

interface Props {
  authors: string;
  coFirst?: string[];
  className?: string;
}

const SELF = 'Hana Oh';

// Comma-separated authors with the site owner bolded and co-first authors starred.
const AuthorList: React.FC<Props> = ({ authors, coFirst = [], className }) => {
  const names = authors.split(',').map((a) => a.trim());
  return (
    <span className={className}>
      {names.map((name, i) => (
        <React.Fragment key={name}>
          {name === SELF ? <strong>{name}</strong> : name}
          {coFirst.includes(name) && <sup>*</sup>}
          {i < names.length - 1 && ', '}
        </React.Fragment>
      ))}
    </span>
  );
};

export default AuthorList;
