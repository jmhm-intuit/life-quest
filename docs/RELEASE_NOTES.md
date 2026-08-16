# Questline 3.5 Release Notes

Questline 3.5 consolidates dates, removes save/discard friction, makes priority ranking operational in the daily planner, improves overdue recovery, and allows habits to be completed proactively from their own workspace. Approved Questline artwork remains unchanged.

## Unified task dates

- New tasks use one **Date** by default.
- That date controls both scheduling and overdue behavior.
- **Add separate deadline** intentionally splits the task into **Plan for** and **Due by**.
- Existing tasks with distinct planned and due dates preserve split mode.
- Original dates and movement histories remain available in Review.

## Auto-save

- Existing-task edits save automatically.
- Structured changes save immediately.
- Text changes save after a short pause.
- The native browser unsaved-changes dialog is removed.
- New records still require a deliberate Create action.

## Priority-ranked Today queue

- Importance and Urgency derive a Rank from 2–10; unassessed work uses Rank 1.
- Priority ordering follows: 3/3, 3/2, 2/3, 2/2, 3/1, 1/3, 2/1, 1/2, 1/1.
- Today remains grouped by date and orders flexible work by Top Priority and Rank.
- Habit urgency is derived from period pace and remaining opportunities.
- Mobile replaces the tall Matrix-cell list with a Priority Ladder and tap-based 3×3 editor.
- Desktop retains the full Matrix.

## Overdue and replanning

- Empty past date cards are hidden.
- Incomplete past work is consolidated into a prominent Overdue group.
- Overdue rows show days late, original commitment, and movement count.
- Replanning uses a compact dedicated sheet with **Today**, **Tomorrow**, **Next week**, and **Pick a date**.
- Importance, urgency, category, and notes are intentionally absent from the replan sheet.

## Habits

- Habit detail supports **Complete today** or **Add extra** after the target is achieved.
- Completing early consumes the earliest pending occurrence or creates an ad-hoc completion.
- Once a period target is achieved, unused generated occurrences no longer remain active in Today.
- Numeric habits can be updated directly.
- Habit urgency and health are derived rather than manually maintained.

## Review

- Date Reliability shows original date, final date, completion date, movement count, and early/on-time/late outcomes.
- High-priority work can be reviewed against actual progress without hiding small wins.

## Version metadata

- Version: `3.5.0`
- Schema: `17`
- Channel: `stable`
