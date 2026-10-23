import React, { Suspense } from 'react';
import RichContent from './RichContent';
import { devPost, useEditContext } from './edit/editContext';

// Loaded only under `npm start`; the built site never includes the editor.
const RichFieldEditor = process.env.NODE_ENV === 'development' ? React.lazy(() => import('./edit/RichFieldEditor')) : null;

export type HtmlStore = 'home' | 'posts' | 'projects' | 'publications';

interface Props {
  store: HtmlStore; // which src/content/<store>.json holds the saved HTML
  storeKey: string; // the entry in it, e.g. a post id, or "bio" / "news.0" for home
  html: string;
  uploadDir: string; // folder under public/pictures for images added here
  className?: string;
  placement: string; // analytics placement for links
}

// A block of formatted text. The site shows the HTML; under `npm start` it is
// a rich editor driven by the floating toolbar and saved back to the store.
const RichField: React.FC<Props> = ({ store, storeKey, html, uploadDir, className = 'essay-post__rich', placement }) => {
  const host = useEditContext();
  if (!RichFieldEditor || !host) return <RichContent html={html} className={className} placement={placement} />;
  return (
    <Suspense fallback={<RichContent html={html} className={className} placement={placement} />}>
      {/* Keyed by entry: moving to another post or project gets a fresh editor. */}
      <RichFieldEditor
        key={`${store}:${storeKey}`}
        id={`${store}:${storeKey}`}
        html={html}
        className={className}
        uploadDir={uploadDir}
        save={async value => { await devPost('/__dev/html', JSON.stringify({ store, key: storeKey, html: value })); }}
      />
    </Suspense>
  );
};

export default RichField;
