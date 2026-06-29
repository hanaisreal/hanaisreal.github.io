import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Masthead from '../newui/Masthead';
import {
  collections,
  communityActivities,
  poetryProjects,
  referenceProjects,
  type CollectionItem,
} from '../components/data/collectionsData';
import '../newui/newPortfolio.css';
import './CollectionsPage.css';

const BASE = process.env.PUBLIC_URL;
type Lang = 'ko' | 'en';

const WORLD_IMAGE_MAP: Record<string, string> = {
  'background.png': 'background.webp',
  'moon.png': 'moon.webp',
  'path.png': 'path.webp',
  'flowers.png': 'flowers.webp',
  'pine.png': 'pine.webp',
  'plant-eye.png': 'plant-eye.webp',
};

const S = (file: string) => `${BASE}/pictures/worldbuilding/${WORLD_IMAGE_MAP[file] ?? file}`;

// background.png's aspect ratio — needed whenever we convert between left/top
// (% of width vs. % of height) so circles and ellipses read as true shapes.
const IMG_ASPECT = 1596 / 2683;
const BG_NATIVE_WIDTH = 1596; // background.png's actual pixel width
const BG_MAX_UPSCALE = 1.4;   // never render it wider than this × native

const ZOOM_FOCUS = { x: 84, y: 34 }; // dive toward the planet, where the ring passes closest
// Vertical anchor for the outer frame's growth — keep X centered (needed for
// guaranteed full-width coverage) but bias Y up toward the star band/spiral,
// so growing the frame holds steady on the sky and pushes the path/ground
// out of view faster, instead of growing evenly in both directions.
const FRAME_ORIGIN_Y = 18;

type ClusterId = 'words' | 'poetry' | 'community' | 'references';

interface ClusterDef {
  id: ClusterId;
  label: string;
  note: string;
  systemPhase0: number;
  rotationDeg: number;
  angularSpeed: number;
  haloSize: number;
  tintRgb: [number, number, number];
}

interface OrbitLayout {
  phase0: number;
  radiusX: number;
  radiusY: number;
  width: number;
}

interface PhotoStar {
  item: CollectionItem;
  clusterId: ClusterId;
  orbit: OrbitLayout;
}

interface ClusterSparkle {
  phase0: number;
  radiusX: number;
  radiusY: number;
  angularScale: number;
  size: number;
  delay: number;
  duration: number;
  clusterId: ClusterId;
}

interface IntroParagraph {
  content: React.ReactNode;
  tone?: 'default' | 'cta';
}

interface KeywordEntry {
  label: string;
  starIndex: number;
  analyticsId: string;
  analyticsName: string;
}

interface RandomUniverseLayout {
  wordStars: PhotoStar[];
  poetryStars: PhotoStar[];
  communityStars: PhotoStar[];
  referenceStars: PhotoStar[];
  photoStars: PhotoStar[];
  keywordEntries: KeywordEntry[];
}

interface CardPalette {
  start: string;
  end: string;
  text: string;
  glowRgb: string;
}

function getItemImages(item: CollectionItem): string[] {
  if (item.gallery?.length) return item.gallery;
  return item.src ? [item.src] : [];
}

function getKeywordLabel(item: CollectionItem): string {
  return item.keywordLabel ?? item.original;
}

function shuffleArray<T>(items: T[]): T[] {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex]!, next[index]!];
  }
  return next;
}

function withPhaseOffset(orbit: OrbitLayout, offset: number): OrbitLayout {
  return {
    ...orbit,
    phase0: orbit.phase0 + offset,
  };
}

function buildReferenceOrbits(count: number): OrbitLayout[] {
  const radii = [7.4, 10.2];
  return Array.from({ length: count }, (_, index) => {
    const bandIndex = index % radii.length;
    const slot = Math.floor(index / radii.length);
    const itemsInBand = Math.ceil((count - bandIndex) / radii.length);
    const radiusX = radii[bandIndex]! + (slot % 2) * 0.35;
    return {
      phase0: (slot / itemsInBand) * Math.PI * 2 + bandIndex * 0.92,
      radiusX,
      radiusY: radiusX * 0.84,
      width: 4.15 + bandIndex * 0.45,
    };
  });
}

function getCardPalette(item: CollectionItem): CardPalette {
  switch (item.original) {
    case 'Daemari Translation Archive':
      return {
        start: 'rgba(255, 162, 108, 0.96)',
        end: 'rgba(232, 89, 93, 0.94)',
        text: 'rgba(48, 12, 15, 0.96)',
        glowRgb: '255, 128, 86',
      };
    case 'Douglas Engelbart':
      return {
        start: 'rgba(130, 226, 162, 0.96)',
        end: 'rgba(56, 163, 110, 0.94)',
        text: 'rgba(11, 54, 31, 0.96)',
        glowRgb: '106, 214, 144',
      };
    case 'Alan Kay':
      return {
        start: 'rgba(116, 191, 255, 0.96)',
        end: 'rgba(58, 107, 255, 0.94)',
        text: 'rgba(12, 31, 78, 0.96)',
        glowRgb: '88, 154, 255',
      };
    case 'Bret Victor':
      return {
        start: 'rgba(255, 194, 97, 0.97)',
        end: 'rgba(255, 120, 69, 0.94)',
        text: 'rgba(71, 26, 8, 0.96)',
        glowRgb: '255, 155, 82',
      };
    default:
      return {
        start: 'rgba(246, 217, 205, 0.95)',
        end: 'rgba(220, 204, 237, 0.94)',
        text: 'rgba(52, 37, 49, 0.92)',
        glowRgb: '223, 181, 227',
      };
  }
}

const SYSTEM_ORBIT = {
  cx: 60,
  cy: 27,
  radiusX: 35,
  radiusY: 15,
  rotationDeg: 40,
  angularSpeed: (2 * Math.PI) / 210,
};

const WORD_CLUSTER: ClusterDef = {
  id: 'words',
  label: 'Collected Words',
  note: 'living collection',
  systemPhase0: 0.52,
  rotationDeg: -18,
  angularSpeed: (2 * Math.PI) / 156,
  haloSize: 34,
  tintRgb: [211, 180, 103],
};

