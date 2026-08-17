# Migration to Questline 3.6

Questline 3.6 uses schema 18 and storage key `questline-v3-6`.

On first launch it can read earlier Questline stores, including `questline-v3-5`. Existing Tasks, Projects, Explorations, Habits, date history, checklists, workstreams, Ideas, and Review data are preserved.

New fields are added conservatively:

- `secondaryAreas` defaults to an empty list.
- Exploration entries preserve or receive `taskIds`.
- Existing unified and split Task dates remain unchanged.
- Habit occurrence history remains intact.

Before migration:

1. Open the previous version.
2. Export JSON or Excel.
3. Deploy Version 3.6.
4. Open the updated app and inspect Today, Questbook, Habits, and Review.
