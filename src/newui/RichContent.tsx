import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { decorateLinks } from './markdown';

// Renders a post body saved by the blog editor. Internal links route without a reload.
const RichContent: React.FC<{ html: string; placement: string; className?: string }> = ({ html, placement, className = 'essay-post__rich' }) => {
  const navigate = useNavigate();
  const decorated = useMemo(() => decorateLinks(html, placement), [html, placement]);
  return (
    <div
      className={className}
      onClick={e => {
        const link = (e.target as HTMLElement).closest('a');
        if (link?.dataset.internal) {
          e.preventDefault();
          navigate(link.getAttribute('href') || '/');
        }
      }}
      dangerouslySetInnerHTML={{ __html: decorated }}
    />
  );
};

export default RichContent;