const POETRY_CLUSTER: ClusterDef = {
  id: 'poetry',
  label: 'Poetry Archive',
  note: 'Daemari · archived',
  systemPhase0: 3.67,
  rotationDeg: 18,
  angularSpeed: (2 * Math.PI) / 192,
  haloSize: 24,
  tintRgb: [169, 100, 124],
};

const COMMUNITY_CLUSTER: ClusterDef = {
  id: 'community',
  label: 'Community Care',
  note: 'SHANUM · multicultural service',
  systemPhase0: 1.88,
  rotationDeg: -8,
  angularSpeed: (2 * Math.PI) / 174,
  haloSize: 27,
  tintRgb: [98, 161, 152],
};

const REFERENCES_CLUSTER: ClusterDef = {
  id: 'references',
  label: 'Saved References',
  note: 'works I return to',
  systemPhase0: 5.08,
  rotationDeg: 12,
  angularSpeed: (2 * Math.PI) / 186,
  haloSize: 22,
  tintRgb: [162, 183, 214],
};

const CLUSTER_MAP: Record<ClusterId, ClusterDef> = {
  words: WORD_CLUSTER,
  poetry: POETRY_CLUSTER,
  community: COMMUNITY_CLUSTER,
  references: REFERENCES_CLUSTER,
};

const CLUSTERS = Object.values(CLUSTER_MAP);

function pointAroundCenter(centerX: number, centerY: number, rotationDeg: number, phi: number, radiusX: number, radiusY: number) {
  const rot = (rotationDeg * Math.PI) / 180;
  const lx = radiusX * Math.cos(phi);
  const ly = radiusY * Math.sin(phi);
  const rx = lx * Math.cos(rot) - ly * Math.sin(rot);
  const ry = lx * Math.sin(rot) + ly * Math.cos(rot);
  // depth: -1 = far side of the tilt (recedes, as if behind the planet),
  // +1 = near side (toward the viewer). This is what actually reads as 3D —
  // the ellipse shape alone (a flat 2D oval) doesn't sell perspective on its own.
  const depth = Math.sin(phi);
  return { cx: centerX + rx, cy: centerY + ry * IMG_ASPECT, depth };
}

function pointOnSystemOrbit(phi: number) {
  return pointAroundCenter(
    SYSTEM_ORBIT.cx,
    SYSTEM_ORBIT.cy,
    SYSTEM_ORBIT.rotationDeg,
    phi,
    SYSTEM_ORBIT.radiusX,
    SYSTEM_ORBIT.radiusY,
  );
}

function getClusterCenter(cluster: ClusterDef, t = 0) {
  const phi = cluster.systemPhase0 + SYSTEM_ORBIT.angularSpeed * t;
  const { cx, cy } = pointOnSystemOrbit(phi);
  return { cx, cy };
}

function buildWordOrbits(count: number): OrbitLayout[] {
  const radii = [8.6, 11.8, 15, 18.2];
  return Array.from({ length: count }, (_, index) => {
    const bandIndex = index % radii.length;
    const slot = Math.floor(index / radii.length);
    const itemsInBand = Math.ceil((count - bandIndex) / radii.length);
    const radiusX = radii[bandIndex]! + (slot % 2 === 0 ? 0 : 0.45);
    return {
      phase0: (slot / itemsInBand) * Math.PI * 2 + bandIndex * 0.42,
      radiusX,
      radiusY: radiusX * 0.9,
      width: 1.95 + bandIndex * 0.12 + (slot % 2) * 0.08,
    };
  });
}

function buildClusterSparkles(cluster: ClusterDef, count: number, minRadius: number, maxRadius: number): ClusterSparkle[] {
  return Array.from({ length: count }, () => {
    const phase0 = Math.random() * Math.PI * 2;
    const radiusX = minRadius + Math.random() * (maxRadius - minRadius);
    const radiusY = radiusX * (0.75 + Math.random() * 0.25);
    return {
      phase0,
      radiusX,
      radiusY,
      angularScale: 0.12 + Math.random() * 0.16,
      size: 1.8 + Math.random() * 2.4,
      delay: Math.random() * 5,
      duration: 1.6 + Math.random() * 2.4,
      clusterId: cluster.id,
    };
  });
}

const DEPTH_NEAR_SCALE = 1.4; // size multiplier on the near side
const DEPTH_FAR_SCALE = 0.5;  // size multiplier on the far side
const depthScale = (depth: number) => DEPTH_FAR_SCALE + (DEPTH_NEAR_SCALE - DEPTH_FAR_SCALE) * ((depth + 1) / 2);
const regularTwinkle = (time: number, seed: number) => {
  const wave = (Math.sin(time * 1.7 + seed * 1.9) + 1) / 2;
  return 0.2 + wave * 0.8;
};
// Stays within 2-10 — above the background (z-index 1), below MOON_Z (11) so
// the moon image can occlude bubbles passing behind it, and below every
// sticker (z-index 12+, see STICKERS).
const depthZ = (depth: number) => 2 + Math.round((depth + 1) * 4);

// The moon image sits exactly over the dark circle drawn in background.png
// (measured by eye: center 84%, 34%, ~17% wide), at a fixed screen position
// with no tilt parallax — it has to stay perfectly aligned with the orbit
// math above, or bubbles would peek out from behind it as the scene tilts.
// z-index 11: above every bubble, below every sticker, so it actually hides
// bubbles passing behind it instead of just shrinking/fading them.
const MOON = { cx: 86, cy: 35, width: 20 };
const MOON_Z = 11;
const MOON_ASPECT = 390 / 434; // moon.png's own height/width

const SPARKLES = [
  ...buildClusterSparkles(WORD_CLUSTER, 22, 7, 24),
  ...buildClusterSparkles(POETRY_CLUSTER, 7, 6.5, 15.5),
  ...buildClusterSparkles(COMMUNITY_CLUSTER, 8, 6.5, 16.5),
  ...buildClusterSparkles(REFERENCES_CLUSTER, 6, 5.8, 13.8),
];

