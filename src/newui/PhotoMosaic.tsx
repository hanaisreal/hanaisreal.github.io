import React, { useEffect, useState, useRef } from 'react';

// Each cell has a front face and a back face (photo or color placeholder)
interface CellFace {
  type: 'image' | 'color';
  src?: string;    // if type === 'image'
  color?: string;  // if type === 'color'
  label?: string;  // optional overlay label
}

interface MosaicCell {
  id: number;
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
  front: CellFace;
  back: CellFace;
}

// Warm-toned placeholder colors matching the editorial palette
const placeholders = {
  amber:      '#c8a97a',
  terracotta: '#b5705a',
  sage:       '#7d9080',
  sand:       '#d4c4a8',
  blush:      '#c9a090',
  slate:      '#7a8a98',
};

const BASE = process.env.PUBLIC_URL;

const cells: MosaicCell[] = [
  {
    id: 0,
    colSpan: 1,
    rowSpan: 2,
    front: { type: 'image', src: `${BASE}/pictures/profile_main.png` },
    back:  { type: 'image', src: `${BASE}/pictures/profile.jpeg` },
  },
  {
    id: 1,
    colSpan: 1,
    rowSpan: 1,
    front: { type: 'color', color: placeholders.amber },
    back:  { type: 'color', color: placeholders.terracotta },
  },
  {
    id: 2,
    colSpan: 1,
    rowSpan: 1,
    front: { type: 'color', color: placeholders.sage },
    back:  { type: 'color', color: placeholders.sand },
  },
  {
    id: 3,
    colSpan: 1,
    rowSpan: 1,
    front: { type: 'color', color: placeholders.blush },
    back:  { type: 'color', color: placeholders.amber },
  },
  {
    id: 4,
    colSpan: 1,
    rowSpan: 1,
    front: { type: 'color', color: placeholders.slate },
    back:  { type: 'color', color: placeholders.sage },
  },
];

function Face({ face, objectPosition = 'center' }: { face: CellFace; objectPosition?: string }) {
  if (face.type === 'image') {
    return (
      <img
        src={face.src}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          display: 'block',
        }}
      />
    );
  }
  return (
    <div style={{ width: '100%', height: '100%', background: face.color }} />
  );
}

const PhotoMosaic: React.FC = () => {
  const [flipped, setFlipped] = useState<boolean[]>(cells.map(() => false));
  const timersRef = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(() => {
    // Each cell starts flipping after a random delay, at a random interval
    cells.forEach((cell) => {
      const initialDelay = 1500 + Math.random() * 3000;   // 1.5–4.5s before first flip
      const interval     = 4000 + Math.random() * 5000;   // 4–9s between flips

      const startTimer = setTimeout(() => {
        const t = setInterval(() => {
          setFlipped((prev) => {
            const next = [...prev];
            next[cell.id] = !next[cell.id];
            return next;
          });
        }, interval);
        timersRef.current.push(t);
      }, initialDelay);

      timersRef.current.push(startTimer as unknown as ReturnType<typeof setInterval>);
    });

    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearInterval(t));
    };
  }, []);

  return (
    <div className="photo-mosaic">
      {/* Row 1-2: large cell left + two small cells right */}
      <div
        className={`mosaic-cell mosaic-cell--span2row${flipped[0] ? ' is-flipped' : ''}`}
      >
        <div className="mosaic-cell__inner">
          <div className="mosaic-cell__face mosaic-cell__front">
            <Face face={cells[0].front} objectPosition="top center" />
          </div>
          <div className="mosaic-cell__face mosaic-cell__back">
            <Face face={cells[0].back} objectPosition="top center" />
          </div>
        </div>
      </div>

      <div className={`mosaic-cell${flipped[1] ? ' is-flipped' : ''}`}>
        <div className="mosaic-cell__inner">
          <div className="mosaic-cell__face mosaic-cell__front">
            <Face face={cells[1].front} />
          </div>
          <div className="mosaic-cell__face mosaic-cell__back">
            <Face face={cells[1].back} />
          </div>
        </div>
      </div>

      <div className={`mosaic-cell${flipped[2] ? ' is-flipped' : ''}`}>
        <div className="mosaic-cell__inner">
          <div className="mosaic-cell__face mosaic-cell__front">
            <Face face={cells[2].front} />
          </div>
          <div className="mosaic-cell__face mosaic-cell__back">
            <Face face={cells[2].back} />
          </div>
        </div>
      </div>

      {/* Row 3: two small cells side by side */}
      <div className={`mosaic-cell${flipped[3] ? ' is-flipped' : ''}`}>
        <div className="mosaic-cell__inner">
          <div className="mosaic-cell__face mosaic-cell__front">
            <Face face={cells[3].front} />
          </div>
          <div className="mosaic-cell__face mosaic-cell__back">
            <Face face={cells[3].back} />
          </div>
        </div>
      </div>

      <div className={`mosaic-cell${flipped[4] ? ' is-flipped' : ''}`}>
        <div className="mosaic-cell__inner">
          <div className="mosaic-cell__face mosaic-cell__front">
            <Face face={cells[4].front} />
          </div>
          <div className="mosaic-cell__face mosaic-cell__back">
            <Face face={cells[4].back} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoMosaic;
