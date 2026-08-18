# Migration to Questline 3.7

Questline 3.7 uses schema 19 and storage key `questline-v3-7`.

On first launch, the app looks for Questline 3.6 and earlier local data, creates a migration backup, and converts each date's prior single Top Priority value into a list of Starred Activities. Habit records gain an optional `urgencyOverride`; no override means urgency remains automatic.

Export a JSON or Excel backup before extended testing on real data.
