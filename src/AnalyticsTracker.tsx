import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  getAnalyticsPath,
  getElementAnalyticsData,
  installClarity,
  trackEvent,
  trackPageView,
  trackSectionEngagement,
  trackSectionView,
} from './analytics';

const SECTION_SELECTOR = '[data-analytics-section]';
const SECTION_ACTIVE_THRESHOLD = 0.35;

const AnalyticsTracker: React.FC = () => {
  const location = useLocation();
  const seenSectionsRef = React.useRef(new Set<string>());
  const sectionRatiosRef = React.useRef(new Map<string, number>());
  const activeSectionRef = React.useRef<string | null>(null);
  const activeSectionStartedAtRef = React.useRef<number | null>(null);
  const latestPathRef = React.useRef(getAnalyticsPath(location.pathname, location.search));

  const markSectionViewed = React.useCallback((sectionName: string) => {
    if (seenSectionsRef.current.has(sectionName)) return;

    seenSectionsRef.current.add(sectionName);
    trackSectionView(sectionName, latestPathRef.current);
  }, []);

  const flushActiveSection = React.useCallback(() => {
    const activeSection = activeSectionRef.current;
    const startedAt = activeSectionStartedAtRef.current;

    if (!activeSection || startedAt === null) return;

    trackSectionEngagement(activeSection, latestPathRef.current, performance.now() - startedAt);
    activeSectionRef.current = null;
    activeSectionStartedAtRef.current = null;
  }, []);

  const setActiveSection = React.useCallback((nextSection: string | null) => {
    if (nextSection === activeSectionRef.current) return;

    flushActiveSection();

    if (!nextSection) return;

    activeSectionRef.current = nextSection;
    activeSectionStartedAtRef.current = performance.now();
    markSectionViewed(nextSection);
  }, [flushActiveSection, markSectionViewed]);

  const updateActiveSection = React.useCallback(() => {
    let strongestSection: string | null = null;
    let strongestRatio = 0;

    sectionRatiosRef.current.forEach((ratio, sectionName) => {
      if (ratio > strongestRatio) {
        strongestRatio = ratio;
        strongestSection = sectionName;
      }
    });

    if (strongestRatio >= SECTION_ACTIVE_THRESHOLD) {
      setActiveSection(strongestSection);
      return;
    }

    setActiveSection(strongestRatio > 0 ? strongestSection : null);
  }, [setActiveSection]);

  React.useEffect(() => {
    installClarity(process.env.REACT_APP_CLARITY_PROJECT_ID || '');
  }, []);

  React.useEffect(() => {
    const path = getAnalyticsPath(location.pathname, location.search);
    latestPathRef.current = path;
    seenSectionsRef.current.clear();
    sectionRatiosRef.current.clear();
    setActiveSection(null);
    trackPageView(path);
  }, [location.pathname, location.search, setActiveSection]);

  React.useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const sectionName = entry.target instanceof HTMLElement
            ? entry.target.dataset.analyticsSection
            : undefined;

          if (!sectionName) return;

          sectionRatiosRef.current.set(sectionName, entry.isIntersecting ? entry.intersectionRatio : 0);

          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            markSectionViewed(sectionName);
          }
        });

        updateActiveSection();
      },
      { threshold: [0, 0.15, 0.35, 0.5, 0.75, 1] }
    );

    sections.forEach(section => {
      sectionRatiosRef.current.set(section.dataset.analyticsSection || '', 0);
      observer.observe(section);
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        flushActiveSection();
        return;
      }

      updateActiveSection();
      if (activeSectionRef.current && activeSectionStartedAtRef.current === null) {
        activeSectionStartedAtRef.current = performance.now();
      }
    };

    const handlePageHide = () => flushActiveSection();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      observer.disconnect();
      flushActiveSection();
    };
  }, [flushActiveSection, location.pathname, location.search, markSectionViewed, updateActiveSection]);

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const analyticsData = getElementAnalyticsData(event.target);
      if (!analyticsData) return;

      const sectionName = analyticsData.element.closest<HTMLElement>(SECTION_SELECTOR)?.dataset.analyticsSection;

      trackEvent(analyticsData.eventName, {
        page_path: latestPathRef.current,
        section_name: sectionName,
        label: analyticsData.label,
        destination: analyticsData.destination,
        item_id: analyticsData.itemId,
        item_name: analyticsData.itemName,
        placement: analyticsData.placement,
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
};

export default AnalyticsTracker;
