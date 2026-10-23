import { Node, mergeAttributes } from '@tiptap/core';
import { Fragment, type Node as PMNode, type Schema } from '@tiptap/pm/model';
import { Plugin, PluginKey, NodeSelection, type EditorState, type Transaction } from '@tiptap/pm/state';
import { Decoration, DecorationSet, type EditorView } from '@tiptap/pm/view';

// Notion-style side-by-side columns for the page editor (dev only).
//
// Dragging a block (a paragraph, a picture, a heading…) by its grip and
// dropping it on the left or right edge of another block puts the two side
// by side in a `columns` row; dropping on the edge of a block that is already
// in a row adds another column (up to MAX_COLUMNS). Columns that end up empty
// disappear, and a row left with one column turns back into plain blocks.
// Saved as <div class="columns"><div class="column">…</div>…</div>.

const MAX_COLUMNS = 4;
const EDGE = 0.22; // share of a block's width on each side that counts as "beside"

export const Column = Node.create({
  name: 'column',
  content: 'block+',
  isolating: true,
  parseHTML: () => [{ tag: 'div[data-type="column"]' }],
  renderHTML: ({ HTMLAttributes }) => ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'column', class: 'column' }), 0],
});

type Side = 'left' | 'right';
interface DropTarget { pos: number; side: Side }

const dropKey = new PluginKey<DropTarget | null>('columnDrop');

const isRowParent = (node: PMNode) => node.type.name === 'doc' || node.type.name === 'column';

// The block under the pointer that a drop would sit beside: the outermost
// block whose parent is the document or a column (or a whole row), plus
// which edge is near.
function findTarget(view: EditorView, event: DragEvent): DropTarget | null {
  const hit = view.posAtCoords({ left: event.clientX, top: event.clientY });
  if (!hit) return null;
  const { doc } = view.state;
  // `inside` is the position of the node the pointer is over, when there is one.
  const start = hit.inside >= 0 ? hit.inside : hit.pos;
  const $pos = doc.resolve(start);
  const over = hit.inside >= 0 ? doc.nodeAt(hit.inside) : null;
  let pos: number | null = null;
  if (over?.isBlock && (isRowParent($pos.parent) || over.type.name === 'columns')) pos = hit.inside;
  for (let depth = $pos.depth; pos === null && depth >= 1; depth -= 1) {
    if (isRowParent($pos.node(depth - 1))) pos = $pos.before(depth);
  }
  if (pos === null) return null;
  const dom = view.nodeDOM(pos);
  if (!(dom instanceof HTMLElement)) return null;
  const rect = dom.getBoundingClientRect();
  if (event.clientX < rect.left + rect.width * EDGE) return { pos, side: 'left' };
  if (event.clientX > rect.right - rect.width * EDGE) return { pos, side: 'right' };
  return null;
}

// What is being dragged, as blocks (an inline picture is wrapped in a paragraph).
function draggedBlocks(schema: Schema, content: Fragment): Fragment | null {
  if (!content.childCount) return null;
  let nested = false;
  content.descendants(node => { if (node.type.name === 'columns') nested = true; });
  if (nested) return null;
  return content.firstChild!.isInline ? Fragment.from(schema.nodes.paragraph.create(null, content)) : content;
}

function placeBeside(state: EditorState, target: DropTarget, blocks: Fragment, moved: boolean): Transaction | null {
  const { schema } = state;
  let tr = state.tr;
  const sel = state.selection;
  if (moved) {
    // Dropping a block beside itself does nothing.
    if (sel instanceof NodeSelection && sel.from === target.pos) return null;
    tr = tr.deleteSelection();
  }
  const pos = tr.mapping.map(target.pos);
  const $pos = tr.doc.resolve(pos);
  const node = tr.doc.nodeAt(pos);
  if (!node) return null;
  const column = schema.nodes.column.create(null, blocks);

  // Beside a whole row: add a column at that end of it.
  if (node.type.name === 'columns') {
    if (node.childCount >= MAX_COLUMNS) return null;
    return tr.insert(target.side === 'left' ? pos + 1 : pos + node.nodeSize - 1, column);
  }

  if ($pos.parent.type.name === 'column') {
    const row = $pos.node($pos.depth - 1);
    if (row.childCount >= MAX_COLUMNS) return null;
    const columnPos = $pos.before($pos.depth);
    const at = target.side === 'left' ? columnPos : columnPos + $pos.parent.nodeSize;
    return tr.insert(at, column);
  }

  const existing = schema.nodes.column.create(null, node);
  const row = schema.nodes.columns.create(null, target.side === 'left' ? [column, existing] : [existing, column]);
  return tr.replaceWith(pos, pos + node.nodeSize, row);
}

