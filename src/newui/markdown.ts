// The small markdown used by the homepage text (src/content/home.json) and
// blog posts: [label](https://… or /path), **bold**, *italic*, ==award==.
// Links get the data-analytics-* attributes the click tracker reads, and
// internal links are marked so Editable can route them without a reload.

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function inlineHtml(text: string, placement = 'content'): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]+)\)/g, (_, label: string, href: string) => {
      const external = /^https?:/.test(href);
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : ' data-internal="true"';
      const event = external ? 'external_link_click' : 'internal_link_click';
      return `<a class="text-link" href="${href}"${attrs} data-analytics-event="${event}" data-analytics-label="${label}" data-analytics-destination="${href}" data-analytics-placement="${placement}">${label}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/==(.+?)==/g, '<span class="news-item__award">$1</span>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export const splitBlocks = (text: string) => text.split('\n\n').map(block => block.trim()).filter(Boolean);

// ![alt](/pictures/... "optional caption"){60%} on its own line; several
// lines in one block sit side by side. The {N%} width is optional.
export const IMAGE_LINE = /^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)(?:\{(\d+)%\})?$/;

const imageSrc = (src: string) => (src.startsWith('/') ? `${process.env.PUBLIC_URL}${src}` : src);

// Turns a markdown post into the HTML the blog editor starts from, the first
// time a post is opened there (images become centred, side by side when they
// shared a block, at their saved width or a moderate default).
export function markdownToHtml(content: string): string {
  return splitBlocks(content).map(block => {
    const lines = block.split('\n');
    if (block.startsWith('### ')) return `<h3>${inlineHtml(block.slice(4))}</h3>`;
    if (block.startsWith('## ')) return `<h2>${inlineHtml(block.slice(3))}</h2>`;
    if (block.startsWith('**') && block.endsWith('**')) return `<h3>${inlineHtml(block.slice(2, -2))}</h3>`;
    if (lines.every(l => IMAGE_LINE.test(l))) {
      const matches = lines.map(l => l.match(IMAGE_LINE)!);
      const total = matches.map(m => Number(m[4])).find(Boolean) ?? (matches.length > 1 ? 90 : 60);
      const each = Math.round((total * 6.8) / matches.length); // px of the 680px reading column
      const imgs = matches.map(m => `<img src="${escapeHtml(imageSrc(m[2]))}" alt="${escapeHtml(m[1])}" width="${each}">`).join(' ');
      return `<p style="text-align: center">${imgs}</p>`;
    }
    if (lines.every(l => l.startsWith('> '))) return `<blockquote><p>${inlineHtml(lines.map(l => l.slice(2)).join(' '))}</p></blockquote>`;
    if (lines.every(l => l.startsWith('- '))) return `<ul>${lines.map(l => `<li><p>${inlineHtml(l.slice(2))}</p></li>`).join('')}</ul>`;
    return `<p>${inlineHtml(block)}</p>`;
  }).join('');
}

// Editor HTML keeps only href/target/rel on links; this adds back the
// analytics attributes and marks internal links for client-side routing.
export function decorateLinks(html: string, placement: string): string {
  return html.replace(/<a ([^>]*?)href="([^"]+)"([^>]*)>/g, (_, before: string, href: string, after: string) => {
    const external = /^https?:/.test(href);
    const rest = `${before}${after}`.replace(/\s*(target|rel)="[^"]*"/g, '');
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : ' data-internal="true"';
    const event = external ? 'external_link_click' : 'internal_link_click';
    return `<a ${rest.trim() ? `${rest.trim()} ` : ''}href="${href}"${attrs} data-analytics-event="${event}" data-analytics-destination="${href}" data-analytics-placement="${placement}">`;
  });
}

interface StoryFigure { src: string; alt: string; caption?: string; variant?: 'full' | 'narrow' }
type StoryBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'figure'; figure: StoryFigure }
  | { type: 'figure-row'; figures: StoryFigure[] }
  | { type: 'video'; video: { src: string; poster?: string; caption?: string } };

// Turns a project or publication story into the HTML its editor starts from.
// Figures and videos float to the right with the text wrapping beside them,
// close to the two-column layout the unedited page uses. Captions become the
// image's alt and title text.
// With { inline: true } (paper pages) pictures stay in place, centred at the
// column width, with their captions underneath as caption blocks.
export function storyToHtml(blocks: StoryBlock[], { inline = false } = {}): string {
  const img = (f: StoryFigure, attrs: string) =>
    `<img src="${escapeHtml(f.src)}" alt="${escapeHtml(inline ? f.alt : f.caption || f.alt)}" title="${escapeHtml(inline ? '' : f.caption || '')}" ${attrs}>`;
  const caption = (f: StoryFigure) => (inline && f.caption ? `<p data-caption class="figure-caption">${escapeHtml(f.caption)}</p>` : '');
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph': return `<p>${escapeHtml(block.text)}</p>`;
      case 'heading': return `<h2>${escapeHtml(block.text)}</h2>`;
      case 'figure':
        return inline
          ? `<p style="text-align: center">${img(block.figure, `width="${block.figure.variant === 'narrow' ? 520 : 820}"`)}</p>${caption(block.figure)}`
          : `<p>${img(block.figure, `width="${block.figure.variant === 'narrow' ? 360 : 480}" data-float="right"`)}</p>`;
      case 'figure-row': return `<p style="text-align: center">${block.figures.map(f => img(f, 'width="360"')).join(' ')}</p>`;
      case 'video': {
        const poster = block.video.poster ? ` poster="${escapeHtml(block.video.poster)}"` : '';
        return `<video src="${escapeHtml(block.video.src)}"${poster} width="480" data-float="right"></video>`;
      }
      default: return '';
    }
  }).join('');
}

// A narrative-only story: its cover image on the right, then the paragraphs.
export function narrativeToHtml(narrative: string, image?: string, alt = ''): string {
  const cover = image ? `<p><img src="${escapeHtml(image)}" alt="${escapeHtml(alt)}" width="480" data-float="right"></p>` : '';
  return cover + splitBlocks(narrative).map(p => `<p>${escapeHtml(p)}</p>`).join('');
}
