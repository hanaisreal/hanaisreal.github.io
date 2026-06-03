import React, { useEffect, useRef } from 'react';
import {
  prepareWithSegments,
  layoutNextLine,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from '@chenglou/pretext';

const BODY_FONT = '16px Georgia, "Times New Roman", Times, serif';
const BODY_LINE_HEIGHT = 26;
const MIN_SLOT_WIDTH = 50;
const TEXT_PAD = 18;

const BODY_TEXT =
  `나는 더 편한 인터페이스보다, 사람이 자기 경험을 놓치지 않게 하는 인터페이스가 궁금하다. 이 질문은 단순한 UX 문제가 아니다. 우리가 기술을 통해 무엇을 경험하고 무엇을 잃는지에 관한 것이다.

글을 쓴다는 것은 생각을 발견하는 행위다. 문장을 찾아가는 과정에서 내가 무엇을 말하고 싶은지가 명확해진다. AI가 그 과정을 건너뛰게 해준다면, 우리는 더 많이 쓰면서도 더 적게 발견하게 될 수 있다.

The interfaces we build encode assumptions about what matters, what deserves attention, and what can be safely forgotten. Every design choice is a small argument about the shape of human experience.

추천 시스템이 나를 설명하는 방식은 때로 내가 나 자신을 설명하는 방식보다 정확하다. 하지만 시스템의 나는 행동의 집합이고, 내가 기억하는 나는 의도와 감정과 맥락의 혼합이다. 문제는 시스템이 나를 점점 더 닮아가는 것이 아니라, 내가 시스템이 기억하는 나를 닮아가는 것이다.

나는 인터페이스 연구자로서, 그리고 한 사람으로서 이 질문들을 안고 살아간다. 여기 모인 글들은 그 탐색의 흔적이다.`;

type Interval = { left: number; right: number };
type PositionedLine = { x: number; y: number; text: string };
type CircleObstacle = { cx: number; cy: number; r: number; hPad: number; vPad: number };
type Orb = { x: number; y: number; r: number; vx: number; vy: number };
type OrbColor = [number, number, number];

const ORB_DEFS: { fxFn: (w: number) => number; fyFn: (h: number) => number; r: number; vx: number; vy: number; color: OrbColor }[] = [
  { fxFn: w => w * 0.22, fyFn: h => h * 0.38, r: 80, vx: 30,  vy: 20,  color: [139, 34, 68]   },
  { fxFn: w => w * 0.74, fyFn: h => h * 0.55, r: 65, vx: -22, vy: 28,  color: [200, 90, 115]  },
  { fxFn: w => w * 0.52, fyFn: h => h * 0.18, r: 55, vx: 18,  vy: -25, color: [160, 60, 90]   },
];

function carveTextLineSlots(base: Interval, blocked: Interval[]): Interval[] {
  let slots = [base];
  for (const interval of blocked) {
    const next: Interval[] = [];
    for (const slot of slots) {
      if (interval.right <= slot.left || interval.left >= slot.right) {
        next.push(slot);
        continue;
      }
      if (interval.left > slot.left) next.push({ left: slot.left, right: interval.left });
      if (interval.right < slot.right) next.push({ left: interval.right, right: slot.right });
    }
    slots = next;
  }
  return slots.filter(s => s.right - s.left >= MIN_SLOT_WIDTH);
}

function circleIntervalForBand(
  cx: number, cy: number, r: number,
  bandTop: number, bandBottom: number,
  hPad: number, vPad: number,
): Interval | null {
  const top = bandTop - vPad;
  const bottom = bandBottom + vPad;
  if (top >= cy + r || bottom <= cy - r) return null;
  const minDy = cy >= top && cy <= bottom ? 0 : cy < top ? top - cy : cy - bottom;
  if (minDy >= r) return null;
  return { left: cx - Math.sqrt(r * r - minDy * minDy) - hPad, right: cx + Math.sqrt(r * r - minDy * minDy) + hPad };
}

function layoutColumn(
  prepared: PreparedTextWithSegments,
  startCursor: LayoutCursor,
  x: number, y: number, w: number, h: number,
  lineHeight: number,
  obstacles: CircleObstacle[],
): PositionedLine[] {
  let cursor = startCursor;
  let lineTop = y;
  const lines: PositionedLine[] = [];

  while (lineTop + lineHeight <= y + h) {
    const blocked: Interval[] = [];
    for (const obs of obstacles) {
      const interval = circleIntervalForBand(obs.cx, obs.cy, obs.r, lineTop, lineTop + lineHeight, obs.hPad, obs.vPad);
      if (interval !== null) blocked.push(interval);
    }
    const slots = carveTextLineSlots({ left: x, right: x + w }, blocked);
    if (slots.length === 0) { lineTop += lineHeight; continue; }

    let exhausted = false;
    for (const slot of [...slots].sort((a, b) => a.left - b.left)) {
      const line = layoutNextLine(prepared, cursor, slot.right - slot.left);
      if (line === null) { exhausted = true; break; }
      lines.push({ x: Math.round(slot.left), y: Math.round(lineTop), text: line.text });
      cursor = line.end;
    }
    if (exhausted) break;
    lineTop += lineHeight;
  }
  return lines;
}

const EditorialHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container: HTMLDivElement = containerRef.current;

    let rafId: number | null = null;
    let running = true;
    const created: HTMLElement[] = [];
    const linePool: HTMLSpanElement[] = [];
    let preparedBody: PreparedTextWithSegments | null = null;
    let lastTime: number | null = null;
    let orbs: Orb[] = [];
    let orbEls: HTMLDivElement[] = [];

    function syncPool(count: number) {
      while (linePool.length < count) {
        const el = document.createElement('span');
        el.style.cssText = 'position:absolute;white-space:nowrap;pointer-events:none;color:#1a1212;';
        el.style.font = BODY_FONT;
        el.style.lineHeight = `${BODY_LINE_HEIGHT}px`;
        container.appendChild(el);
        linePool.push(el);
        created.push(el);
      }
      for (let i = 0; i < linePool.length; i++) {
        linePool[i]!.style.display = i < count ? '' : 'none';
      }
    }

    function frame(now: number) {
      if (!running || !preparedBody) return;
      const W = container.offsetWidth;
      const H = container.offsetHeight;
      if (W === 0 || H === 0) { rafId = requestAnimationFrame(frame); return; }

      const dt = Math.min((now - (lastTime ?? now)) / 1000, 0.05);
      lastTime = now;

      for (const orb of orbs) {
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
        if (orb.x - orb.r < 0)   { orb.x = orb.r;       orb.vx =  Math.abs(orb.vx); }
        if (orb.x + orb.r > W)   { orb.x = W - orb.r;   orb.vx = -Math.abs(orb.vx); }
        if (orb.y - orb.r < 0)   { orb.y = orb.r;       orb.vy =  Math.abs(orb.vy); }
        if (orb.y + orb.r > H)   { orb.y = H - orb.r;   orb.vy = -Math.abs(orb.vy); }
      }

      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const a = orbs[i]!, b = orbs[j]!;
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.r + b.r + 20;
          if (dist >= minDist || dist < 0.1) continue;
          const nx = dx / dist, ny = dy / dist;
          const f = (minDist - dist) * 0.8;
          a.vx -= nx * f * dt; a.vy -= ny * f * dt;
          b.vx += nx * f * dt; b.vy += ny * f * dt;
        }
      }

      const obstacles: CircleObstacle[] = orbs.map(o => ({ cx: o.x, cy: o.y, r: o.r, hPad: 12, vPad: 4 }));
      const lines = layoutColumn(
        preparedBody,
        { segmentIndex: 0, graphemeIndex: 0 },
        TEXT_PAD, TEXT_PAD, W - TEXT_PAD * 2, H - TEXT_PAD * 2,
        BODY_LINE_HEIGHT, obstacles,
      );

      syncPool(lines.length);
      for (let i = 0; i < lines.length; i++) {
        const el = linePool[i]!;
        const ln = lines[i]!;
        el.textContent = ln.text;
        el.style.left = `${ln.x}px`;
        el.style.top = `${ln.y}px`;
      }

      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i]!, el = orbEls[i]!;
        el.style.left = `${o.x - o.r}px`;
        el.style.top  = `${o.y - o.r}px`;
        el.style.width  = `${o.r * 2}px`;
        el.style.height = `${o.r * 2}px`;
      }

      rafId = requestAnimationFrame(frame);
    }

    async function init() {
      await document.fonts.ready;
      if (!running) return;

      preparedBody = prepareWithSegments(BODY_TEXT, BODY_FONT);

      const W = container.offsetWidth || 700;
      const H = container.offsetHeight || 480;

      orbs = ORB_DEFS.map(d => ({ x: d.fxFn(W), y: d.fyFn(H), r: d.r, vx: d.vx, vy: d.vy }));
      orbEls = ORB_DEFS.map(d => {
        const el = document.createElement('div');
        el.style.cssText = 'position:absolute;border-radius:50%;pointer-events:none;';
        const [r, g, b] = d.color;
        el.style.background = `radial-gradient(circle at 35% 35%, rgba(${r},${g},${b},0.38), rgba(${r},${g},${b},0.14) 55%, transparent 72%)`;
        el.style.boxShadow   = `0 0 55px 12px rgba(${r},${g},${b},0.22), 0 0 110px 35px rgba(${r},${g},${b},0.09)`;
        container.appendChild(el);
        created.push(el);
        return el;
      });

      rafId = requestAnimationFrame(frame);
    }

    init();

    const onResize = () => { lastTime = null; };
    window.addEventListener('resize', onResize);
    return () => {
      running = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      created.forEach(el => el.remove());
    };
  }, []);

  return <div ref={containerRef} className="editorial-hero" />;
};

export default EditorialHero;
