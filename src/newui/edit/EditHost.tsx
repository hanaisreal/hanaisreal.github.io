import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEditorState, type Editor } from '@tiptap/react';
import {
  MdDragIndicator, MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight,
  MdFormatBold, MdFormatClear, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatQuote,
  MdFormatUnderlined, MdHorizontalRule, MdImage, MdLink, MdLinkOff, MdRedo, MdStrikethroughS, MdUndo,
  MdVerticalAlignCenter, MdVisibility, MdEdit,
} from 'react-icons/md';
import { EditContext, type EditContextValue, type FieldHandle, devPost } from './editContext';
import type { AccentKind } from './extensions';

// Dev-only (`npm start`): wraps the app, keeps track of the editable fields on
// the page, and shows one floating toolbar that formats whichever field has
// focus. The toolbar can be dragged by its grip; its position is remembered.
// Fields save themselves when they lose focus; ⌘S saves everything pending.

const FONT_SIZES = ['12px', '14px', '15px', '16px', '18px', '20px', '24px', '28px', '32px'];
const SWATCHES = ['#2e221a', '#7a3518', '#2b5dab', '#3c7a3c', '#b23a48', '#8e6418', '#6b4fa0', '#7a7a7a'];
const HIGHLIGHTS = ['#fff3a3', '#ffd9d9', '#d9f0d9', '#d9e8ff', '#f0e0ff'];
const POSITION_KEY = 'edit-toolbar-position';
const ACCENT_KINDS: { kind: AccentKind; label: string }[] = [
  { kind: 'marker', label: 'Marker' },
  { kind: 'wavy', label: 'Wavy underline' },
  { kind: 'double', label: 'Double underline' },
  { kind: 'circle', label: 'Circle' },
];
const ACCENT_COLORS = ['#f6c945', '#f29bb5', '#6fcf9f', '#7fb2f0', '#e07b39'];

const readPosition = (): { x: number; y: number } | null => {
  try {
    const saved = JSON.parse(localStorage.getItem(POSITION_KEY) || 'null');
    return saved && typeof saved.x === 'number' && typeof saved.y === 'number' ? saved : null;
  } catch {
    return null;
  }
};

const Btn: React.FC<{
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, active, disabled, onClick, children }) => (
  <button
    type="button"
    className={`editor-btn${active ? ' is-active' : ''}`}
    title={label}
    aria-label={label}
    aria-pressed={active}
    disabled={disabled}
    onMouseDown={e => e.preventDefault()}
    onClick={onClick}
  >
    {children}
  </button>
);

// Playful emphasis: a small menu of accent styles, each in a few colours.
const AccentMenu: React.FC<{ editor: Editor; active: boolean }> = ({ editor, active }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return undefined;
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  return (
    <span className="accent-menu" ref={ref}>
      <Btn label="Accent (marker, wavy, double, circle)" active={active || open} onClick={() => setOpen(v => !v)}>
        <span className="accent" data-accent="marker" style={{ '--accent': ACCENT_COLORS[0] } as React.CSSProperties}>Ab</span>
      </Btn>
      {open && (
        <span className="accent-menu__panel" role="menu">
          {ACCENT_KINDS.map(({ kind, label }) => (
            <span key={kind} className="accent-menu__row">
              <span className="accent-menu__label">{label}</span>
              {ACCENT_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  className="accent-menu__cell"
                  aria-label={`${label}, ${color}`}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => { editor.chain().focus().setAccent({ kind, color }).run(); setOpen(false); }}
                >
                  <span className="accent" data-accent={kind} style={{ '--accent': color } as React.CSSProperties}>ab</span>
                </button>
              ))}
            </span>
          ))}
          <button
            type="button"
            className="accent-menu__remove"
            onMouseDown={e => e.preventDefault()}
            onClick={() => { editor.chain().focus().unsetAccent().run(); setOpen(false); }}
          >
            Remove accent
          </button>
        </span>
      )}
    </span>
  );
};