const isEmptyColumn = (column: PMNode) =>
  column.childCount === 1 && column.firstChild!.type.name === 'paragraph' && column.firstChild!.content.size === 0;

export const Columns = Node.create({
  name: 'columns',
  group: 'block',
  content: 'column+',
  isolating: true,
  draggable: true,
  parseHTML: () => [{ tag: 'div[data-type="columns"]' }],
  renderHTML: ({ HTMLAttributes }) => ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'columns', class: 'columns' }), 0],

  addProseMirrorPlugins() {
    return [
      new Plugin<DropTarget | null>({
        key: dropKey,
        state: {
          init: () => null,
          apply: (tr, value) => {
            const meta = tr.getMeta(dropKey);
            return meta !== undefined ? meta : value && { ...value, pos: tr.mapping.map(value.pos) };
          },
        },
        props: {
          // A vertical bar on the edge the dragged block would land beside.
          decorations(state) {
            const target = dropKey.getState(state);
            const node = target && state.doc.nodeAt(target.pos);
            if (!target || !node) return null;
            return DecorationSet.create(state.doc, [
              Decoration.node(target.pos, target.pos + node.nodeSize, { class: `column-drop column-drop--${target.side}` }),
            ]);
          },
          handleDOMEvents: {
            dragover(view, event) {
              const target = view.dragging ? findTarget(view, event) : null;
              const current = dropKey.getState(view.state);
              if (target?.pos !== current?.pos || target?.side !== current?.side) {
                view.dispatch(view.state.tr.setMeta(dropKey, target));
              }
              return false;
            },
            dragleave(view, event) {
              if (!view.dom.contains(event.relatedTarget as globalThis.Node | null) && dropKey.getState(view.state)) {
                view.dispatch(view.state.tr.setMeta(dropKey, null));
              }
              return false;
            },
            dragend(view) {
              if (dropKey.getState(view.state)) view.dispatch(view.state.tr.setMeta(dropKey, null));
              return false;
            },
          },
          handleDrop(view, event, slice, moved) {
            const target = findTarget(view, event as DragEvent);
            if (!target) {
              if (dropKey.getState(view.state)) view.dispatch(view.state.tr.setMeta(dropKey, null));
              return false;
            }
            const blocks = draggedBlocks(view.state.schema, slice.content);
            const tr = blocks && placeBeside(view.state, target, blocks, moved);
            if (!tr) return false;
            view.dispatch(tr.setMeta(dropKey, null).scrollIntoView());
            return true;
          },
        },
      }),
      // Tidy rows after any change: drop empty columns, unwrap single ones.
      new Plugin({
        appendTransaction(transactions, _old, state) {
          if (!transactions.some(t => t.docChanged)) return null;
          const rows: { pos: number; node: PMNode }[] = [];
          state.doc.descendants((node, pos) => {
            if (node.type.name === 'columns') rows.push({ pos, node });
            return node.type.name !== 'columns';
          });
          if (!rows.length) return null;
          let tr = state.tr;
          rows.reverse().forEach(({ pos, node }) => {
            const kept: PMNode[] = [];
            node.forEach(column => { if (!isEmptyColumn(column)) kept.push(column); });
            if (kept.length === node.childCount && kept.length > 1) return;
            const replacement = kept.length > 1
              ? node.type.create(node.attrs, kept)
              : kept.length === 1 ? kept[0].content : state.schema.nodes.paragraph.create();
            tr = tr.replaceWith(pos, pos + node.nodeSize, replacement);
          });
          return tr.docChanged ? tr : null;
        },
      }),
    ];
  },
});
