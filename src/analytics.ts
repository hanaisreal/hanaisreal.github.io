export type AnalyticsValue = string | number | boolean | null | undefined;

type AnalyticsParams = Record<string, AnalyticsValue>;

export interface AnalyticsElementData {
  element: HTMLElement;
  eventName: string;
  label?: string;
  destination?: string;
  itemId?: string;
  itemName?: string;
  placement?: string;
}

const MIN_SECTION_ENGAGEMENT_MS = 2000;

function normalizeParams(params: AnalyticsParams): Record<string, string | number | boolean> {
  return Object.entries(params).reduce<Record<string, string | number | boolean>>((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

function canTrack(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

export function getAnalyticsPath(pathname: string, search = ''): string {
  return `${pathname}${search}` || '/';
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}): void {
  if (!canTrack()) return;
  window.gtag('event', eventName, normalizeParams(params));
}

export function trackPageView(path: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackSectionView(sectionName: string, path: string): void {
  trackEvent('section_view', {
    section_name: sectionName,
    page_path: path,
  });
}

export function trackSectionEngagement(sectionName: string, path: string, durationMs: number): void {
  if (durationMs < MIN_SECTION_ENGAGEMENT_MS) return;

  trackEvent('section_engagement', {
    section_name: sectionName,
    page_path: path,
    engagement_time_sec: Math.max(1, Math.round(durationMs / 1000)),
  });
}

export function installClarity(projectId: string): void {
  if (typeof document === 'undefined') return;

  const normalizedProjectId = projectId.trim();
  if (!normalizedProjectId || window.__clarityLoaded) return;

  const existingScript = document.querySelector('script[data-analytics-provider="clarity"]');
  if (existingScript) {
    window.__clarityLoaded = true;
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${normalizedProjectId}`;
  script.dataset.analyticsProvider = 'clarity';
  document.head.appendChild(script);
  window.__clarityLoaded = true;
}

export function getElementAnalyticsData(target: EventTarget | null): AnalyticsElementData | null {
  if (!(target instanceof Element)) return null;

  const element = target.closest<HTMLElement>('[data-analytics-event]');
  if (!element?.dataset.analyticsEvent) return null;

  return {
    element,
    eventName: element.dataset.analyticsEvent,
    label: element.dataset.analyticsLabel,
    destination: element.dataset.analyticsDestination,
    itemId: element.dataset.analyticsItemId,
    itemName: element.dataset.analyticsItemName,
    placement: element.dataset.analyticsPlacement,
  };
}
