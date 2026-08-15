import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'app.css'), 'utf8');
const checks = [
  ['Version constant', "const VERSION = '3.3.0'"],
  ['Schema constant', 'const SCHEMA_VERSION = 15'],
  ['Priority sequence', 'V33_PRIORITY_RANK'],
  ['Starred planner toggle', 'data-toggle-starred'],
  ['Completed planner toggle', 'data-toggle-completed'],
  ['Task checklist', 'task-checklist-editor'],
  ['Habit skip', 'data-skip-habit'],
  ['Habit future scheduling', 'This and future occurrences'],
  ['Derived habit health', 'v33HabitHealth'],
  ['Three upcoming occurrences', 'v33EnsureUpcomingHabitOccurrences'],
  ['Calendar local hiding', 'hiddenCalendarEventIds'],
  ['Review skip evidence', 'intentionally skipped'],
  ['Overdue styling', 'overdue-section'],
];
let failed = false;
for (const [name, marker] of checks) {
  const ok = app.includes(marker) || css.includes(marker);
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  failed ||= !ok;
}
if (failed) process.exit(1);
console.log(`Questline 3.3 smoke checks complete: ${checks.length}/${checks.length}.`);
