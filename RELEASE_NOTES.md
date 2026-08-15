# Questline 3.3 Release Notes

Questline 3.3 is a mobile usability release focused on faster task capture, clearer priorities, flexible habit planning, and stronger overdue recovery. It preserves the approved Questline visual assets.

## Today planner

- Planned and Due remain the two primary date lenses.
- Added Starred and Completed visibility toggles.
- Sorting moved to a compact sheet with Manual, Priority, Quest, and Recent options.
- Priority order follows: 3/3, 3/2, 2/3, 2/2, 3/1, 1/3, 2/1, 1/2, 1/1.
- Overdue work uses a distinct red treatment; Missed Plan uses amber.
- Planned dates and movement counts are visible in compact rows.
- Ordinary tasks no longer emphasize start/end times.
- Calendar commitments retain their times and may be hidden locally without changing the source calendar.

## Task capture and editing

- New tasks require only a title.
- Context provides Project, Exploration, Resolve, workstream, area, and selected date defaults.
- Importance and Urgency are visible at the top of task details.
- Optional details remain collapsed.
- Generic manual Task Status is removed from the editor; state is derived from completion, progress, and dates.
- Added one-level task checklists. Completing all steps does not automatically complete the parent task.

## Habits

- Habit titles use true placeholders and cannot save blank records.
- Preferred weekdays appear only for weekly occurrence habits.
- Preferred day-of-month appears only for monthly occurrence habits.
- Habit health is derived from completion history.
- At least three upcoming occurrences are shown.
- Moving an occurrence defaults to this occurrence only; future pattern changes are optional.
- Today supports Complete, Skip, and Move for occurrence habits.
- Skips are recorded separately from completions and accidental misses in Review.

## Calendar and data

- Imported calendar events can be hidden from Questline and restored later.
- Hidden calendar IDs, top-priority dates, recurring achievements, and quiet-area choices are included in JSON and Excel round trips.

## Version metadata

- Version: `3.3.0`
- Schema: `15`
- Channel: `release`
