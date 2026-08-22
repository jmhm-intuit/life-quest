import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fail = (message) => { console.error(`ERROR: ${message}`); process.exitCode = 1; };
const pass = (message) => console.log(`PASS: ${message}`);
const required = [
  'index.html','app.js','app.css','manifest.webmanifest','service-worker.js',
  'version.json','icon-192.png','icon-512.png','.nojekyll',
  'vendor/jszip.min.js','vendor/questline-xlsx.js','assets/asset-manifest.json',
  '.github/workflows/pages.yml','deploy.sh',
  'assets/recognition_big_move.webp','assets/recognition_pace_increased.webp',
  'assets/recognition_area_flourishing.webp','assets/recognition_dormant_reawakened.webp',
  'assets/recognition_consistency.webp','assets/recognition_recovery.webp',
  'assets/metric_activities_closed.webp','assets/metric_important_moves.webp',
  'assets/metric_recovered.webp','assets/metric_habit_targets.webp','assets/metric_pace.webp',
  'assets/metric_active_days.webp','assets/metric_areas_momentum.webp',
  'assets/cycle_achieved.webp','assets/cycle_at_risk.webp','assets/cycle_on_pace.webp','assets/cycle_catch_up.webp',
  'assets/recurrence_fixed_day.webp','assets/recurrence_ordinal_weekday.webp','assets/recurrence_manual_cycle.webp'
];
for (const rel of required) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) fail(`missing ${rel}`);
  else if (rel !== '.nojekyll' && fs.statSync(full).size === 0) fail(`empty file ${rel}`);
  else pass(rel);
}

let version;
try {
  version = JSON.parse(fs.readFileSync(path.join(root, 'version.json'), 'utf8'));
  version.version === '3.9.0' ? pass('version 3.9.0') : fail(`version.json version is ${version.version}`);
  Number(version.schemaVersion) === 21 ? pass('schema 21') : fail(`schema is ${version.schemaVersion}`);
  version.storageKey === 'questline-v3-9' ? pass('storage key questline-v3-9') : fail(`storage key is ${version.storageKey}`);
} catch (error) { fail(`invalid version.json: ${error.message}`); }

try {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
  String(manifest.name || '').includes('3.9') ? pass('manifest version label') : fail('manifest name does not include 3.9');
  manifest.display === 'standalone' ? pass('manifest standalone display') : fail('manifest display is not standalone');
} catch (error) { fail(`invalid manifest: ${error.message}`); }

try {
  const assets = JSON.parse(fs.readFileSync(path.join(root, 'assets/asset-manifest.json'), 'utf8'));
  const records = Array.isArray(assets) ? assets : assets.assets || [];
  const files = new Set(records.map(x => String(x.file || x.path || x)));
  for (const rel of [
    'assets/recognition_big_move.webp','assets/recognition_pace_increased.webp',
    'assets/recognition_area_flourishing.webp','assets/metric_activities_closed.webp',
    'assets/metric_active_days.webp','assets/cycle_achieved.webp','assets/recurrence_ordinal_weekday.webp'
  ]) files.has(rel) ? pass(`asset manifest includes ${rel}`) : fail(`asset manifest missing ${rel}`);
  for (const record of records) {
    const full = path.join(root, record.file);
    if (!fs.existsSync(full)) fail(`asset manifest points to missing file: ${record.file}`);
    else if (fs.statSync(full).size === 0) fail(`asset is empty: ${record.file}`);
  }
  pass(`${records.length} asset manifest records`);
} catch (error) { fail(`invalid asset manifest: ${error.message}`); }

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const marker of ['Questline v3.9.0','app.css','app.js','manifest.webmanifest']) {
  index.includes(marker) ? pass(`index includes ${marker}`) : fail(`index missing ${marker}`);
}

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
for (const marker of [
  "const VERSION = '3.9.0'", 'const SCHEMA_VERSION = 21', "const STORAGE_KEY = 'questline-v3-9'",
  "'questline-v3-8'", 'v39OpenHabitCycle', 'v39WeekStrip', 'v39RecurrenceControls',
  'ordinalWeekday', 'v39ReviewAreas', 'YOUR ${m.range', 'v39EnhanceAreaPicker',
  'recognition_big_move', 'metric_activities_closed', 'v39GeneratedDates'
]) app.includes(marker) ? pass(`app includes ${marker}`) : fail(`app missing ${marker}`);

try {
  const sw = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
  sw.includes('questline-v3-9-cache-v1') ? pass('service-worker cache key') : fail('service-worker cache key is not v3.9');
  const prefix = sw.split("self.addEventListener('install'")[0];
  const core = vm.runInNewContext(`${prefix}; CORE`);
  let missing = 0;
  for (const ref of core) {
    if (ref === './') continue;
    const rel = ref.replace(/^\.\//, '');
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) { fail(`service-worker reference missing: ${rel}`); missing++; }
    else if (fs.statSync(full).size === 0) { fail(`service-worker reference is empty: ${rel}`); missing++; }
  }
  if (!missing) pass(`${core.length} service-worker references`);
} catch (error) { fail(`service worker preflight failed: ${error.message}`); }

if (process.exitCode) process.exit(process.exitCode);
console.log('Questline 3.9 preflight complete.');
