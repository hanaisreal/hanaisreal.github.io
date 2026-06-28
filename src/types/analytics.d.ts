export {};

declare global {
  interface Window {
    __clarityLoaded?: boolean;
    dataLayer?: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
