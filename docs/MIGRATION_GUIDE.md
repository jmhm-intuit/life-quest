# Migration to Questline 3.8

Questline 3.8 uses schema 20 and storage key `questline-v3-8`.

On first launch, Questline checks Version 3.7 and earlier storage keys, copies the newest compatible dataset, normalizes it, and keeps the earlier browser record as a migration source. Export JSON or Excel before extended use on a new release.

## Habit occurrence cleanup

Version 3.8 consolidates accidental generated duplicates that share the same Habit, period, and planned date. Completed takes precedence over Skipped; Skipped takes precedence over Planned. Explicit user-created extra completions remain separate.

The migration preserves:

- Tasks, Projects, Explorations, Habits, Notes, and Reviews
- Planned and original dates
- Priority and Star selections
- Habit completion and skip history
- Workstreams and source-entry links
- Primary and optional secondary life areas
