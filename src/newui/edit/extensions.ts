import { Mark, Node, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { TextStyleKit } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { Column, Columns } from './columns';

// TipTap setup shared by every editable rich field (dev only).

// Images and videos can float left or right so text wraps beside them;
// stored as data-float on the element.
const floatAttribute = {
  float: {
    default: null as string | null,
    parseHTML: (el: HTMLElement) => el.getAttribute('data-float'),
    renderHTML: (attrs: { float?: string | null }) => (attrs.float ? { 'data-float': attrs.float } : {}),
  },
};

const FloatingImage = Image.extend({
  addAttributes() {
    return { ...this.parent?.(), ...floatAttribute };
  },
});

export const Video = Node.create({
  name: 'video',
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      poster: { default: null },
      width: {
        default: null,
        parseHTML: el => el.getAttribute('width'),
        renderHTML: attrs => (attrs.width ? { width: attrs.width } : {}),
      },
      ...floatAttribute,
    };
  },
  parseHTML() {
    return [{ tag: 'video[src]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes, { controls: 'true', playsinline: 'true', preload: 'metadata' })];
  },
});

export type AccentKind = 'marker' | 'wavy' | 'double' | 'circle';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    accent: {
      setAccent: (attrs: { kind: AccentKind; color: string }) => ReturnType;
      unsetAccent: () => ReturnType;
    };
  }
}

// Playful emphasis on words or lines: a highlighter stroke on the lower half,
// a wavy or double underline, or a hand-drawn circle, in any colour. Saved as
// <span class="accent" data-accent="marker" style="--accent: #…">.
export const Accent = Mark.create({
  name: 'accent',
  addAttributes() {
    return {
      kind: {
        default: 'marker',
        parseHTML: el => el.getAttribute('data-accent'),
        renderHTML: attrs => ({ 'data-accent': attrs.kind }),
      },
      color: {
        default: null,
        parseHTML: el => el.style.getPropertyValue('--accent').trim() || null,
        renderHTML: attrs => (attrs.color ? { style: `--accent: ${attrs.color}` } : {}),
      },
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-accent]', priority: 60 }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { class: 'accent' }), 0];
  },
  addCommands() {
    return {
      setAccent: attrs => ({ commands }) => commands.setMark(this.name, attrs),
      unsetAccent: () => ({ commands }) => commands.unsetMark(this.name),
    };
  },
});

// A figure caption: a small centred line under a picture. Saved as
// <p data-caption class="figure-caption">; older <figcaption>s read in too.
export const Caption = Node.create({
  name: 'caption',
  group: 'block',
  content: 'inline*',
  parseHTML() {
    return [{ tag: 'p[data-caption]', priority: 60 }, { tag: 'figcaption' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(HTMLAttributes, { 'data-caption': '', class: 'figure-caption' }), 0];
  },
});

export const editorExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
  }),
  TextStyleKit,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Highlight.configure({ multicolor: true }),
  FloatingImage.configure({
    inline: true,
    resize: {
      enabled: true,
      directions: ['left', 'right', 'bottom-left', 'bottom-right'],
      minWidth: 60,
      minHeight: 40,
      alwaysPreserveAspectRatio: true,
    },
  }),
  Video,
  Caption,
  Accent,
  Columns,
  Column,
];