const WORD_ORBITS = buildWordOrbits(collections.length);
const POETRY_ORBITS: OrbitLayout[] = [
  { phase0: 2.14, radiusX: 8.4, radiusY: 6.9, width: 4.85 },
];

const COMMUNITY_ORBITS: OrbitLayout[] = [
  { phase0: 0.72, radiusX: 8.2, radiusY: 7.1, width: 4.25 },
];

const REFERENCE_ORBITS = buildReferenceOrbits(referenceProjects.length);

function createRandomUniverseLayout(): RandomUniverseLayout {
  const randomizedCollections = shuffleArray(collections);
  const wordStars = randomizedCollections.map((item, index) => {
    const baseOrbit = WORD_ORBITS[index]!;
    return {
      item,
      clusterId: 'words' as const,
      orbit: withPhaseOffset(baseOrbit, Math.random() * Math.PI * 2),
    };
  });

  const poetryStars = poetryProjects.map((item, index) => ({
    item,
    clusterId: 'poetry' as const,
    orbit: withPhaseOffset(POETRY_ORBITS[index]!, Math.random() * Math.PI * 2),
  }));

  const communityStars = communityActivities.map((item, index) => ({
    item,
    clusterId: 'community' as const,
    orbit: withPhaseOffset(COMMUNITY_ORBITS[index]!, Math.random() * Math.PI * 2),
  }));

  const referenceStars = referenceProjects.map((item, index) => ({
    item,
    clusterId: 'references' as const,
    orbit: withPhaseOffset(REFERENCE_ORBITS[index]!, Math.random() * Math.PI * 2),
  }));

  const photoStars = [...wordStars, ...poetryStars, ...communityStars, ...referenceStars];
  const starIndexByOriginal = new Map(
    photoStars.map((star, index) => [star.item.original, index]),
  );

  const keywordEntries = shuffleArray([
    ...collections.map(item => ({
      label: item.original,
      starIndex: starIndexByOriginal.get(item.original)!,
      analyticsId: item.original,
      analyticsName: item.korean,
    })),
    {
      label: 'Daemari',
      starIndex: starIndexByOriginal.get(poetryProjects[0]?.original ?? 'Daemari') ?? 0,
      analyticsId: poetryProjects[0]?.original ?? 'Daemari',
      analyticsName: poetryProjects[0]?.korean ?? 'Daemari',
    },
    {
      label: 'SHANUM',
      starIndex: starIndexByOriginal.get(communityActivities[0]?.original ?? 'SHANUM') ?? 0,
      analyticsId: communityActivities[0]?.original ?? 'SHANUM',
      analyticsName: communityActivities[0]?.korean ?? 'SHANUM',
    },
    ...referenceProjects.map(item => ({
      label: getKeywordLabel(item),
      starIndex: starIndexByOriginal.get(item.original)!,
      analyticsId: item.original,
      analyticsName: item.korean,
    })),
  ]);

  return {
    wordStars,
    poetryStars,
    communityStars,
    referenceStars,
    photoStars,
    keywordEntries,
  };
}

const RANDOM_UNIVERSE = createRandomUniverseLayout();
const PHOTO_STARS = RANDOM_UNIVERSE.photoStars;
const KEYWORD_ENTRIES = RANDOM_UNIVERSE.keywordEntries;

// Shared between the desktop margin and the mobile section below the fold —
// one copy of the copy, instead of keeping two in sync by hand.
const INTRO_PARAGRAPHS: IntroParagraph[] = [
  {
    content: `This world building page keeps the words, projects, and references I return to.`,
  },
  {
    content: `For now, the main threads are Daemari, SHANUM, and a few saved references that continue to shape how I look at things.`,
  },
  {
    content: (
      <>
        <span className="collage-intro__spark">Zoom</span> inward or click a word on the right to open one star at a time.
      </>
    ),
    tone: 'cta',
  },
];

// ── Sticker layout ──────────────────────────────────────────────────────────
// depth: px movement per unit tilt. higher = floats more in foreground.
// z-order: plant-eye(12) → path(13) → flowers+pine(14) → frog+clouds(15)
//          → cloud-large(16) → butterfly+frog-pixel+crane(17)
// Shifted up (+10) so the orbiting photo bubbles (z-index ~2-11, see depthZ)
// always sit behind every sticker — just in front of the background, never on
// top of clouds/pine/etc.
// ────────────────────────────────────────────────────────────────────────────
interface Sticker {
  src: string;
  style: React.CSSProperties;
  depth: number;
  // Which way this thing flies past the camera during the warp — outward,
  // toward whichever edge it already sits near. Passing through means moving
  // out of frame, not fading; this is the direction it moves out in.
  flyDir: { x: number; y: number };
}

const STICKERS: Sticker[] = [
  // ground — most anchored, barely moves
  { src: 'plant-eye.png',    style: { left: '-4%',   bottom: '14%', width: '32%', zIndex: 12 }, depth: 3,  flyDir: { x: -1,   y: 1   } },
  { src: 'path.png',         style: { left:  '4%',   bottom: '-4%', width: '92%', zIndex: 13 }, depth: 2,  flyDir: { x: 0,    y: 1   } },
  // foreground — slightly lifted off ground
  { src: 'flowers.png',      style: { left: '-4%',   bottom:  '0%', width: '67%', zIndex: 14 }, depth: 7,  flyDir: { x: -1,   y: 1   } },
  { src: 'pine.png',         style: { right: '-20%', bottom: '-1%', width: '68%', zIndex: 14 }, depth: 8,  flyDir: { x: 1,    y: 1   } },
  // mid — on path / lower atmosphere
  { src: 'frog-real.png',    style: { left:  '60%',  bottom:  '7%', width: '22%', zIndex: 15 }, depth: 12, flyDir: { x: 1,    y: 1   } },
  { src: 'cloud-large.png',  style: { left:   '5%',  top:    '44%', width: '58%', zIndex: 16 }, depth: 15, flyDir: { x: -0.4, y: -1  } },
  { src: 'cloud-medium.png', style: { right: '19%',  top:    '40%', width: '35%', zIndex: 15 }, depth: 18, flyDir: { x: 0.6,  y: -1  } },
  { src: 'cloud-small.png',  style: { right: '10%',  top:    '48%', width: '26%', zIndex: 15 }, depth: 20, flyDir: { x: 0.9,  y: -0.8} },
  // sky — lightest, floats the most
  { src: 'frog-pixel.png',   style: { left:  '15%',  top:    '41%', width: '13%', zIndex: 17 }, depth: 26, flyDir: { x: -0.6, y: -1  } },
  { src: 'butterfly.png',    style: { left:  '25%',  top:    '34%', width: '12%', zIndex: 17 }, depth: 32, flyDir: { x: -0.3, y: -1.2} },
  // { src: 'crane.png',     style: { right: '60%',  top:    '55%', width: '12%', zIndex: 17 }, depth: 28, flyDir: { x: 0.5, y: -1 } },
];

