import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'app.css'), 'utf8');
const checks = [
  ['Version constant', "const VERSION = '3.6.0'"],
  ['Schema constant', 'const SCHEMA_VERSION = 18'],
  ['Capture draft preservation', 'v36ClearCaptureAfterCreate'],
  ['Prefilled task creation', 'v36-task-create'],
  ['More date details', 'data-v36-more-date-details'],
  ['Optional start time', 'name="startTime"'],
  ['Primary plus secondary areas', 'secondary-area-field'],
  ['Habit Review cycle', 'data-v36-review-habit'],
  ['Habit Plan next', 'data-v36-plan-habit'],
  ['Habit batch reconciliation', 'data-v36-habit-batch'],
  ['Habit recent-current-upcoming', 'habit-cycle-review'],
  ['Exploration Next Move', 'NEXT MOVE'],
  ['Investigation threads', 'investigation-thread'],
  ['Entry-linked Tasks', 'v36-entry-task-form'],
  ['Life-area Review default', 'Your Life in Motion'],
  ['Attention Footprint', 'attention-footprint'],
  ['Needs Proactive Focus', 'Needs Proactive Focus'],
  ['Quiet by Choice', 'data-v36-quiet-area'],
  ['Project decomposition summary', 'project-plan-summary'],
  ['Date reliability retained', 'Date Reliability'],
  ['Auto-save retained', 'v35ScheduleAutosave'],
  ['Unified date retained', "dateMode:'unified'"],
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
console.log(`Questline 3.6 smoke checks complete: ${checks.length}/${checks.length}.`);
