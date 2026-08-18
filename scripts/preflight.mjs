import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const fail = (message) => { console.error(`ERROR: ${message}`); process.exitCode = 1; };
const pass = (message) => console.log(`PASS: ${message}`);
const required = [
  'index.html','app.js','app.css','manifest.webmanifest','service-worker.js',
  'version.json','icon-192.png','icon-512.png','.nojekyll',
  'vendor/jszip.min.js','vendor/questline-xlsx.js','assets/asset-manifest.json',
  '.github/workflows/pages.yml','deploy.sh',
  'assets/importance_1.webp','assets/importance_2.webp','assets/importance_3.webp',
  'assets/urgency_1.webp','assets/urgency_2.webp','assets/urgency_3.webp',
  ...Array.from({length:10},(_,i)=>`assets/rank_${i+1}.webp`)
];
for (const rel of required) fs.existsSync(path.join(root, rel)) ? pass(rel) : fail(`missing ${rel}`);
let version;
try {
  version = JSON.parse(fs.readFileSync(path.join(root, 'version.json'), 'utf8'));
  version.version === '3.7.0' ? pass('version 3.7.0') : fail(`version.json version is ${version.version}`);
  Number(version.schemaVersion) === 19 ? pass('schema 19') : fail(`schema is ${version.schemaVersion}`);
  version.storageKey === 'questline-v3-7' ? pass('storage key questline-v3-7') : fail(`storage key is ${version.storageKey}`);
} catch (error) { fail(`invalid version.json: ${error.message}`); }
try {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
  String(manifest.name || '').includes('3.7') ? pass('manifest version label') : fail('manifest name does not include 3.7');
  pass('manifest JSON');
} catch (error) { fail(`invalid manifest: ${error.message}`); }
try {
  const assets = JSON.parse(fs.readFileSync(path.join(root, 'assets/asset-manifest.json'), 'utf8'));
  const files = new Set((assets.assets || assets).map?.(x => x.file || x.path || x) || []);
  for (const rel of ['importance_1.webp','importance_2.webp','importance_3.webp','urgency_1.webp','urgency_2.webp','urgency_3.webp','rank_10.webp','rank_1.webp']) {
    [...files].some(x => String(x).endsWith(rel)) ? pass(`asset manifest includes ${rel}`) : fail(`asset manifest missing ${rel}`);
  }
  pass('asset manifest JSON');
} catch (error) { fail(`invalid asset manifest: ${error.message}`); }
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const marker of ['Questline v3.7.0','app.css','app.js','manifest.webmanifest']) index.includes(marker) ? pass(`index includes ${marker}`) : fail(`index missing ${marker}`);
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
for (const marker of ["const VERSION = '3.7.0'", 'const SCHEMA_VERSION = 19', "const STORAGE_KEY = 'questline-v3-7'", 'v37NormalizeStarMap', 'urgencyOverride', 'importance_1', 'rank_10']) app.includes(marker) ? pass(`app includes ${marker}`) : fail(`app missing ${marker}`);
try {
  const sw = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
  sw.includes('questline-v3-7-cache-v1') ? pass('service-worker cache key') : fail('service-worker cache key is not v3.7');
  const prefix = sw.split("self.addEventListener('install'")[0];
  const core = vm.runInNewContext(`${prefix}; CORE`);
  let missing = 0;
  for (const ref of core) {
    if (ref === './') continue;
    const rel = ref.replace(/^\.\//, '');
    if (!fs.existsSync(path.join(root, rel))) { fail(`service worker reference missing: ${rel}`); missing++; }
  }
  if (!missing) pass(`${core.length} service-worker references`);
} catch (error) { fail(`service worker preflight failed: ${error.message}`); }
if (process.exitCode) process.exit(process.exitCode);
console.log('Questline 3.7 preflight complete.');