// Formatting controls for the focused rich field.
const FormatControls: React.FC<{ editor: Editor; onPickImage: () => void }> = ({ editor, onPickImage }) => {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      block: e.isActive('heading', { level: 2 }) ? 'h2' : e.isActive('heading', { level: 3 }) ? 'h3' : 'p',
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      underline: e.isActive('underline'),
      strike: e.isActive('strike'),
      link: e.isActive('link'),
      accent: e.isActive('accent'),
      bullet: e.isActive('bulletList'),
      ordered: e.isActive('orderedList'),
      quote: e.isActive('blockquote'),
      align: (['left', 'center', 'right', 'justify'] as const).find(a => e.isActive({ textAlign: a })) ?? 'left',
      fontSize: (e.getAttributes('textStyle').fontSize as string | undefined) ?? '',
      color: (e.getAttributes('textStyle').color as string | undefined) ?? '',
      media: e.isActive('image') ? 'image' : e.isActive('video') ? 'video' : null,
      float: (e.getAttributes(e.isActive('video') ? 'video' : 'image').float as string | null) ?? null,
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });
  const chain = () => editor.chain().focus();

  const setLink = () => {
    const current = editor.getAttributes('link').href as string | undefined;
    const href = window.prompt('Link URL (https://… or /path)', current ?? 'https://');
    if (href === null) return;
    if (!href.trim()) chain().extendMarkRange('link').unsetLink().run();
    else chain().extendMarkRange('link').setLink({ href: href.trim() }).run();
  };
  const setFloat = (float: string | null) => {
    if (s.media) chain().updateAttributes(s.media, { float }).run();
  };

  return (
    <>
      <Btn label="Undo (⌘Z)" disabled={!s.canUndo} onClick={() => chain().undo().run()}><MdUndo /></Btn>
      <Btn label="Redo (⇧⌘Z)" disabled={!s.canRedo} onClick={() => chain().redo().run()}><MdRedo /></Btn>
      <span className="editor-sep" />
      <select
        className="editor-select"
        title="Text style"
        value={s.block}
        onChange={e => {
          const v = e.target.value;
          if (v === 'p') chain().setParagraph().run();
          else chain().toggleHeading({ level: v === 'h2' ? 2 : 3 }).run();
        }}
      >
        <option value="p">Paragraph</option>
        <option value="h2">Heading</option>
        <option value="h3">Subheading</option>
      </select>
      <select
        className="editor-select"
        title="Font size"
        value={s.fontSize}
        onChange={e => (e.target.value ? chain().setFontSize(e.target.value).run() : chain().unsetFontSize().run())}
      >
        <option value="">Size</option>
        {FONT_SIZES.map(size => <option key={size} value={size}>{parseInt(size, 10)}</option>)}
      </select>
      <span className="editor-sep" />
      <Btn label="Bold (⌘B)" active={s.bold} onClick={() => chain().toggleBold().run()}><MdFormatBold /></Btn>
      <Btn label="Italic (⌘I)" active={s.italic} onClick={() => chain().toggleItalic().run()}><MdFormatItalic /></Btn>
      <Btn label="Underline (⌘U)" active={s.underline} onClick={() => chain().toggleUnderline().run()}><MdFormatUnderlined /></Btn>
      <Btn label="Strikethrough" active={s.strike} onClick={() => chain().toggleStrike().run()}><MdStrikethroughS /></Btn>
      <span className="editor-sep" />
      <span className="editor-swatches" title="Text color">
        {SWATCHES.map(c => (
          <button
            key={c}
            type="button"
            className={`editor-swatch${s.color === c ? ' is-active' : ''}`}
            style={{ background: c }}
            aria-label={`Text color ${c}`}
            onMouseDown={e => e.preventDefault()}
            onClick={() => chain().setColor(c).run()}
          />
        ))}
        <input
          type="color"
          className="editor-color"
          title="Custom text color"
          value={s.color && s.color.startsWith('#') ? s.color : '#2e221a'}
          onChange={e => chain().setColor(e.target.value).run()}
        />
        <Btn label="Default color" onClick={() => chain().unsetColor().run()}><span className="editor-x">A</span></Btn>
      </span>
      <span className="editor-swatches" title="Highlight">
        {HIGHLIGHTS.map(c => (
          <button
            key={c}
            type="button"
            className="editor-swatch editor-swatch--hl"
            style={{ background: c }}
            aria-label={`Highlight ${c}`}
            onMouseDown={e => e.preventDefault()}
            onClick={() => chain().toggleHighlight({ color: c }).run()}
          />
        ))}
      </span>
      <AccentMenu editor={editor} active={s.accent} />
      <span className="editor-sep" />
      <Btn label="Align left" active={s.align === 'left'} onClick={() => chain().setTextAlign('left').run()}><MdFormatAlignLeft /></Btn>
      <Btn label="Align center" active={s.align === 'center'} onClick={() => chain().setTextAlign('center').run()}><MdFormatAlignCenter /></Btn>
      <Btn label="Align right" active={s.align === 'right'} onClick={() => chain().setTextAlign('right').run()}><MdFormatAlignRight /></Btn>
      <Btn label="Justify" active={s.align === 'justify'} onClick={() => chain().setTextAlign('justify').run()}><MdFormatAlignJustify /></Btn>
      <span className="editor-sep" />
      <Btn label="Bulleted list" active={s.bullet} onClick={() => chain().toggleBulletList().run()}><MdFormatListBulleted /></Btn>
      <Btn label="Numbered list" active={s.ordered} onClick={() => chain().toggleOrderedList().run()}><MdFormatListNumbered /></Btn>
      <Btn label="Quote" active={s.quote} onClick={() => chain().toggleBlockquote().run()}><MdFormatQuote /></Btn>
      <Btn label="Divider" onClick={() => chain().setHorizontalRule().run()}><MdHorizontalRule /></Btn>
      <span className="editor-sep" />
      <Btn label="Link" active={s.link} onClick={setLink}><MdLink /></Btn>
      <Btn label="Remove link" disabled={!s.link} onClick={() => chain().extendMarkRange('link').unsetLink().run()}><MdLinkOff /></Btn>
      <Btn label="Insert image" onClick={onPickImage}><MdImage /></Btn>
      <Btn label="Picture in line with text" disabled={!s.media} active={!!s.media && !s.float} onClick={() => setFloat(null)}><MdVerticalAlignCenter /></Btn>
      <Btn label="Picture on the left, text wraps" disabled={!s.media} active={s.float === 'left'} onClick={() => setFloat('left')}><span className="editor-float">◧</span></Btn>
      <Btn label="Picture on the right, text wraps" disabled={!s.media} active={s.float === 'right'} onClick={() => setFloat('right')}><span className="editor-float">◨</span></Btn>
      <Btn label="Clear formatting" onClick={() => chain().unsetAllMarks().clearNodes().unsetTextAlign().run()}><MdFormatClear /></Btn>
    </>
  );
};

