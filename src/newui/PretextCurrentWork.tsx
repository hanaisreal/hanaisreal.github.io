import React, { useEffect, useRef } from 'react';
import {
  layoutNextLineRange,
  materializeLineRange,
  prepareWithSegments,
  type LayoutCursor,
} from '@chenglou/pretext';

const TEXT = `Current work: I work at the intersection of HCI and AI, studying how AI systems can support continuity in human experience. I am increasingly interested in the computational methods that enable AI to adapt meaningfully to individual users at scale. My recent work examines how AI can support human expression and awareness in real-world contexts: ToneCanvas explores AI-mediated narrative writing, DeepAware uses experiential simulations to build cybersecurity intuition in older adults, and When Scaffolding Breaks studies classroom dialogues to understand where LLM-based writing support fails and how students recover. Next, I am exploring AI-mediated interventions that shift how people understand themselves and their context, and interactive systems that make AI's interpretation of human experience visible and actionable to users.`;

const FONT = '15px Georgia, serif';
const LINE_HEIGHT = 25;

const PretextCurrentWork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prepared = prepareWithSegments(TEXT, FONT);
    let raf = 0;
    let t0 = performance.now();

    const draw = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const cssWidth = Math.max(320, Math.floor(rect?.width ?? 740));
      const cssHeight = cssWidth < 560 ? 340 : 300;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== Math.floor(cssWidth * dpr) || canvas.height !== Math.floor(cssHeight * dpr)) {
        canvas.width = Math.floor(cssWidth * dpr);
        canvas.height = Math.floor(cssHeight * dpr);
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const now = performance.now();
      const time = (now - t0) / 1000;
      const pointer = pointerRef.current;
      const targetX = pointer.active ? pointer.x : cssWidth * 0.78 + Math.sin(time * 0.55) * 18;
      const targetY = pointer.active ? pointer.y : cssHeight * 0.50 + Math.cos(time * 0.7) * 14;
      const radius = cssWidth < 560 ? 44 : 54;

      const gradient = ctx.createLinearGradient(0, 0, cssWidth, cssHeight);
      gradient.addColorStop(0, '#fbfaf7');
      gradient.addColorStop(1, '#f3f0ea');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      ctx.strokeStyle = 'rgba(37, 99, 235, 0.22)';
      ctx.setLineDash([5, 7]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(targetX, targetY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = FONT;
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#222';

      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
      const padX = cssWidth < 560 ? 18 : 28;
      const colX = padX;
      const colW = cssWidth - padX * 2;
      let y = cssWidth < 560 ? 74 : 68;
      const endY = cssHeight - 28;

      while (y < endY) {
        const dy = y - targetY + LINE_HEIGHT * 0.35;
        let lanes = [{ x: colX, w: colW }];
        if (Math.abs(dy) < radius) {
          const half = Math.sqrt(radius * radius - dy * dy);
          const leftEnd = targetX - half - 14;
          const rightStart = targetX + half + 14;
          lanes = [
            { x: colX, w: Math.max(0, leftEnd - colX) },
            { x: rightStart, w: Math.max(0, colX + colW - rightStart) },
          ].filter((lane) => lane.w > 72);
        }

        if (lanes.length === 0) {
          y += LINE_HEIGHT;
          continue;
        }

        for (const lane of lanes) {
          const range = layoutNextLineRange(prepared, cursor, lane.w);
          if (!range) {
            y = endY;
            break;
          }
          const line = materializeLineRange(prepared, range);
          ctx.globalAlpha = lane.x > targetX ? 0.82 : 0.92;
          ctx.fillText(line.text, lane.x, y);
          cursor = range.end;
        }
        y += LINE_HEIGHT;
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#111827';
      ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('CURRENT WORK', padX, 34);
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(pointer.active ? 'text reflows around your cursor' : 'move cursor to reflow text', padX, 52);

      ctx.fillStyle = '#2563eb';
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        active: true,
      };
    };

    const onPointerMove = (event: PointerEvent) => updatePointer(event.clientX, event.clientY);
    const onPointerLeave = () => { pointerRef.current.active = false; };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <section className="pretext-current" aria-label="Interactive current work summary">
      <canvas ref={canvasRef} className="pretext-current__canvas" />
    </section>
  );
};

export default PretextCurrentWork;
