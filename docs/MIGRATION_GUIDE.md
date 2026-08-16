# Questline 3.5 Migration Guide

## Before updating

Export a JSON or Excel backup from the currently deployed Questline version.

## Automatic migration

Questline 3.5 uses:

- Storage key: `questline-v3-5`
- Recognized previous key: `questline-v3-4`
- Schema: `17`

It also recognizes earlier supported Questline keys. Compatible tasks, quests, habits, notes, calendar events, reviews, date histories, checklist data, hidden events, and relationships are normalized into Version 3.5.

## Date migration

- Planned date only → unified Date
- Due date only → unified Date
- Planned and due dates equal → unified Date
- Planned and due dates differ → split mode is preserved
- No date → unscheduled

Original dates and movement histories are preserved.

## Habit migration

Completed and skipped occurrences remain intact. When the current period target is already achieved, unused generated occurrences are marked no longer required; manually created extras remain available.

Keep the prior backup until Version 3.5 has been tested on the physical phone and desktop browsers that will hold the real data.
