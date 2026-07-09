const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const INDEX_HTML = path.join(BUILD_DIR, 'index.html');
const ROOT_URL = 'https://hanaisreal.github.io';

function extractSlugs(relativePath) {
  const filePath = path.join(__dirname, '..', relativePath);
  const source = fs.readFileSync(filePath, 'utf8');
  return [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function ensureRouteHtml(route) {
  if (route === '/') return;

  const routeDir = path.join(BUILD_DIR, route.replace(/^\//, ''));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.copyFileSync(INDEX_HTML, path.join(routeDir, 'index.html'));
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

  const projectSlugs = extractSlugs('src/components/data/projectData.ts');
  const publicationSlugs = extractSlugs('src/components/data/publicationsData.ts');

  const routes = [
    '/',
    '/research',
    '/collections',
    ...projectSlugs.map((slug) => `/projects/${slug}`),
    ...publicationSlugs.map((slug) => `/publications/${slug}`),
  ];

  routes.forEach(ensureRouteHtml);
  fs.copyFileSync(INDEX_HTML, path.join(BUILD_DIR, '404.html'));
  buildSitemap(routes);
}

main();
