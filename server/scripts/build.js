// Packages the backend into server/dist/: just the files a production
// deployment needs (source, package.json/lock, maintenance scripts), none
// of the dev-time stuff (node_modules, .env, logs, uploads, data backups).
// There's nothing to transpile or bundle — this only assembles the folder
// you copy to the IIS server and run `npm install --omit=dev` inside.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'dist');

const INCLUDE = ['src', 'package.json', 'package-lock.json', 'scripts'];
const EXCLUDE = new Set(['dist', 'node_modules', 'backups']);

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

function copy(src, dest) {
  const name = path.basename(src);
  if (EXCLUDE.has(name)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) copy(path.join(src, entry), path.join(dest, entry));
  } else {
    fs.copyFileSync(src, dest);
  }
}

for (const entry of INCLUDE) {
  const src = path.join(root, entry);
  if (fs.existsSync(src)) copy(src, path.join(outDir, entry));
}

console.log(`Backend build ready at ${outDir}`);
console.log('Copy this folder to the server, add a real .env, then run: npm install --omit=dev');
