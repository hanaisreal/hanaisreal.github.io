import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Masthead from '../newui/Masthead';
import PublicationsSection from '../newui/PublicationsSection';
import ProjectsSection from '../newui/ProjectsSection';
import ResearchEssay from '../newui/research-canvas/ResearchEssay';
import '../newui/newPortfolio.css';
import '../newui/research-canvas/researchMap.css';

type OpeningState = {
  path: string;
  rect: { left: number; top: number; width: number; height: number };
  viewport: { width: number; height: number };
};

const TRANSITION_MS = 760;
const PANEL_TRANSITION = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};
const RIBBON_TRANSITION = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
  delay: 0.08,
};

const ResearchPage: React.FC = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [opening, setOpening] = React.useState<OpeningState | null>(null);

  const handleOpen = React.useCallback((path: string, rect: DOMRect) => {
    if (opening) return;
    if (reduceMotion) {
      navigate(path);
      return;
    }

    setOpening({
      path,
      rect: {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }, [navigate, opening, reduceMotion]);

  React.useEffect(() => {
    if (!opening) return;

    const timer = window.setTimeout(() => {
      navigate(opening.path);
    }, TRANSITION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [navigate, opening]);

  return (
    <div>
      <Masthead />
      <main className="page page--publication page--research-sheet">
        <header className="page-intro">
          <h1 className="page-intro__title">Research</h1>
          <p className="page-intro__desc">
            Toward personalized AI agents that accurately capture intent and persistently
            preserve context.
          </p>
        </header>
        <ResearchEssay />
        <hr className="sec-rule" />
        <PublicationsSection onOpen={handleOpen} />
        <hr className="sec-rule" />
        <ProjectsSection onOpen={handleOpen} />
      </main>
      <AnimatePresence>
        {opening && (
          <motion.div
            className="unwrap-transition"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="unwrap-transition__panel"
              style={{
                width: opening.viewport.width,
                height: opening.viewport.height,
                transformOrigin: 'top left',
              }}
              initial={{
                x: opening.rect.left,
                y: opening.rect.top,
                scaleX: opening.rect.width / opening.viewport.width,
                scaleY: opening.rect.height / opening.viewport.height,
              }}
              animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={PANEL_TRANSITION}
            >
              <motion.span
                className="unwrap-transition__ribbon unwrap-transition__ribbon--left"
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: '-112%', rotate: -7, opacity: 0.18 }}
                transition={RIBBON_TRANSITION}
              />
              <motion.span
                className="unwrap-transition__ribbon unwrap-transition__ribbon--right"
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: '112%', rotate: 7, opacity: 0.18 }}
                transition={RIBBON_TRANSITION}
              />
              <motion.span
                className="unwrap-transition__knot"
                initial={{ scale: 1, opacity: 1, rotate: 0 }}
                animate={{ scale: 0.35, opacity: 0, rotate: 18 }}
                transition={{ duration: 0.34, ease: [0.2, 0.8, 0.2, 1], delay: 0.06 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="site-footer">
        <span>Hana Oh</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default ResearchPage;
