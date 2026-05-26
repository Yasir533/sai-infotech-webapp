const fs = require('fs');
const path = require('path');

const root = path.resolve('c:\\Users\\DELL\\Desktop\\sai-infotech-webapp\\sai-info');
const sourceDirs = ['src','backend','public'];
const exts = ['.js','.jsx','.ts','.tsx'];

function collectFiles() {
  const files = {};
  for (const d of sourceDirs) {
    const dir = path.join(root, d);
    if (!fs.existsSync(dir)) continue;
    const stack = [dir];
    while (stack.length) {
      const cur = stack.pop();
      const items = fs.readdirSync(cur, { withFileTypes: true });
      for (const it of items) {
        const p = path.join(cur, it.name);
        if (it.isDirectory()) stack.push(p);
        else if (it.isFile() && exts.includes(path.extname(it.name))) {
          const rel = path.relative(root, p).split(path.sep).join('/');
          files[rel] = p;
        }
      }
    }
  }
  return files;
}

const importRe = /from\s+['"](.+?)['"]|require\(['"](.+?)['"]\)|import\(['"](.+?)['"]\)/g;

function resolveImport(fromFile, imp) {
  if (!imp.startsWith('.')) return null;
  const base = path.resolve(path.dirname(fromFile), imp);
  const candidates = [];
  if (fs.existsSync(base) && fs.statSync(base).isFile()) candidates.push(base);
  for (const ex of exts) {
    if (fs.existsSync(base + ex)) candidates.push(base + ex);
  }
  for (const idx of ['index.js','index.jsx']) {
    const p = path.join(base, idx);
    if (fs.existsSync(p)) candidates.push(p);
  }
  return candidates;
}

const files = collectFiles();
const refs = {};
for (const k of Object.keys(files)) refs[k] = new Set();

for (const [rel, full] of Object.entries(files)) {
  let text = '';
  try { text = fs.readFileSync(full, 'utf8'); } catch(e){ continue }
  let m;
  while ((m = importRe.exec(text)) !== null) {
    const imp = m[1]||m[2]||m[3];
    if (!imp) continue;
    const resolved = resolveImport(full, imp);
    if (!resolved) continue;
    for (const r of resolved) {
      const crel = path.relative(root, r).split(path.sep).join('/');
      if (crel in refs) refs[crel].add(rel);
    }
  }
}

const entry_candidates = new Set(['src/main.jsx','src/App.jsx','backend/server.js','src/index.js','src/index.jsx']);
const unused = [];
for (const [k,v] of Object.entries(refs)) {
  if (v.size === 0 && !entry_candidates.has(k)) unused.push(k);
}

console.log(JSON.stringify({ total_files: Object.keys(files).length, candidates: unused.sort() }, null, 2));
