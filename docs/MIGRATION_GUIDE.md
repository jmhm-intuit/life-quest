# Questline 3.4 Migration Guide

## Before updating

Export a JSON or Excel backup from the currently deployed Questline version.

## Automatic migration

Questline 3.4 uses:

- Storage key: `questline-v3-4`
- Recognized previous key: `questline-v3-3`
- Schema: `16`

It recognizes `questline-v3-beta2`, `questline-v3-beta1`, and earlier supported Questline storage keys. Compatible tasks, quests, habits, notes, calendar events, reviews, date histories, and relationships are normalized into the Version 3.4 model.

## Important changes

- Generic Task Status is derived rather than manually edited.
- Existing time and duration values are preserved in stored records even though they are hidden from the normal task editor.
- Existing habit health is recalculated from current completion history.
- Checklist data, skipped habit occurrences, hidden calendar events, and priority settings are preserved in exports.

Keep the previous backup until Version 3.4 has been tested on the physical phone and desktop browsers that will hold the real data.
