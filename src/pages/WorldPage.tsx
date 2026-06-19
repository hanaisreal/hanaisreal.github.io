import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue } from 'framer-motion';
import './WorldPage.css';

const ASSET = (name: string) => `${process.env.PUBLIC_URL}/pictures/world/${name}`;

interface Sticker {
  id: string;
  src: string;
  alt: string;
  top: number;   // % of stage, center point
  left: number;  // % of stage, center point
  width: number; // vw
  rotate: number;
  zIndex: number;
  framed?: boolean;
}

const STICKERS: Sticker[] = [
  { id: 'cloud-a', src: ASSET('cloud.png'), alt: '구름', top: 12, left: 22, width: 26, rotate: -4, zIndex: 3 },
  { id: 'cloud-b', src: ASSET('cloud.png'), alt: '구름', top: 9, left: 64, width: 17, rotate: 8, zIndex: 3 },
  { id: 'callisto', src: ASSET('callisto.png'), alt: '칼리스토', top: 11, left: 42, width: 11, rotate: 0, zIndex: 4 },
  { id: 'waymaker', src: ASSET('waymaker.png'), alt: '이정표', top: 46, left: 50, width: 16, rotate: -6, zIndex: 6, framed: true },
  { id: 'tree', src: ASSET('tree.jpeg'), alt: '나무', top: 64, left: 19, width: 30, rotate: -2, zIndex: 5 },
  { id: 'flowerbed', src: ASSET('flowerbed.jpg'), alt: '화단', top: 83, left: 76, width: 34, rotate: 3, zIndex: 5 },
  { id: 'road', src: ASSET('road.png'), alt: '길', top: 94, left: 50, width: 42, rotate: 0, zIndex: 2 },
  { id: 'prof', src: ASSET('prof.png'), alt: '눈사람', top: 96, left: 9, width: 9, rotate: -5, zIndex: 7 },
  { id: 'stu', src: ASSET('stu.png'), alt: '눈사람', top: 98, left: 19, width: 7, rotate: 6, zIndex: 7 },
];

const FRUITS = [
  { top: 53, left: 12 },
  { top: 49, left: 22 },
  { top: 56, left: 27 },
];

interface Stop {
  cx: number; // 0-1
  cy: number; // 0-1
  z: number;
  side: 'left' | 'right';
  ko: string;
  en: string;
}

const FULL = { cx: 0.5, cy: 0.5, z: 1 };

const STOP_TREE: Stop = { cx: 0.19, cy: 0.64, z: 3.2, side: 'left', ko: '나뭇가지마다 열매가 열리면, 그 열매는 내가 그린 그림이 될 거예요.', en: "Each fruit on this tree will someday be a drawing I've made." };
const STOP_WAYMAKER: Stop = { cx: 0.5, cy: 0.46, z: 3.4, side: 'right', ko: '이 길은 아직 어디로도 정해지지 않았어요 — 콜렉션들 사이의 갈림길.', en: "This signpost hasn't picked a direction yet — a crossroads between collections." };
const STOP_CALLISTO: Stop = { cx: 0.42, cy: 0.12, z: 3, side: 'left', ko: '달 너머에는 내가 모은 단어들이 떠 있을 자리가 있어요.', en: "Beyond the moon, there's room for the words I've collected to float." };
const STOP_FLOWERBED: Stop = { cx: 0.76, cy: 0.83, z: 2.6, side: 'right', ko: '이 화단엔 아직 이름 붙지 않은 작은 것들을 심어둘 거예요.', en: "In this flowerbed, I'll plant the small unnamed things, later." };

// [progress, cx, cy, z]
const KEYFRAMES: [number, number, number, number][] = [
  [0.00, FULL.cx, FULL.cy, FULL.z],
  [0.06, FULL.cx, FULL.cy, FULL.z],
  [0.16, STOP_TREE.cx, STOP_TREE.cy, STOP_TREE.z],
  [0.24, STOP_TREE.cx, STOP_TREE.cy, STOP_TREE.z],
  [0.30, FULL.cx, FULL.cy, FULL.z],
  [0.36, STOP_WAYMAKER.cx, STOP_WAYMAKER.cy, STOP_WAYMAKER.z],
  [0.44, STOP_WAYMAKER.cx, STOP_WAYMAKER.cy, STOP_WAYMAKER.z],
  [0.50, FULL.cx, FULL.cy, FULL.z],
  [0.56, STOP_CALLISTO.cx, STOP_CALLISTO.cy, STOP_CALLISTO.z],
  [0.64, STOP_CALLISTO.cx, STOP_CALLISTO.cy, STOP_CALLISTO.z],
  [0.70, FULL.cx, FULL.cy, FULL.z],
  [0.76, STOP_FLOWERBED.cx, STOP_FLOWERBED.cy, STOP_FLOWERBED.z],
  [0.84, STOP_FLOWERBED.cx, STOP_FLOWERBED.cy, STOP_FLOWERBED.z],
  [0.92, FULL.cx, FULL.cy, FULL.z],
  [1.00, FULL.cx, FULL.cy, FULL.z],
];

