import React, { useState } from 'react';
import { photos } from '../components/data/photosData';

const PhotoGrid: React.FC = () => {
  const [revealed, setRevealed] = useState<number | null>(null);

  const toggle = (i: number) =>
    setRevealed(prev => (prev === i ? null : i));

  return (
    <div className="photo-grid">
      {photos.map((photo, i) => {
        const active = revealed === i;
        return (
          <div
            key={i}
            className={`photo-grid__cell${active ? ' is-revealed' : ''}`}
            onMouseEnter={() => setRevealed(i)}
            onMouseLeave={() => setRevealed(null)}
            onClick={() => toggle(i)}
          >
            <img
              src={photo.src}
              alt=""
              className="photo-grid__img"
              draggable={false}
            />
            <div className="photo-grid__overlay" aria-hidden="true">
              <span className="photo-grid__keyword">{photo.keyword}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
