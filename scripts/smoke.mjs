import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'app.css'), 'utf8');
const checks = [
  ['Version constant', "const VERSION = '3.8.0'"],
  ['Schema constant', 'const SCHEMA_VERSION = 20'],
  ['Legacy 3.7 migration key', "'questline-v3-7'"],
  ['Habit occurrence deduplication', 'v38DedupeHabitOccurrences'],
  ['Habit actual-date capture', 'v38RecordHabitCompletion'],
  ['Weekly Habit strip', 'habit-week-strip'],
  ['Low-frequency Habit reconciliation', 'v38LowFrequencyHabitReview'],
  ['Numeric Habit reconciliation', 'v38NumericHabitReview'],
  ['Habit move retains context', "habitReturnMode==='review'"],
  ['Upcoming Habit opportunities', 'v38UpcomingHabitList'],
  ['Actionable Exploration threads', 'v38InvestigationThread'],
  ['Exploration Next Move', 'No next Task defined'],
  ['Inline Exploration task capture', 'Add a concrete Task'],
  ['Life-area insight panel', 'Insights you may not see in Today'],
  ['Priority alignment insight', 'Priority alignment'],
  ['Fixed Rank dock', 'v38-rank-dock'],
  ['Rank-first sorting', 'v35ActivityRank(b,date)-v35ActivityRank(a,date)'],
  ['Resolve lane rank sorting', 'Tasks are ordered by Priority Rank'],
  ['Visual Importance assets', 'importance_1'],
  ['Visual Urgency assets', 'urgency_3'],
  ['Visual Rank assets', 'rank_10'],
  ['Multiple stars retained', 'v37NormalizeStarMap'],
  ['Unified date retained', "dateMode:'unified'"],
  ['Capture draft preservation retained', 'v36ClearCaptureAfterCreate'],
  ['Multi-area contribution retained', 'secondaryAreas'],
];
let failed = false;
for (const [name, marker] of checks) {
  const ok = app.includes(marker) || css.includes(marker);
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  failed ||= !ok;
}
if (failed) process.exit(1);
console.log(`Questline 3.8 smoke checks complete: ${checks.length}/${checks.length}.`);
