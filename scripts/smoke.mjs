import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'app.css'), 'utf8');
const checks = [
  ['Version constant', "const VERSION = '3.7.0'"],
  ['Schema constant', 'const SCHEMA_VERSION = 19'],
  ['Legacy 3.6 migration key', "'questline-v3-6'"],
  ['Visual Importance selector', 'visual-priority-field'],
  ['Visual Urgency selector', 'habit-urgency-options'],
  ['Visual Rank assets', 'visual-rank-grid'],
  ['Importance asset reference', 'importance_3'],
  ['Urgency asset reference', 'urgency_3'],
  ['Rank asset reference', 'rank_10'],
  ['Multiple star normalization', 'v37NormalizeStarMap'],
  ['Multiple star membership', 'v37StarredKeys'],
  ['Multiple star toggle', 'Added to Starred'],
  ['Move stars with task date', 'v37MoveStarKey'],
  ['Habit urgency override', 'urgencyOverride'],
  ['Habit priority details', 'habit-priority-details'],
  ['Habit automatic urgency default', 'Automatic urgency'],
  ['Capture draft preservation', 'v36ClearCaptureAfterCreate'],
  ['Habit cycle review retained', 'habit-cycle-review'],
  ['Exploration investigation retained', 'investigation-thread'],
  ['Life-area Review retained', 'Your Life in Motion'],
  ['Unified dates retained', "dateMode:'unified'"],
  ['Priority queue retained', 'priority-ladder'],
  ['Overdue recovery retained', 'replan-sheet'],
];
let failed = false;
for (const [name, marker] of checks) {
  const ok = app.includes(marker) || css.includes(marker);
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  failed ||= !ok;
}
if (failed) process.exit(1);
console.log(`Questline 3.7 smoke checks complete: ${checks.length}/${checks.length}.`);
