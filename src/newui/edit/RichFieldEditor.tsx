import React, { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import DragHandle from '@tiptap/extension-drag-handle-react';
import { MdDragIndicator } from 'react-icons/md';
import { editorExtensions } from './extensions';
import { useEditContext } from './editContext';

interface Props {
  id: string;
  html: string;
  className: string;
  uploadDir: string;
  save: (html: string) => Promise<void>;
}

// Blocks inside a column get their own grip; the column wrapper itself does not.
const NESTED = {
  rules: [{ id: 'noColumnWrapper', evaluate: ({ node }: { node: { type: { name: string } } }) => (node.type.name === 'column' ? 1000 : 0) }],
};

// A TipTap editor for one rich field (dev only). It reports focus to the
// edit host so the floating toolbar formats it. Any change (typing, moving
// or resizing a picture) saves on its own once editing pauses, and also
// when the field loses focus or the page is left.
const AUTOSAVE_MS = 1200;
const RichFieldEditor: React.FC<Props> = ({ id, html, className, uploadDir, save }) => {
  const host = useEditContext()!;
  const saveRef = useRef(save);
  saveRef.current = save;
  const timer = useRef<number | null>(null);
  const flush = () => {
    if (timer.current === null) return;
    window.clearTimeout(timer.current);
    timer.current = null;
    host.saveField(id);
  };

  const editor = useEditor({
    extensions: editorExtensions,
    content: html,
    editorProps: { attributes: { class: `${className} editor-content` } },
    onFocus: ({ editor: e }) => host.setActive(id, e),
    onUpdate: () => {
      host.markDirty(id);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(flush, AUTOSAVE_MS);
    },
    onBlur: () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = null;
      host.saveField(id);
    },
  });

  useEffect(() => {
    if (!editor) return undefined;
    const unregister = host.register(id, { save: () => saveRef.current(editor.getHTML()), uploadDir });
    return () => {
      flush(); // leaving the page: save what is pending first
      unregister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, id, uploadDir]);

  useEffect(() => {
    editor?.setEditable(host.editing, false); // false: toggling edit mode is not a content change
  }, [editor, host.editing]);

  if (!editor) return null;
  return (
    <div className="rich-field">
      {host.editing && (
        <DragHandle editor={editor} nested={NESTED}>
          <span className="editor-grip" title="Drag to move"><MdDragIndicator /></span>
        </DragHandle>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichFieldEditor;
