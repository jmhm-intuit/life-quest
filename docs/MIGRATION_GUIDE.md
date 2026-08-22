# Questline 3.9 Migration Guide

Before extended testing, export a JSON or Excel backup from the prior Questline release.

Questline 3.9 reads earlier Questline browser keys, including `questline-v3-8`. The migration preserves Tasks, Projects, Explorations, Habits, Reviews, dates, progress, relationships, and history.

## Habit migration

- Existing Habit occurrences retain planned, original, completion, skip, and movement data.
- Generated occurrences receive stable recurrence metadata.
- Accidental duplicates are consolidated by the existing occurrence-deduplication rules.
- Completed and skipped records are preserved ahead of unused planned records.
- Monthly Habits without an explicit recurrence mode default to a fixed day.

## Storage

The new browser key is `questline-v3-9`. Earlier keys are not deleted automatically, providing an additional rollback path.
