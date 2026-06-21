import React, { useState, useEffect, useRef } from 'react';
import Masthead from '../newui/Masthead';
import { collections, type CollectionItem } from '../components/data/collectionsData';
import '../newui/newPortfolio.css';
import './CollectionsPage.css';

const BASE = process.env.PUBLIC_URL;
type Lang = 'ko' | 'en';

const S = (file: string) => `${BASE}/pictures/worldbuilding/${file}`;

// background.png's aspect ratio — needed whenever we convert between left/top
// (% of width vs. % of height) so circles and ellipses read as true shapes.
const IMG_ASPECT = 1596 / 2683;
const BG_NATIVE_WIDTH = 1596; // background.png's actual pixel width
const BG_MAX_UPSCALE = 1.4;   // never render it wider than this × native

// The big circle traced by the dust band itself — fit through points sampled
// along the band's centerline (center 54%, 39%, radius 31, in width-equivalent
// %). The dark planet sits right on this circle's edge, not at its center.
// Bubbles don't each spin on their own separate orbit — they all travel
// together along this one shared circle, evenly spaced, so a bubble sweeps
// into view (near the planet, where it crosses) and back out as it goes
// around. Finding one in the zoomed frame is meant to feel like a small
// stroke of luck, not a guarantee.
const RING = {
  cx: 80, cy: 37,   // center of the big circle (not the planet itself)
  a: 77, b: 13,     // equal axes — a true circle
  rotationDeg: 43,
};

const ZOOM_FOCUS = { x: 84, y: 34 }; // dive toward the planet, where the ring passes closest
// Vertical anchor for the outer frame's growth — keep X centered (needed for
// guaranteed full-width coverage) but bias Y up toward the star band/spiral,
// so growing the frame holds steady on the sky and pushes the path/ground
// out of view faster, instead of growing evenly in both directions.
const FRAME_ORIGIN_Y = 18;

const ORBIT_PERIOD = 180; // seconds for one full lap — slow, so sightings stay rare

function pointOnRing(phi: number) {
  const rot = (RING.rotationDeg * Math.PI) / 180;
  const lx = RING.a * Math.cos(phi);
  const ly = RING.b * Math.sin(phi);
  const rx = lx * Math.cos(rot) - ly * Math.sin(rot);
  const ry = lx * Math.sin(rot) + ly * Math.cos(rot);
  // depth: -1 = far side of the tilt (recedes, as if behind the planet),
  // +1 = near side (toward the viewer). This is what actually reads as 3D —
  // the ellipse shape alone (a flat 2D oval) doesn't sell perspective on its own.
  const depth = Math.sin(phi);
  return { cx: RING.cx + rx, cy: RING.cy + ry * IMG_ASPECT, depth };
}

const DEPTH_NEAR_SCALE = 1.4; // size multiplier on the near side
const DEPTH_FAR_SCALE = 0.5;  // size multiplier on the far side
const depthScale = (depth: number) => DEPTH_FAR_SCALE + (DEPTH_NEAR_SCALE - DEPTH_FAR_SCALE) * ((depth + 1) / 2);
const depthOpacity = (depth: number) => 0.5 + 0.5 * ((depth + 1) / 2);
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

// Scattered in a loose band around RING (0.55x-1.45x its radius, not exactly
// on it) so the dust the bubbles ride through visibly glitters. Each twinkles
// on its own random timing so they don't all pulse in sync.
const SPARKLE_COUNT = 40;
const SPARKLES = Array.from({ length: SPARKLE_COUNT }, () => {
  const phi = Math.random() * Math.PI * 2;
  const radiusFactor = 0.55 + Math.random() * 0.9;
  const rot = (RING.rotationDeg * Math.PI) / 180;
  const a = RING.a * radiusFactor;
  const b = RING.b * radiusFactor;
  const lx = a * Math.cos(phi);
  const ly = b * Math.sin(phi);
  const rx = lx * Math.cos(rot) - ly * Math.sin(rot);
  const ry = lx * Math.sin(rot) + ly * Math.cos(rot);
  return {
    left: RING.cx + rx,
    top: RING.cy + ry * IMG_ASPECT,
    size: 2 + Math.random() * 2.5,
    delay: Math.random() * 5,
    duration: 1.6 + Math.random() * 2.6,
  };
});

const PHOTO_ORBITS = collections.map((_, i) => ({
  phase0: (i / collections.length) * Math.PI * 2,
  width: 2 + (i % 5) * 0.1, // slight size variety, dust-small
}));

