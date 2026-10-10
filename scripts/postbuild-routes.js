const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const INDEX_HTML = path.join(BUILD_DIR, 'index.html');
const ROOT_URL = 'https://hanaisreal.github.io';

function extractEntries(relativePath) {
  const source = fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8');
  const matches = [...source.matchAll(/slug:\s*"([^"]+)"/g)];
  return matches.map((match, index) => {
    const start = match.index;
    const end = index + 1 < matches.length ? matches[index + 1].index : source.length;
    const entry = source.slice(start, end);
    const readString = (field) => {
      const value = entry.match(new RegExp(`\\b${field}:\\s*"((?:\\\\.|[^"\\\\])*)"`));
      return value ? value[1].replace(/\\"/g, '"').replace(/\\n/g, ' ') : '';
    };
    const contributionBlock = entry.match(/contributions:\s*\[([\s\S]*?)\]/);
    const contributions = contributionBlock
      ? [...contributionBlock[1].matchAll(/"((?:\\.|[^"\\])*)"/g)].map((item) => item[1])
      : [];
    return {
      slug: match[1],
      title: readString('title'),
      description: readString('tldr') || readString('description'),
      authors: readString('authors'),
      venue: readString('venue'),
      status: readString('status'),
      contributions,
    };
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function ensureRouteHtml(route, entry) {
  if (route === '/') return;

  const routeDir = path.join(BUILD_DIR, route.replace(/^\//, ''));
  fs.mkdirSync(routeDir, { recursive: true });
  let html = fs.readFileSync(INDEX_HTML, 'utf8');
  if (entry) {
    const title = `${entry.title} | Hana Oh`;
    const description = entry.description || `Research by Hana Oh: ${entry.title}`;
    const publicationMeta = entry.authors
      ? `<p>${escapeHtml(entry.authors)}</p><p>${escapeHtml([entry.venue, entry.status].filter(Boolean).join(' · '))}</p>`
      : '';
    const staticSummary = `<main><article><h1>${escapeHtml(entry.title)}</h1>${publicationMeta}<p>${escapeHtml(description)}</p>${entry.contributions.length ? `<h2>My contributions</h2><ul>${entry.contributions.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}</article></main>`;
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/, `$1${escapeHtml(description)}$2`)
      .replace(/(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)/, `$1${escapeHtml(title)}$2`)
      .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*("\s*\/>)/, `$1${escapeHtml(title)}$2`)
      .replace(/(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/>)/, `$1${escapeHtml(description)}$2`)
      .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*("\s*\/>)/, `$1${escapeHtml(description)}$2`)
      .replace(/(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/>)/, `$1${ROOT_URL}${route}$2`)
      .replace('</head>', `<link rel="canonical" href="${ROOT_URL}${route}" /></head>`)
      .replace(/<body>([\s\S]*?)<\/body>/, `<body><noscript>${staticSummary}</noscript>$1</body>`);
  }
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
}

function buildSitemap(routes) {
  const today = new Date().toISOString().split('T')[0];
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  routes.forEach((route) => {
    const normalized = route === '/' ? '' : route;
    const priority =
      route === '/' ? '1.0' :
      route === '/research' ? '0.9' :
      route.startsWith('/publications/') ? '0.8' :
      route.startsWith('/projects/') ? '0.8' :
      route === '/collections' ? '0.6' :
      '0.5';

    lines.push('  <url>');
    lines.push(`    <loc>${ROOT_URL}${normalized}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push(`    <priority>${priority}</priority>`);
    lines.push('  </url>');
  });

  lines.push('</urlset>');
  fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), `${lines.join('\n')}\n`);
}

function main() {
  if (!fs.existsSync(INDEX_HTML)) {
    throw new Error('build/index.html not found. Run the build before postbuild.');
  }

  const projectEntries = extractEntries('src/components/data/projectData.ts');
  const publicationEntries = extractEntries('src/components/data/publicationsData.ts');
  const projectSlugs = projectEntries.map((entry) => entry.slug);
  const publicationSlugs = publicationEntries.map((entry) => entry.slug);

  const routes = [
    '/',
    '/research',
    '/collections',
    ...projectSlugs.map((slug) => `/projects/${slug}`),
    ...publicationSlugs.map((slug) => `/publications/${slug}`),
  ];

  routes.forEach((route) => {
    const projectMatch = route.match(/^\/projects\/([^/]+)$/);
    const publicationMatch = route.match(/^\/publications\/([^/]+)$/);
    const entry = projectMatch
      ? projectEntries.find((item) => item.slug === projectMatch[1])
      : publicationMatch
        ? publicationEntries.find((item) => item.slug === publicationMatch[1])
        : undefined;
    ensureRouteHtml(route, entry);
  });
  fs.copyFileSync(INDEX_HTML, path.join(BUILD_DIR, '404.html'));
  buildSitemap(routes);
}

main();
