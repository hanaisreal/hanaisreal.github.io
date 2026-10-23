import React, { useEffect, useRef } from 'react';
import { devPost, useEditContext } from './edit/editContext';

type Tag = 'h1' | 'h2' | 'p' | 'span';

const IS_DEV = process.env.NODE_ENV === 'development';

interface Props {
  file: 'blog' | 'projects' | 'publications' | 'home'; // data file the value lives in
  id: string; // the entry's id or slug (for home, e.g. "news.0")
  field: string; // e.g. "title", "tldr", "date"
  value: string;
  display?: string; // what the site shows, when it differs from the stored value
  as?: Tag;
  className?: string;
}

// A single line of plain text, like a title or a date. Under `npm start` the
// stored value can be typed over in place; Enter or leaving it saves it into
// its data file, Esc puts the old text back.
const PlainField: React.FC<Props> = ({ file, id, field, value, display, as: Tag = 'span', className }) => {
  const host = useEditContext();
  const ref = useRef<HTMLElement | null>(null);
  const fieldId = `${file}:${id}:${field}`;

  useEffect(() => {
    if (!IS_DEV || !host) return undefined;
    return host.register(fieldId, {
      save: async () => {
        const next = (ref.current?.innerText ?? '').replace(/\s+/g, ' ').trim();
        if (next && next !== value) await devPost('/__dev/field', JSON.stringify({ file, id, field, value: next }));
      },
      uploadDir: '',
    });
  }, [host, fieldId, file, id, field, value]);

  if (!IS_DEV || !host) return <Tag className={className}>{display ?? value}</Tag>;

  const editable = host.editing;
  return (
    <Tag
      ref={el => { ref.current = el; }}
      className={[className, editable ? 'is-plain-editable' : ''].filter(Boolean).join(' ') || undefined}
      contentEditable={editable ? 'plaintext-only' : false}
      suppressContentEditableWarning
      spellCheck={editable}
      onFocus={() => host.setActive(fieldId, null)}
      onInput={() => host.markDirty(fieldId)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.currentTarget.blur();
        } else if (e.key === 'Escape') {
          e.currentTarget.innerText = value;
          e.currentTarget.blur();
        }
      }}
      onBlur={() => { host.saveField(fieldId); }}
    >
      {value}
    </Tag>
  );
};

export default PlainField;
