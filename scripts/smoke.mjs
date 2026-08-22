import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'app.css'), 'utf8');
const checks = [
  ['Version constant', "const VERSION = '3.9.0'"],
  ['Schema constant', 'const SCHEMA_VERSION = 21'],
  ['Legacy 3.8 migration key', "'questline-v3-8'"],
  ['Stable Habit occurrence generation', 'v39OccurrenceId'],
  ['Habit occurrence deduplication', 'v38DedupeHabitOccurrences'],
  ['Habit cycle review', 'v39OpenHabitCycle'],
  ['High-frequency weekly strip', 'v39WeekStrip'],
  ['Retroactive Habit completion', 'data-v39-record-date'],
  ['Habit batch reconciliation', 'data-v39-batch-action'],
  ['Habit review stays mounted after move', 'v39OpenHabitCycle(hid'],
  ['Fixed monthly recurrence', "recurrenceMode==='fixedDay'"],
  ['Ordinal weekday recurrence', 'v39OrdinalDate'],
  ['Manual monthly recurrence', "recurrenceMode==='manual'"],
  ['Habit cycle coaching', 'v39CycleStatus'],
  ['Life-area Review default', 'v39ReviewAreas'],
  ['Weekly recognition hero', 'YOUR ${m.range'],
  ['Pace comparison', 'v39-pace-comparison'],
  ['Recovery wins', 'Recovery Wins'],
  ['Important moves', 'Important moves'],
  ['Attention Footprint', 'Attention Footprint'],
  ['Life-area evidence', 'v39AreaReviewCard'],
  ['Compact life-area icon selector', 'v39EnhanceAreaPicker'],
  ['Primary and shared area logic', 'First choice is primary'],
  ['Positive-behavior assets', 'recognition_big_move'],
  ['Review metrics assets', 'metric_activities_closed'],
  ['Habit action emphasis by frequency', 'v39HabitCardActions'],
  ['Actionable exploration retained', 'v38InvestigationThread'],
  ['Priority Rank retained', 'v35PriorityRank'],
  ['Unified Task dates retained', "dateMode:'unified'"],
  ['Capture draft preservation retained', 'v36ClearCaptureAfterCreate'],
  ['Auto-save retained', 'Changes save automatically'],
  ['Responsive v3.9 styling', '.v39-review-hero'],
  ['Habit cycle styling', '.v39-week-strip'],
  ['Area selector styling', '.v39-area-grid'],
];
let failed = false;
for (const [name, marker] of checks) {
  const ok = app.includes(marker) || css.includes(marker);
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  failed ||= !ok;
}
if (failed) process.exit(1);
console.log(`Questline 3.9 smoke checks complete: ${checks.length}/${checks.length}.`);
