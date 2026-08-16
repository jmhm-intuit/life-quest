# Questline 3.4 Release Notes

Questline 3.4 is a mobile usability release focused on faster task capture, clearer priorities, flexible habit planning, and stronger overdue recovery. It preserves the approved Questline visual assets.

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


## Compact planning sheets

- Rebuilt Add to Date as three compact, high-contrast choices with small functional icons.
- Rebuilt Plan Next Days as a dense planning queue; empty categories are hidden and actionable candidates remain visible together.
- Parchment sheets now use dark navy text and compact controls instead of oversized illustrations.

## Task editor hierarchy

- Save Changes is the dominant footer action.
- Complete remains a compact title control and is primarily performed from planner lists.
- Remove from active lists and Move to Trash are now rare actions under the overflow menu.
- Unsaved edits trigger a discard confirmation.

## Projects and ideas

- Workstreams can be renamed, moved, archived, restored, or deleted without silently deleting Tasks.
- Open Tasks move to Unassigned when a workstream is archived or deleted.
- Exploration entries can be edited, pinned, actioned, archived, restored, or moved to Trash while preserving linked Tasks.

## Habit target completion

- When a Habit reaches its period target, unused automatically generated occurrences no longer remain in the active planner.
- Manually added extra occurrences remain available as Optional extra activities.

## Calendar and data

- Imported calendar events can be hidden from Questline and restored later.
- Hidden calendar IDs, top-priority dates, recurring achievements, and quiet-area choices are included in JSON and Excel round trips.

## Version metadata

- Version: `3.4.0`
- Schema: `16`
- Channel: `stable`
