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
  '.github/workflows/pages.yml'
];
for (const rel of required) {
  const target = path.join(root, rel);
  fs.existsSync(target) ? pass(rel) : fail(`missing ${rel}`);
}

let version;
try {
  version = JSON.parse(fs.readFileSync(path.join(root, 'version.json'), 'utf8'));
  if (version.version !== '3.5.0') fail(`version.json version is ${version.version}`); else pass('version 3.5.0');
  if (Number(version.schemaVersion) !== 17) fail(`schema is ${version.schemaVersion}`); else pass('schema 17');
} catch (error) { fail(`invalid version.json: ${error.message}`); }

try {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
  if (!String(manifest.name || '').includes('3.5')) fail('manifest name does not include 3.5'); else pass('manifest version label');
  pass('manifest JSON');
} catch (error) { fail(`invalid manifest: ${error.message}`); }
try { JSON.parse(fs.readFileSync(path.join(root, 'assets/asset-manifest.json'), 'utf8')); pass('asset manifest JSON'); }
catch (error) { fail(`invalid asset manifest: ${error.message}`); }

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const marker of ['Questline v3.5.0','app.css','app.js','manifest.webmanifest']) {
  index.includes(marker) ? pass(`index includes ${marker}`) : fail(`index missing ${marker}`);
}

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
for (const marker of ["const VERSION = '3.5.0'", 'const SCHEMA_VERSION = 17', "const STORAGE_KEY = 'questline-v3-5'"]) {
  app.includes(marker) ? pass(`app includes ${marker}`) : fail(`app missing ${marker}`);
}

try {
  const sw = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
  if (!sw.includes("questline-v3-5-cache-v1")) fail('service-worker cache key is not v3.5'); else pass('service-worker cache key');
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
console.log('Questline 3.5 preflight complete.');