const INPUT = KEYFRAMES.map(k => k[0]);
const SCALE_OUT = KEYFRAMES.map(k => k[3]);
const TX_OUT = KEYFRAMES.map(k => (0.5 - k[1] * k[3]) * 100);
const TY_OUT = KEYFRAMES.map(k => (0.5 - k[2] * k[3]) * 100);

const FRUIT_WINDOW: [number, number, number, number] = [0.12, 0.16, 0.24, 0.28];
const WAYMAKER_WINDOW: [number, number, number, number] = [0.32, 0.36, 0.44, 0.48];
const CALLISTO_WINDOW: [number, number, number, number] = [0.52, 0.56, 0.64, 0.68];
const FLOWERBED_WINDOW: [number, number, number, number] = [0.72, 0.76, 0.84, 0.88];

const Caption: React.FC<{ progress: MotionValue<number>; window: [number, number, number, number]; stop: Stop }> = ({ progress, window, stop }) => {
  const opacity = useTransform(progress, window, [0, 1, 1, 0]);
  const shift = useTransform(progress, window, [stop.side === 'left' ? -16 : 16, 0, 0, stop.side === 'left' ? -16 : 16]);
  return (
    <motion.div
      className={`world-caption world-caption--${stop.side}`}
      style={{ opacity, x: shift }}
    >
      <p className="world-caption__ko">{stop.ko}</p>
      <p className="world-caption__en">{stop.en}</p>
    </motion.div>
  );
};

const FruitMarkers: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const opacity = useTransform(progress, FRUIT_WINDOW, [0, 1, 1, 0]);
  return (
    <>
      {FRUITS.map((f, i) => (
        <motion.div
          key={i}
          className="world-fruit"
          style={{ top: `${f.top}%`, left: `${f.left}%`, opacity }}
        >
          +
        </motion.div>
      ))}
    </>
  );
};

const WorldPage: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, INPUT, SCALE_OUT);
  const tx = useTransform(scrollYProgress, INPUT, TX_OUT);
  const ty = useTransform(scrollYProgress, INPUT, TY_OUT);
  const transform = useMotionTemplate`translate(${tx}%, ${ty}%) scale(${scale})`;

  const introOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  return (
    <div className="world-page">
      <Link to="/" className="world-back">← Hana Oh</Link>
      <div className="world-track">
        <div className="world-stage">
          <motion.div className="world-canvas" style={{ transform }}>
            <img className="world-bg" src={ASSET('background.jpg')} alt="space-city collage background" draggable={false} />
            {STICKERS.map(s => (
              <img
                key={s.id}
                src={s.src}
                alt={s.alt}
                draggable={false}
                className={`world-sticker${s.framed ? ' world-sticker--framed' : ''}`}
                style={{
                  top: `${s.top}%`,
                  left: `${s.left}%`,
                  width: `${s.width}vw`,
                  zIndex: s.zIndex,
                  transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
                }}
              />
            ))}
            <FruitMarkers progress={scrollYProgress} />
          </motion.div>

          <Caption progress={scrollYProgress} window={FRUIT_WINDOW} stop={STOP_TREE} />
          <Caption progress={scrollYProgress} window={WAYMAKER_WINDOW} stop={STOP_WAYMAKER} />
          <Caption progress={scrollYProgress} window={CALLISTO_WINDOW} stop={STOP_CALLISTO} />
          <Caption progress={scrollYProgress} window={FLOWERBED_WINDOW} stop={STOP_FLOWERBED} />

          <motion.div className="world-intro" style={{ opacity: introOpacity }}>
            <span className="world-intro__eyebrow">prototype</span>
            <h1>내가 모으는 것들의 세계</h1>
            <p>scroll to zoom in</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorldPage;