const EditHost: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [editing, setEditing] = useState(true);
  const [active, setActiveState] = useState<{ id: string; editor: Editor | null } | null>(null);
  const [dirty, setDirty] = useState<Set<string>>(() => new Set());
  const [status, setStatus] = useState('');
  const [position, setPosition] = useState(readPosition);
  const fields = useRef(new Map<string, FieldHandle>());
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;
  const fileRef = useRef<HTMLInputElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const saveField = useCallback(async (id: string) => {
    const field = fields.current.get(id);
    if (!field || !dirtyRef.current.has(id)) return;
    setStatus('saving…');
    try {
      await field.save();
      setDirty(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setStatus('saved');
    } catch (err) {
      setStatus(`not saved: ${(err as Error).message}`);
    }
  }, []);

  const saveAll = useCallback(async () => {
    await Promise.all(Array.from(dirtyRef.current).map(id => saveField(id)));
  }, [saveField]);

  const value = useMemo<EditContextValue>(() => ({
    editing,
    setActive: (id, editor) => setActiveState(id ? { id, editor: editor as Editor } : null),
    register: (id, handle) => {
      fields.current.set(id, handle);
      return () => {
        fields.current.delete(id);
        setActiveState(prev => (prev?.id === id ? null : prev));
      };
    },
    markDirty: id => {
      setDirty(prev => (prev.has(id) ? prev : new Set(prev).add(id)));
      setStatus('');
    },
    saveField,
    reportError: message => setStatus(message),
  }), [editing, saveField]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveAll();
      }
    };
    const onLeave = (e: BeforeUnloadEvent) => { if (dirtyRef.current.size) e.preventDefault(); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('beforeunload', onLeave);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('beforeunload', onLeave);
    };
  }, [saveAll]);

  const uploadImage = async (file: File) => {
    const field = active && fields.current.get(active.id);
    if (!active?.editor || !field) return;
    setStatus('uploading…');
    try {
      const query = new URLSearchParams({ dir: field.uploadDir, name: file.name });
      const { src } = await devPost(`/__dev/upload?${query}`, file, false);
      active.editor.chain().focus().setImage({ src, alt: '' }).run();
      setStatus('');
    } catch (err) {
      setStatus(`upload failed: ${(err as Error).message}`);
    }
  };

  // Dragging the toolbar by its grip.
  const onGripDown = (e: React.PointerEvent) => {
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    drag.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onGripMove = (e: React.PointerEvent) => {
    const bar = barRef.current;
    if (!drag.current || !bar) return;
    const x = Math.min(Math.max(0, e.clientX - drag.current.dx), window.innerWidth - bar.offsetWidth);
    const y = Math.min(Math.max(0, e.clientY - drag.current.dy), window.innerHeight - bar.offsetHeight);
    setPosition({ x, y });
  };
  const onGripUp = () => {
    drag.current = null;
    try {
      localStorage.setItem(POSITION_KEY, JSON.stringify(position));
    } catch {
      // Position just won't be remembered.
    }
  };

  const pending = dirty.size;
  const label = status || (pending ? `${pending} unsaved` : 'all saved');

  return (
    <EditContext.Provider value={value}>
      {children}
      <div
        ref={barRef}
        className={`edit-toolbar${editing ? '' : ' is-preview'}`}
        style={position ? { left: position.x, top: position.y, right: 'auto' } : undefined}
        role="toolbar"
        aria-label="Edit page"
      >
        <span
          className="edit-toolbar__grip"
          title="Drag to move the toolbar"
          onPointerDown={onGripDown}
          onPointerMove={onGripMove}
          onPointerUp={onGripUp}
        >
          <MdDragIndicator />
        </span>
        <Btn label={editing ? 'Preview (stop editing)' : 'Edit'} active={!editing} onClick={() => setEditing(v => !v)}>
          {editing ? <MdVisibility /> : <MdEdit />}
        </Btn>
        {editing && (active?.editor ? (
          <FormatControls editor={active.editor} onPickImage={() => fileRef.current?.click()} />
        ) : (
          <span className="edit-toolbar__hint">{active ? 'plain text field' : 'click any text on the page to edit'}</span>
        ))}
        <span className="editor-status">{label}</span>
        <button type="button" className="editor-save" disabled={!pending} onClick={saveAll}>Save ⌘S</button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          hidden
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) uploadImage(file);
            e.target.value = '';
          }}
        />
      </div>
    </EditContext.Provider>
  );
};

export default EditHost;