const PHOTO_STARS = collections.map((item, i) => ({ item, orbit: PHOTO_ORBITS[i] }));

// Same order/index as PHOTO_STARS — the index is what lets a keyword chip
// reach back to its bubble's photoRefs slot.
const KEYWORD_ENTRIES = collections.map((item, index) => ({ item, index }));

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
  const [lang, setLang] = useState<Lang>('ko');
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
  const photoRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusedIndex = useRef<number | null>(null);
  const focusStart = useRef<number | null>(null);
  const focusPhiFrom = useRef(0);
  const focusPhiTo = useRef(0);
  const orbitStart = useRef(0);
  const morphRef = useRef<HTMLDivElement>(null);
  const morphImgRef = useRef<HTMLImageElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);

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
  const focusThenOpen = (item: CollectionItem, index: number) => {
    const phaseNow = (performance.now() - orbitStart.current) / 1000;
    const currentPhi = PHOTO_ORBITS[index].phase0 + (2 * Math.PI / ORBIT_PERIOD) * phaseNow;
    let diff = (Math.PI / 2 - currentPhi) % (2 * Math.PI);
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;
    focusPhiFrom.current = currentPhi;
    focusPhiTo.current = currentPhi + diff;

    focusedIndex.current = index;
    focusStart.current = performance.now();
    const bubbleEl = photoRefs.current[index];
    bubbleEl?.classList.add('collage-photo-star--focused');

    const dimEl = dimRef.current;
    if (dimEl) {
      dimEl.style.transition = `opacity ${FOCUS_RAMP_MS + MORPH_MS}ms ease`;
      dimEl.classList.add('collage-dim--active');
    }

    window.setTimeout(() => {
      const morphEl = morphRef.current;
      const imgEl = morphImgRef.current;
      if (bubbleEl && morphEl && imgEl && item.src) {
        const rect = bubbleEl.getBoundingClientRect();
        imgEl.src = item.src;
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
      setSelected(item);
    }, FOCUS_RAMP_MS + MORPH_MS);
  };

  // Quick fade back to normal brightness — short, snappy, unlike the long
  // continuous darken-while-growing transition used when opening.
  const closeModal = () => {
    if (dimRef.current) {
      dimRef.current.style.transition = 'opacity 0.25s ease';
      dimRef.current.classList.remove('collage-dim--active');
    }
    setSelected(null);
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

  // Mobile: use device gyroscope
  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      setTilt({
        x: Math.max(-0.5, Math.min(0.5, (e.gamma ?? 0) / 30)),
        y: Math.max(-0.5, Math.min(0.5, ((e.beta ?? 0) - 45) / 30)),
      });
    };
    window.addEventListener('deviceorientation', handler);
    return () => window.removeEventListener('deviceorientation', handler);
  }, []);

  // Carry all bubbles together around RING, evenly spaced, instead of each
  // spinning independently
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    orbitStart.current = start;
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      PHOTO_ORBITS.forEach(({ phase0, width }, i) => {
        const el = photoRefs.current[i];
        if (!el) return;
        let phi = phase0 + (2 * Math.PI / ORBIT_PERIOD) * t;
        const isFocused = focusedIndex.current === i && focusStart.current !== null;
        let extraBoost = 1;
        if (isFocused) {
          // Keep riding the ring instead of teleporting to frame-center — just
          // rotate (the short way, whichever direction that is) to phi = π/2,
          // the near/front point, where depth's already maxed — and ease in
          // extra size on top of that as it arrives.
          const ft = Math.min(1, (now - focusStart.current!) / FOCUS_RAMP_MS);
          const eased = ft * ft * (3 - 2 * ft);
          phi = focusPhiFrom.current + (focusPhiTo.current - focusPhiFrom.current) * eased;
          extraBoost = 1 + eased * (FOCUS_SCALE - 1);
        }
        const { cx, cy, depth } = pointOnRing(phi);
        const w = width * depthScale(depth) * extraBoost;
        const opacity = isFocused ? 1 : depthOpacity(depth);
        const zIndex = isFocused ? 999 : depthZ(depth);
        el.style.left = `${cx - w / 2}%`;
        el.style.top = `${cy - (w * IMG_ASPECT) / 2}%`;
        el.style.width = `${w}%`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
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

      <main className="collage-main">
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
              style={{
                position: 'absolute',
                left: `${MOON.cx - MOON.width / 2}%`,
                top: `${MOON.cy - (MOON.width * MOON_ASPECT * IMG_ASPECT) / 2}%`,
                width: `${MOON.width}%`,
                zIndex: MOON_Z,
              }}
            />

            {/* Twinkling dust scattered along the ring band */}
            {SPARKLES.map((s, i) => (
              <span
                key={i}
                className="collage-sparkle"
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  animationDelay: `${s.delay}s`,
                  animationDuration: `${s.duration}s`,
                }}
              />
            ))}

            {/* Photos riding the ring around the dark planet — revealed as you zoom toward ZOOM_FOCUS.
                Scale/opacity/z-index from depth fake the 3D tilt: far side recedes, near side pops forward. */}
            {PHOTO_STARS.map(({ item, orbit }, i) => {
              const { cx, cy, depth } = pointOnRing(orbit.phase0);
              const w = orbit.width * depthScale(depth);
              const left = cx - w / 2;
              const top = cy - (w * IMG_ASPECT) / 2;
              return (
                <button
                  key={item.original}
                  ref={el => { photoRefs.current[i] = el; }}
                  type="button"
                  className="collage-photo-star"
                  style={{
                    left: `${left}%`, top: `${top}%`, width: `${w}%`,
                    opacity: depthOpacity(depth),
                    zIndex: depthZ(depth),
                  }}
                  onClick={() => focusThenOpen(item, i)}
                  aria-label={item.original}
                >
                  {item.src && <img src={item.src} alt="" draggable={false} />}
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
        <img ref={morphImgRef} alt="" draggable={false} />
      </div>

      {/* Keyword index in the margins outside the frame — run together like
          running prose, words joined by middots, no chip/box around them.
          Clicking one pulses its bubble out in the ring (same index as
          photoRefs) before the card opens, so it reads as "that lit up". */}
      <nav className="collage-keywords collage-keywords--left" aria-label="Word index">
        <p className="collage-intro">
          This is my worldbuilding project — a place to keep the things I love:
          pictures, words, phrases, books, all gathered in one spot. I went
          back and forth on how to hold onto them, and this is where I
          landed. It's not finished. I don't think it ever will be. I'll
          just keep shifting and adding to it.
        </p>
        <p className="collage-intro">
          The photos are pulled from Pinterest and collaged together by me.
          I have marked the ones I took myself with a camera, and the ones I drew myself with a pen or pencil.
        </p>
        <p className="collage-intro">
          To look around: zoom in and click on the photos drifting through
          the band of stars, or click any of the words in the margins. If
          this makes you want to build a world of your own, you're welcome
          to. There's something quietly joyful about building it up, one
          piece at a time.
        </p>
        {KEYWORD_ENTRIES.slice(0, Math.ceil(KEYWORD_ENTRIES.length / 2)).map(({ item, index }, i, arr) => (
          <React.Fragment key={item.original}>
            <button className="collage-keyword" onClick={() => focusThenOpen(item, index)}>
              {item.original}
            </button>
            {i < arr.length - 1 && <span className="collage-keyword-sep"> · </span>}
          </React.Fragment>
        ))}
      </nav>
      <nav className="collage-keywords collage-keywords--right" aria-label="Word index">
        {KEYWORD_ENTRIES.slice(Math.ceil(KEYWORD_ENTRIES.length / 2)).map(({ item, index }, i, arr) => (
          <React.Fragment key={item.original}>
            <button className="collage-keyword" onClick={() => focusThenOpen(item, index)}>
              {item.original}
            </button>
            {i < arr.length - 1 && <span className="collage-keyword-sep"> · </span>}
          </React.Fragment>
        ))}
      </nav>

      {selected && (
        <div className="collage-modal-backdrop" onClick={closeModal}>
          <div className="collage-modal" onClick={e => e.stopPropagation()}>
            <button className="collage-modal__close" onClick={closeModal}>×</button>
            {selected.src && (
              <div className="collage-modal__photo">
                <img src={selected.src} alt={selected.original} />
              </div>
            )}
            <div className="collage-modal__body">
              <span className="collage-modal__lang">{selected.language}</span>
              <h2 className="collage-modal__original">{selected.original}</h2>
              <p className="collage-modal__korean">{selected.korean}</p>
              <p className="collage-modal__desc">
                {lang === 'en' && selected.descriptionEn ? selected.descriptionEn : selected.description}
              </p>
              <p className="collage-modal__curator">
                Found this word in the book — <span lang="ko">당신의 마음에 이름을 붙인다면</span>.
              </p>
              <p className="collage-modal__source">
                📖 by <em>Mariya Ivashkina, trans. Ji-eun Kim</em>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
