import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'app.css'), 'utf8');
const checks = [
  ['Version constant', "const VERSION = '3.5.0'"],
  ['Schema constant', 'const SCHEMA_VERSION = 17'],
  ['Unified date mode', "dateMode:'unified'"],
  ['Split deadline action', 'data-v35-split-date'],
  ['Auto-save task editor', 'v35ScheduleAutosave'],
  ['No native unsaved prompt in v3.5 editor', 'autosave-state'],
  ['Priority rank mapping', 'PRIORITY_RANK'],
  ['Priority Ladder', 'priority-ladder'],
  ['3x3 priority editor', 'priority-mini-grid'],
  ['Habit derived urgency', 'v35HabitUrgency'],
  ['Proactive habit completion', 'data-v35-complete-habit-today'],
  ['Overdue consolidation', 'overdueSection'],
  ['Dedicated replan sheet', 'replan-sheet'],
  ['Quick date choices', 'Next week'],
  ['Review original date', 'Date Reliability'],
  ['Original date history', 'originalDate'],
  ['Task checklist', 'v35-checklist-editor'],
  ['Calendar local hiding', 'hiddenCalendarEventIds'],
  ['Compact planner controls', 'compact-planner-header'],
  ['Rank visual treatment', 'rank-badge'],
];
let failed = false;
for (const [name, marker] of checks) {
  const ok = app.includes(marker) || css.includes(marker);
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  failed ||= !ok;
}
if (failed) process.exit(1);
console.log(`Questline 3.5 smoke checks complete: ${checks.length}/${checks.length}.`);
