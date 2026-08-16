import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'app.css'), 'utf8');
const checks = [
  ['Version constant', "const VERSION = '3.4.0'"],
  ['Schema constant', 'const SCHEMA_VERSION = 16'],
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
  ['Compact add sheet', 'v34-compact-sheet'],
  ['Compact Plan Next Days', 'plan-next-compact'],
  ['Prominent Task Save', 'task-save-button'],
  ['Workstream management', 'data-v34-manage-workstreams'],
  ['Idea management', 'data-v34-entry-menu'],
  ['Habit target closure', 'notRequiredAt'],
];
let failed = false;
for (const [name, marker] of checks) {
  const ok = app.includes(marker) || css.includes(marker);
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  failed ||= !ok;
}
if (failed) process.exit(1);
console.log(`Questline 3.4 smoke checks complete: ${checks.length}/${checks.length}.`);
