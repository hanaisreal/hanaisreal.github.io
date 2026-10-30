// Loaded by the Create React App dev server only (`npm start`), never built.
// These endpoints let the page editor (src/newui/edit/) write edits back
// into the source files:
//   /__dev/html    a rich field's HTML  -> src/content/<store>.json
//   /__dev/field   a plain text field   -> the data file that defines it
//   /__dev/upload  an image added in the editor -> public/pictures/<dir>/
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(__dirname, 'content');
const DATA = path.join(__dirname, 'components', 'data');
const HOME_FILE = path.join(CONTENT, 'home.json');

// Data files whose entries can be edited, and the property that names an entry.
const DATA_FILES = {
  blog: { file: path.join(DATA, 'blogData.ts'), idKey: 'id', store: 'posts' },
  projects: { file: path.join(DATA, 'projectData.ts'), idKey: 'slug', store: 'projects' },
  publications: { file: path.join(DATA, 'publicationsData.ts'), idKey: 'slug', store: 'publications' },
};
const PLAIN_FIELDS = ['title', 'subtitle', 'tldr', 'excerpt', 'date', 'category', 'duration', 'tags'];
const HOME_HTML_KEYS = ['affiliation', 'bio', 'researchIntro', 'themes', 'outside'];
const IMAGE_TYPES = /\.(png|jpe?g|gif|webp)$/i;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Reads the request body (JSON, or raw bytes when `raw` is set), runs
// `handle`, and replies with its result or the error.
function endpoint(handle, { raw = false, limit = 2 * 1024 * 1024 } = {}) {
  return (req, res) => {
    const chunks = [];
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > limit) req.destroy();
      else chunks.push(chunk);
    });
    req.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      try {
        const body = Buffer.concat(chunks);
        const result = handle(raw ? body : JSON.parse(body.toString('utf8')), req);
        res.end(JSON.stringify({ ok: true, ...result }));
      } catch (err) {
        res.statusCode = err.status || 500;
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  };
}

const readJson = file => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {});
const writeJson = (file, data) => fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);

// The slice of a data file that holds one entry: from `idKey: "id",` to the
// next entry's id (or the end of the file).
function entryRange(source, idKey, id) {
  const start = source.indexOf(`${idKey}: ${JSON.stringify(id)},`);
  if (start === -1) throw new HttpError(404, `no entry "${id}"`);
  const next = source.slice(start + 1).search(new RegExp(`\\n\\s+${idKey}: "`));
  return [start, next === -1 ? source.length : start + 1 + next];
}

function newsIndex(id) {
  const match = /^news\.(\d+)$/.exec(id || '');
  if (!match) throw new HttpError(400, 'bad news item');
  return Number(match[1]);
}

module.exports = function devEndpoints(app) {
  app.post('/__dev/html', endpoint(({ store, key, html }) => {
    if (typeof html !== 'string' || typeof key !== 'string') throw new HttpError(400, 'bad request');
    if (store === 'home') {
      const home = readJson(HOME_FILE);
      if (HOME_HTML_KEYS.includes(key)) home[key] = html;
      else {
        const item = home.news[newsIndex(key)];
        if (!item) throw new HttpError(404, 'no such news item');
        item.html = html;
      }
      writeJson(HOME_FILE, home);
      return {};
    }
    const data = Object.values(DATA_FILES).find(d => d.store === store);
    if (!data) throw new HttpError(400, 'unknown store');
    entryRange(fs.readFileSync(data.file, 'utf8'), data.idKey, key);
    const file = path.join(CONTENT, `${store}.json`);
    const saved = readJson(file);
    saved[key] = html;
    writeJson(file, saved);
    return {};
  }));

  app.post('/__dev/field', endpoint(({ file, id, field, value }) => {
    if (typeof value !== 'string' || !value.trim()) throw new HttpError(400, 'empty value');
    if (file === 'home') {
      const home = readJson(HOME_FILE);
      if (id === 'profile' && field === 'name') home.name = value.trim();
      else if (field === 'date' || field === 'title') home.news[newsIndex(id)][field] = value.trim();
      else throw new HttpError(400, 'unknown homepage field');
      writeJson(HOME_FILE, home);
      return {};
    }
    const data = DATA_FILES[file];
    if (!data || !PLAIN_FIELDS.includes(field)) throw new HttpError(400, 'unknown field');
    const source = fs.readFileSync(data.file, 'utf8');
    const [start, end] = entryRange(source, data.idKey, id);
    const entry = source.slice(start, end);
    if (field === 'tags') {
      // "#life #research" (or "life, research") -> ["life", "research"]
      const tags = value.split(/[\s,]+/).map(t => t.replace(/^#/, '')).filter(Boolean);
      const list = /(\n\s+tags: )\[[^\]]*\]/;
      if (!list.test(entry)) throw new HttpError(404, `no tags list in ${id}`);
      const updated = entry.replace(list, (_, prefix) => `${prefix}[${tags.map(t => JSON.stringify(t)).join(', ')}]`);
      fs.writeFileSync(data.file, source.slice(0, start) + updated + source.slice(end));
      return {};
    }
    const pattern = new RegExp(`(\\n\\s+${field}: )"(?:\\\\.|[^"\\\\])*"`);
    if (!pattern.test(entry)) throw new HttpError(404, `"${field}" is not a plain string in ${id}`);
    const updated = entry.replace(pattern, (_, prefix) => `${prefix}${JSON.stringify(value.trim())}`);
    fs.writeFileSync(data.file, source.slice(0, start) + updated + source.slice(end));
    return {};
  }));

  app.post('/__dev/upload', endpoint((bytes, req) => {
    const { searchParams } = new URL(req.url, 'http://localhost');
    const dir = searchParams.get('dir') || '';
    if (!/^(blog|projects|publications|home)(\/[\w-]+)?$/.test(dir)) throw new HttpError(400, 'bad folder');
    const name = (searchParams.get('name') || '').toLowerCase().replace(/[^\w.-]+/g, '-');
    if (!IMAGE_TYPES.test(name)) throw new HttpError(400, 'only png, jpg, gif or webp images');
    if (!bytes.length) throw new HttpError(400, 'empty file');
    const target = path.join(ROOT, 'public', 'pictures', dir);
    fs.mkdirSync(target, { recursive: true });
    const ext = path.extname(name);
    let file = name;
    for (let n = 2; fs.existsSync(path.join(target, file)); n += 1) file = `${path.basename(name, ext)}-${n}${ext}`;
    fs.writeFileSync(path.join(target, file), bytes);
    return { src: `/pictures/${dir}/${file}` };
  }, { raw: true, limit: 20 * 1024 * 1024 }));
};