// ────────────────────────────────────────────────────────────────────────────

const WARP_DURATION = 1100; // ms — a committed jump, not a drag-it-out fade
const WARP_TRIGGER = 100;   // accumulated wheel/pinch input needed to launch it
const easeIn = (t: number) => t * t * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Clicking a word — whether its bubble out in the ring or its keyword chip in
// the margin — should read as "that circle lit up and grew into the card",
// not "a card just appeared next to it". So: the bubble gathers to center and
// pulses (FOCUS_RAMP_MS), then a clone of its photo grows from its exact
// on-screen spot into the card's size/position (MORPH_MS, with a white flash
// at the handoff), and only then does the real modal swap in underneath it.
const FOCUS_RAMP_MS = 320;
const MORPH_MS = 420;
const FOCUS_SCALE = 2.6;

const CollectionsPage: React.FC = () => {
  const [selected, setSelected] = useState<CollectionItem | null>(null);
  const [lang, setLang] = useState<Lang>('en');
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  // 0 = resting in the small frame, 1 = fully sucked into the universe.
  // Only ever sits at 0 or 1 — once a warp launches it always runs to
  // completion, regardless of further scrolling, so it can't get stuck
  // half-transitioned.
  const [warpProgress, setWarpProgress] = useState(0);
  const [warping, setWarping] = useState(false);
  const portraitRef = useRef<HTMLDivElement>(null);
  const lastTouchDist = useRef(0);
  const scrollAccum = useRef(0);
  const clusterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sparkleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const photoRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusedIndex = useRef<number | null>(null);
  const focusStart = useRef<number | null>(null);
  const focusPhiFrom = useRef(0);
  const focusPhiTo = useRef(0);
  const orbitStart = useRef(0);
  const orbitTimeRef = useRef(0);
  const morphRef = useRef<HTMLDivElement>(null);
  const morphImgRef = useRef<HTMLImageElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const galleryTouchStartX = useRef<number | null>(null);

  // Pulses the bubble at `index` by continuing its actual orbit — rotating
  // (the short way, forward or back) to phi = π/2, the ring's near/front
  // point, where depth is already maxed — while easing in extra size on top
  // of that, instead of teleporting straight to frame-center. The backdrop
  // dims continuously from the very start of that, in step with the growth,
  // so it's already dark by the time the modal needs to appear — darkening
  // AT the same moment the modal mounts is what read as a cut. Once the
  // bubble lands at the front it's cloned (getBoundingClientRect handles all
  // the nested warp/lean transforms for us) and grown to the card-photo's
  // exact rect, before the real modal appears underneath in that same spot.
  const focusThenOpen = (photoIndex: number) => {
    const star = PHOTO_STARS[photoIndex]!;
    const starImages = getItemImages(star.item);
    const cluster = CLUSTER_MAP[star.clusterId];
    const phaseNow = (performance.now() - orbitStart.current) / 1000;
    const currentPhi = star.orbit.phase0 + cluster.angularSpeed * phaseNow;
    let diff = (Math.PI / 2 - currentPhi) % (2 * Math.PI);
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;
    focusPhiFrom.current = currentPhi;
    focusPhiTo.current = currentPhi + diff;

    focusedIndex.current = photoIndex;
    focusStart.current = performance.now();
    const bubbleEl = photoRefs.current[photoIndex];
    bubbleEl?.classList.add('collage-photo-star--focused');

    const dimEl = dimRef.current;
    if (dimEl) {
      dimEl.style.transition = `opacity ${FOCUS_RAMP_MS + MORPH_MS}ms ease`;
      dimEl.classList.add('collage-dim--active');
    }

    window.setTimeout(() => {
      const morphEl = morphRef.current;
      const imgEl = morphImgRef.current;
      if (bubbleEl && morphEl && imgEl && starImages[0]) {
        const rect = bubbleEl.getBoundingClientRect();
        imgEl.src = starImages[0];
        morphEl.style.transition = 'none';
        morphEl.style.left = `${rect.left}px`;
        morphEl.style.top = `${rect.top}px`;
        morphEl.style.width = `${rect.width}px`;
        morphEl.style.height = `${rect.height}px`;
        morphEl.classList.add('collage-morph--active');
        bubbleEl.style.opacity = '0';
        void morphEl.offsetWidth; // force layout so the next change transitions
        // Lands exactly on .collage-modal__photo's real size/position, so
        // swapping the clone for the actual modal is invisible — same image,
        // same spot, same size, no fade needed to hide a mismatch.
        const targetW = Math.min(380, window.innerWidth - 48);
        const targetH = targetW * 0.75; // matches .collage-modal__photo's 4/3
        morphEl.style.transition =
          `left ${MORPH_MS}ms ease, top ${MORPH_MS}ms ease, width ${MORPH_MS}ms ease, height ${MORPH_MS}ms ease`;
        morphEl.style.left = `${(window.innerWidth - targetW) / 2}px`;
        morphEl.style.top = `${(window.innerHeight - targetH) / 2 - 117}px`;
        morphEl.style.width = `${targetW}px`;
        morphEl.style.height = `${targetH}px`;
      }
    }, FOCUS_RAMP_MS);

    window.setTimeout(() => {
      bubbleEl?.classList.remove('collage-photo-star--focused');
      if (bubbleEl) bubbleEl.style.opacity = '';
      morphRef.current?.classList.remove('collage-morph--active');
      // .collage-dim stays active (it's already ~fully dark by now) — the
      // modal itself carries no background/blur of its own, so there's
      // nothing for it to additionally fade in once it mounts. It only
      // clears in closeModal, below.
      focusedIndex.current = null;
      focusStart.current = null;
      setSelectedGalleryIndex(0);
      setSelected(star.item);
    }, FOCUS_RAMP_MS + MORPH_MS);
  };

  // Quick fade back to normal brightness — short, snappy, unlike the long
  // continuous darken-while-growing transition used when opening.
  const closeModal = () => {
    if (dimRef.current) {
      dimRef.current.style.transition = 'opacity 0.25s ease';
      dimRef.current.classList.remove('collage-dim--active');
    }
    setSelectedGalleryIndex(0);
    setSelected(null);
  };

  const selectedImages = selected ? getItemImages(selected) : [];
  const activeImage = selectedImages[selectedGalleryIndex] ?? selectedImages[0];
  const selectedSource = selected
    ? (lang === 'en' && selected.sourceEn
        ? selected.sourceEn
        : selected.source ?? '')
    : '';
  const selectedMeta = selected
    ? (lang === 'en' && selected.metaEn
        ? selected.metaEn
        : selected.meta ?? (selected.kind === 'word' ? selected.korean : ''))
    : '';
  const selectedGlance = selected
    ? (lang === 'en' && selected.glanceEn
        ? selected.glanceEn
        : selected.glance ?? '')
    : '';
  const selectedTextBlocks = selected
    ? [
        lang === 'en' && selected.descriptionEn ? selected.descriptionEn : selected.description,
        lang === 'en' ? selected.curatorNoteEn : selected.curatorNote,
      ].filter((block): block is string => Boolean(block))
    : [];
  const selectedHref = selected?.href ?? '';

  const getCardTitle = (item: CollectionItem) => {
    if (item.kind === 'poetry') return 'Daemari';
    if (item.kind === 'reference') return getKeywordLabel(item);
    return item.original;
  };

  const getCardSubtitle = (item: CollectionItem) => {
    if (lang === 'en' && item.cardLabelEn) return item.cardLabelEn;
    if (lang === 'ko' && item.cardLabel) return item.cardLabel;
    if (item.kind === 'poetry') return 'translation archive';
    if (item.kind === 'reference') return 'saved reference';
    if (item.kind === 'activity') return 'community thread';
    return item.language;
  };

  const showPreviousImage = () => {
    if (selectedImages.length < 2) return;
    setSelectedGalleryIndex(index => (index - 1 + selectedImages.length) % selectedImages.length);
  };

  const showNextImage = () => {
    if (selectedImages.length < 2) return;
    setSelectedGalleryIndex(index => (index + 1) % selectedImages.length);
  };

  const handleGalleryTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    galleryTouchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleGalleryTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (galleryTouchStartX.current === null || selectedImages.length < 2) {
      galleryTouchStartX.current = null;
      return;
    }
    const touchX = e.changedTouches[0]?.clientX;
    if (touchX === undefined) {
      galleryTouchStartX.current = null;
      return;
    }
    const deltaX = touchX - galleryTouchStartX.current;
    if (deltaX <= -40) showNextImage();
    if (deltaX >= 40) showPreviousImage();
    galleryTouchStartX.current = null;
  };

  // Launches the one-shot warp animation and runs it to completion on its own
  // timer — not tied to the wheel/touch input that triggered it.
  const startWarp = (direction: 1 | -1) => {
    setWarping(true);
    const startVal = direction === 1 ? 0 : 1;
    const ease = direction === 1 ? easeIn : easeOut;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / WARP_DURATION);
      setWarpProgress(direction === 1 ? ease(t) : startVal - ease(t));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setWarpProgress(direction === 1 ? 1 : 0);
        setWarping(false);
      }
    };
    requestAnimationFrame(tick);
  };

  // Desktop: track mouse anywhere on the page, relative to portrait center
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const rect = portraitRef.current?.getBoundingClientRect();
      if (!rect) return;
      const clamp = (v: number) => Math.max(-0.6, Math.min(0.6, v));
      setTilt({
        x: clamp((e.clientX - (rect.left + rect.width  / 2)) / rect.width),
        y: clamp((e.clientY - (rect.top  + rect.height / 2)) / rect.height),
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Mobile: use device gyroscope. iOS 13+ never fires 'deviceorientation' at
  // all until DeviceOrientationEvent.requestPermission() has been granted,
  // and that call only works from inside a user gesture — so it can't just
  // be requested on mount, it has to ride along on the visitor's first tap.
  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      setTilt({
        x: Math.max(-0.5, Math.min(0.5, (e.gamma ?? 0) / 30)),
        y: Math.max(-0.5, Math.min(0.5, ((e.beta ?? 0) - 45) / 30)),
      });
    };
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
    if (typeof DOE?.requestPermission === 'function') {
      const requestOnce = () => {
        DOE.requestPermission!()
          .then(state => {
            if (state === 'granted') window.addEventListener('deviceorientation', handler);
          })
          .catch(() => {});
        window.removeEventListener('touchend', requestOnce);
        window.removeEventListener('click', requestOnce);
      };
      window.addEventListener('touchend', requestOnce, { once: true });
      window.addEventListener('click', requestOnce, { once: true });
      return () => {
        window.removeEventListener('touchend', requestOnce);
        window.removeEventListener('click', requestOnce);
        window.removeEventListener('deviceorientation', handler);
      };
    }
    window.addEventListener('deviceorientation', handler);
    return () => window.removeEventListener('deviceorientation', handler);
  }, []);

  // Each cluster moves as one quiet system: same angular speed within the
  // cluster, different radii and phases so nothing stacks directly.
  useLayoutEffect(() => {
    let frame: number;
    const start = performance.now();
    orbitStart.current = start;
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      orbitTimeRef.current = t;
      const portraitEl = portraitRef.current;
      const portraitWidth = portraitEl?.clientWidth ?? 0;
      const portraitHeight = portraitEl?.clientHeight ?? 0;
      const centers = CLUSTERS.reduce<Record<ClusterId, { cx: number; cy: number }>>((acc, cluster, index) => {
        const center = getClusterCenter(cluster, t);
        acc[cluster.id] = center;
        const clusterEl = clusterRefs.current[index];
        if (clusterEl) {
          clusterEl.style.setProperty('--cluster-x', `${(center.cx / 100) * portraitWidth}px`);
          clusterEl.style.setProperty('--cluster-y', `${(center.cy / 100) * portraitHeight}px`);
        }
        return acc;
      }, {} as Record<ClusterId, { cx: number; cy: number }>);

      SPARKLES.forEach((sparkle, index) => {
        const el = sparkleRefs.current[index];
        if (!el) return;
        const cluster = CLUSTER_MAP[sparkle.clusterId];
        const center = centers[sparkle.clusterId];
        const phi = sparkle.phase0 + cluster.angularSpeed * sparkle.angularScale * t;
        const { cx, cy } = pointAroundCenter(center.cx, center.cy, cluster.rotationDeg, phi, sparkle.radiusX, sparkle.radiusY);
        el.style.left = `${(cx / 100) * portraitWidth}px`;
        el.style.top = `${(cy / 100) * portraitHeight}px`;
      });

      PHOTO_STARS.forEach(({ clusterId, orbit }, i) => {
        const el = photoRefs.current[i];
        if (!el) return;
        const cluster = CLUSTER_MAP[clusterId];
        let phi = orbit.phase0 + cluster.angularSpeed * t;
        const isFocused = focusedIndex.current === i && focusStart.current !== null;
        let extraBoost = 1;
        if (isFocused) {
          // Keep riding the orbit instead of teleporting to frame-center —
          // rotate to the front-most point and ease in extra size on top.
          const ft = Math.min(1, (now - focusStart.current!) / FOCUS_RAMP_MS);
          const eased = ft * ft * (3 - 2 * ft);
          phi = focusPhiFrom.current + (focusPhiTo.current - focusPhiFrom.current) * eased;
          extraBoost = 1 + eased * (FOCUS_SCALE - 1);
        }
        const { cx, cy, depth } = pointAroundCenter(
          centers[clusterId].cx,
          centers[clusterId].cy,
          cluster.rotationDeg,
          phi,
          orbit.radiusX,
          orbit.radiusY,
        );
        const scale = depthScale(depth) * extraBoost;
        const opacity = isFocused
          ? 1
          : depth > 0.38
            ? 1
            : regularTwinkle(t, i + orbit.phase0);
        const zIndex = isFocused ? 999 : depthZ(depth);
        el.style.setProperty('--star-x', `${(cx / 100) * portraitWidth}px`);
        el.style.setProperty('--star-y', `${(cy / 100) * portraitHeight}px`);
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
        el.style.setProperty('--star-scale', `${scale}`);
      });

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Scroll enough in one direction and it launches the warp — doesn't matter
  // if you stop scrolling right after, the animation already committed.
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (warping) return;
      if (warpProgress >= 1) {
        if (e.deltaY <= 0) { scrollAccum.current = 0; return; }
        scrollAccum.current += e.deltaY;
        if (scrollAccum.current > WARP_TRIGGER) { scrollAccum.current = 0; startWarp(-1); }
        return;
      }
      if (e.deltaY >= 0) { scrollAccum.current = 0; return; }
      scrollAccum.current += -e.deltaY;
      if (scrollAccum.current > WARP_TRIGGER) { scrollAccum.current = 0; startWarp(1); }
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [warping, warpProgress]);

  // Pinch to zoom (mobile) — same launch-then-commit behavior as the wheel
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 2 || warping) return;
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY,
    );
    if (lastTouchDist.current > 0) {
      const delta = dist - lastTouchDist.current;
      if (warpProgress >= 1) {
        if (delta < 0) {
          scrollAccum.current += -delta;
          if (scrollAccum.current > WARP_TRIGGER) { scrollAccum.current = 0; startWarp(-1); }
        } else {
          scrollAccum.current = 0;
        }
      } else if (delta > 0) {
        scrollAccum.current += delta;
        if (scrollAccum.current > WARP_TRIGGER) { scrollAccum.current = 0; startWarp(1); }
      } else {
        scrollAccum.current = 0;
      }
    }
    lastTouchDist.current = dist;
  };

  const handleTouchEnd = () => { lastTouchDist.current = 0; };

  // Double-click / double-tap to warp back out, once you're fully in
  const handleDoubleClick = () => {
    if (!warping && warpProgress > 0.5) startWarp(-1);
  };

  const progress = warpProgress;
  // How far the small portrait needs to grow (via transform, so it's cheap)
  // before it covers the whole viewport — "bursting out of the frame" into
  // open space, past the trees and clouds, instead of just zooming inside it.
  // Capped at BG_MAX_UPSCALE × background.png's native width (1596px) — on a
  // big screen, covering every last pixel of the viewport isn't worth turning
  // the star field into a soft blur. Past the cap it just stops short of the
  // edges instead, with the page's own blurred backdrop showing through there.
  const frameScale = (() => {
    if (typeof window === 'undefined') return 1;
    const portraitWidthPx = window.innerHeight * IMG_ASPECT;
    const innerMaxScale = 1.3; // inner lean's max, at progress 1 (1 + 0.3 * progress)
    const bgBaseScale = 1.06; // baked into .collage-bg's own transform
    const maxUpscaleFrameScale =
      (BG_NATIVE_WIDTH * BG_MAX_UPSCALE) / (portraitWidthPx * innerMaxScale * bgBaseScale);
    const maxFrameScale = Math.min(
      Math.max(1, (window.innerWidth / portraitWidthPx) * 1.05),
      maxUpscaleFrameScale,
    );
    return 1 + (Math.max(1, maxFrameScale) - 1) * progress;
  })();
  // Peaks mid-warp and resolves clean at both ends — the "space-time"
  // distortion cue while everything is rushing past.
  const warpFilter = warping
    ? `blur(${Math.sin(progress * Math.PI) * 7}px) brightness(${1 + Math.sin(progress * Math.PI) * 0.35})`
    : 'none';

  return (
    <div className="collage-page">
      <Masthead />

      <main className="collage-main" data-analytics-section="collections_universe">
        <div
          className="collage-portrait"
          ref={portraitRef}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleClick}
          style={{
            transform: `scale(${frameScale})`,
            transformOrigin: `50% ${FRAME_ORIGIN_Y}%`,
            transition: warping ? 'none' : 'transform 0.08s ease-out',
          }}
        >
          {/* Inner layer — just a slight lean toward ZOOM_FOCUS. The dramatic "fill the
              screen" effect is the outer frame growth below, not this — stacking two big
              zooms on top of each other was what made it read as a tight, cropped close-up
              instead of "the background becoming the whole screen". */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: `scale(${1 + 0.3 * progress})`,
              transformOrigin: `${ZOOM_FOCUS.x}% ${ZOOM_FOCUS.y}%`,
              filter: warpFilter,
              transition: warping ? 'none' : 'transform 0.08s ease-out',
            }}
          >
            <img
              src={S('background.png')}
              alt=""
              className="collage-bg"
              draggable={false}
              decoding="async"
              style={{
                transform: `scale(1.06) translate(${tilt.x * -4}px, ${tilt.y * -4}px)`,
                transition: 'transform 0.12s ease-out',
              }}
            />

            {/* Sits over the planet at a fixed position — no tilt — so it stays exactly
                aligned with the orbit math and actually occludes bubbles passing behind it. */}
            <img
              src={S('moon.png')}
              alt=""
              draggable={false}
              decoding="async"
              style={{
                position: 'absolute',
                left: `${MOON.cx - MOON.width / 2}%`,
                top: `${MOON.cy - (MOON.width * MOON_ASPECT * IMG_ASPECT) / 2}%`,
                width: `${MOON.width}%`,
                zIndex: MOON_Z,
              }}
            />

            {CLUSTERS.map((cluster, index) => {
              return (
                <div
                  key={cluster.id}
                  ref={el => { clusterRefs.current[index] = el; }}
                  className={`collage-cluster collage-cluster--${cluster.id}`}
                  style={{
                    width: `${cluster.haloSize}%`,
                    height: `${cluster.haloSize * 0.72}%`,
                    ['--cluster-rgb' as string]: cluster.tintRgb.join(', '),
                  }}
                >
                  <span className="collage-cluster__halo" />
                  <span className="collage-cluster__anchor" />
                  <span className="collage-cluster__label">
                    <strong>{cluster.label}</strong>
                    <span>{cluster.note}</span>
                  </span>
                </div>
              );
            })}

            {/* Twinkling dust now hangs around each cluster instead of one ring */}
            {SPARKLES.map((s, i) => {
              const cluster = CLUSTER_MAP[s.clusterId];
              return (
                <span
                  key={i}
                  ref={el => { sparkleRefs.current[i] = el; }}
                  className="collage-sparkle"
                  style={{
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    animationDelay: `${s.delay}s`,
                    animationDuration: `${s.duration}s`,
                    ['--cluster-rgb' as string]: cluster.tintRgb.join(', '),
                  }}
                />
              );
            })}

            {/* Floating stars across the saved word/project/reference clusters. */}
            {PHOTO_STARS.map(({ item, clusterId, orbit }, i) => {
              const cluster = CLUSTER_MAP[clusterId];
              const isPastelCard = !item.src;
              const cardPalette = isPastelCard ? getCardPalette(item) : null;
              return (
                <button
                  key={item.original}
                  ref={el => { photoRefs.current[i] = el; }}
                  type="button"
                  className={`collage-photo-star${isPastelCard ? ' collage-photo-star--card' : ''}`}
                  data-analytics-event="collection_item_open"
                  data-analytics-item-id={item.original}
                  data-analytics-item-name={item.korean}
                  data-analytics-placement={`${clusterId}_cluster`}
                  style={{
                    ['--cluster-rgb' as string]: cluster.tintRgb.join(', '),
                    width: `${orbit.width}%`,
                    ...(cardPalette
                      ? {
                          ['--card-bg-start' as string]: cardPalette.start,
                          ['--card-bg-end' as string]: cardPalette.end,
                          ['--card-text' as string]: cardPalette.text,
                          ['--card-glow-rgb' as string]: cardPalette.glowRgb,
                        }
                      : {}),
                  }}
                  onClick={() => focusThenOpen(i)}
                  aria-label={item.original}
                >
                  {item.src ? (
                    <>
                      <img src={item.src} alt="" draggable={false} loading="lazy" decoding="async" />
                      {item.kind === 'reference' && (
                        <span className="collage-photo-star__badge" aria-hidden="true">
                          Ori Ease · screenshot
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="collage-photo-star__card" aria-hidden="true">
                      <strong>{getCardTitle(item)}</strong>
                      <span>{getCardSubtitle(item)}</span>
                    </span>
                  )}
                </button>
              );
            })}

            {STICKERS.map(({ src, style, depth, flyDir }) => {
              // Foreground stuff (high depth — clouds, butterfly) blows up huge and flies
              // outward toward whichever edge it's already near — passing right through
              // the frame and out the side, fully opaque the whole way, rather than fading
              // out in place. Grounded stuff (path, plant-eye) barely moves.
              // vw/vh, not %, and placed outside the scale() in the transform chain — a
              // %-based translate is relative to the element's OWN (unscaled) size, so as
              // flyScale grows that fixed offset becomes proportionally tiny and the thing
              // never actually clears the screen, it just balloons in place forever.
              const flyScale = 1 + progress * (depth / 4);
              const flyX = flyDir.x * progress * 140;
              const flyY = flyDir.y * progress * 140;
              return (
                <img
                  key={src}
                  src={S(src)}
                  alt=""
                  draggable={false}
                  className="collage-sticker"
                  decoding="async"
                  style={{
                    ...style,
                    transform: `translate(${tilt.x * depth}px, ${tilt.y * depth}px) translate(${flyX}vw, ${flyY}vh) scale(${flyScale})`,
                    filter: `drop-shadow(${-tilt.x * 6}px ${-tilt.y * 6}px 10px rgba(0,0,0,0.45))`,
                    transition: warping ? 'none' : 'transform 0.12s ease-out, filter 0.12s ease-out',
                  }}
                />
              );
            })}
          </div>

          {/* UI overlays — stay fixed, don't zoom */}
          <button
            className="collage-lang-toggle"
            onClick={() => setLang(l => l === 'ko' ? 'en' : 'ko')}
            aria-label="Toggle language"
            data-analytics-event="language_toggle"
            data-analytics-label="Collections language toggle"
            data-analytics-placement="collections"
          >
            <span className={lang === 'ko' ? 'active' : ''}>KO</span>
            <span className="sep">/</span>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
          </button>
        </div>
      </main>

      {/* Dims+blurs the whole scene in step with the growth below, so it's
          already dark by the time the card needs to appear, instead of
          darkening at the same moment the card pops in. */}
      <div ref={dimRef} className="collage-dim" />

      {/* Clone of the focused bubble's photo, grown from its exact on-screen
          rect into the card's size/shape — has to live outside .collage-portrait
          since that (and its inner layer) carry their own transforms, which
          would hijack position:fixed's containing block otherwise. */}
      <div ref={morphRef} className="collage-morph">
        <img ref={morphImgRef} alt="" draggable={false} decoding="async" />
      </div>

      {/* Keyword index in the margins outside the frame — run together like
          running prose, words joined by middots, no chip/box around them.
          Clicking one pulses its bubble out in the ring (same index as
          photoRefs) before the card opens, so it reads as "that lit up". */}
      <aside className="collage-keywords collage-keywords--left collage-keywords--intro" aria-label="Worldbuilding note">
        {INTRO_PARAGRAPHS.map(({ content, tone }, i) => (
          <p className={`collage-intro${tone === 'cta' ? ' collage-intro--cta' : ''}`} key={i}>{content}</p>
        ))}
      </aside>
      <nav className="collage-keywords collage-keywords--right" aria-label="Word index">
        <p className="collage-keywords__title">World Building</p>
        {KEYWORD_ENTRIES.map(({ label, starIndex, analyticsId, analyticsName }, i, arr) => (
          <React.Fragment key={`${label}-${starIndex}`}>
            <button
              className="collage-keyword"
              onClick={() => focusThenOpen(starIndex)}
              data-analytics-event="collection_item_open"
              data-analytics-item-id={analyticsId}
              data-analytics-item-name={analyticsName}
              data-analytics-placement="right_keywords"
            >
              {label}
            </button>
            {i < arr.length - 1 && <span className="collage-keyword-sep"> · </span>}
          </React.Fragment>
        ))}
      </nav>

      {/* Mobile only — the side margins don't exist on a narrow screen, so this
          repeats the same explanation as a normal page section below the
          hero, reached by scrolling down instead of off to the side. */}
      <section className="collage-mobile-intro" data-analytics-section="collections_mobile_intro">
        {INTRO_PARAGRAPHS.map(({ content, tone }, i) => (
          <p className={tone === 'cta' ? 'collage-mobile-intro__cta' : undefined} key={i}>{content}</p>
        ))}
        <p className="collage-mobile-intro__words">
          {KEYWORD_ENTRIES.map(({ label, starIndex, analyticsId, analyticsName }, i, arr) => (
            <React.Fragment key={`${label}-${starIndex}`}>
              <button
                className="collage-keyword"
                onClick={() => focusThenOpen(starIndex)}
                data-analytics-event="collection_item_open"
                data-analytics-item-id={analyticsId}
                data-analytics-item-name={analyticsName}
                data-analytics-placement="mobile_keywords"
              >
                {label}
              </button>
              {i < arr.length - 1 && <span className="collage-keyword-sep"> · </span>}
            </React.Fragment>
          ))}
        </p>
      </section>

      {selected && (
        <div className="collage-modal-backdrop" onClick={closeModal}>
          <div className={`collage-modal${activeImage ? '' : ' collage-modal--text-only'}`} onClick={e => e.stopPropagation()}>
            <button
              className="collage-modal__close"
              onClick={closeModal}
              data-analytics-event="modal_close"
              data-analytics-label="Collections modal close"
              data-analytics-placement="collections_modal"
            >
              ×
            </button>
            {activeImage && (
              <div
                className={`collage-modal__photo${selectedImages.length > 1 ? ' collage-modal__photo--gallery' : ''}`}
                onTouchStart={handleGalleryTouchStart}
                onTouchEnd={handleGalleryTouchEnd}
              >
                <img src={activeImage} alt={selected.original} decoding="async" />
                {selectedImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="collage-modal__nav collage-modal__nav--prev"
                      onClick={showPreviousImage}
                      aria-label="Show previous photo"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="collage-modal__nav collage-modal__nav--next"
                      onClick={showNextImage}
                      aria-label="Show next photo"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            )}
            <div className="collage-modal__body">
              <h2 className="collage-modal__original">{selected.original}</h2>
              {selectedMeta && <p className="collage-modal__meta">{selectedMeta}</p>}
              {selectedGlance && <p className="collage-modal__glance">{selectedGlance}</p>}
              {selectedSource && <p className="collage-modal__source-label">{selectedSource}</p>}
              <div className="collage-modal__text">
                {selectedTextBlocks.map((block, index) => (
                  <p key={`${selected.original}-text-${index}`} className="collage-modal__desc">
                    {block}
                  </p>
                ))}
              </div>
              {selectedHref && (
                <p className="collage-modal__source">
                  <a href={selectedHref} target="_blank" rel="noopener noreferrer">
                    {selected.kind === 'reference' ? 'Open source' : 'Visit link'}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
